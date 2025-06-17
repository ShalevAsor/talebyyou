import {
  Book,
  Character,
  Page,
  BookTemplate,
  Genre,
  ImageGeneration,
  BookStatus,
  PageType,
  GenerationStatus,
  ImageType,
  TemplatePageContent,
  Order,
  PrintJob,
  GuestSession,
  User,
} from "@prisma/client";

/***
 * Full types with relations
 *
 */

// Type for book with all relations
export type BookFull = Book & {
  pages: Page[];
  character: Character | null;
  template: BookTemplate & {
    genres: Genre[];
  };
  imageGenerations: ImageGeneration[];
  order?: Order;
  printJob?: PrintJob;
};

// Type for page with book relation
export type PageFull = Page & {
  book: Book;
};

// Type for template with relations
export type BookTemplateFull = BookTemplate & {
  pages: TemplatePageContent[];
  genres: Genre[];
};

// Type for character with book relation
export type CharacterFull = Character & {
  book: Book;
};

// Type for image generation with book relation
export type ImageGenerationFull = ImageGeneration & {
  book: Book;
  page?: Page;
};

/***
 * For creating data (without id and auto-generated fields)
 *
 */

export type BookTemplateCreateData = Omit<
  BookTemplate,
  "id" | "slug" | "createdAt" | "updatedAt"
> & {
  pages: BookTemplatePageCreateData[];
  genres: string[];
  characterGender: "boy" | "girl";
};
export type BookTemplatePageCreateData = Omit<
  TemplatePageContent,
  "id" | "createdAt" | "updatedAt" | "templateId"
>;

export type BookCreateData = {
  title: string;
  status: BookStatus;
  pageCount: number;
  coverPrompt: string;
  pages: PageCreateData[];
  templateId: string;
  userId: string;
  characterImageReference: string | null;
};

export type PageCreateData = Omit<
  Page,
  "id" | "bookId" | "createdAt" | "updatedAt" | "imageUrl" | "imageOptions"
>;
export type CharacterCreateData = Omit<
  Character,
  "id" | "createdAt" | "updatedAt"
>;

// For specific use cases
export type BookBasic = Pick<
  Book,
  "id" | "title" | "status" | "coverImage" | "createdAt"
>;
export type BookPrint = Book & {
  pages: Page[];
  character: Character | null;
};

export interface BookLimitResult {
  canCreate: boolean;
  remainingBooks: number;
  totalCreated: number;
  message?: string;
}

export interface BooksStatsData {
  totalBooks: number;
  booksByStatus: {
    customizing: number;
    ordered: number;
    readyForPrinting: number;
    completed: number;
  };
  recentBooks: number; // created in last 7 days
  guestBooks: number;
  userBooks: number;
}

export interface BookSearchResult {
  id: string;
  title: string;
  status: BookStatus;
  createdAt: Date;
  updatedAt: Date;
  // User info (could be from User or Order)
  userEmail?: string;
  userName?: string;
  userId?: string;
  isGuest: boolean;
  // Order info if available
  orderNumber?: string;
  orderId?: string;
  // Template info
  templateName?: string;
}

export interface BookSearchFilters {
  searchType: "bookId" | "userEmail" | "orderNumber" | "bookTitle";
  searchQuery: string;
  status?: BookStatus;
  dateRange?: {
    from: string;
    to: string;
  };
}

export type BookAdmin = Book & {
  pages: Page[];
  character: Character | null;
  template: BookTemplate & {
    genres: Genre[];
  };
  imageGenerations: ImageGeneration[];
  order: Order | null;
  printJob: PrintJob | null;
  user: Pick<User, "id" | "email" | "firstName" | "lastName"> | null;
  guestSession: Pick<
    GuestSession,
    "id" | "sessionId" | "lastActive" | "createdAt" | "expiresAt"
  > | null;
};

// Re-export enums for convenience
export { BookStatus, PageType, GenerationStatus, ImageType };
