// "use client";

// import React, { useMemo } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { BookFull } from "@/types/book";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Progress } from "@/components/ui/progress";
// import {
//   BookStatus,
//   GenerationStatus,
//   OrderStatus,
//   PageType,
//   ProductType,
// } from "@/generated/prisma";
// import { formatDistanceToNow } from "date-fns";
// import { useImageGenerationStatus } from "@/hooks/useImageGenerationStatus";
// import { Loader2 } from "lucide-react";
// import { EbookDownloadButton } from "./EbookDownloadButton";
// import { FaTruck, FaEdit, FaFileDownload, FaCalendarAlt } from "react-icons/fa";
// import { MdCancel, MdPrint, MdPaid } from "react-icons/md";
// import { RiRefund2Fill } from "react-icons/ri";

// interface BookCardProps {
//   book: BookFull;
// }

// /**
//  * BookCard component displays a book with its status, progress, and actions
//  * Optimized for accessibility, performance, and user feedback
//  */
// export function BookCard({ book }: BookCardProps) {
//   // Use the image generation status hook to get real-time status
//   const { data: imageGenerationStatus, isLoading: isLoadingGenerationStatus } =
//     useImageGenerationStatus(book.id);

//   // Calculate total images needed - memoize to prevent recalculation
//   const totalImages = useMemo(
//     () =>
//       book.pages.reduce(
//         (acc, page) => acc + (page.type === PageType.IMAGE ? 1 : 0),
//         0
//       ) + 1, // +1 for cover
//     [book.pages]
//   );

//   // Calculate completed images based on real-time data if available
//   const completedImages = useMemo(() => {
//     // If we have real-time data from the hook
//     if (imageGenerationStatus) {
//       let count = 0;

//       // Count cover if complete
//       if (
//         imageGenerationStatus.coverGeneration?.coverStatus ===
//         GenerationStatus.COMPLETE
//       ) {
//         count++;
//       }

//       // Count completed page generations
//       if (imageGenerationStatus.pageGenerations) {
//         count += imageGenerationStatus.pageGenerations.filter(
//           (gen) => gen.status === GenerationStatus.COMPLETE
//         ).length;
//       }

//       return count;
//     }

//     // Fall back to the book's image generations data if no real-time data
//     return (
//       book.imageGenerations?.filter((img) => img.status === "COMPLETE")
//         .length || 0
//     );
//   }, [imageGenerationStatus, book.imageGenerations]);

//   // Check if any generations are pending
//   const hasActiveGenerations = useMemo(() => {
//     if (imageGenerationStatus) {
//       const coverPending =
//         imageGenerationStatus.coverGeneration?.coverStatus ===
//         GenerationStatus.PENDING;

//       const anyPagePending = imageGenerationStatus.pageGenerations?.some(
//         (gen) => gen.status === GenerationStatus.PENDING
//       );

//       return coverPending || anyPagePending;
//     }

//     return (
//       book.imageGenerations?.some((gen) => gen.status === "PENDING") || false
//     );
//   }, [imageGenerationStatus, book.imageGenerations]);

//   // Calculate progress percentage
//   const imageProgress = useMemo(
//     () => (completedImages / totalImages) * 100,
//     [completedImages, totalImages]
//   );

//   const bookStatus = book.status;
//   const orderStatus = book.order?.status;
//   const productType = book.order?.productType;

//   // Get status badge styling - memoize to prevent recalculation
//   const statusBadge = useMemo(() => {
//     // Check order status first if book is ordered or later status
//     if (orderStatus) {
//       switch (orderStatus) {
//         case OrderStatus.SHIPPED:
//           return {
//             text: "SHIPPED",
//             variant: "success" as const,
//             icon: <FaTruck className="h-4 w-4" aria-hidden="true" />,
//           };
//         case OrderStatus.CANCELLED:
//           return {
//             text: "CANCELLED",
//             variant: "destructive" as const,
//             icon: <MdCancel className="h-4 w-4" aria-hidden="true" />,
//           };
//         case OrderStatus.REFUNDED:
//           return {
//             text: "REFUNDED",
//             variant: "secondary" as const,
//             icon: <RiRefund2Fill className="h-4 w-4" aria-hidden="true" />,
//           };
//         case OrderStatus.FULFILLED:
//           return {
//             text: "FULFILLED",
//             variant: "success" as const,
//             icon: null,
//           };
//         case OrderStatus.PRINTING:
//           return {
//             text: "PRINTING",
//             variant: "default" as const,
//             icon: <MdPrint className="h-4 w-4" aria-hidden="true" />,
//           };
//         case OrderStatus.PAID:
//           return {
//             text: "PAID",
//             variant: "default" as const,
//             icon: <MdPaid className="h-4 w-4" aria-hidden="true" />,
//           };
//         default:
//           break;
//       }
//     }

//     // If no specific order status to show, fall back to book status
//     switch (bookStatus) {
//       case BookStatus.CUSTOMIZING:
//         return {
//           text: "CUSTOMIZING",
//           variant: "secondary" as const,
//           icon: <FaEdit className="h-4 w-4" aria-hidden="true" />,
//         };
//       case BookStatus.ORDERED:
//         return {
//           text: "ORDERED",
//           variant: "default" as const,
//           icon: null,
//         };
//       case BookStatus.COMPLETED:
//         return {
//           text: "COMPLETED",
//           variant: "outline" as const,
//           icon: null,
//         };
//       case BookStatus.READY_FOR_PRINTING:
//         if (productType === ProductType.EBOOK) {
//           return {
//             text: "READY FOR DOWNLOAD",
//             variant: "success" as const,
//             icon: <FaFileDownload className="h-4 w-4" aria-hidden="true" />,
//           };
//         }
//         return {
//           text: "READY FOR PRINTING",
//           variant: "default" as const,
//           icon: <MdPrint className="h-4 w-4" aria-hidden="true" />,
//         };
//       default:
//         return {
//           text: bookStatus as string,
//           variant: "secondary" as const,
//           icon: null,
//         };
//     }
//   }, [bookStatus, orderStatus, productType]);

//   // Function to get status explanation based on book status - memoize to prevent recalculation
//   const statusExplanation = useMemo(() => {
//     // Check for order status specific explanations first
//     if (orderStatus) {
//       switch (orderStatus) {
//         case OrderStatus.PENDING:
//           return "Your order has been created but payment is not yet complete. Please complete the payment process.";
//         case OrderStatus.PAID:
//           if (hasActiveGenerations) {
//             return "Thank you for your order! We're generating the remaining images for your book. This may take a few minutes.";
//           } else {
//             return "Thank you for your order! You can now finish customizing your book before saving for production.";
//           }
//         case OrderStatus.PRINTING:
//           return "Your book is being printed and bound. This typically takes 3-5 business days.";
//         case OrderStatus.SHIPPED:
//           return "Your book has been shipped! Please check your email for full order details and tracking information.";
//         case OrderStatus.CANCELLED:
//           return "Your order has been cancelled.";
//         case OrderStatus.REFUNDED:
//           return "Your order has been refunded.";
//         case OrderStatus.FULFILLED:
//           return "Your order has been fulfilled. We hope you enjoy your book!";
//         case OrderStatus.ERROR:
//           return "There was an issue with your order. Please contact customer support for assistance.";
//         default:
//           break;
//       }
//     }

//     // Fall back to book status explanations if no specific order status
//     switch (bookStatus) {
//       case BookStatus.CUSTOMIZING:
//         return "Your book is ready for customization. You can edit text, select from different image options for each page, and add personal dedications.";

//       case BookStatus.ORDERED:
//         if (hasActiveGenerations) {
//           return "We're generating images for your book. This may take a few minutes.";
//         } else {
//           if (productType === ProductType.BOOK) {
//             return "Your book has been ordered! You can still make edits until it's sent for printing.";
//           } else {
//             return "Your book has been ordered! You can continue customizing until you save and download your eBook.";
//           }
//         }

//       case BookStatus.COMPLETED:
//         if (productType === ProductType.EBOOK) {
//           return "Your book is ready for download!";
//         }
//         return "Your book has completed the printing process and is on its way to you. You can still view the digital version while you wait for your physical copy to arrive.";

//       case BookStatus.READY_FOR_PRINTING:
//         if (productType === ProductType.EBOOK) {
//           return "Your book is ready for download! Click the download button to get your eBook.";
//         }
//         return "Your book is ready for printing and will be shipped soon!";

//       default:
//         return "Continue customizing your book to make it special.";
//     }
//   }, [bookStatus, orderStatus, productType, hasActiveGenerations]);

//   // Function to render shipping information section - memoize to prevent recalculation
//   const shippingInfo = useMemo(() => {
//     if (!book.order || !orderStatus) return null;

//     // Only show for physical books that are in shipping status
//     if (
//       productType === ProductType.BOOK &&
//       orderStatus === OrderStatus.SHIPPED
//     ) {
//       const shippingCarrier = book.printJob?.shippingCarrier;
//       const trackingNumber = book.order.trackingNumber;
//       const estimatedDeliveryDate = book.printJob?.estimatedDeliveryDate;
//       const trackingUrl =
//         book.printJob?.trackingUrls && book.printJob?.trackingUrls.length > 0
//           ? book.printJob.trackingUrls[0]
//           : null;

//       return (
//         <div
//           className="mt-2 text-sm border-t pt-2"
//           aria-label="Shipping details"
//         >
//           <h4 className="font-medium mb-1">Shipping Information</h4>

//           {shippingCarrier && (
//             <p className="text-xs mb-1">Carrier: {shippingCarrier}</p>
//           )}

//           {trackingNumber && (
//             <p className="flex items-center text-xs mb-1">
//               <FaTruck className="w-3 h-3 mr-1" aria-hidden="true" />
//               <span>Tracking Number: {trackingNumber}</span>
//             </p>
//           )}

//           {trackingUrl && (
//             <p className="text-xs mb-1">
//               <a
//                 href={trackingUrl}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-600 hover:underline truncate block"
//                 aria-label={`Track package for ${book.title}`}
//               >
//                 Track Package Online
//               </a>
//             </p>
//           )}

//           {estimatedDeliveryDate && (
//             <p className="flex items-center text-xs">
//               <FaCalendarAlt className="w-3 h-3 mr-1" aria-hidden="true" />
//               <span>
//                 Estimated Delivery:{" "}
//                 {new Date(estimatedDeliveryDate).toLocaleDateString()}
//               </span>
//             </p>
//           )}

//           {book.order.shippingLevel && (
//             <p className="text-xs mt-1">
//               Shipping Method: {book.order.shippingLevel.replace("_", " ")}
//             </p>
//           )}
//         </div>
//       );
//     }

//     return null;
//   }, [book.order, book.printJob, book.title, orderStatus, productType]);

//   // Function to render action buttons based on status
//   const actionButtons = useMemo(() => {
//     // For customizing books
//     if (bookStatus === BookStatus.CUSTOMIZING) {
//       return (
//         <>
//           <Button asChild size="sm" className="flex-1">
//             <Link
//               href={`/library/preview/${book.id}`}
//               aria-label={`Continue editing ${book.title}`}
//             >
//               Continue Editing
//             </Link>
//           </Button>
//           <Button
//             variant="secondary"
//             size="sm"
//             className="bg-green-600 hover:bg-green-700 text-white flex-1"
//             asChild
//           >
//             <Link
//               href={`/my-books/order/${book.id}`}
//               aria-label={`Order ${book.title}`}
//             >
//               Order
//             </Link>
//           </Button>
//         </>
//       );
//     }

//     // For ordered books with pending image generation
//     if (bookStatus === BookStatus.ORDERED) {
//       return (
//         <Button
//           disabled={hasActiveGenerations || imageProgress < 100}
//           asChild={!hasActiveGenerations && imageProgress === 100}
//           size="sm"
//           className="flex-1"
//           aria-label={
//             hasActiveGenerations
//               ? `Generating images for ${book.title}`
//               : `Continue editing ${book.title}`
//           }
//         >
//           {hasActiveGenerations ? (
//             <>
//               <Loader2
//                 className="w-3 h-3 mr-1 animate-spin"
//                 aria-hidden="true"
//               />
//               <span>Generating...</span>
//             </>
//           ) : imageProgress === 100 ? (
//             <Link href={`/library/preview/${book.id}`}>Continue Editing</Link>
//           ) : (
//             <span>Images Incomplete</span>
//           )}
//         </Button>
//       );
//     }

//     // For completed books or shipping/fulfilled orders
//     if (
//       bookStatus === BookStatus.COMPLETED ||
//       bookStatus === BookStatus.READY_FOR_PRINTING ||
//       (orderStatus &&
//         (orderStatus === OrderStatus.SHIPPED ||
//           orderStatus === OrderStatus.FULFILLED))
//     ) {
//       return (
//         <>
//           <Button asChild size="sm" className="flex-1">
//             <Link
//               href={`/library/preview/${book.id}`}
//               aria-label={`View final version of ${book.title}`}
//             >
//               View Final Book
//             </Link>
//           </Button>
//           <EbookDownloadButton bookId={book.id} />
//         </>
//       );
//     }

//     // Default fallback
//     return (
//       <Button asChild size="sm" className="flex-1">
//         <Link
//           href={`/library/preview/${book.id}`}
//           aria-label={`View ${book.title}`}
//         >
//           View Book
//         </Link>
//       </Button>
//     );
//   }, [
//     bookStatus,
//     orderStatus,
//     hasActiveGenerations,
//     imageProgress,
//     book.id,
//     book.title,
//   ]);

//   // Format the created date - memoize to prevent recalculation on rerenders
//   const formattedDate = useMemo(
//     () => formatDistanceToNow(new Date(book.createdAt), { addSuffix: true }),
//     [book.createdAt]
//   );

//   return (
//     <Card
//       className="overflow-hidden flex flex-col h-full"
//       tabIndex={0}
//       aria-label={`${book.title} - ${statusBadge.text}`}
//     >
//       <CardHeader className="pb-3">
//         <div className="flex items-start gap-4">
//           {/* Book Cover Thumbnail */}
//           <div className="relative w-24 h-32 flex-shrink-0">
//             {book.coverImage ? (
//               <Image
//                 src={book.coverImage}
//                 alt={`Cover of ${book.title}`}
//                 fill
//                 sizes="96px"
//                 className="object-cover rounded"
//                 priority={false}
//                 loading="lazy"
//               />
//             ) : (
//               <div
//                 className="w-full h-full bg-gray-200 rounded flex items-center justify-center"
//                 aria-label="No cover image available"
//               >
//                 <span className="text-sm text-gray-400">No cover</span>
//               </div>
//             )}
//           </div>

//           {/* Book Details */}
//           <div className="flex-1 min-w-0">
//             <CardTitle className="line-clamp-2">{book.title}</CardTitle>
//             <p className="text-sm text-muted-foreground mt-1">
//               Created {formattedDate}
//             </p>
//             <div className="flex gap-2 mt-2 flex-wrap">
//               <Badge variant={statusBadge.variant}>
//                 {statusBadge.icon && (
//                   <span className="mr-1">{statusBadge.icon}</span>
//                 )}
//                 <span>{statusBadge.text}</span>
//               </Badge>

//               {hasActiveGenerations && (
//                 <Badge variant="outline" className="bg-amber-50">
//                   <Loader2
//                     className="w-3 h-3 mr-1 animate-spin"
//                     aria-hidden="true"
//                   />
//                   <span>Generating Images</span>
//                 </Badge>
//               )}
//             </div>
//           </div>
//         </div>
//       </CardHeader>

//       <CardContent className="pb-3 flex-grow flex flex-col">
//         {/* Status explanation text */}
//         <p className="text-sm text-muted-foreground mb-3 min-h-[40px]">
//           {statusExplanation}
//         </p>

//         {/* Shipping information when applicable */}
//         {shippingInfo}

//         {/* Image Generation Progress - shown for relevant statuses */}
//         {(bookStatus === BookStatus.CUSTOMIZING ||
//           bookStatus === BookStatus.ORDERED ||
//           hasActiveGenerations) && (
//           <div
//             className="space-y-1 mt-auto"
//             aria-label="Image generation progress"
//           >
//             <div className="flex justify-between text-xs text-muted-foreground">
//               <span>Image Generation</span>
//               <span>
//                 {isLoadingGenerationStatus ? (
//                   <span className="italic">Loading...</span>
//                 ) : (
//                   `${completedImages}/${totalImages} completed`
//                 )}
//               </span>
//             </div>
//             <Progress
//               value={bookStatus === BookStatus.COMPLETED ? 100 : imageProgress}
//               className={`h-2 ${hasActiveGenerations ? "animate-pulse" : ""}`}
//               aria-label={`Image generation progress: ${Math.round(
//                 imageProgress
//               )}%`}
//               aria-valuenow={Math.round(imageProgress)}
//               aria-valuemin={0}
//               aria-valuemax={100}
//             />
//           </div>
//         )}
//       </CardContent>

//       <CardFooter className="flex flex-wrap gap-2 pt-2 mt-auto">
//         {actionButtons}
//       </CardFooter>
//     </Card>
//   );
// }
"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { BookFull } from "@/types/book";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BookStatus,
  GenerationStatus,
  OrderStatus,
  PageType,
  ProductType,
} from "@/generated/prisma";
import { formatDistanceToNow } from "date-fns";
import { useImageGenerationStatus } from "@/hooks/useImageGenerationStatus";
import { Loader2 } from "lucide-react";
import { EbookDownloadButton } from "./EbookDownloadButton";
import { FaTruck, FaEdit, FaFileDownload, FaBook } from "react-icons/fa";
import { MdCancel, MdPrint, MdPaid } from "react-icons/md";
import { RiRefund2Fill } from "react-icons/ri";

interface BookCardProps {
  book: BookFull;
}

/**
 * BookCard component displays a book with its status, progress, and actions
 * Redesigned for a modern, user-friendly interface while maintaining functionality
 */
export function BookCard({ book }: BookCardProps) {
  // Use the image generation status hook to get real-time status
  const { data: imageGenerationStatus, isLoading: isLoadingGenerationStatus } =
    useImageGenerationStatus(book.id);

  // Calculate total images needed
  const totalImages = useMemo(
    () =>
      book.pages.reduce(
        (acc, page) => acc + (page.type === PageType.IMAGE ? 1 : 0),
        0
      ) + 1, // +1 for cover
    [book.pages]
  );

  // Calculate completed images based on real-time data if available
  const completedImages = useMemo(() => {
    // If we have real-time data from the hook
    if (imageGenerationStatus) {
      let count = 0;

      // Count cover if complete
      if (
        imageGenerationStatus.coverGeneration?.coverStatus ===
        GenerationStatus.COMPLETE
      ) {
        count++;
      }

      // Count completed page generations
      if (imageGenerationStatus.pageGenerations) {
        count += imageGenerationStatus.pageGenerations.filter(
          (gen) => gen.status === GenerationStatus.COMPLETE
        ).length;
      }

      return count;
    }

    // Fall back to the book's image generations data if no real-time data
    return (
      book.imageGenerations?.filter((img) => img.status === "COMPLETE")
        .length || 0
    );
  }, [imageGenerationStatus, book.imageGenerations]);

  // Check if any generations are pending
  const hasActiveGenerations = useMemo(() => {
    if (imageGenerationStatus) {
      const coverPending =
        imageGenerationStatus.coverGeneration?.coverStatus ===
        GenerationStatus.PENDING;

      const anyPagePending = imageGenerationStatus.pageGenerations?.some(
        (gen) => gen.status === GenerationStatus.PENDING
      );

      return coverPending || anyPagePending;
    }

    return (
      book.imageGenerations?.some((gen) => gen.status === "PENDING") || false
    );
  }, [imageGenerationStatus, book.imageGenerations]);

  // Calculate progress percentage
  const imageProgress = useMemo(
    () => (completedImages / totalImages) * 100,
    [completedImages, totalImages]
  );

  const bookStatus = book.status;
  const orderStatus = book.order?.status;
  const productType = book.order?.productType;

  // Get status badge styling - memoize to prevent recalculation
  const statusBadge = useMemo(() => {
    // Check order status first if book is ordered or later status
    if (orderStatus) {
      switch (orderStatus) {
        case OrderStatus.SHIPPED:
          return {
            text: "SHIPPED",
            variant: "success" as const,
            icon: <FaTruck className="h-4 w-4" aria-hidden="true" />,
            bgColor: "bg-green-50",
            textColor: "text-green-700",
          };
        case OrderStatus.CANCELLED:
          return {
            text: "CANCELLED",
            variant: "destructive" as const,
            icon: <MdCancel className="h-4 w-4" aria-hidden="true" />,
            bgColor: "bg-red-50",
            textColor: "text-red-700",
          };
        case OrderStatus.REFUNDED:
          return {
            text: "REFUNDED",
            variant: "secondary" as const,
            icon: <RiRefund2Fill className="h-4 w-4" aria-hidden="true" />,
            bgColor: "bg-amber-50",
            textColor: "text-amber-700",
          };
        case OrderStatus.FULFILLED:
          return {
            text: "FULFILLED",
            variant: "success" as const,
            icon: null,
            bgColor: "bg-green-50",
            textColor: "text-green-700",
          };
        case OrderStatus.PRINTING:
          return {
            text: "PRINTING",
            variant: "default" as const,
            icon: <MdPrint className="h-4 w-4" aria-hidden="true" />,
            bgColor: "bg-blue-50",
            textColor: "text-blue-700",
          };
        case OrderStatus.PAID:
          if (bookStatus === BookStatus.READY_FOR_PRINTING) {
            return {
              text: "READY FOR PRINTING",
              variant: "default" as const,
              icon: <MdPrint className="h-4 w-4" aria-hidden="true" />,
              bgColor: "bg-indigo-50",
              textColor: "text-indigo-500",
            };
          }
          return {
            text: "PAID",
            variant: "default" as const,
            icon: <MdPaid className="h-4 w-4" aria-hidden="true" />,
            bgColor: "bg-emerald-50",
            textColor: "text-emerald-700",
          };
        default:
          break;
      }
    }

    // If no specific order status to show, fall back to book status
    switch (bookStatus) {
      case BookStatus.CUSTOMIZING:
        return {
          text: "CUSTOMIZING",
          variant: "secondary" as const,
          icon: <FaEdit className="h-4 w-4" aria-hidden="true" />,
          bgColor: "bg-purple-50",
          textColor: "text-purple-700",
        };
      case BookStatus.ORDERED:
        return {
          text: "ORDERED",
          variant: "default" as const,
          icon: null,
          bgColor: "bg-blue-50",
          textColor: "text-blue-700",
        };
      case BookStatus.COMPLETED:
        return {
          text: "COMPLETED",
          variant: "outline" as const,
          icon: null,
          bgColor: "bg-green-50",
          textColor: "text-green-700",
        };
      case BookStatus.READY_FOR_PRINTING:
        if (productType === ProductType.EBOOK) {
          return {
            text: "READY FOR DOWNLOAD",
            variant: "success" as const,
            icon: <FaFileDownload className="h-4 w-4" aria-hidden="true" />,
            bgColor: "bg-emerald-50",
            textColor: "text-emerald-700",
          };
        }
        return {
          text: "READY FOR PRINTING",
          variant: "default" as const,
          icon: <MdPrint className="h-4 w-4" aria-hidden="true" />,
          bgColor: "bg-blue-50",
          textColor: "text-blue-700",
        };
      default:
        return {
          text: bookStatus as string,
          variant: "secondary" as const,
          icon: null,
          bgColor: "bg-gray-50",
          textColor: "text-gray-700",
        };
    }
  }, [bookStatus, orderStatus, productType]);

  // Function to get status explanation based on book status - memoize to prevent recalculation
  const statusExplanation = useMemo(() => {
    // Check for order status specific explanations first
    if (orderStatus) {
      switch (orderStatus) {
        case OrderStatus.PENDING:
          return "Your order has been created but payment is not yet complete. Please complete the payment process.";
        case OrderStatus.PAID:
          if (hasActiveGenerations) {
            return "Thank you for your order! We're generating the remaining images for your book. This may take a few minutes.";
          } else {
            if (bookStatus === BookStatus.READY_FOR_PRINTING) {
              if (productType === ProductType.EBOOK) {
                return "Thank you for your order! You can now download your eBook.";
              } else {
                return "Your book is being printed and bound. This typically takes 3-5 business days.";
              }
            }

            return "Thank you for your order! You can now finish customizing your book before saving for production.";
          }
        case OrderStatus.PRINTING:
          return "Your book is being printed and bound. This typically takes 3-5 business days.";
        case OrderStatus.SHIPPED:
          return "Your book has been shipped! Please check your email for full order details and tracking information.";
        case OrderStatus.CANCELLED:
          return "Your order has been cancelled.";
        case OrderStatus.REFUNDED:
          return "Your order has been refunded.";
        case OrderStatus.FULFILLED:
          return "Your order has been fulfilled. We hope you enjoy your book!";
        case OrderStatus.ERROR:
          return "There was an issue with your order. Please contact customer support for assistance.";
        default:
          break;
      }
    }

    // Fall back to book status explanations if no specific order status
    switch (bookStatus) {
      case BookStatus.CUSTOMIZING:
        return "Your book is ready for customization. You can edit text, select from different image options for each page, and add personal dedications.";

      case BookStatus.ORDERED:
        if (hasActiveGenerations) {
          return "We're generating images for your book. This may take a few minutes.";
        } else {
          if (productType === ProductType.BOOK) {
            return "Your book has been ordered! You can still make edits until it's sent for printing.";
          } else {
            return "Your book has been ordered! You can continue customizing until you save and download your eBook.";
          }
        }

      case BookStatus.COMPLETED:
        if (productType === ProductType.EBOOK) {
          return "Your book is ready for download!";
        }
        return "Your book has completed the printing process and is on its way to you. You can still view the digital version while you wait for your physical copy to arrive.";

      case BookStatus.READY_FOR_PRINTING:
        if (productType === ProductType.EBOOK) {
          return "Your book is ready for download! Click the download button to get your eBook.";
        }
        return "Your book is ready for printing and will be shipped soon!";

      default:
        return "Continue customizing your book to make it special.";
    }
  }, [bookStatus, orderStatus, productType, hasActiveGenerations]);

  // Function to render shipping information section - memoize to prevent recalculation
  const shippingInfo = useMemo(() => {
    if (!book.order || !orderStatus) return null;

    // Only show for physical books that are in shipping status
    if (
      productType === ProductType.BOOK &&
      orderStatus === OrderStatus.SHIPPED
    ) {
      const shippingCarrier = book.printJob?.shippingCarrier;
      const trackingNumber = book.order.trackingNumber;
      const estimatedDeliveryDate = book.printJob?.estimatedDeliveryDate;
      const trackingUrl =
        book.printJob?.trackingUrls && book.printJob?.trackingUrls.length > 0
          ? book.printJob.trackingUrls[0]
          : null;

      return (
        <div
          className="mt-4 rounded-lg bg-blue-50 p-3 border border-blue-100"
          aria-label="Shipping details"
        >
          <h4 className="font-medium text-blue-700 mb-2 flex items-center">
            <FaTruck className="w-4 h-4 mr-2" aria-hidden="true" />
            Shipping Information
          </h4>

          <div className="space-y-1.5 text-xs text-blue-800">
            {shippingCarrier && (
              <p className="flex items-center">
                <span className="font-medium mr-1">Carrier:</span>{" "}
                {shippingCarrier}
              </p>
            )}

            {trackingNumber && (
              <p className="flex items-center">
                <span className="font-medium mr-1">Tracking:</span>{" "}
                {trackingNumber}
              </p>
            )}

            {trackingUrl && (
              <p className="mt-2">
                <a
                  href={trackingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-3 py-1 bg-white rounded-md text-blue-600 hover:bg-blue-50 border border-blue-200 transition-colors hover:underline focus:ring-2 focus:ring-blue-200 focus:outline-none"
                  aria-label={`Track package for ${book.title}`}
                >
                  Track Package Online
                </a>
              </p>
            )}

            {estimatedDeliveryDate && (
              <p className="flex items-center">
                <span className="font-medium mr-1">Estimated Delivery:</span>
                {new Date(estimatedDeliveryDate).toLocaleDateString()}
              </p>
            )}

            {book.order.shippingLevel && (
              <p className="flex items-center">
                <span className="font-medium mr-1">Shipping Method:</span>
                {book.order.shippingLevel.replace("_", " ")}
              </p>
            )}
          </div>
        </div>
      );
    }

    return null;
  }, [book.order, book.printJob, book.title, orderStatus, productType]);

  // Function to render action buttons based on status
  const actionButtons = useMemo(() => {
    // For customizing books
    if (bookStatus === BookStatus.CUSTOMIZING) {
      return (
        <>
          <Button
            asChild
            size="sm"
            className="flex-1 rounded-full shadow-sm"
            variant="outline"
          >
            <Link
              href={`/library/preview/${book.id}`}
              aria-label={`Continue editing ${book.title}`}
              className="flex items-center justify-center"
            >
              <FaEdit className="mr-2 h-4 w-4" aria-hidden="true" />
              Edit Book
            </Link>
          </Button>
          <Button
            size="sm"
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-full shadow-sm"
            asChild
          >
            <Link
              href={`/my-books/order/${book.id}`}
              aria-label={`Order ${book.title}`}
              className="flex items-center justify-center"
            >
              <MdPaid className="mr-2 h-4 w-4" aria-hidden="true" />
              Order
            </Link>
          </Button>
        </>
      );
    }

    // For ordered books with pending image generation
    if (bookStatus === BookStatus.ORDERED) {
      return (
        <Button
          disabled={hasActiveGenerations || imageProgress < 100}
          asChild={!hasActiveGenerations && imageProgress === 100}
          size="sm"
          className="flex-1 rounded-full shadow-sm"
          aria-label={
            hasActiveGenerations
              ? `Generating images for ${book.title}`
              : `Continue editing ${book.title}`
          }
        >
          {hasActiveGenerations ? (
            <>
              <Loader2
                className="w-3 h-3 mr-1 animate-spin"
                aria-hidden="true"
              />
              <span>Generating...</span>
            </>
          ) : imageProgress === 100 ? (
            <Link
              href={`/library/preview/${book.id}`}
              className="flex items-center justify-center"
            >
              <FaEdit className="mr-2 h-4 w-4" aria-hidden="true" />
              Continue Editing
            </Link>
          ) : (
            <span>Images Incomplete</span>
          )}
        </Button>
      );
    }

    // For completed books or shipping/fulfilled orders
    if (
      bookStatus === BookStatus.COMPLETED ||
      bookStatus === BookStatus.READY_FOR_PRINTING ||
      (orderStatus &&
        (orderStatus === OrderStatus.SHIPPED ||
          orderStatus === OrderStatus.FULFILLED))
    ) {
      return (
        <>
          <Button
            asChild
            size="sm"
            variant="outline"
            className="flex-1 rounded-full shadow-sm"
          >
            <Link
              href={`/library/preview/${book.id}`}
              aria-label={`View final version of ${book.title}`}
              className="flex items-center justify-center"
            >
              <FaBook className="mr-2 h-4 w-4" aria-hidden="true" />
              View Book
            </Link>
          </Button>
          <EbookDownloadButton bookId={book.id} />
        </>
      );
    }

    // Default fallback
    return (
      <Button asChild size="sm" className="flex-1 rounded-full shadow-sm">
        <Link
          href={`/library/preview/${book.id}`}
          aria-label={`View ${book.title}`}
          className="flex items-center justify-center"
        >
          <FaBook className="mr-2 h-4 w-4" aria-hidden="true" />
          View Book
        </Link>
      </Button>
    );
  }, [
    bookStatus,
    orderStatus,
    hasActiveGenerations,
    imageProgress,
    book.id,
    book.title,
  ]);

  // Format the created date - memoize to prevent recalculation on rerenders
  const formattedDate = useMemo(
    () => formatDistanceToNow(new Date(book.createdAt), { addSuffix: true }),
    [book.createdAt]
  );

  return (
    <Card
      className="overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-lg border-0 bg-white rounded-xl shadow-md"
      tabIndex={0}
      aria-label={`${book.title} - ${statusBadge.text}`}
    >
      <div
        className={`absolute top-0 left-0 right-0 h-1 ${statusBadge.bgColor}`}
      ></div>

      <CardHeader className="pb-3 pt-4">
        <div className="flex items-start gap-4">
          {/* Book Cover Thumbnail */}
          <div className="relative w-24 h-32 flex-shrink-0 rounded-lg overflow-hidden shadow-md transition-transform transform hover:scale-105">
            {book.coverImage ? (
              <Image
                src={book.coverImage}
                alt={`Cover of ${book.title}`}
                fill
                sizes="96px"
                className="object-cover"
                priority={false}
                loading="lazy"
              />
            ) : (
              <div
                className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center"
                aria-label="No cover image available"
              >
                <span className="text-sm text-gray-500">No cover</span>
              </div>
            )}
          </div>

          {/* Book Details */}
          <div className="flex-1 min-w-0">
            <CardTitle className="text-xl font-bold line-clamp-2 mb-1">
              {book.title}
            </CardTitle>

            <div className="flex items-center gap-1 mt-1">
              <p className="text-sm text-gray-500">Created {formattedDate}</p>
            </div>

            <div className="flex gap-2 mt-3 flex-wrap">
              <Badge
                className={`px-2.5 py-1 ${statusBadge.bgColor} ${statusBadge.textColor} border-0`}
              >
                {statusBadge.icon && (
                  <span className="mr-1">{statusBadge.icon}</span>
                )}
                <span>{statusBadge.text}</span>
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-4 pt-1 flex-grow flex flex-col gap-3">
        {/* Status explanation text - full text visible */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
          <p className="text-sm text-gray-700 leading-relaxed">
            {statusExplanation}
          </p>
        </div>

        {/* Shipping information when applicable */}
        {shippingInfo}

        {/* Image Generation Progress - shown for relevant statuses */}
        {(bookStatus === BookStatus.CUSTOMIZING ||
          bookStatus === BookStatus.ORDERED ||
          hasActiveGenerations) && (
          <div
            className="space-y-1 mt-auto bg-gray-50 p-3 rounded-lg"
            aria-label="Image generation progress"
          >
            <div className="flex justify-between text-xs text-gray-600 font-medium">
              <span className="flex items-center">
                <Loader2
                  className={`w-3 h-3 mr-1.5 ${
                    hasActiveGenerations ? "animate-spin" : ""
                  }`}
                  aria-hidden="true"
                />
                Image Generation
              </span>
              <span>
                {isLoadingGenerationStatus ? (
                  <span className="italic">Loading...</span>
                ) : (
                  `${completedImages}/${totalImages}`
                )}
              </span>
            </div>
            <Progress
              value={bookStatus === BookStatus.COMPLETED ? 100 : imageProgress}
              className={`h-2.5 ${hasActiveGenerations ? "animate-pulse" : ""}`}
              aria-label={`Image generation progress: ${Math.round(
                imageProgress
              )}%`}
              aria-valuenow={Math.round(imageProgress)}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-wrap gap-2 px-4 pb-4 pt-1 mt-auto">
        {actionButtons}
      </CardFooter>
    </Card>
  );
}
