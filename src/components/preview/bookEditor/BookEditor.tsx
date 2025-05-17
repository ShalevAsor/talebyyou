// "use client";
// import React, {
//   useEffect,
//   useRef,
//   useState,
//   useCallback,
//   useMemo,
// } from "react";
// import HTMLFlipBook from "react-pageflip";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import BookPageCover from "@/components/preview/bookEditor/BookPageCover";
// import BookPage from "@/components/preview/bookEditor/BookPage";
// import PageThumbnails from "./PageThumbnails";
// import useBookPreviewStore from "@/store/useBookPreviewStore";
// import TextEditor from "../editors/TextEditor";
// import ImageEditor from "../editors/ImageEditor";
// import { memo } from "react";
// import { Button } from "@/components/ui/button";

// // Define PageFlip interface for proper typing
// interface PageFlip {
//   pageFlip: () => {
//     flipNext: () => void;
//     flipPrev: () => void;
//     flip: (page: number) => void;
//     turnToPrevPage: () => void;
//     turnToNextPage: () => void;
//     turnToPage: (page: number) => void;
//     getCurrentPageIndex: () => number;
//     getPageCount: () => number;
//     getOrientation: () => string;
//     getState: () => string;
//   };
// }

// /**
//  * Component that renders a book with page-flipping functionality
//  */
// const BookEditor: React.FC = () => {
//   // book preview state and actions
//   const {
//     book: bookPreview,
//     setCurrentPage,
//     currentPageIndex,
//     currentlyEditing,
//     setCurrentlyEditing,
//     updatePageText,
//     updateSelectedPageImage,
//     updateSelectedCoverImage,
//     updateBookTitle,
//     updateCoverDedication,
//     updatePageDedication,
//   } = useBookPreviewStore();

//   // Client-side rendering state to prevent hydration issues
//   const [isClient, setIsClient] = useState(false);

//   // Reference to the flip book component
//   const bookRef = useRef<PageFlip>(null);

//   // Set client-side rendering flag
//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   /* Memoized Handlers */
//   // Handle saving cover title text
//   const handleSaveCoverTitle = useCallback(
//     (text: string) => {
//       updateBookTitle(text);
//       setCurrentlyEditing(null, null);
//     },
//     [updateBookTitle, setCurrentlyEditing]
//   );

//   // Handle saving cover dedication text
//   const handleSaveCoverDedication = useCallback(
//     (text: string) => {
//       updateCoverDedication(text);
//       setCurrentlyEditing(null, null);
//     },
//     [updateCoverDedication, setCurrentlyEditing]
//   );

//   // Handle saving page dedication text
//   const handleSavePageDedication = useCallback(
//     (text: string) => {
//       if (currentlyEditing?.id) {
//         updatePageDedication(text);
//         updatePageText(currentlyEditing.id, text);
//       }
//       setCurrentlyEditing(null, null);
//     },
//     [
//       currentlyEditing,
//       updatePageDedication,
//       updatePageText,
//       setCurrentlyEditing,
//     ]
//   );

//   // Handle saving cover image
//   const handleSaveCoverImage = useCallback(
//     (imageUrl: string) => {
//       updateSelectedCoverImage(imageUrl);
//       setCurrentlyEditing(null, null);
//     },
//     [updateSelectedCoverImage, setCurrentlyEditing]
//   );

//   // Handle saving page text
//   const handleSavePageText = useCallback(
//     (text: string) => {
//       if (currentlyEditing?.id) {
//         updatePageText(currentlyEditing.id, text);
//         setCurrentlyEditing(null, null);
//       }
//     },
//     [currentlyEditing, updatePageText, setCurrentlyEditing]
//   );

//   // Handle saving page image
//   const handleSavePageImage = useCallback(
//     (imageUrl: string) => {
//       if (currentlyEditing?.id) {
//         updateSelectedPageImage(currentlyEditing.id, imageUrl);
//         setCurrentlyEditing(null, null);
//       }
//     },
//     [currentlyEditing, updateSelectedPageImage, setCurrentlyEditing]
//   );

//   // Handle canceling edits
//   const handleCancelEdit = useCallback(() => {
//     setCurrentlyEditing(null, null);
//   }, [setCurrentlyEditing]);

//   // Handle page changes - wrapped in useCallback
//   const handlePageChange = useCallback(
//     (e: { data: number }) => {
//       const newPage = e.data;
//       setCurrentPage(newPage);
//     },
//     [setCurrentPage]
//   );

//   // Navigation functions - wrapped in useCallback
//   const nextPage = useCallback(() => {
//     if (bookRef.current) {
//       try {
//         bookRef.current.pageFlip().flipNext();
//       } catch (error) {
//         console.error("Error flipping to next page:", error);
//       }
//     }
//   }, []);

//   const prevPage = useCallback(() => {
//     if (bookRef.current) {
//       try {
//         bookRef.current.pageFlip().flipPrev();
//       } catch (error) {
//         console.error("Error flipping to previous page:", error);
//       }
//     }
//   }, []);

//   const goToPage = useCallback((pageNumber: number) => {
//     if (bookRef.current) {
//       try {
//         bookRef.current.pageFlip().flip(pageNumber);
//       } catch (error) {
//         console.error("Error flipping to page:", error);
//       }
//     }
//   }, []);

//   // Memoize sorted pages to prevent unnecessary re-sorting on each render
//   const sortedPages = useMemo(() => {
//     if (!bookPreview?.pages) return [];
//     return [...bookPreview.pages].sort((a, b) => a.pageNumber - b.pageNumber);
//   }, [bookPreview?.pages]);

//   // Memoize total pages calculation
//   const totalPages = useMemo(() => {
//     return bookPreview?.pages.length ? bookPreview.pages.length + 2 : 2;
//   }, [bookPreview?.pages.length]);

//   // Determine if the user is editing a component - memoized calculations
//   const editingStates = useMemo(() => {
//     if (!currentlyEditing) {
//       return {
//         isEditingCoverTitle: false,
//         isEditingCoverImage: false,
//         isEditingCoverDedication: false,
//         isEditingPageText: false,
//         isEditingPageImage: false,
//         isEditingPageDedication: false,
//         editingPage: null,
//       };
//     }

//     const editingPage = bookPreview?.pages.find(
//       (page) => page.id === currentlyEditing?.id
//     );

//     const isEditingPage = () => {
//       const pageId = currentlyEditing?.id;
//       if (!pageId || !bookPreview) return false;
//       return bookPreview.pages.map((page) => page.id).includes(pageId);
//     };

//     return {
//       // Cover page editing
//       isEditingCoverTitle:
//         currentlyEditing?.type === "text" &&
//         currentlyEditing?.id === "cover-title",
//       isEditingCoverImage:
//         currentlyEditing?.type === "image" &&
//         currentlyEditing?.id === "cover-image",
//       isEditingCoverDedication:
//         currentlyEditing?.type === "dedication" &&
//         currentlyEditing?.id === "cover-dedication",
//       // Page editing
//       isEditingPageText: currentlyEditing?.type === "text" && isEditingPage(),
//       isEditingPageImage: currentlyEditing?.type === "image" && isEditingPage(),
//       isEditingPageDedication:
//         currentlyEditing?.type === "dedication" && isEditingPage(),
//       editingPage,
//     };
//   }, [currentlyEditing, bookPreview]);

//   // Render loading state until client-side rendering is available
//   if (!isClient) {
//     return (
//       <div
//         className="flex justify-center items-center h-[600px] bg-gray-50 rounded-lg border"
//         aria-live="polite"
//         aria-busy="true"
//       >
//         <p className="text-gray-400">Loading book preview...</p>
//       </div>
//     );
//   }

//   // If book isn't loaded yet, show a placeholder
//   if (!bookPreview) {
//     return (
//       <div
//         className="flex justify-center items-center h-[600px] bg-gray-50 rounded-lg border"
//         aria-live="polite"
//       >
//         <p className="text-gray-400">Book data not available</p>
//       </div>
//     );
//   }

//   const {
//     isEditingCoverTitle,
//     isEditingCoverImage,
//     isEditingCoverDedication,
//     isEditingPageText,
//     isEditingPageImage,
//     isEditingPageDedication,
//     editingPage,
//   } = editingStates;

//   return (
//     <div className="flex flex-col" role="region" aria-label="Book editor">
//       {/* Book navigation and page indicator */}
//       <div className="flex justify-between items-center mb-4">
//         <div className="text-sm text-gray-600" aria-live="polite">
//           Page {currentPageIndex + 1} of {totalPages}
//         </div>
//         <div className="flex space-x-2">
//           <Button
//             variant="outline"
//             size="icon"
//             disabled={currentPageIndex === 0}
//             onClick={prevPage}
//             aria-label="Previous page"
//           >
//             <ChevronLeft className="h-4 w-4" />
//           </Button>
//           <Button
//             variant="outline"
//             size="icon"
//             disabled={currentPageIndex >= totalPages - 1}
//             onClick={nextPage}
//             aria-label="Next page"
//           >
//             <ChevronRight className="h-4 w-4" />
//           </Button>
//         </div>
//       </div>

//       {/* Editing modal sections - conditionally rendered */}
//       {/* First page dedication - DEDICATION PAGE */}
//       {isEditingPageDedication && editingPage && (
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-96 max-w-full">
//           <TextEditor
//             initialText={editingPage.textContent || ""}
//             onSave={handleSavePageDedication}
//             onCancel={handleCancelEdit}
//             placeholder="Enter your dedication..."
//             maxLength={300}
//             textType="dedication"
//             minHeight="150px"
//           />
//         </div>
//       )}

//       {/* Text editor for cover title - COVER PAGE */}
//       {isEditingCoverTitle && (
//         <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-96 max-w-full">
//           <TextEditor
//             initialText={bookPreview.title}
//             onSave={handleSaveCoverTitle}
//             onCancel={handleCancelEdit}
//             placeholder="Enter book title..."
//             maxLength={50}
//             textType="title"
//           />
//         </div>
//       )}

//       {/* Text editor for cover dedication - COVER PAGE */}
//       {isEditingCoverDedication && (
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-96 max-w-full">
//           <TextEditor
//             initialText={bookPreview.coverDedication || ""}
//             onSave={handleSaveCoverDedication}
//             onCancel={handleCancelEdit}
//             placeholder="Enter a dedication message..."
//             maxLength={150}
//             textType="dedication"
//           />
//         </div>
//       )}

//       {/* Cover image editor - COVER PAGE */}
//       {isEditingCoverImage && (
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
//           <ImageEditor
//             currentImageUrl={bookPreview.coverImage || ""}
//             imageOptions={
//               bookPreview.coverImageOptions?.map((url, index) => ({
//                 imageUrl: url,
//                 index: index,
//               })) || []
//             }
//             onSave={handleSaveCoverImage}
//             onCancel={handleCancelEdit}
//             title="Select Cover Image"
//           />
//         </div>
//       )}

//       {/* Text editor - PAGE */}
//       {isEditingPageText && editingPage && (
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-96 max-w-full">
//           <TextEditor
//             initialText={editingPage.textContent || ""}
//             onSave={handleSavePageText}
//             onCancel={handleCancelEdit}
//             placeholder="Enter page text..."
//             maxLength={500}
//             textType="content"
//             minHeight="150px"
//           />
//         </div>
//       )}

//       {/* Image editor - PAGE */}
//       {isEditingPageImage && editingPage && (
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
//           <ImageEditor
//             currentImageUrl={editingPage.imageUrl || ""}
//             imageOptions={
//               editingPage.imageOptions?.map((url, index) => ({
//                 imageUrl: url,
//                 index: index,
//               })) || []
//             }
//             onSave={handleSavePageImage}
//             onCancel={handleCancelEdit}
//             title={`Select Image for Page ${editingPage.pageNumber}`}
//           />
//         </div>
//       )}

//       {/* Flip book container */}
//       <div className="flex justify-center">
//         <HTMLFlipBook
//           width={450}
//           height={600}
//           size="stretch"
//           minWidth={315}
//           minHeight={200}
//           maxWidth={500}
//           maxHeight={350}
//           maxShadowOpacity={0.3}
//           showCover={true}
//           mobileScrollSupport={true}
//           onFlip={handlePageChange}
//           className="mx-auto book-container"
//           ref={bookRef}
//           usePortrait={true}
//           startPage={currentPageIndex}
//           drawShadow={true}
//           flippingTime={800}
//           useMouseEvents={false}
//           autoSize={true}
//           clickEventForward={false}
//           style={{}} // Empty style object or your custom styles
//           startZIndex={0} // Starting z-index for the pages
//           swipeDistance={10} // How many pixels needed for a swipe to trigger page turn
//           showPageCorners={true} // Whether to show page corners or not
//           disableFlipByClick={true} // Setting to false enables clicking to flip pages
//         >
//           {/* Front cover - Memoized */}
//           <MemoizedBookPageCover
//             coverImage={bookPreview.coverImage}
//             coverDedication={bookPreview.coverDedication}
//           >
//             {bookPreview.title}
//           </MemoizedBookPageCover>

//           {/* Book pages - now rendered according to their type */}
//           {sortedPages.map((page) => (
//             <MemoizedBookPage
//               key={page.id}
//               pageId={page.id}
//               pageNumber={page.pageNumber}
//               type={page.type}
//               textContent={page.textContent}
//               imageUrl={page.imageUrl}
//             />
//           ))}

//           {/* Back cover */}
//           <MemoizedBookPageCover isLastPage={true}>
//             The End
//           </MemoizedBookPageCover>
//         </HTMLFlipBook>
//       </div>

//       {/* Page thumbnails - Optimized with memoization */}
//       <MemoizedPageThumbnails
//         pages={sortedPages}
//         currentPageIndex={currentPageIndex}
//         goToPage={goToPage}
//       />
//     </div>
//   );
// };

// // Memoize child components to prevent unnecessary re-renders
// const MemoizedBookPageCover = memo(BookPageCover);
// const MemoizedBookPage = memo(BookPage);
// const MemoizedPageThumbnails = memo(PageThumbnails);

// export default memo(BookEditor);
"use client";
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import HTMLFlipBook from "react-pageflip";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BookPageCover from "@/components/preview/bookEditor/BookPageCover";
import BookPage from "@/components/preview/bookEditor/BookPage";
import PageThumbnails from "./PageThumbnails";
import useBookPreviewStore from "@/store/useBookPreviewStore";
import TextEditor from "../editors/TextEditor";
import ImageEditor from "../editors/ImageEditor";
import { memo } from "react";
import { Button } from "@/components/ui/button";
import { debounce } from "lodash";

// Define PageFlip interface for proper typing
interface PageFlip {
  pageFlip: () => {
    flipNext: () => void;
    flipPrev: () => void;
    flip: (page: number) => void;
    turnToPrevPage: () => void;
    turnToNextPage: () => void;
    turnToPage: (page: number) => void;
    getCurrentPageIndex: () => number;
    getPageCount: () => number;
    getOrientation: () => string;
    getState: () => string;
  };
}

/**
 * Component that renders a book with page-flipping functionality
 */
const BookEditor: React.FC = () => {
  // book preview state and actions
  const {
    book: bookPreview,
    setCurrentPage,
    currentPageIndex,
    currentlyEditing,
    setCurrentlyEditing,
    updatePageText,
    updateSelectedPageImage,
    updateSelectedCoverImage,
    updateBookTitle,
    updateCoverDedication,
    updatePageDedication,
  } = useBookPreviewStore();

  // Client-side rendering state to prevent hydration issues
  const [isClient, setIsClient] = useState(false);

  // Reference to the flip book component
  const bookRef = useRef<PageFlip>(null);

  // Set client-side rendering flag
  useEffect(() => {
    setIsClient(true);
  }, []);

  /* Memoized Handlers */
  // Handle saving cover title text
  const handleSaveCoverTitle = useCallback(
    (text: string) => {
      updateBookTitle(text);
      setCurrentlyEditing(null, null);
    },
    [updateBookTitle, setCurrentlyEditing]
  );

  // Handle saving cover dedication text
  const handleSaveCoverDedication = useCallback(
    (text: string) => {
      updateCoverDedication(text);
      setCurrentlyEditing(null, null);
    },
    [updateCoverDedication, setCurrentlyEditing]
  );

  // Handle saving page dedication text
  const handleSavePageDedication = useCallback(
    (text: string) => {
      if (currentlyEditing?.id) {
        updatePageDedication(text);
        updatePageText(currentlyEditing.id, text);
      }
      setCurrentlyEditing(null, null);
    },
    [
      currentlyEditing,
      updatePageDedication,
      updatePageText,
      setCurrentlyEditing,
    ]
  );

  // Handle saving cover image
  const handleSaveCoverImage = useCallback(
    (imageUrl: string) => {
      updateSelectedCoverImage(imageUrl);
      setCurrentlyEditing(null, null);
    },
    [updateSelectedCoverImage, setCurrentlyEditing]
  );

  // Handle saving page text
  const handleSavePageText = useCallback(
    (text: string) => {
      if (currentlyEditing?.id) {
        updatePageText(currentlyEditing.id, text);
        setCurrentlyEditing(null, null);
      }
    },
    [currentlyEditing, updatePageText, setCurrentlyEditing]
  );

  // Handle saving page image
  const handleSavePageImage = useCallback(
    (imageUrl: string) => {
      if (currentlyEditing?.id) {
        updateSelectedPageImage(currentlyEditing.id, imageUrl);
        setCurrentlyEditing(null, null);
      }
    },
    [currentlyEditing, updateSelectedPageImage, setCurrentlyEditing]
  );

  // Handle canceling edits
  const handleCancelEdit = useCallback(() => {
    setCurrentlyEditing(null, null);
  }, [setCurrentlyEditing]);

  // Handle page changes - defer state update during animation
  const handlePageChange = useCallback(
    (e: { data: number }) => {
      // Get the current state of the page flip
      const flipState = bookRef.current?.pageFlip().getState?.() || "";

      // If the book is still flipping, defer the state update
      if (flipState === "flipping") {
        // Use requestAnimationFrame to defer the update until after the animation completes
        requestAnimationFrame(() => {
          // Add a small additional delay for smoother animation
          setTimeout(() => {
            setCurrentPage(e.data);
          }, 50);
        });
      } else {
        // If not flipping, update immediately
        setCurrentPage(e.data);
      }
    },
    [setCurrentPage]
  );

  // Navigation functions - wrapped in useCallback and debounced
  const nextPage = useMemo(
    () =>
      debounce(() => {
        if (bookRef.current) {
          try {
            bookRef.current.pageFlip().flipNext();
          } catch (error) {
            console.error("Error flipping to next page:", error);
          }
        }
      }, 100),
    [
      /* dependencies here */
    ]
  );

  const prevPage = useMemo(
    () =>
      debounce(() => {
        if (bookRef.current) {
          try {
            bookRef.current.pageFlip().flipPrev();
          } catch (error) {
            console.error("Error flipping to previous page:", error);
          }
        }
      }, 100),
    [
      /* dependencies here */
    ]
  );

  const goToPage = useMemo(
    () =>
      debounce((pageNumber: number) => {
        if (bookRef.current) {
          try {
            bookRef.current.pageFlip().flip(pageNumber);
          } catch (error) {
            console.error("Error flipping to page:", error);
          }
        }
      }, 100),
    [
      /* dependencies here */
    ]
  );

  // Memoize sorted pages to prevent unnecessary re-sorting on each render
  const sortedPages = useMemo(() => {
    if (!bookPreview?.pages) return [];
    return [...bookPreview.pages].sort((a, b) => a.pageNumber - b.pageNumber);
  }, [bookPreview?.pages]);

  // Memoize total pages calculation
  const totalPages = useMemo(() => {
    return bookPreview?.pages.length ? bookPreview.pages.length + 2 : 2;
  }, [bookPreview?.pages.length]);

  // Preload images for adjacent pages
  useEffect(() => {
    if (!bookPreview?.pages) return;

    // Function to preload an image
    const preloadImage = (src: string) => {
      if (!src) return;
      const img = new Image();
      img.src = src;
    };

    // Determine current page in the book (accounting for cover)
    // Cover is at index 0, content pages start at index 1
    const currentContentIndex = currentPageIndex - 1;

    // Preload next and previous page images
    if (currentContentIndex >= 0 && currentContentIndex < sortedPages.length) {
      // Current page image
      const currentPage = sortedPages[currentContentIndex];
      if (currentPage?.imageUrl) preloadImage(currentPage.imageUrl);

      // Next page image
      if (currentContentIndex + 1 < sortedPages.length) {
        const nextPage = sortedPages[currentContentIndex + 1];
        if (nextPage?.imageUrl) preloadImage(nextPage.imageUrl);
      }

      // Previous page image
      if (currentContentIndex - 1 >= 0) {
        const prevPage = sortedPages[currentContentIndex - 1];
        if (prevPage?.imageUrl) preloadImage(prevPage.imageUrl);
      }
    }

    // Preload cover image if we're at or near it
    if (currentPageIndex <= 1 && bookPreview.coverImage) {
      preloadImage(bookPreview.coverImage);
    }
  }, [currentPageIndex, sortedPages, bookPreview]);

  // Determine if the user is editing a component - memoized calculations
  const editingStates = useMemo(() => {
    if (!currentlyEditing) {
      return {
        isEditingCoverTitle: false,
        isEditingCoverImage: false,
        isEditingCoverDedication: false,
        isEditingPageText: false,
        isEditingPageImage: false,
        isEditingPageDedication: false,
        editingPage: null,
      };
    }

    const editingPage = bookPreview?.pages.find(
      (page) => page.id === currentlyEditing?.id
    );

    const isEditingPage = () => {
      const pageId = currentlyEditing?.id;
      if (!pageId || !bookPreview) return false;
      return bookPreview.pages.map((page) => page.id).includes(pageId);
    };

    return {
      // Cover page editing
      isEditingCoverTitle:
        currentlyEditing?.type === "text" &&
        currentlyEditing?.id === "cover-title",
      isEditingCoverImage:
        currentlyEditing?.type === "image" &&
        currentlyEditing?.id === "cover-image",
      isEditingCoverDedication:
        currentlyEditing?.type === "dedication" &&
        currentlyEditing?.id === "cover-dedication",
      // Page editing
      isEditingPageText: currentlyEditing?.type === "text" && isEditingPage(),
      isEditingPageImage: currentlyEditing?.type === "image" && isEditingPage(),
      isEditingPageDedication:
        currentlyEditing?.type === "dedication" && isEditingPage(),
      editingPage,
    };
  }, [currentlyEditing, bookPreview]);

  // Render loading state until client-side rendering is available
  if (!isClient) {
    return (
      <div
        className="flex justify-center items-center h-[600px] bg-gray-50 rounded-lg border"
        aria-live="polite"
        aria-busy="true"
      >
        <p className="text-gray-400">Loading book preview...</p>
      </div>
    );
  }

  // If book isn't loaded yet, show a placeholder
  if (!bookPreview) {
    return (
      <div
        className="flex justify-center items-center h-[600px] bg-gray-50 rounded-lg border"
        aria-live="polite"
      >
        <p className="text-gray-400">Book data not available</p>
      </div>
    );
  }

  const {
    isEditingCoverTitle,
    isEditingCoverImage,
    isEditingCoverDedication,
    isEditingPageText,
    isEditingPageImage,
    isEditingPageDedication,
    editingPage,
  } = editingStates;

  return (
    <div className="flex flex-col" role="region" aria-label="Book editor">
      {/* Book navigation and page indicator */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-600" aria-live="polite">
          Page {currentPageIndex + 1} of {totalPages}
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            disabled={currentPageIndex === 0}
            onClick={prevPage}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            disabled={currentPageIndex >= totalPages - 1}
            onClick={nextPage}
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Editing modal sections - conditionally rendered */}
      {/* First page dedication - DEDICATION PAGE */}
      {isEditingPageDedication && editingPage && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-96 max-w-full">
          <TextEditor
            initialText={editingPage.textContent || ""}
            onSave={handleSavePageDedication}
            onCancel={handleCancelEdit}
            placeholder="Enter your dedication..."
            maxLength={300}
            textType="dedication"
            minHeight="150px"
          />
        </div>
      )}

      {/* Text editor for cover title - COVER PAGE */}
      {isEditingCoverTitle && (
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-96 max-w-full">
          <TextEditor
            initialText={bookPreview.title}
            onSave={handleSaveCoverTitle}
            onCancel={handleCancelEdit}
            placeholder="Enter book title..."
            maxLength={50}
            textType="title"
          />
        </div>
      )}

      {/* Text editor for cover dedication - COVER PAGE */}
      {isEditingCoverDedication && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-96 max-w-full">
          <TextEditor
            initialText={bookPreview.coverDedication || ""}
            onSave={handleSaveCoverDedication}
            onCancel={handleCancelEdit}
            placeholder="Enter a dedication message..."
            maxLength={150}
            textType="dedication"
          />
        </div>
      )}

      {/* Cover image editor - COVER PAGE */}
      {isEditingCoverImage && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <ImageEditor
            currentImageUrl={bookPreview.coverImage || ""}
            imageOptions={
              bookPreview.coverImageOptions?.map((url, index) => ({
                imageUrl: url,
                index: index,
              })) || []
            }
            onSave={handleSaveCoverImage}
            onCancel={handleCancelEdit}
            title="Select Cover Image"
          />
        </div>
      )}

      {/* Text editor - PAGE */}
      {isEditingPageText && editingPage && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-96 max-w-full">
          <TextEditor
            initialText={editingPage.textContent || ""}
            onSave={handleSavePageText}
            onCancel={handleCancelEdit}
            placeholder="Enter page text..."
            maxLength={500}
            textType="content"
            minHeight="150px"
          />
        </div>
      )}

      {/* Image editor - PAGE */}
      {isEditingPageImage && editingPage && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <ImageEditor
            currentImageUrl={editingPage.imageUrl || ""}
            imageOptions={
              editingPage.imageOptions?.map((url, index) => ({
                imageUrl: url,
                index: index,
              })) || []
            }
            onSave={handleSavePageImage}
            onCancel={handleCancelEdit}
            title={`Select Image for Page ${editingPage.pageNumber}`}
          />
        </div>
      )}

      {/* Flip book container */}
      <div className="flex justify-center">
        <HTMLFlipBook
          width={450}
          height={600}
          size="stretch"
          minWidth={315}
          minHeight={200}
          maxWidth={500}
          maxHeight={350}
          maxShadowOpacity={0.3}
          showCover={true}
          mobileScrollSupport={true}
          onFlip={handlePageChange}
          className="mx-auto book-container"
          ref={bookRef}
          usePortrait={true}
          startPage={currentPageIndex}
          drawShadow={true}
          flippingTime={700} // Slightly faster animation for smoother experience
          useMouseEvents={false}
          autoSize={true}
          clickEventForward={false}
          style={{ perspective: "1000px" }} // Improved 3D rendering
          startZIndex={0}
          swipeDistance={10}
          showPageCorners={true}
          disableFlipByClick={true}
        >
          {/* Front cover - Memoized */}
          <MemoizedBookPageCover
            coverImage={bookPreview.coverImage}
            coverDedication={bookPreview.coverDedication}
          >
            {bookPreview.title}
          </MemoizedBookPageCover>

          {/* Book pages - now rendered according to their type */}
          {sortedPages.map((page) => (
            <MemoizedBookPage
              key={page.id}
              pageId={page.id}
              pageNumber={page.pageNumber}
              type={page.type}
              textContent={page.textContent}
              imageUrl={page.imageUrl}
            />
          ))}

          {/* Back cover */}
          <MemoizedBookPageCover isLastPage={true}>
            The End
          </MemoizedBookPageCover>
        </HTMLFlipBook>
      </div>

      {/* Page thumbnails - Optimized with memoization */}
      <MemoizedPageThumbnails
        pages={sortedPages}
        currentPageIndex={currentPageIndex}
        goToPage={goToPage}
      />
    </div>
  );
};

// Memoize child components to prevent unnecessary re-renders
const MemoizedBookPageCover = memo(BookPageCover);
const MemoizedBookPage = memo(BookPage);
const MemoizedPageThumbnails = memo(PageThumbnails);

export default memo(BookEditor);
