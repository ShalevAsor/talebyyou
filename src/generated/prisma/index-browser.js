
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  clerkId: 'clerkId',
  email: 'email',
  firstName: 'firstName',
  lastName: 'lastName',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.GuestSessionScalarFieldEnum = {
  id: 'id',
  sessionId: 'sessionId',
  lastActive: 'lastActive',
  createdAt: 'createdAt',
  expiresAt: 'expiresAt'
};

exports.Prisma.GenreScalarFieldEnum = {
  id: 'id',
  name: 'name'
};

exports.Prisma.BookScalarFieldEnum = {
  id: 'id',
  title: 'title',
  status: 'status',
  characterImageReference: 'characterImageReference',
  coverImage: 'coverImage',
  coverImageOptions: 'coverImageOptions',
  coverPrompt: 'coverPrompt',
  pageCount: 'pageCount',
  coverDedication: 'coverDedication',
  pageDedication: 'pageDedication',
  templateId: 'templateId',
  userId: 'userId',
  guestSessionId: 'guestSessionId',
  orderId: 'orderId',
  printJobId: 'printJobId',
  printingDeadline: 'printingDeadline',
  ebookS3Key: 'ebookS3Key',
  ebookFileName: 'ebookFileName',
  ebookFileType: 'ebookFileType',
  ebookExpiresAt: 'ebookExpiresAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CharacterScalarFieldEnum = {
  id: 'id',
  name: 'name',
  age: 'age',
  gender: 'gender',
  eyeColor: 'eyeColor',
  hairColor: 'hairColor',
  hairStyle: 'hairStyle',
  skinTone: 'skinTone',
  wearingGlasses: 'wearingGlasses',
  bookId: 'bookId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.BookTemplateScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  pageCount: 'pageCount',
  published: 'published',
  coverImage: 'coverImage',
  coverPrompt: 'coverPrompt',
  minAge: 'minAge',
  maxAge: 'maxAge',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.TemplatePageContentScalarFieldEnum = {
  id: 'id',
  pageNumber: 'pageNumber',
  content: 'content',
  imagePrompt: 'imagePrompt',
  imageUrl: 'imageUrl',
  templateId: 'templateId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PageScalarFieldEnum = {
  id: 'id',
  type: 'type',
  pageNumber: 'pageNumber',
  textContent: 'textContent',
  imagePrompt: 'imagePrompt',
  imageUrl: 'imageUrl',
  imageOptions: 'imageOptions',
  bookId: 'bookId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ImageGenerationScalarFieldEnum = {
  id: 'id',
  generationId: 'generationId',
  bookId: 'bookId',
  pageId: 'pageId',
  type: 'type',
  prompt: 'prompt',
  status: 'status',
  errorMessage: 'errorMessage',
  apiCreditCost: 'apiCreditCost',
  createdAt: 'createdAt',
  completedAt: 'completedAt'
};

exports.Prisma.OrderScalarFieldEnum = {
  id: 'id',
  orderNumber: 'orderNumber',
  productType: 'productType',
  totalPrice: 'totalPrice',
  currency: 'currency',
  status: 'status',
  paymentProvider: 'paymentProvider',
  quantity: 'quantity',
  paymentId: 'paymentId',
  transactionId: 'transactionId',
  pricePaid: 'pricePaid',
  payerEmail: 'payerEmail',
  shippingCost: 'shippingCost',
  printingCost: 'printingCost',
  imagesCost: 'imagesCost',
  shippingLevel: 'shippingLevel',
  phoneNumber: 'phoneNumber',
  name: 'name',
  street1: 'street1',
  street2: 'street2',
  city: 'city',
  state_code: 'state_code',
  postcode: 'postcode',
  country: 'country',
  poProviderOrderId: 'poProviderOrderId',
  trackingNumber: 'trackingNumber',
  customerEmail: 'customerEmail',
  bookId: 'bookId',
  userId: 'userId',
  printJobId: 'printJobId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  paidAt: 'paidAt',
  fulfilledAt: 'fulfilledAt'
};

exports.Prisma.PrintJobScalarFieldEnum = {
  id: 'id',
  orderId: 'orderId',
  bookId: 'bookId',
  luluPrintJobId: 'luluPrintJobId',
  paymentId: 'paymentId',
  podPackageId: 'podPackageId',
  interiorPdfUrl: 'interiorPdfUrl',
  coverPdfUrl: 'coverPdfUrl',
  interiorS3Key: 'interiorS3Key',
  coverS3Key: 'coverS3Key',
  pageCount: 'pageCount',
  interiorValidationId: 'interiorValidationId',
  coverValidationId: 'coverValidationId',
  interiorValidationStatus: 'interiorValidationStatus',
  coverValidationStatus: 'coverValidationStatus',
  validationErrors: 'validationErrors',
  status: 'status',
  statusMessage: 'statusMessage',
  currency: 'currency',
  printingCostExclTax: 'printingCostExclTax',
  printingCostInclTax: 'printingCostInclTax',
  shippingCostExclTax: 'shippingCostExclTax',
  shippingCostInclTax: 'shippingCostInclTax',
  totalCostExclTax: 'totalCostExclTax',
  totalCostInclTax: 'totalCostInclTax',
  totalTax: 'totalTax',
  trackingNumber: 'trackingNumber',
  trackingUrls: 'trackingUrls',
  shippingCarrier: 'shippingCarrier',
  estimatedShipDate: 'estimatedShipDate',
  estimatedDeliveryDate: 'estimatedDeliveryDate',
  attempts: 'attempts',
  errorMessage: 'errorMessage',
  sentByAdminId: 'sentByAdminId',
  adminNotes: 'adminNotes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  sentToPrinterAt: 'sentToPrinterAt',
  paidAt: 'paidAt',
  inProductionAt: 'inProductionAt',
  shippedAt: 'shippedAt'
};

exports.Prisma.ConfigurationScalarFieldEnum = {
  key: 'key',
  value: 'value',
  description: 'description',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.BookStatus = exports.$Enums.BookStatus = {
  CUSTOMIZING: 'CUSTOMIZING',
  ORDERED: 'ORDERED',
  READY_FOR_PRINTING: 'READY_FOR_PRINTING',
  COMPLETED: 'COMPLETED'
};

exports.PageType = exports.$Enums.PageType = {
  TEXT: 'TEXT',
  IMAGE: 'IMAGE',
  DEDICATION: 'DEDICATION',
  GENERAL: 'GENERAL'
};

exports.ImageType = exports.$Enums.ImageType = {
  COVER: 'COVER',
  PAGE: 'PAGE'
};

exports.GenerationStatus = exports.$Enums.GenerationStatus = {
  PENDING: 'PENDING',
  COMPLETE: 'COMPLETE',
  FAILED: 'FAILED'
};

exports.ProductType = exports.$Enums.ProductType = {
  EBOOK: 'EBOOK',
  BOOK: 'BOOK'
};

exports.OrderStatus = exports.$Enums.OrderStatus = {
  PENDING: 'PENDING',
  PAID: 'PAID',
  PRINTING: 'PRINTING',
  SHIPPED: 'SHIPPED',
  FULFILLED: 'FULFILLED',
  CANCELLED: 'CANCELLED',
  REFUNDED: 'REFUNDED',
  ERROR: 'ERROR'
};

exports.ShippingLevel = exports.$Enums.ShippingLevel = {
  MAIL: 'MAIL',
  PRIORITY_MAIL: 'PRIORITY_MAIL',
  GROUND: 'GROUND',
  EXPEDITED: 'EXPEDITED',
  EXPRESS: 'EXPRESS'
};

exports.FileValidationStatus = exports.$Enums.FileValidationStatus = {
  NULL: 'NULL',
  VALIDATING: 'VALIDATING',
  VALIDATED: 'VALIDATED',
  NORMALIZING: 'NORMALIZING',
  NORMALIZED: 'NORMALIZED',
  ERROR: 'ERROR'
};

exports.PrintJobStatus = exports.$Enums.PrintJobStatus = {
  CREATED: 'CREATED',
  UNPAID: 'UNPAID',
  PAYMENT_IN_PROGRESS: 'PAYMENT_IN_PROGRESS',
  PRODUCTION_DELAYED: 'PRODUCTION_DELAYED',
  PRODUCTION_READY: 'PRODUCTION_READY',
  IN_PRODUCTION: 'IN_PRODUCTION',
  SHIPPED: 'SHIPPED',
  REJECTED: 'REJECTED',
  CANCELED: 'CANCELED'
};

exports.Prisma.ModelName = {
  User: 'User',
  GuestSession: 'GuestSession',
  Genre: 'Genre',
  Book: 'Book',
  Character: 'Character',
  BookTemplate: 'BookTemplate',
  TemplatePageContent: 'TemplatePageContent',
  Page: 'Page',
  ImageGeneration: 'ImageGeneration',
  Order: 'Order',
  PrintJob: 'PrintJob',
  Configuration: 'Configuration'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }

        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
