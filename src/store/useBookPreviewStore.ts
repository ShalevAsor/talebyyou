import { create } from "zustand";
import { persist } from "zustand/middleware";

import { BookFull, PageType } from "@/types/book";

/**
 * Interface for the book store state
 */
interface BookPreviewState {
  // Core book data
  book: BookFull | null;
  currentPageIndex: number;
  isEditMode: boolean;
  currentlyEditing: {
    type: "text" | "image" | "dedication" | null;
    id: string | null;
  };
  originalPageContent: Record<string, string>;

  // Actions
  initializeStore: (book: BookFull) => void;
  setCurrentPage: (pageIndex: number) => void;
  toggleEditMode: () => void;
  setEditMode: (isActive: boolean) => void;
  setCurrentlyEditing: (
    type: "text" | "image" | "dedication" | null,
    id: string | null
  ) => void;
  updatePageText: (pageId: string, text: string) => void;
  resetPageText: (pageId: string) => void;
  updateSelectedPageImage: (pageId: string, imageUrl: string) => void;
  updateSelectedCoverImage: (imageUrl: string) => void;
  updateBookTitle: (title: string) => void;
  updateCoverDedication: (text: string) => void;
  updatePageDedication: (text: string) => void;
  reset: () => void;
}

/**
 * Create the book store with persistence
 */
const useBookPreviewStore = create<BookPreviewState>()(
  persist(
    (set, get) => ({
      // Initial state
      book: null,
      currentPageIndex: 0,
      isEditMode: true,
      currentlyEditing: { type: null, id: null },
      originalPageContent: {},

      // Initialize store with book data
      initializeStore: (book: BookFull) => {
        const originalContent: Record<string, string> = {};
        book.pages.forEach((page) => {
          if (page.type === PageType.TEXT && page.textContent) {
            originalContent[page.id] = page.textContent;
          }
        });

        set({
          book,
          originalPageContent: originalContent,
        });
      },

      // Regular actions
      setCurrentPage: (pageIndex) => set({ currentPageIndex: pageIndex }),

      toggleEditMode: () => {
        const { isEditMode } = get();
        set({
          isEditMode: !isEditMode,
          currentlyEditing: !isEditMode
            ? { type: null, id: null }
            : get().currentlyEditing,
        });
      },

      setEditMode: (isActive) =>
        set({
          isEditMode: isActive,
          currentlyEditing: isActive
            ? get().currentlyEditing
            : { type: null, id: null },
        }),

      setCurrentlyEditing: (type, id) =>
        set({ currentlyEditing: { type, id } }),

      updatePageText: (pageId: string, text: string) => {
        const { book } = get();
        if (!book) return;

        const updatedPages = book.pages.map((page) =>
          page.id === pageId ? { ...page, textContent: text } : page
        );

        set({ book: { ...book, pages: updatedPages } });
      },

      resetPageText: (pageId: string) => {
        const { book, originalPageContent } = get();
        if (!book) return;

        const originalText = originalPageContent[pageId];
        if (originalText === undefined) return;

        const updatedPages = book.pages.map((page) =>
          page.id === pageId ? { ...page, textContent: originalText } : page
        );

        set({ book: { ...book, pages: updatedPages } });
      },

      updateSelectedPageImage: (pageId, imageUrl) => {
        const { book } = get();
        if (!book) return;

        const updatedPages = book.pages.map((page) =>
          page.id === pageId ? { ...page, imageUrl } : page
        );

        set({ book: { ...book, pages: updatedPages } });
      },

      updateSelectedCoverImage: (imageUrl) => {
        const { book } = get();
        if (!book) return;

        set({ book: { ...book, coverImage: imageUrl } });
      },

      updateBookTitle: (title) => {
        const { book } = get();
        if (!book) return;
        set({ book: { ...book, title: title } });
      },

      updateCoverDedication: (text) => {
        const { book } = get();
        if (!book) return;
        set({ book: { ...book, coverDedication: text } });
      },

      updatePageDedication: (text) => {
        const { book } = get();
        if (!book) return;
        set({ book: { ...book, pageDedication: text } });
      },

      reset: () =>
        set({
          book: null,
          currentPageIndex: 0,
          isEditMode: true,
          currentlyEditing: { type: null, id: null },
          originalPageContent: {},
        }),
    }),
    {
      name: "book-preview-store",
      // Only persist UI state
      partialize: (state) => ({
        currentPageIndex: state.currentPageIndex,
        isEditMode: state.isEditMode,
      }),
    }
  )
);

export default useBookPreviewStore;
