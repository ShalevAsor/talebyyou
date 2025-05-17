// // src/app/(main)/my-books/page.tsx
// import { Suspense } from "react";
// import { auth } from "@clerk/nextjs/server";
// import { getUserBooks } from "@/actions/book-actions";
// import {
//   getGuestSessionBooks,
//   checkGuestBookLimit,
// } from "@/actions/guest-actions";
// import { ErrorAlert, Loading } from "@/components/common";
// import { MyBooksContent } from "@/components/my-books/MyBooksContent";
// import PageHeader from "@/components/layout/PageHeader";
// import { checkUserBookLimit } from "@/actions/user-actions";

// export default async function MyBooksPage() {
//   const { userId } = await auth();

//   // Fetch books and check limits
//   const [booksResult, limitResult] = await Promise.all([
//     userId ? getUserBooks() : getGuestSessionBooks(),
//     userId ? checkUserBookLimit() : checkGuestBookLimit(),
//   ]);

//   // Default values in case of fetch errors
//   const books = booksResult.success ? booksResult.data : [];
//   const limitInfo = limitResult.success
//     ? limitResult.data
//     : {
//         canCreate: true,
//         remainingBooks: 2,
//         totalCreated: 0,
//         message: undefined,
//       };

//   // Get any error messages
//   const bookError = !booksResult.success ? booksResult.error : null;
//   const limitError = !limitResult.success ? limitResult.error : null;

//   return (
//     <>
//       {/* Page Header */}
//       <PageHeader
//         title="My Books"
//         description="Manage your collection of customized books. View, edit, order, and keep track of the books you've created."
//       />
//       {/* Display error if any */}
//       {bookError && <ErrorAlert message={bookError} />}
//       {limitError && <ErrorAlert message={limitError} />}
//       {/* Main content with Suspense boundary */}
//       <Suspense
//         fallback={
//           <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//             <Loading message="Loading your books..." />
//           </div>
//         }
//       >
//         <MyBooksContent
//           initialBooks={books}
//           limitInfo={limitInfo}
//           isGuest={!userId}
//         />
//       </Suspense>
//     </>
//   );
// }
import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";
import { getUserBooks } from "@/actions/book-actions";
import {
  getGuestSessionBooks,
  checkGuestBookLimit,
} from "@/actions/guest-actions";
import { ErrorAlert, Loading } from "@/components/common";
import { MyBooksContent } from "@/components/my-books/MyBooksContent";
import PageHeader from "@/components/layout/PageHeader";
import { checkUserBookLimit } from "@/actions/user-actions";
import { createMetadata, siteConfig } from "@/config/site";
import { logger } from "@/lib/logger";

/**
 * Metadata generator for the My Books page
 */
export function generateMetadata() {
  return createMetadata({
    title: "My Books Collection",
    description:
      "View and manage your personalized children's book collection. Edit, order prints, or download digital copies of your custom books.",
    alternates: {
      canonical: `${siteConfig.url}/my-books`,
    },
  });
}

/**
 * My Books page component
 * Displays all books created by the current user or guest session
 */
export default async function MyBooksPage() {
  try {
    const { userId } = await auth();

    // Fetch books and check limits in parallel
    const [booksResult, limitResult] = await Promise.all([
      userId ? getUserBooks() : getGuestSessionBooks(),
      userId ? checkUserBookLimit() : checkGuestBookLimit(),
    ]);

    // Default values in case of fetch errors
    const books = booksResult.success ? booksResult.data : [];
    const limitInfo = limitResult.success
      ? limitResult.data
      : {
          canCreate: true,
          remainingBooks: 2,
          totalCreated: 0,
          message: undefined,
        };

    // Get any error messages
    const bookError = !booksResult.success ? booksResult.error : null;
    const limitError = !limitResult.success ? limitResult.error : null;

    return (
      <>
        {/* Page Header with semantic heading */}
        <PageHeader
          title="My Books"
          description="Manage your collection of customized books. View, edit, order, and keep track of the books you've created."
        />

        {/* Display error if any */}
        {bookError && <ErrorAlert message={bookError} />}
        {limitError && <ErrorAlert message={limitError} />}

        {/* Main content with Suspense boundary */}
        <Suspense
          fallback={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
              <Loading message="Loading your books..." />
            </div>
          }
        >
          <MyBooksContent
            initialBooks={books}
            limitInfo={limitInfo}
            isGuest={!userId}
          />
        </Suspense>
      </>
    );
  } catch (error) {
    // Log unexpected errors
    logger.error({ error }, "Unexpected error in MyBooksPage");

    return (
      <>
        <PageHeader
          title="My Books"
          description="Manage your collection of customized books."
        />
        <div className="my-8 p-6 bg-white rounded-lg shadow">
          <ErrorAlert message="We encountered an unexpected error loading your books. Please try again later." />
        </div>
      </>
    );
  }
}
