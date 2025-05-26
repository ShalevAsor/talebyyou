import { Suspense } from "react";
import { getBookById } from "@/actions/book-actions";
import { getCurrentUser } from "@/actions/user-actions";
import { ErrorAlert } from "@/components/common";
import { OrderContent } from "@/components/order/OrderContent";
import { redirect } from "next/navigation";
import { BookStatus } from "@prisma/client";
import PageHeader from "@/components/layout/PageHeader";
import { FiArrowLeft } from "react-icons/fi";
import { PAYPAL_CLIENT_ID } from "@/constants/payment";
import { BookStoreLoading } from "@/components/common/BookStoreLoading";
import {
  createMetadata,
  generateStructuredData,
  siteConfig,
} from "@/config/site";
import { logger } from "@/lib/logger";
import { notFound } from "next/navigation";

interface OrderPageProps {
  params: Promise<{
    id: string;
  }>;
}

/**
 * Metadata generator for the Order page
 */
export async function generateMetadata({ params }: OrderPageProps) {
  try {
    const { id } = await params;
    const bookResult = await getBookById(id);

    if (!bookResult.success) {
      return createMetadata({
        title: "Book Ordering - Error",
        description: "Unable to process your book order at this time",
        noIndex: true,
      });
    }

    const book = bookResult.data;

    return createMetadata({
      title: `Order ${book.title}`,
      description: `Complete your order for the personalized children's book "${book.title}"`,
      alternates: {
        canonical: `${siteConfig.url}/my-books/order/${id}`,
      },
    });
  } catch (error) {
    logger.error({ error, params }, "Error generating metadata for OrderPage");

    return createMetadata({
      title: "Order Your Book",
      description: "Complete your personalized children's book order",
    });
  }
}

/**
 * OrderPage component - Handles the book ordering process
 * This page validates the book is eligible for ordering and displays the order form
 */
export default async function OrderPage({ params }: OrderPageProps) {
  try {
    const { id } = await params;

    // Fetch user and book data in parallel
    const [user, bookResult] = await Promise.all([
      getCurrentUser(),
      getBookById(id),
    ]);

    // Handle book fetch errors
    if (!bookResult.success) {
      logger.error(
        { bookId: id, error: bookResult.error },
        "Failed to fetch book for ordering"
      );

      // Show 404 if book doesn't exist
      if (bookResult.error === "Book not found") {
        notFound();
      }

      return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ErrorAlert message={bookResult.error} />
        </div>
      );
    }

    const book = bookResult.data;

    // Security check: verify book ownership
    if (user && book.userId && book.userId !== user.id) {
      logger.debug(
        { bookId: id, userId: user.id, bookUserId: book.userId },
        "User attempted to access a book they don't own"
      );
      redirect("/my-books");
    }

    // Check if there's an existing order for this book
    const existingOrder = book.order;

    // If there's an order that's not in PENDING status, redirect
    if (existingOrder && existingOrder.status !== "PENDING") {
      logger.debug(
        { bookId: id, orderId: existingOrder.id, status: existingOrder.status },
        "Redirecting: book already has a non-pending order"
      );
      redirect(`/my-books`);
    }

    // Only allow ordering books in CUSTOMIZING status
    if (book.status !== BookStatus.CUSTOMIZING) {
      logger.info(
        { bookId: id, status: book.status },
        "Redirecting: book is not in CUSTOMIZING status"
      );
      redirect(`/library/preview/${book.id}`);
    }

    // Validate PayPal configuration
    const payPalClientId = PAYPAL_CLIENT_ID;
    if (!payPalClientId) {
      logger.error("PayPal client ID missing in environment configuration");
      throw new Error(
        "Cannot handle payments at this moment, please try again later"
      );
    }

    // Generate structured data for the order
    const orderStructuredData = generateStructuredData("Product", {
      name: book.title,
      description: book.template?.description || "Personalized children's book",
      image: book.coverImage || "",
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        price: "29.99", // Ideally fetch from pricing configuration
        priceCurrency: "USD",
      },
    });

    return (
      <div role="main" aria-labelledby="order-page-title">
        {/* Inject structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(orderStructuredData),
          }}
        />

        {/* Page Header */}
        <PageHeader
          title="Complete Your Order"
          description="Order your personalized children's book and bring the story to life"
          actions={[
            {
              label: "Back to My Books",
              href: "/my-books",
              variant: "outline",
              size: "sm",
              icon: <FiArrowLeft />,
              ariaLabel: "Return to my books collection",
            },
          ]}
          id="order-page-title"
        />

        {/* Order Content with Suspense boundary */}
        <section aria-labelledby="order-form-title">
          <h2 id="order-form-title" className="sr-only">
            Order Form for {book.title}
          </h2>
          <Suspense
            fallback={
              <BookStoreLoading
                message="Preparing Your Order"
                subMessage="We're getting everything ready for you to order your custom book"
                variant="bookFlip"
                size="md"
                icon="bookOpen"
                className="min-h-[60vh]"
              />
            }
          >
            <OrderContent
              book={book}
              isGuest={!user}
              payPalClientId={payPalClientId}
            />
          </Suspense>
        </section>
      </div>
    );
  } catch (error) {
    // Don't log NEXT_REDIRECT errors - they're expected behavior for navigation
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      throw error; // Re-throw to let Next.js handle the redirect
    }

    // Handle unexpected errors
    logger.error({ error, params }, "Unexpected error in OrderPage");

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader
          title="Order"
          description="Unable to process your order at this time"
        />
        <div className="mt-8">
          <ErrorAlert message="We're experiencing technical difficulties processing your order. Please try again later or contact customer support." />
        </div>
      </div>
    );
  }
}
