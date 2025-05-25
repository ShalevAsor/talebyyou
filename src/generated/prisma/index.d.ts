
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model GuestSession
 * 
 */
export type GuestSession = $Result.DefaultSelection<Prisma.$GuestSessionPayload>
/**
 * Model Genre
 * 
 */
export type Genre = $Result.DefaultSelection<Prisma.$GenrePayload>
/**
 * Model Book
 * 
 */
export type Book = $Result.DefaultSelection<Prisma.$BookPayload>
/**
 * Model Character
 * 
 */
export type Character = $Result.DefaultSelection<Prisma.$CharacterPayload>
/**
 * Model BookTemplate
 * 
 */
export type BookTemplate = $Result.DefaultSelection<Prisma.$BookTemplatePayload>
/**
 * Model TemplatePageContent
 * 
 */
export type TemplatePageContent = $Result.DefaultSelection<Prisma.$TemplatePageContentPayload>
/**
 * Model Page
 * 
 */
export type Page = $Result.DefaultSelection<Prisma.$PagePayload>
/**
 * Model ImageGeneration
 * 
 */
export type ImageGeneration = $Result.DefaultSelection<Prisma.$ImageGenerationPayload>
/**
 * Model Order
 * 
 */
export type Order = $Result.DefaultSelection<Prisma.$OrderPayload>
/**
 * Model PrintJob
 * 
 */
export type PrintJob = $Result.DefaultSelection<Prisma.$PrintJobPayload>
/**
 * Model Configuration
 * 
 */
export type Configuration = $Result.DefaultSelection<Prisma.$ConfigurationPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const BookStatus: {
  CUSTOMIZING: 'CUSTOMIZING',
  ORDERED: 'ORDERED',
  READY_FOR_PRINTING: 'READY_FOR_PRINTING',
  COMPLETED: 'COMPLETED'
};

export type BookStatus = (typeof BookStatus)[keyof typeof BookStatus]


export const PageType: {
  TEXT: 'TEXT',
  IMAGE: 'IMAGE',
  DEDICATION: 'DEDICATION',
  GENERAL: 'GENERAL'
};

export type PageType = (typeof PageType)[keyof typeof PageType]


export const GenerationStatus: {
  PENDING: 'PENDING',
  COMPLETE: 'COMPLETE',
  FAILED: 'FAILED'
};

export type GenerationStatus = (typeof GenerationStatus)[keyof typeof GenerationStatus]


export const ImageType: {
  COVER: 'COVER',
  PAGE: 'PAGE'
};

export type ImageType = (typeof ImageType)[keyof typeof ImageType]


export const ProductType: {
  EBOOK: 'EBOOK',
  BOOK: 'BOOK'
};

export type ProductType = (typeof ProductType)[keyof typeof ProductType]


export const OrderStatus: {
  PENDING: 'PENDING',
  PAID: 'PAID',
  PRINTING: 'PRINTING',
  SHIPPED: 'SHIPPED',
  FULFILLED: 'FULFILLED',
  CANCELLED: 'CANCELLED',
  REFUNDED: 'REFUNDED',
  ERROR: 'ERROR'
};

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus]


export const ShippingLevel: {
  MAIL: 'MAIL',
  PRIORITY_MAIL: 'PRIORITY_MAIL',
  GROUND: 'GROUND',
  EXPEDITED: 'EXPEDITED',
  EXPRESS: 'EXPRESS'
};

export type ShippingLevel = (typeof ShippingLevel)[keyof typeof ShippingLevel]


export const FileValidationStatus: {
  NULL: 'NULL',
  VALIDATING: 'VALIDATING',
  VALIDATED: 'VALIDATED',
  NORMALIZING: 'NORMALIZING',
  NORMALIZED: 'NORMALIZED',
  ERROR: 'ERROR'
};

export type FileValidationStatus = (typeof FileValidationStatus)[keyof typeof FileValidationStatus]


export const PrintJobStatus: {
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

export type PrintJobStatus = (typeof PrintJobStatus)[keyof typeof PrintJobStatus]

}

export type BookStatus = $Enums.BookStatus

export const BookStatus: typeof $Enums.BookStatus

export type PageType = $Enums.PageType

export const PageType: typeof $Enums.PageType

export type GenerationStatus = $Enums.GenerationStatus

export const GenerationStatus: typeof $Enums.GenerationStatus

export type ImageType = $Enums.ImageType

export const ImageType: typeof $Enums.ImageType

export type ProductType = $Enums.ProductType

export const ProductType: typeof $Enums.ProductType

export type OrderStatus = $Enums.OrderStatus

export const OrderStatus: typeof $Enums.OrderStatus

export type ShippingLevel = $Enums.ShippingLevel

export const ShippingLevel: typeof $Enums.ShippingLevel

export type FileValidationStatus = $Enums.FileValidationStatus

export const FileValidationStatus: typeof $Enums.FileValidationStatus

export type PrintJobStatus = $Enums.PrintJobStatus

export const PrintJobStatus: typeof $Enums.PrintJobStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.guestSession`: Exposes CRUD operations for the **GuestSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GuestSessions
    * const guestSessions = await prisma.guestSession.findMany()
    * ```
    */
  get guestSession(): Prisma.GuestSessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.genre`: Exposes CRUD operations for the **Genre** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Genres
    * const genres = await prisma.genre.findMany()
    * ```
    */
  get genre(): Prisma.GenreDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.book`: Exposes CRUD operations for the **Book** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Books
    * const books = await prisma.book.findMany()
    * ```
    */
  get book(): Prisma.BookDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.character`: Exposes CRUD operations for the **Character** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Characters
    * const characters = await prisma.character.findMany()
    * ```
    */
  get character(): Prisma.CharacterDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.bookTemplate`: Exposes CRUD operations for the **BookTemplate** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BookTemplates
    * const bookTemplates = await prisma.bookTemplate.findMany()
    * ```
    */
  get bookTemplate(): Prisma.BookTemplateDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.templatePageContent`: Exposes CRUD operations for the **TemplatePageContent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TemplatePageContents
    * const templatePageContents = await prisma.templatePageContent.findMany()
    * ```
    */
  get templatePageContent(): Prisma.TemplatePageContentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.page`: Exposes CRUD operations for the **Page** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pages
    * const pages = await prisma.page.findMany()
    * ```
    */
  get page(): Prisma.PageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.imageGeneration`: Exposes CRUD operations for the **ImageGeneration** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ImageGenerations
    * const imageGenerations = await prisma.imageGeneration.findMany()
    * ```
    */
  get imageGeneration(): Prisma.ImageGenerationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.order`: Exposes CRUD operations for the **Order** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Orders
    * const orders = await prisma.order.findMany()
    * ```
    */
  get order(): Prisma.OrderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.printJob`: Exposes CRUD operations for the **PrintJob** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PrintJobs
    * const printJobs = await prisma.printJob.findMany()
    * ```
    */
  get printJob(): Prisma.PrintJobDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.configuration`: Exposes CRUD operations for the **Configuration** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Configurations
    * const configurations = await prisma.configuration.findMany()
    * ```
    */
  get configuration(): Prisma.ConfigurationDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
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

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "guestSession" | "genre" | "book" | "character" | "bookTemplate" | "templatePageContent" | "page" | "imageGeneration" | "order" | "printJob" | "configuration"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      GuestSession: {
        payload: Prisma.$GuestSessionPayload<ExtArgs>
        fields: Prisma.GuestSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GuestSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GuestSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestSessionPayload>
          }
          findFirst: {
            args: Prisma.GuestSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GuestSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestSessionPayload>
          }
          findMany: {
            args: Prisma.GuestSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestSessionPayload>[]
          }
          create: {
            args: Prisma.GuestSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestSessionPayload>
          }
          createMany: {
            args: Prisma.GuestSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GuestSessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestSessionPayload>[]
          }
          delete: {
            args: Prisma.GuestSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestSessionPayload>
          }
          update: {
            args: Prisma.GuestSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestSessionPayload>
          }
          deleteMany: {
            args: Prisma.GuestSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GuestSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GuestSessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestSessionPayload>[]
          }
          upsert: {
            args: Prisma.GuestSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestSessionPayload>
          }
          aggregate: {
            args: Prisma.GuestSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGuestSession>
          }
          groupBy: {
            args: Prisma.GuestSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<GuestSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.GuestSessionCountArgs<ExtArgs>
            result: $Utils.Optional<GuestSessionCountAggregateOutputType> | number
          }
        }
      }
      Genre: {
        payload: Prisma.$GenrePayload<ExtArgs>
        fields: Prisma.GenreFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GenreFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GenrePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GenreFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GenrePayload>
          }
          findFirst: {
            args: Prisma.GenreFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GenrePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GenreFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GenrePayload>
          }
          findMany: {
            args: Prisma.GenreFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GenrePayload>[]
          }
          create: {
            args: Prisma.GenreCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GenrePayload>
          }
          createMany: {
            args: Prisma.GenreCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GenreCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GenrePayload>[]
          }
          delete: {
            args: Prisma.GenreDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GenrePayload>
          }
          update: {
            args: Prisma.GenreUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GenrePayload>
          }
          deleteMany: {
            args: Prisma.GenreDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GenreUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GenreUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GenrePayload>[]
          }
          upsert: {
            args: Prisma.GenreUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GenrePayload>
          }
          aggregate: {
            args: Prisma.GenreAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGenre>
          }
          groupBy: {
            args: Prisma.GenreGroupByArgs<ExtArgs>
            result: $Utils.Optional<GenreGroupByOutputType>[]
          }
          count: {
            args: Prisma.GenreCountArgs<ExtArgs>
            result: $Utils.Optional<GenreCountAggregateOutputType> | number
          }
        }
      }
      Book: {
        payload: Prisma.$BookPayload<ExtArgs>
        fields: Prisma.BookFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BookFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BookFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookPayload>
          }
          findFirst: {
            args: Prisma.BookFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BookFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookPayload>
          }
          findMany: {
            args: Prisma.BookFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookPayload>[]
          }
          create: {
            args: Prisma.BookCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookPayload>
          }
          createMany: {
            args: Prisma.BookCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BookCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookPayload>[]
          }
          delete: {
            args: Prisma.BookDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookPayload>
          }
          update: {
            args: Prisma.BookUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookPayload>
          }
          deleteMany: {
            args: Prisma.BookDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BookUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BookUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookPayload>[]
          }
          upsert: {
            args: Prisma.BookUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookPayload>
          }
          aggregate: {
            args: Prisma.BookAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBook>
          }
          groupBy: {
            args: Prisma.BookGroupByArgs<ExtArgs>
            result: $Utils.Optional<BookGroupByOutputType>[]
          }
          count: {
            args: Prisma.BookCountArgs<ExtArgs>
            result: $Utils.Optional<BookCountAggregateOutputType> | number
          }
        }
      }
      Character: {
        payload: Prisma.$CharacterPayload<ExtArgs>
        fields: Prisma.CharacterFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CharacterFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharacterPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CharacterFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharacterPayload>
          }
          findFirst: {
            args: Prisma.CharacterFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharacterPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CharacterFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharacterPayload>
          }
          findMany: {
            args: Prisma.CharacterFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharacterPayload>[]
          }
          create: {
            args: Prisma.CharacterCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharacterPayload>
          }
          createMany: {
            args: Prisma.CharacterCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CharacterCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharacterPayload>[]
          }
          delete: {
            args: Prisma.CharacterDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharacterPayload>
          }
          update: {
            args: Prisma.CharacterUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharacterPayload>
          }
          deleteMany: {
            args: Prisma.CharacterDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CharacterUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CharacterUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharacterPayload>[]
          }
          upsert: {
            args: Prisma.CharacterUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharacterPayload>
          }
          aggregate: {
            args: Prisma.CharacterAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCharacter>
          }
          groupBy: {
            args: Prisma.CharacterGroupByArgs<ExtArgs>
            result: $Utils.Optional<CharacterGroupByOutputType>[]
          }
          count: {
            args: Prisma.CharacterCountArgs<ExtArgs>
            result: $Utils.Optional<CharacterCountAggregateOutputType> | number
          }
        }
      }
      BookTemplate: {
        payload: Prisma.$BookTemplatePayload<ExtArgs>
        fields: Prisma.BookTemplateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BookTemplateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookTemplatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BookTemplateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookTemplatePayload>
          }
          findFirst: {
            args: Prisma.BookTemplateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookTemplatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BookTemplateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookTemplatePayload>
          }
          findMany: {
            args: Prisma.BookTemplateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookTemplatePayload>[]
          }
          create: {
            args: Prisma.BookTemplateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookTemplatePayload>
          }
          createMany: {
            args: Prisma.BookTemplateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BookTemplateCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookTemplatePayload>[]
          }
          delete: {
            args: Prisma.BookTemplateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookTemplatePayload>
          }
          update: {
            args: Prisma.BookTemplateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookTemplatePayload>
          }
          deleteMany: {
            args: Prisma.BookTemplateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BookTemplateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BookTemplateUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookTemplatePayload>[]
          }
          upsert: {
            args: Prisma.BookTemplateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookTemplatePayload>
          }
          aggregate: {
            args: Prisma.BookTemplateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBookTemplate>
          }
          groupBy: {
            args: Prisma.BookTemplateGroupByArgs<ExtArgs>
            result: $Utils.Optional<BookTemplateGroupByOutputType>[]
          }
          count: {
            args: Prisma.BookTemplateCountArgs<ExtArgs>
            result: $Utils.Optional<BookTemplateCountAggregateOutputType> | number
          }
        }
      }
      TemplatePageContent: {
        payload: Prisma.$TemplatePageContentPayload<ExtArgs>
        fields: Prisma.TemplatePageContentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TemplatePageContentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePageContentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TemplatePageContentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePageContentPayload>
          }
          findFirst: {
            args: Prisma.TemplatePageContentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePageContentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TemplatePageContentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePageContentPayload>
          }
          findMany: {
            args: Prisma.TemplatePageContentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePageContentPayload>[]
          }
          create: {
            args: Prisma.TemplatePageContentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePageContentPayload>
          }
          createMany: {
            args: Prisma.TemplatePageContentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TemplatePageContentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePageContentPayload>[]
          }
          delete: {
            args: Prisma.TemplatePageContentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePageContentPayload>
          }
          update: {
            args: Prisma.TemplatePageContentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePageContentPayload>
          }
          deleteMany: {
            args: Prisma.TemplatePageContentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TemplatePageContentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TemplatePageContentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePageContentPayload>[]
          }
          upsert: {
            args: Prisma.TemplatePageContentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePageContentPayload>
          }
          aggregate: {
            args: Prisma.TemplatePageContentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTemplatePageContent>
          }
          groupBy: {
            args: Prisma.TemplatePageContentGroupByArgs<ExtArgs>
            result: $Utils.Optional<TemplatePageContentGroupByOutputType>[]
          }
          count: {
            args: Prisma.TemplatePageContentCountArgs<ExtArgs>
            result: $Utils.Optional<TemplatePageContentCountAggregateOutputType> | number
          }
        }
      }
      Page: {
        payload: Prisma.$PagePayload<ExtArgs>
        fields: Prisma.PageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload>
          }
          findFirst: {
            args: Prisma.PageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload>
          }
          findMany: {
            args: Prisma.PageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload>[]
          }
          create: {
            args: Prisma.PageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload>
          }
          createMany: {
            args: Prisma.PageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload>[]
          }
          delete: {
            args: Prisma.PageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload>
          }
          update: {
            args: Prisma.PageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload>
          }
          deleteMany: {
            args: Prisma.PageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload>[]
          }
          upsert: {
            args: Prisma.PageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload>
          }
          aggregate: {
            args: Prisma.PageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePage>
          }
          groupBy: {
            args: Prisma.PageGroupByArgs<ExtArgs>
            result: $Utils.Optional<PageGroupByOutputType>[]
          }
          count: {
            args: Prisma.PageCountArgs<ExtArgs>
            result: $Utils.Optional<PageCountAggregateOutputType> | number
          }
        }
      }
      ImageGeneration: {
        payload: Prisma.$ImageGenerationPayload<ExtArgs>
        fields: Prisma.ImageGenerationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ImageGenerationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImageGenerationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ImageGenerationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImageGenerationPayload>
          }
          findFirst: {
            args: Prisma.ImageGenerationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImageGenerationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ImageGenerationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImageGenerationPayload>
          }
          findMany: {
            args: Prisma.ImageGenerationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImageGenerationPayload>[]
          }
          create: {
            args: Prisma.ImageGenerationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImageGenerationPayload>
          }
          createMany: {
            args: Prisma.ImageGenerationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ImageGenerationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImageGenerationPayload>[]
          }
          delete: {
            args: Prisma.ImageGenerationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImageGenerationPayload>
          }
          update: {
            args: Prisma.ImageGenerationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImageGenerationPayload>
          }
          deleteMany: {
            args: Prisma.ImageGenerationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ImageGenerationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ImageGenerationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImageGenerationPayload>[]
          }
          upsert: {
            args: Prisma.ImageGenerationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImageGenerationPayload>
          }
          aggregate: {
            args: Prisma.ImageGenerationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateImageGeneration>
          }
          groupBy: {
            args: Prisma.ImageGenerationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ImageGenerationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ImageGenerationCountArgs<ExtArgs>
            result: $Utils.Optional<ImageGenerationCountAggregateOutputType> | number
          }
        }
      }
      Order: {
        payload: Prisma.$OrderPayload<ExtArgs>
        fields: Prisma.OrderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findFirst: {
            args: Prisma.OrderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findMany: {
            args: Prisma.OrderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          create: {
            args: Prisma.OrderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          createMany: {
            args: Prisma.OrderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          delete: {
            args: Prisma.OrderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          update: {
            args: Prisma.OrderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          deleteMany: {
            args: Prisma.OrderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrderUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          upsert: {
            args: Prisma.OrderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          aggregate: {
            args: Prisma.OrderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrder>
          }
          groupBy: {
            args: Prisma.OrderGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderCountArgs<ExtArgs>
            result: $Utils.Optional<OrderCountAggregateOutputType> | number
          }
        }
      }
      PrintJob: {
        payload: Prisma.$PrintJobPayload<ExtArgs>
        fields: Prisma.PrintJobFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PrintJobFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrintJobPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PrintJobFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrintJobPayload>
          }
          findFirst: {
            args: Prisma.PrintJobFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrintJobPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PrintJobFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrintJobPayload>
          }
          findMany: {
            args: Prisma.PrintJobFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrintJobPayload>[]
          }
          create: {
            args: Prisma.PrintJobCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrintJobPayload>
          }
          createMany: {
            args: Prisma.PrintJobCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PrintJobCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrintJobPayload>[]
          }
          delete: {
            args: Prisma.PrintJobDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrintJobPayload>
          }
          update: {
            args: Prisma.PrintJobUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrintJobPayload>
          }
          deleteMany: {
            args: Prisma.PrintJobDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PrintJobUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PrintJobUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrintJobPayload>[]
          }
          upsert: {
            args: Prisma.PrintJobUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrintJobPayload>
          }
          aggregate: {
            args: Prisma.PrintJobAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePrintJob>
          }
          groupBy: {
            args: Prisma.PrintJobGroupByArgs<ExtArgs>
            result: $Utils.Optional<PrintJobGroupByOutputType>[]
          }
          count: {
            args: Prisma.PrintJobCountArgs<ExtArgs>
            result: $Utils.Optional<PrintJobCountAggregateOutputType> | number
          }
        }
      }
      Configuration: {
        payload: Prisma.$ConfigurationPayload<ExtArgs>
        fields: Prisma.ConfigurationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConfigurationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfigurationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConfigurationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfigurationPayload>
          }
          findFirst: {
            args: Prisma.ConfigurationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfigurationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConfigurationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfigurationPayload>
          }
          findMany: {
            args: Prisma.ConfigurationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfigurationPayload>[]
          }
          create: {
            args: Prisma.ConfigurationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfigurationPayload>
          }
          createMany: {
            args: Prisma.ConfigurationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ConfigurationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfigurationPayload>[]
          }
          delete: {
            args: Prisma.ConfigurationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfigurationPayload>
          }
          update: {
            args: Prisma.ConfigurationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfigurationPayload>
          }
          deleteMany: {
            args: Prisma.ConfigurationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ConfigurationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ConfigurationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfigurationPayload>[]
          }
          upsert: {
            args: Prisma.ConfigurationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfigurationPayload>
          }
          aggregate: {
            args: Prisma.ConfigurationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConfiguration>
          }
          groupBy: {
            args: Prisma.ConfigurationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConfigurationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ConfigurationCountArgs<ExtArgs>
            result: $Utils.Optional<ConfigurationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    guestSession?: GuestSessionOmit
    genre?: GenreOmit
    book?: BookOmit
    character?: CharacterOmit
    bookTemplate?: BookTemplateOmit
    templatePageContent?: TemplatePageContentOmit
    page?: PageOmit
    imageGeneration?: ImageGenerationOmit
    order?: OrderOmit
    printJob?: PrintJobOmit
    configuration?: ConfigurationOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    books: number
    orders: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    books?: boolean | UserCountOutputTypeCountBooksArgs
    orders?: boolean | UserCountOutputTypeCountOrdersArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountBooksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
  }


  /**
   * Count Type GuestSessionCountOutputType
   */

  export type GuestSessionCountOutputType = {
    books: number
  }

  export type GuestSessionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    books?: boolean | GuestSessionCountOutputTypeCountBooksArgs
  }

  // Custom InputTypes
  /**
   * GuestSessionCountOutputType without action
   */
  export type GuestSessionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuestSessionCountOutputType
     */
    select?: GuestSessionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GuestSessionCountOutputType without action
   */
  export type GuestSessionCountOutputTypeCountBooksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookWhereInput
  }


  /**
   * Count Type GenreCountOutputType
   */

  export type GenreCountOutputType = {
    templates: number
  }

  export type GenreCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    templates?: boolean | GenreCountOutputTypeCountTemplatesArgs
  }

  // Custom InputTypes
  /**
   * GenreCountOutputType without action
   */
  export type GenreCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GenreCountOutputType
     */
    select?: GenreCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GenreCountOutputType without action
   */
  export type GenreCountOutputTypeCountTemplatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookTemplateWhereInput
  }


  /**
   * Count Type BookCountOutputType
   */

  export type BookCountOutputType = {
    pages: number
    imageGenerations: number
  }

  export type BookCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pages?: boolean | BookCountOutputTypeCountPagesArgs
    imageGenerations?: boolean | BookCountOutputTypeCountImageGenerationsArgs
  }

  // Custom InputTypes
  /**
   * BookCountOutputType without action
   */
  export type BookCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookCountOutputType
     */
    select?: BookCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BookCountOutputType without action
   */
  export type BookCountOutputTypeCountPagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PageWhereInput
  }

  /**
   * BookCountOutputType without action
   */
  export type BookCountOutputTypeCountImageGenerationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ImageGenerationWhereInput
  }


  /**
   * Count Type BookTemplateCountOutputType
   */

  export type BookTemplateCountOutputType = {
    pages: number
    books: number
    genres: number
  }

  export type BookTemplateCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pages?: boolean | BookTemplateCountOutputTypeCountPagesArgs
    books?: boolean | BookTemplateCountOutputTypeCountBooksArgs
    genres?: boolean | BookTemplateCountOutputTypeCountGenresArgs
  }

  // Custom InputTypes
  /**
   * BookTemplateCountOutputType without action
   */
  export type BookTemplateCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookTemplateCountOutputType
     */
    select?: BookTemplateCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BookTemplateCountOutputType without action
   */
  export type BookTemplateCountOutputTypeCountPagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TemplatePageContentWhereInput
  }

  /**
   * BookTemplateCountOutputType without action
   */
  export type BookTemplateCountOutputTypeCountBooksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookWhereInput
  }

  /**
   * BookTemplateCountOutputType without action
   */
  export type BookTemplateCountOutputTypeCountGenresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GenreWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    clerkId: string | null
    email: string | null
    isAdmin: boolean | null
    firstName: string | null
    lastName: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    clerkId: string | null
    email: string | null
    isAdmin: boolean | null
    firstName: string | null
    lastName: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    clerkId: number
    email: number
    isAdmin: number
    firstName: number
    lastName: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    clerkId?: true
    email?: true
    isAdmin?: true
    firstName?: true
    lastName?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    clerkId?: true
    email?: true
    isAdmin?: true
    firstName?: true
    lastName?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    clerkId?: true
    email?: true
    isAdmin?: true
    firstName?: true
    lastName?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    clerkId: string
    email: string
    isAdmin: boolean
    firstName: string | null
    lastName: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clerkId?: boolean
    email?: boolean
    isAdmin?: boolean
    firstName?: boolean
    lastName?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    books?: boolean | User$booksArgs<ExtArgs>
    orders?: boolean | User$ordersArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clerkId?: boolean
    email?: boolean
    isAdmin?: boolean
    firstName?: boolean
    lastName?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clerkId?: boolean
    email?: boolean
    isAdmin?: boolean
    firstName?: boolean
    lastName?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    clerkId?: boolean
    email?: boolean
    isAdmin?: boolean
    firstName?: boolean
    lastName?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "clerkId" | "email" | "isAdmin" | "firstName" | "lastName" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    books?: boolean | User$booksArgs<ExtArgs>
    orders?: boolean | User$ordersArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      books: Prisma.$BookPayload<ExtArgs>[]
      orders: Prisma.$OrderPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      clerkId: string
      email: string
      isAdmin: boolean
      firstName: string | null
      lastName: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    books<T extends User$booksArgs<ExtArgs> = {}>(args?: Subset<T, User$booksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    orders<T extends User$ordersArgs<ExtArgs> = {}>(args?: Subset<T, User$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly clerkId: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly isAdmin: FieldRef<"User", 'Boolean'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.books
   */
  export type User$booksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Book
     */
    omit?: BookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    where?: BookWhereInput
    orderBy?: BookOrderByWithRelationInput | BookOrderByWithRelationInput[]
    cursor?: BookWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookScalarFieldEnum | BookScalarFieldEnum[]
  }

  /**
   * User.orders
   */
  export type User$ordersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    cursor?: OrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model GuestSession
   */

  export type AggregateGuestSession = {
    _count: GuestSessionCountAggregateOutputType | null
    _min: GuestSessionMinAggregateOutputType | null
    _max: GuestSessionMaxAggregateOutputType | null
  }

  export type GuestSessionMinAggregateOutputType = {
    id: string | null
    sessionId: string | null
    lastActive: Date | null
    createdAt: Date | null
    expiresAt: Date | null
  }

  export type GuestSessionMaxAggregateOutputType = {
    id: string | null
    sessionId: string | null
    lastActive: Date | null
    createdAt: Date | null
    expiresAt: Date | null
  }

  export type GuestSessionCountAggregateOutputType = {
    id: number
    sessionId: number
    lastActive: number
    createdAt: number
    expiresAt: number
    _all: number
  }


  export type GuestSessionMinAggregateInputType = {
    id?: true
    sessionId?: true
    lastActive?: true
    createdAt?: true
    expiresAt?: true
  }

  export type GuestSessionMaxAggregateInputType = {
    id?: true
    sessionId?: true
    lastActive?: true
    createdAt?: true
    expiresAt?: true
  }

  export type GuestSessionCountAggregateInputType = {
    id?: true
    sessionId?: true
    lastActive?: true
    createdAt?: true
    expiresAt?: true
    _all?: true
  }

  export type GuestSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GuestSession to aggregate.
     */
    where?: GuestSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GuestSessions to fetch.
     */
    orderBy?: GuestSessionOrderByWithRelationInput | GuestSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GuestSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GuestSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GuestSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GuestSessions
    **/
    _count?: true | GuestSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GuestSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GuestSessionMaxAggregateInputType
  }

  export type GetGuestSessionAggregateType<T extends GuestSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateGuestSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGuestSession[P]>
      : GetScalarType<T[P], AggregateGuestSession[P]>
  }




  export type GuestSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GuestSessionWhereInput
    orderBy?: GuestSessionOrderByWithAggregationInput | GuestSessionOrderByWithAggregationInput[]
    by: GuestSessionScalarFieldEnum[] | GuestSessionScalarFieldEnum
    having?: GuestSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GuestSessionCountAggregateInputType | true
    _min?: GuestSessionMinAggregateInputType
    _max?: GuestSessionMaxAggregateInputType
  }

  export type GuestSessionGroupByOutputType = {
    id: string
    sessionId: string
    lastActive: Date
    createdAt: Date
    expiresAt: Date
    _count: GuestSessionCountAggregateOutputType | null
    _min: GuestSessionMinAggregateOutputType | null
    _max: GuestSessionMaxAggregateOutputType | null
  }

  type GetGuestSessionGroupByPayload<T extends GuestSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GuestSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GuestSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GuestSessionGroupByOutputType[P]>
            : GetScalarType<T[P], GuestSessionGroupByOutputType[P]>
        }
      >
    >


  export type GuestSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    lastActive?: boolean
    createdAt?: boolean
    expiresAt?: boolean
    books?: boolean | GuestSession$booksArgs<ExtArgs>
    _count?: boolean | GuestSessionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["guestSession"]>

  export type GuestSessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    lastActive?: boolean
    createdAt?: boolean
    expiresAt?: boolean
  }, ExtArgs["result"]["guestSession"]>

  export type GuestSessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    lastActive?: boolean
    createdAt?: boolean
    expiresAt?: boolean
  }, ExtArgs["result"]["guestSession"]>

  export type GuestSessionSelectScalar = {
    id?: boolean
    sessionId?: boolean
    lastActive?: boolean
    createdAt?: boolean
    expiresAt?: boolean
  }

  export type GuestSessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sessionId" | "lastActive" | "createdAt" | "expiresAt", ExtArgs["result"]["guestSession"]>
  export type GuestSessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    books?: boolean | GuestSession$booksArgs<ExtArgs>
    _count?: boolean | GuestSessionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type GuestSessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type GuestSessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $GuestSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GuestSession"
    objects: {
      books: Prisma.$BookPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sessionId: string
      lastActive: Date
      createdAt: Date
      expiresAt: Date
    }, ExtArgs["result"]["guestSession"]>
    composites: {}
  }

  type GuestSessionGetPayload<S extends boolean | null | undefined | GuestSessionDefaultArgs> = $Result.GetResult<Prisma.$GuestSessionPayload, S>

  type GuestSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GuestSessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GuestSessionCountAggregateInputType | true
    }

  export interface GuestSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GuestSession'], meta: { name: 'GuestSession' } }
    /**
     * Find zero or one GuestSession that matches the filter.
     * @param {GuestSessionFindUniqueArgs} args - Arguments to find a GuestSession
     * @example
     * // Get one GuestSession
     * const guestSession = await prisma.guestSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GuestSessionFindUniqueArgs>(args: SelectSubset<T, GuestSessionFindUniqueArgs<ExtArgs>>): Prisma__GuestSessionClient<$Result.GetResult<Prisma.$GuestSessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GuestSession that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GuestSessionFindUniqueOrThrowArgs} args - Arguments to find a GuestSession
     * @example
     * // Get one GuestSession
     * const guestSession = await prisma.guestSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GuestSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, GuestSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GuestSessionClient<$Result.GetResult<Prisma.$GuestSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GuestSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuestSessionFindFirstArgs} args - Arguments to find a GuestSession
     * @example
     * // Get one GuestSession
     * const guestSession = await prisma.guestSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GuestSessionFindFirstArgs>(args?: SelectSubset<T, GuestSessionFindFirstArgs<ExtArgs>>): Prisma__GuestSessionClient<$Result.GetResult<Prisma.$GuestSessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GuestSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuestSessionFindFirstOrThrowArgs} args - Arguments to find a GuestSession
     * @example
     * // Get one GuestSession
     * const guestSession = await prisma.guestSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GuestSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, GuestSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__GuestSessionClient<$Result.GetResult<Prisma.$GuestSessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GuestSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuestSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GuestSessions
     * const guestSessions = await prisma.guestSession.findMany()
     * 
     * // Get first 10 GuestSessions
     * const guestSessions = await prisma.guestSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const guestSessionWithIdOnly = await prisma.guestSession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GuestSessionFindManyArgs>(args?: SelectSubset<T, GuestSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GuestSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GuestSession.
     * @param {GuestSessionCreateArgs} args - Arguments to create a GuestSession.
     * @example
     * // Create one GuestSession
     * const GuestSession = await prisma.guestSession.create({
     *   data: {
     *     // ... data to create a GuestSession
     *   }
     * })
     * 
     */
    create<T extends GuestSessionCreateArgs>(args: SelectSubset<T, GuestSessionCreateArgs<ExtArgs>>): Prisma__GuestSessionClient<$Result.GetResult<Prisma.$GuestSessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GuestSessions.
     * @param {GuestSessionCreateManyArgs} args - Arguments to create many GuestSessions.
     * @example
     * // Create many GuestSessions
     * const guestSession = await prisma.guestSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GuestSessionCreateManyArgs>(args?: SelectSubset<T, GuestSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GuestSessions and returns the data saved in the database.
     * @param {GuestSessionCreateManyAndReturnArgs} args - Arguments to create many GuestSessions.
     * @example
     * // Create many GuestSessions
     * const guestSession = await prisma.guestSession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GuestSessions and only return the `id`
     * const guestSessionWithIdOnly = await prisma.guestSession.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GuestSessionCreateManyAndReturnArgs>(args?: SelectSubset<T, GuestSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GuestSessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a GuestSession.
     * @param {GuestSessionDeleteArgs} args - Arguments to delete one GuestSession.
     * @example
     * // Delete one GuestSession
     * const GuestSession = await prisma.guestSession.delete({
     *   where: {
     *     // ... filter to delete one GuestSession
     *   }
     * })
     * 
     */
    delete<T extends GuestSessionDeleteArgs>(args: SelectSubset<T, GuestSessionDeleteArgs<ExtArgs>>): Prisma__GuestSessionClient<$Result.GetResult<Prisma.$GuestSessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GuestSession.
     * @param {GuestSessionUpdateArgs} args - Arguments to update one GuestSession.
     * @example
     * // Update one GuestSession
     * const guestSession = await prisma.guestSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GuestSessionUpdateArgs>(args: SelectSubset<T, GuestSessionUpdateArgs<ExtArgs>>): Prisma__GuestSessionClient<$Result.GetResult<Prisma.$GuestSessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GuestSessions.
     * @param {GuestSessionDeleteManyArgs} args - Arguments to filter GuestSessions to delete.
     * @example
     * // Delete a few GuestSessions
     * const { count } = await prisma.guestSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GuestSessionDeleteManyArgs>(args?: SelectSubset<T, GuestSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GuestSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuestSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GuestSessions
     * const guestSession = await prisma.guestSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GuestSessionUpdateManyArgs>(args: SelectSubset<T, GuestSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GuestSessions and returns the data updated in the database.
     * @param {GuestSessionUpdateManyAndReturnArgs} args - Arguments to update many GuestSessions.
     * @example
     * // Update many GuestSessions
     * const guestSession = await prisma.guestSession.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GuestSessions and only return the `id`
     * const guestSessionWithIdOnly = await prisma.guestSession.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GuestSessionUpdateManyAndReturnArgs>(args: SelectSubset<T, GuestSessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GuestSessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one GuestSession.
     * @param {GuestSessionUpsertArgs} args - Arguments to update or create a GuestSession.
     * @example
     * // Update or create a GuestSession
     * const guestSession = await prisma.guestSession.upsert({
     *   create: {
     *     // ... data to create a GuestSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GuestSession we want to update
     *   }
     * })
     */
    upsert<T extends GuestSessionUpsertArgs>(args: SelectSubset<T, GuestSessionUpsertArgs<ExtArgs>>): Prisma__GuestSessionClient<$Result.GetResult<Prisma.$GuestSessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GuestSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuestSessionCountArgs} args - Arguments to filter GuestSessions to count.
     * @example
     * // Count the number of GuestSessions
     * const count = await prisma.guestSession.count({
     *   where: {
     *     // ... the filter for the GuestSessions we want to count
     *   }
     * })
    **/
    count<T extends GuestSessionCountArgs>(
      args?: Subset<T, GuestSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GuestSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GuestSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuestSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GuestSessionAggregateArgs>(args: Subset<T, GuestSessionAggregateArgs>): Prisma.PrismaPromise<GetGuestSessionAggregateType<T>>

    /**
     * Group by GuestSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuestSessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GuestSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GuestSessionGroupByArgs['orderBy'] }
        : { orderBy?: GuestSessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GuestSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGuestSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GuestSession model
   */
  readonly fields: GuestSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GuestSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GuestSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    books<T extends GuestSession$booksArgs<ExtArgs> = {}>(args?: Subset<T, GuestSession$booksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GuestSession model
   */
  interface GuestSessionFieldRefs {
    readonly id: FieldRef<"GuestSession", 'String'>
    readonly sessionId: FieldRef<"GuestSession", 'String'>
    readonly lastActive: FieldRef<"GuestSession", 'DateTime'>
    readonly createdAt: FieldRef<"GuestSession", 'DateTime'>
    readonly expiresAt: FieldRef<"GuestSession", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GuestSession findUnique
   */
  export type GuestSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuestSession
     */
    select?: GuestSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuestSession
     */
    omit?: GuestSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestSessionInclude<ExtArgs> | null
    /**
     * Filter, which GuestSession to fetch.
     */
    where: GuestSessionWhereUniqueInput
  }

  /**
   * GuestSession findUniqueOrThrow
   */
  export type GuestSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuestSession
     */
    select?: GuestSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuestSession
     */
    omit?: GuestSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestSessionInclude<ExtArgs> | null
    /**
     * Filter, which GuestSession to fetch.
     */
    where: GuestSessionWhereUniqueInput
  }

  /**
   * GuestSession findFirst
   */
  export type GuestSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuestSession
     */
    select?: GuestSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuestSession
     */
    omit?: GuestSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestSessionInclude<ExtArgs> | null
    /**
     * Filter, which GuestSession to fetch.
     */
    where?: GuestSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GuestSessions to fetch.
     */
    orderBy?: GuestSessionOrderByWithRelationInput | GuestSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GuestSessions.
     */
    cursor?: GuestSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GuestSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GuestSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GuestSessions.
     */
    distinct?: GuestSessionScalarFieldEnum | GuestSessionScalarFieldEnum[]
  }

  /**
   * GuestSession findFirstOrThrow
   */
  export type GuestSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuestSession
     */
    select?: GuestSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuestSession
     */
    omit?: GuestSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestSessionInclude<ExtArgs> | null
    /**
     * Filter, which GuestSession to fetch.
     */
    where?: GuestSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GuestSessions to fetch.
     */
    orderBy?: GuestSessionOrderByWithRelationInput | GuestSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GuestSessions.
     */
    cursor?: GuestSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GuestSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GuestSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GuestSessions.
     */
    distinct?: GuestSessionScalarFieldEnum | GuestSessionScalarFieldEnum[]
  }

  /**
   * GuestSession findMany
   */
  export type GuestSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuestSession
     */
    select?: GuestSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuestSession
     */
    omit?: GuestSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestSessionInclude<ExtArgs> | null
    /**
     * Filter, which GuestSessions to fetch.
     */
    where?: GuestSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GuestSessions to fetch.
     */
    orderBy?: GuestSessionOrderByWithRelationInput | GuestSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GuestSessions.
     */
    cursor?: GuestSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GuestSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GuestSessions.
     */
    skip?: number
    distinct?: GuestSessionScalarFieldEnum | GuestSessionScalarFieldEnum[]
  }

  /**
   * GuestSession create
   */
  export type GuestSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuestSession
     */
    select?: GuestSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuestSession
     */
    omit?: GuestSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestSessionInclude<ExtArgs> | null
    /**
     * The data needed to create a GuestSession.
     */
    data: XOR<GuestSessionCreateInput, GuestSessionUncheckedCreateInput>
  }

  /**
   * GuestSession createMany
   */
  export type GuestSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GuestSessions.
     */
    data: GuestSessionCreateManyInput | GuestSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GuestSession createManyAndReturn
   */
  export type GuestSessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuestSession
     */
    select?: GuestSessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GuestSession
     */
    omit?: GuestSessionOmit<ExtArgs> | null
    /**
     * The data used to create many GuestSessions.
     */
    data: GuestSessionCreateManyInput | GuestSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GuestSession update
   */
  export type GuestSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuestSession
     */
    select?: GuestSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuestSession
     */
    omit?: GuestSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestSessionInclude<ExtArgs> | null
    /**
     * The data needed to update a GuestSession.
     */
    data: XOR<GuestSessionUpdateInput, GuestSessionUncheckedUpdateInput>
    /**
     * Choose, which GuestSession to update.
     */
    where: GuestSessionWhereUniqueInput
  }

  /**
   * GuestSession updateMany
   */
  export type GuestSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GuestSessions.
     */
    data: XOR<GuestSessionUpdateManyMutationInput, GuestSessionUncheckedUpdateManyInput>
    /**
     * Filter which GuestSessions to update
     */
    where?: GuestSessionWhereInput
    /**
     * Limit how many GuestSessions to update.
     */
    limit?: number
  }

  /**
   * GuestSession updateManyAndReturn
   */
  export type GuestSessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuestSession
     */
    select?: GuestSessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GuestSession
     */
    omit?: GuestSessionOmit<ExtArgs> | null
    /**
     * The data used to update GuestSessions.
     */
    data: XOR<GuestSessionUpdateManyMutationInput, GuestSessionUncheckedUpdateManyInput>
    /**
     * Filter which GuestSessions to update
     */
    where?: GuestSessionWhereInput
    /**
     * Limit how many GuestSessions to update.
     */
    limit?: number
  }

  /**
   * GuestSession upsert
   */
  export type GuestSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuestSession
     */
    select?: GuestSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuestSession
     */
    omit?: GuestSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestSessionInclude<ExtArgs> | null
    /**
     * The filter to search for the GuestSession to update in case it exists.
     */
    where: GuestSessionWhereUniqueInput
    /**
     * In case the GuestSession found by the `where` argument doesn't exist, create a new GuestSession with this data.
     */
    create: XOR<GuestSessionCreateInput, GuestSessionUncheckedCreateInput>
    /**
     * In case the GuestSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GuestSessionUpdateInput, GuestSessionUncheckedUpdateInput>
  }

  /**
   * GuestSession delete
   */
  export type GuestSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuestSession
     */
    select?: GuestSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuestSession
     */
    omit?: GuestSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestSessionInclude<ExtArgs> | null
    /**
     * Filter which GuestSession to delete.
     */
    where: GuestSessionWhereUniqueInput
  }

  /**
   * GuestSession deleteMany
   */
  export type GuestSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GuestSessions to delete
     */
    where?: GuestSessionWhereInput
    /**
     * Limit how many GuestSessions to delete.
     */
    limit?: number
  }

  /**
   * GuestSession.books
   */
  export type GuestSession$booksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Book
     */
    omit?: BookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    where?: BookWhereInput
    orderBy?: BookOrderByWithRelationInput | BookOrderByWithRelationInput[]
    cursor?: BookWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookScalarFieldEnum | BookScalarFieldEnum[]
  }

  /**
   * GuestSession without action
   */
  export type GuestSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuestSession
     */
    select?: GuestSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuestSession
     */
    omit?: GuestSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestSessionInclude<ExtArgs> | null
  }


  /**
   * Model Genre
   */

  export type AggregateGenre = {
    _count: GenreCountAggregateOutputType | null
    _min: GenreMinAggregateOutputType | null
    _max: GenreMaxAggregateOutputType | null
  }

  export type GenreMinAggregateOutputType = {
    id: string | null
    name: string | null
  }

  export type GenreMaxAggregateOutputType = {
    id: string | null
    name: string | null
  }

  export type GenreCountAggregateOutputType = {
    id: number
    name: number
    _all: number
  }


  export type GenreMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type GenreMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type GenreCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type GenreAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Genre to aggregate.
     */
    where?: GenreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Genres to fetch.
     */
    orderBy?: GenreOrderByWithRelationInput | GenreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GenreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Genres from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Genres.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Genres
    **/
    _count?: true | GenreCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GenreMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GenreMaxAggregateInputType
  }

  export type GetGenreAggregateType<T extends GenreAggregateArgs> = {
        [P in keyof T & keyof AggregateGenre]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGenre[P]>
      : GetScalarType<T[P], AggregateGenre[P]>
  }




  export type GenreGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GenreWhereInput
    orderBy?: GenreOrderByWithAggregationInput | GenreOrderByWithAggregationInput[]
    by: GenreScalarFieldEnum[] | GenreScalarFieldEnum
    having?: GenreScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GenreCountAggregateInputType | true
    _min?: GenreMinAggregateInputType
    _max?: GenreMaxAggregateInputType
  }

  export type GenreGroupByOutputType = {
    id: string
    name: string
    _count: GenreCountAggregateOutputType | null
    _min: GenreMinAggregateOutputType | null
    _max: GenreMaxAggregateOutputType | null
  }

  type GetGenreGroupByPayload<T extends GenreGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GenreGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GenreGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GenreGroupByOutputType[P]>
            : GetScalarType<T[P], GenreGroupByOutputType[P]>
        }
      >
    >


  export type GenreSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    templates?: boolean | Genre$templatesArgs<ExtArgs>
    _count?: boolean | GenreCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["genre"]>

  export type GenreSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["genre"]>

  export type GenreSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["genre"]>

  export type GenreSelectScalar = {
    id?: boolean
    name?: boolean
  }

  export type GenreOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name", ExtArgs["result"]["genre"]>
  export type GenreInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    templates?: boolean | Genre$templatesArgs<ExtArgs>
    _count?: boolean | GenreCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type GenreIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type GenreIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $GenrePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Genre"
    objects: {
      templates: Prisma.$BookTemplatePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
    }, ExtArgs["result"]["genre"]>
    composites: {}
  }

  type GenreGetPayload<S extends boolean | null | undefined | GenreDefaultArgs> = $Result.GetResult<Prisma.$GenrePayload, S>

  type GenreCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GenreFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GenreCountAggregateInputType | true
    }

  export interface GenreDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Genre'], meta: { name: 'Genre' } }
    /**
     * Find zero or one Genre that matches the filter.
     * @param {GenreFindUniqueArgs} args - Arguments to find a Genre
     * @example
     * // Get one Genre
     * const genre = await prisma.genre.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GenreFindUniqueArgs>(args: SelectSubset<T, GenreFindUniqueArgs<ExtArgs>>): Prisma__GenreClient<$Result.GetResult<Prisma.$GenrePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Genre that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GenreFindUniqueOrThrowArgs} args - Arguments to find a Genre
     * @example
     * // Get one Genre
     * const genre = await prisma.genre.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GenreFindUniqueOrThrowArgs>(args: SelectSubset<T, GenreFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GenreClient<$Result.GetResult<Prisma.$GenrePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Genre that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GenreFindFirstArgs} args - Arguments to find a Genre
     * @example
     * // Get one Genre
     * const genre = await prisma.genre.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GenreFindFirstArgs>(args?: SelectSubset<T, GenreFindFirstArgs<ExtArgs>>): Prisma__GenreClient<$Result.GetResult<Prisma.$GenrePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Genre that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GenreFindFirstOrThrowArgs} args - Arguments to find a Genre
     * @example
     * // Get one Genre
     * const genre = await prisma.genre.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GenreFindFirstOrThrowArgs>(args?: SelectSubset<T, GenreFindFirstOrThrowArgs<ExtArgs>>): Prisma__GenreClient<$Result.GetResult<Prisma.$GenrePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Genres that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GenreFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Genres
     * const genres = await prisma.genre.findMany()
     * 
     * // Get first 10 Genres
     * const genres = await prisma.genre.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const genreWithIdOnly = await prisma.genre.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GenreFindManyArgs>(args?: SelectSubset<T, GenreFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GenrePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Genre.
     * @param {GenreCreateArgs} args - Arguments to create a Genre.
     * @example
     * // Create one Genre
     * const Genre = await prisma.genre.create({
     *   data: {
     *     // ... data to create a Genre
     *   }
     * })
     * 
     */
    create<T extends GenreCreateArgs>(args: SelectSubset<T, GenreCreateArgs<ExtArgs>>): Prisma__GenreClient<$Result.GetResult<Prisma.$GenrePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Genres.
     * @param {GenreCreateManyArgs} args - Arguments to create many Genres.
     * @example
     * // Create many Genres
     * const genre = await prisma.genre.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GenreCreateManyArgs>(args?: SelectSubset<T, GenreCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Genres and returns the data saved in the database.
     * @param {GenreCreateManyAndReturnArgs} args - Arguments to create many Genres.
     * @example
     * // Create many Genres
     * const genre = await prisma.genre.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Genres and only return the `id`
     * const genreWithIdOnly = await prisma.genre.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GenreCreateManyAndReturnArgs>(args?: SelectSubset<T, GenreCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GenrePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Genre.
     * @param {GenreDeleteArgs} args - Arguments to delete one Genre.
     * @example
     * // Delete one Genre
     * const Genre = await prisma.genre.delete({
     *   where: {
     *     // ... filter to delete one Genre
     *   }
     * })
     * 
     */
    delete<T extends GenreDeleteArgs>(args: SelectSubset<T, GenreDeleteArgs<ExtArgs>>): Prisma__GenreClient<$Result.GetResult<Prisma.$GenrePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Genre.
     * @param {GenreUpdateArgs} args - Arguments to update one Genre.
     * @example
     * // Update one Genre
     * const genre = await prisma.genre.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GenreUpdateArgs>(args: SelectSubset<T, GenreUpdateArgs<ExtArgs>>): Prisma__GenreClient<$Result.GetResult<Prisma.$GenrePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Genres.
     * @param {GenreDeleteManyArgs} args - Arguments to filter Genres to delete.
     * @example
     * // Delete a few Genres
     * const { count } = await prisma.genre.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GenreDeleteManyArgs>(args?: SelectSubset<T, GenreDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Genres.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GenreUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Genres
     * const genre = await prisma.genre.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GenreUpdateManyArgs>(args: SelectSubset<T, GenreUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Genres and returns the data updated in the database.
     * @param {GenreUpdateManyAndReturnArgs} args - Arguments to update many Genres.
     * @example
     * // Update many Genres
     * const genre = await prisma.genre.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Genres and only return the `id`
     * const genreWithIdOnly = await prisma.genre.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GenreUpdateManyAndReturnArgs>(args: SelectSubset<T, GenreUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GenrePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Genre.
     * @param {GenreUpsertArgs} args - Arguments to update or create a Genre.
     * @example
     * // Update or create a Genre
     * const genre = await prisma.genre.upsert({
     *   create: {
     *     // ... data to create a Genre
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Genre we want to update
     *   }
     * })
     */
    upsert<T extends GenreUpsertArgs>(args: SelectSubset<T, GenreUpsertArgs<ExtArgs>>): Prisma__GenreClient<$Result.GetResult<Prisma.$GenrePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Genres.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GenreCountArgs} args - Arguments to filter Genres to count.
     * @example
     * // Count the number of Genres
     * const count = await prisma.genre.count({
     *   where: {
     *     // ... the filter for the Genres we want to count
     *   }
     * })
    **/
    count<T extends GenreCountArgs>(
      args?: Subset<T, GenreCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GenreCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Genre.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GenreAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GenreAggregateArgs>(args: Subset<T, GenreAggregateArgs>): Prisma.PrismaPromise<GetGenreAggregateType<T>>

    /**
     * Group by Genre.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GenreGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GenreGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GenreGroupByArgs['orderBy'] }
        : { orderBy?: GenreGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GenreGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGenreGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Genre model
   */
  readonly fields: GenreFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Genre.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GenreClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    templates<T extends Genre$templatesArgs<ExtArgs> = {}>(args?: Subset<T, Genre$templatesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookTemplatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Genre model
   */
  interface GenreFieldRefs {
    readonly id: FieldRef<"Genre", 'String'>
    readonly name: FieldRef<"Genre", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Genre findUnique
   */
  export type GenreFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Genre
     */
    select?: GenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Genre
     */
    omit?: GenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenreInclude<ExtArgs> | null
    /**
     * Filter, which Genre to fetch.
     */
    where: GenreWhereUniqueInput
  }

  /**
   * Genre findUniqueOrThrow
   */
  export type GenreFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Genre
     */
    select?: GenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Genre
     */
    omit?: GenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenreInclude<ExtArgs> | null
    /**
     * Filter, which Genre to fetch.
     */
    where: GenreWhereUniqueInput
  }

  /**
   * Genre findFirst
   */
  export type GenreFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Genre
     */
    select?: GenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Genre
     */
    omit?: GenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenreInclude<ExtArgs> | null
    /**
     * Filter, which Genre to fetch.
     */
    where?: GenreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Genres to fetch.
     */
    orderBy?: GenreOrderByWithRelationInput | GenreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Genres.
     */
    cursor?: GenreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Genres from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Genres.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Genres.
     */
    distinct?: GenreScalarFieldEnum | GenreScalarFieldEnum[]
  }

  /**
   * Genre findFirstOrThrow
   */
  export type GenreFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Genre
     */
    select?: GenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Genre
     */
    omit?: GenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenreInclude<ExtArgs> | null
    /**
     * Filter, which Genre to fetch.
     */
    where?: GenreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Genres to fetch.
     */
    orderBy?: GenreOrderByWithRelationInput | GenreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Genres.
     */
    cursor?: GenreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Genres from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Genres.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Genres.
     */
    distinct?: GenreScalarFieldEnum | GenreScalarFieldEnum[]
  }

  /**
   * Genre findMany
   */
  export type GenreFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Genre
     */
    select?: GenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Genre
     */
    omit?: GenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenreInclude<ExtArgs> | null
    /**
     * Filter, which Genres to fetch.
     */
    where?: GenreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Genres to fetch.
     */
    orderBy?: GenreOrderByWithRelationInput | GenreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Genres.
     */
    cursor?: GenreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Genres from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Genres.
     */
    skip?: number
    distinct?: GenreScalarFieldEnum | GenreScalarFieldEnum[]
  }

  /**
   * Genre create
   */
  export type GenreCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Genre
     */
    select?: GenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Genre
     */
    omit?: GenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenreInclude<ExtArgs> | null
    /**
     * The data needed to create a Genre.
     */
    data: XOR<GenreCreateInput, GenreUncheckedCreateInput>
  }

  /**
   * Genre createMany
   */
  export type GenreCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Genres.
     */
    data: GenreCreateManyInput | GenreCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Genre createManyAndReturn
   */
  export type GenreCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Genre
     */
    select?: GenreSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Genre
     */
    omit?: GenreOmit<ExtArgs> | null
    /**
     * The data used to create many Genres.
     */
    data: GenreCreateManyInput | GenreCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Genre update
   */
  export type GenreUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Genre
     */
    select?: GenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Genre
     */
    omit?: GenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenreInclude<ExtArgs> | null
    /**
     * The data needed to update a Genre.
     */
    data: XOR<GenreUpdateInput, GenreUncheckedUpdateInput>
    /**
     * Choose, which Genre to update.
     */
    where: GenreWhereUniqueInput
  }

  /**
   * Genre updateMany
   */
  export type GenreUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Genres.
     */
    data: XOR<GenreUpdateManyMutationInput, GenreUncheckedUpdateManyInput>
    /**
     * Filter which Genres to update
     */
    where?: GenreWhereInput
    /**
     * Limit how many Genres to update.
     */
    limit?: number
  }

  /**
   * Genre updateManyAndReturn
   */
  export type GenreUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Genre
     */
    select?: GenreSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Genre
     */
    omit?: GenreOmit<ExtArgs> | null
    /**
     * The data used to update Genres.
     */
    data: XOR<GenreUpdateManyMutationInput, GenreUncheckedUpdateManyInput>
    /**
     * Filter which Genres to update
     */
    where?: GenreWhereInput
    /**
     * Limit how many Genres to update.
     */
    limit?: number
  }

  /**
   * Genre upsert
   */
  export type GenreUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Genre
     */
    select?: GenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Genre
     */
    omit?: GenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenreInclude<ExtArgs> | null
    /**
     * The filter to search for the Genre to update in case it exists.
     */
    where: GenreWhereUniqueInput
    /**
     * In case the Genre found by the `where` argument doesn't exist, create a new Genre with this data.
     */
    create: XOR<GenreCreateInput, GenreUncheckedCreateInput>
    /**
     * In case the Genre was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GenreUpdateInput, GenreUncheckedUpdateInput>
  }

  /**
   * Genre delete
   */
  export type GenreDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Genre
     */
    select?: GenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Genre
     */
    omit?: GenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenreInclude<ExtArgs> | null
    /**
     * Filter which Genre to delete.
     */
    where: GenreWhereUniqueInput
  }

  /**
   * Genre deleteMany
   */
  export type GenreDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Genres to delete
     */
    where?: GenreWhereInput
    /**
     * Limit how many Genres to delete.
     */
    limit?: number
  }

  /**
   * Genre.templates
   */
  export type Genre$templatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookTemplate
     */
    select?: BookTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookTemplate
     */
    omit?: BookTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookTemplateInclude<ExtArgs> | null
    where?: BookTemplateWhereInput
    orderBy?: BookTemplateOrderByWithRelationInput | BookTemplateOrderByWithRelationInput[]
    cursor?: BookTemplateWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookTemplateScalarFieldEnum | BookTemplateScalarFieldEnum[]
  }

  /**
   * Genre without action
   */
  export type GenreDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Genre
     */
    select?: GenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Genre
     */
    omit?: GenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenreInclude<ExtArgs> | null
  }


  /**
   * Model Book
   */

  export type AggregateBook = {
    _count: BookCountAggregateOutputType | null
    _avg: BookAvgAggregateOutputType | null
    _sum: BookSumAggregateOutputType | null
    _min: BookMinAggregateOutputType | null
    _max: BookMaxAggregateOutputType | null
  }

  export type BookAvgAggregateOutputType = {
    pageCount: number | null
  }

  export type BookSumAggregateOutputType = {
    pageCount: number | null
  }

  export type BookMinAggregateOutputType = {
    id: string | null
    title: string | null
    status: $Enums.BookStatus | null
    characterImageReference: string | null
    coverImage: string | null
    coverPrompt: string | null
    pageCount: number | null
    coverDedication: string | null
    pageDedication: string | null
    templateId: string | null
    userId: string | null
    guestSessionId: string | null
    orderId: string | null
    printJobId: string | null
    printingDeadline: Date | null
    ebookS3Key: string | null
    ebookFileName: string | null
    ebookFileType: string | null
    ebookExpiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BookMaxAggregateOutputType = {
    id: string | null
    title: string | null
    status: $Enums.BookStatus | null
    characterImageReference: string | null
    coverImage: string | null
    coverPrompt: string | null
    pageCount: number | null
    coverDedication: string | null
    pageDedication: string | null
    templateId: string | null
    userId: string | null
    guestSessionId: string | null
    orderId: string | null
    printJobId: string | null
    printingDeadline: Date | null
    ebookS3Key: string | null
    ebookFileName: string | null
    ebookFileType: string | null
    ebookExpiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BookCountAggregateOutputType = {
    id: number
    title: number
    status: number
    characterImageReference: number
    coverImage: number
    coverImageOptions: number
    coverPrompt: number
    pageCount: number
    coverDedication: number
    pageDedication: number
    templateId: number
    userId: number
    guestSessionId: number
    orderId: number
    printJobId: number
    printingDeadline: number
    ebookS3Key: number
    ebookFileName: number
    ebookFileType: number
    ebookExpiresAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BookAvgAggregateInputType = {
    pageCount?: true
  }

  export type BookSumAggregateInputType = {
    pageCount?: true
  }

  export type BookMinAggregateInputType = {
    id?: true
    title?: true
    status?: true
    characterImageReference?: true
    coverImage?: true
    coverPrompt?: true
    pageCount?: true
    coverDedication?: true
    pageDedication?: true
    templateId?: true
    userId?: true
    guestSessionId?: true
    orderId?: true
    printJobId?: true
    printingDeadline?: true
    ebookS3Key?: true
    ebookFileName?: true
    ebookFileType?: true
    ebookExpiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BookMaxAggregateInputType = {
    id?: true
    title?: true
    status?: true
    characterImageReference?: true
    coverImage?: true
    coverPrompt?: true
    pageCount?: true
    coverDedication?: true
    pageDedication?: true
    templateId?: true
    userId?: true
    guestSessionId?: true
    orderId?: true
    printJobId?: true
    printingDeadline?: true
    ebookS3Key?: true
    ebookFileName?: true
    ebookFileType?: true
    ebookExpiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BookCountAggregateInputType = {
    id?: true
    title?: true
    status?: true
    characterImageReference?: true
    coverImage?: true
    coverImageOptions?: true
    coverPrompt?: true
    pageCount?: true
    coverDedication?: true
    pageDedication?: true
    templateId?: true
    userId?: true
    guestSessionId?: true
    orderId?: true
    printJobId?: true
    printingDeadline?: true
    ebookS3Key?: true
    ebookFileName?: true
    ebookFileType?: true
    ebookExpiresAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BookAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Book to aggregate.
     */
    where?: BookWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Books to fetch.
     */
    orderBy?: BookOrderByWithRelationInput | BookOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BookWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Books from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Books.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Books
    **/
    _count?: true | BookCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BookAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BookSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BookMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BookMaxAggregateInputType
  }

  export type GetBookAggregateType<T extends BookAggregateArgs> = {
        [P in keyof T & keyof AggregateBook]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBook[P]>
      : GetScalarType<T[P], AggregateBook[P]>
  }




  export type BookGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookWhereInput
    orderBy?: BookOrderByWithAggregationInput | BookOrderByWithAggregationInput[]
    by: BookScalarFieldEnum[] | BookScalarFieldEnum
    having?: BookScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BookCountAggregateInputType | true
    _avg?: BookAvgAggregateInputType
    _sum?: BookSumAggregateInputType
    _min?: BookMinAggregateInputType
    _max?: BookMaxAggregateInputType
  }

  export type BookGroupByOutputType = {
    id: string
    title: string
    status: $Enums.BookStatus
    characterImageReference: string | null
    coverImage: string | null
    coverImageOptions: string[]
    coverPrompt: string
    pageCount: number
    coverDedication: string | null
    pageDedication: string | null
    templateId: string
    userId: string | null
    guestSessionId: string | null
    orderId: string | null
    printJobId: string | null
    printingDeadline: Date | null
    ebookS3Key: string | null
    ebookFileName: string | null
    ebookFileType: string | null
    ebookExpiresAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: BookCountAggregateOutputType | null
    _avg: BookAvgAggregateOutputType | null
    _sum: BookSumAggregateOutputType | null
    _min: BookMinAggregateOutputType | null
    _max: BookMaxAggregateOutputType | null
  }

  type GetBookGroupByPayload<T extends BookGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BookGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BookGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BookGroupByOutputType[P]>
            : GetScalarType<T[P], BookGroupByOutputType[P]>
        }
      >
    >


  export type BookSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    status?: boolean
    characterImageReference?: boolean
    coverImage?: boolean
    coverImageOptions?: boolean
    coverPrompt?: boolean
    pageCount?: boolean
    coverDedication?: boolean
    pageDedication?: boolean
    templateId?: boolean
    userId?: boolean
    guestSessionId?: boolean
    orderId?: boolean
    printJobId?: boolean
    printingDeadline?: boolean
    ebookS3Key?: boolean
    ebookFileName?: boolean
    ebookFileType?: boolean
    ebookExpiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    pages?: boolean | Book$pagesArgs<ExtArgs>
    character?: boolean | Book$characterArgs<ExtArgs>
    template?: boolean | BookTemplateDefaultArgs<ExtArgs>
    user?: boolean | Book$userArgs<ExtArgs>
    guestSession?: boolean | Book$guestSessionArgs<ExtArgs>
    imageGenerations?: boolean | Book$imageGenerationsArgs<ExtArgs>
    order?: boolean | Book$orderArgs<ExtArgs>
    printJob?: boolean | Book$printJobArgs<ExtArgs>
    _count?: boolean | BookCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["book"]>

  export type BookSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    status?: boolean
    characterImageReference?: boolean
    coverImage?: boolean
    coverImageOptions?: boolean
    coverPrompt?: boolean
    pageCount?: boolean
    coverDedication?: boolean
    pageDedication?: boolean
    templateId?: boolean
    userId?: boolean
    guestSessionId?: boolean
    orderId?: boolean
    printJobId?: boolean
    printingDeadline?: boolean
    ebookS3Key?: boolean
    ebookFileName?: boolean
    ebookFileType?: boolean
    ebookExpiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    template?: boolean | BookTemplateDefaultArgs<ExtArgs>
    user?: boolean | Book$userArgs<ExtArgs>
    guestSession?: boolean | Book$guestSessionArgs<ExtArgs>
  }, ExtArgs["result"]["book"]>

  export type BookSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    status?: boolean
    characterImageReference?: boolean
    coverImage?: boolean
    coverImageOptions?: boolean
    coverPrompt?: boolean
    pageCount?: boolean
    coverDedication?: boolean
    pageDedication?: boolean
    templateId?: boolean
    userId?: boolean
    guestSessionId?: boolean
    orderId?: boolean
    printJobId?: boolean
    printingDeadline?: boolean
    ebookS3Key?: boolean
    ebookFileName?: boolean
    ebookFileType?: boolean
    ebookExpiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    template?: boolean | BookTemplateDefaultArgs<ExtArgs>
    user?: boolean | Book$userArgs<ExtArgs>
    guestSession?: boolean | Book$guestSessionArgs<ExtArgs>
  }, ExtArgs["result"]["book"]>

  export type BookSelectScalar = {
    id?: boolean
    title?: boolean
    status?: boolean
    characterImageReference?: boolean
    coverImage?: boolean
    coverImageOptions?: boolean
    coverPrompt?: boolean
    pageCount?: boolean
    coverDedication?: boolean
    pageDedication?: boolean
    templateId?: boolean
    userId?: boolean
    guestSessionId?: boolean
    orderId?: boolean
    printJobId?: boolean
    printingDeadline?: boolean
    ebookS3Key?: boolean
    ebookFileName?: boolean
    ebookFileType?: boolean
    ebookExpiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BookOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "status" | "characterImageReference" | "coverImage" | "coverImageOptions" | "coverPrompt" | "pageCount" | "coverDedication" | "pageDedication" | "templateId" | "userId" | "guestSessionId" | "orderId" | "printJobId" | "printingDeadline" | "ebookS3Key" | "ebookFileName" | "ebookFileType" | "ebookExpiresAt" | "createdAt" | "updatedAt", ExtArgs["result"]["book"]>
  export type BookInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pages?: boolean | Book$pagesArgs<ExtArgs>
    character?: boolean | Book$characterArgs<ExtArgs>
    template?: boolean | BookTemplateDefaultArgs<ExtArgs>
    user?: boolean | Book$userArgs<ExtArgs>
    guestSession?: boolean | Book$guestSessionArgs<ExtArgs>
    imageGenerations?: boolean | Book$imageGenerationsArgs<ExtArgs>
    order?: boolean | Book$orderArgs<ExtArgs>
    printJob?: boolean | Book$printJobArgs<ExtArgs>
    _count?: boolean | BookCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BookIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    template?: boolean | BookTemplateDefaultArgs<ExtArgs>
    user?: boolean | Book$userArgs<ExtArgs>
    guestSession?: boolean | Book$guestSessionArgs<ExtArgs>
  }
  export type BookIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    template?: boolean | BookTemplateDefaultArgs<ExtArgs>
    user?: boolean | Book$userArgs<ExtArgs>
    guestSession?: boolean | Book$guestSessionArgs<ExtArgs>
  }

  export type $BookPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Book"
    objects: {
      pages: Prisma.$PagePayload<ExtArgs>[]
      character: Prisma.$CharacterPayload<ExtArgs> | null
      template: Prisma.$BookTemplatePayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs> | null
      guestSession: Prisma.$GuestSessionPayload<ExtArgs> | null
      imageGenerations: Prisma.$ImageGenerationPayload<ExtArgs>[]
      order: Prisma.$OrderPayload<ExtArgs> | null
      printJob: Prisma.$PrintJobPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      status: $Enums.BookStatus
      characterImageReference: string | null
      coverImage: string | null
      coverImageOptions: string[]
      coverPrompt: string
      pageCount: number
      coverDedication: string | null
      pageDedication: string | null
      templateId: string
      userId: string | null
      guestSessionId: string | null
      orderId: string | null
      printJobId: string | null
      printingDeadline: Date | null
      ebookS3Key: string | null
      ebookFileName: string | null
      ebookFileType: string | null
      ebookExpiresAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["book"]>
    composites: {}
  }

  type BookGetPayload<S extends boolean | null | undefined | BookDefaultArgs> = $Result.GetResult<Prisma.$BookPayload, S>

  type BookCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BookFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BookCountAggregateInputType | true
    }

  export interface BookDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Book'], meta: { name: 'Book' } }
    /**
     * Find zero or one Book that matches the filter.
     * @param {BookFindUniqueArgs} args - Arguments to find a Book
     * @example
     * // Get one Book
     * const book = await prisma.book.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BookFindUniqueArgs>(args: SelectSubset<T, BookFindUniqueArgs<ExtArgs>>): Prisma__BookClient<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Book that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BookFindUniqueOrThrowArgs} args - Arguments to find a Book
     * @example
     * // Get one Book
     * const book = await prisma.book.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BookFindUniqueOrThrowArgs>(args: SelectSubset<T, BookFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BookClient<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Book that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookFindFirstArgs} args - Arguments to find a Book
     * @example
     * // Get one Book
     * const book = await prisma.book.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BookFindFirstArgs>(args?: SelectSubset<T, BookFindFirstArgs<ExtArgs>>): Prisma__BookClient<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Book that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookFindFirstOrThrowArgs} args - Arguments to find a Book
     * @example
     * // Get one Book
     * const book = await prisma.book.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BookFindFirstOrThrowArgs>(args?: SelectSubset<T, BookFindFirstOrThrowArgs<ExtArgs>>): Prisma__BookClient<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Books that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Books
     * const books = await prisma.book.findMany()
     * 
     * // Get first 10 Books
     * const books = await prisma.book.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bookWithIdOnly = await prisma.book.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BookFindManyArgs>(args?: SelectSubset<T, BookFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Book.
     * @param {BookCreateArgs} args - Arguments to create a Book.
     * @example
     * // Create one Book
     * const Book = await prisma.book.create({
     *   data: {
     *     // ... data to create a Book
     *   }
     * })
     * 
     */
    create<T extends BookCreateArgs>(args: SelectSubset<T, BookCreateArgs<ExtArgs>>): Prisma__BookClient<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Books.
     * @param {BookCreateManyArgs} args - Arguments to create many Books.
     * @example
     * // Create many Books
     * const book = await prisma.book.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BookCreateManyArgs>(args?: SelectSubset<T, BookCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Books and returns the data saved in the database.
     * @param {BookCreateManyAndReturnArgs} args - Arguments to create many Books.
     * @example
     * // Create many Books
     * const book = await prisma.book.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Books and only return the `id`
     * const bookWithIdOnly = await prisma.book.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BookCreateManyAndReturnArgs>(args?: SelectSubset<T, BookCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Book.
     * @param {BookDeleteArgs} args - Arguments to delete one Book.
     * @example
     * // Delete one Book
     * const Book = await prisma.book.delete({
     *   where: {
     *     // ... filter to delete one Book
     *   }
     * })
     * 
     */
    delete<T extends BookDeleteArgs>(args: SelectSubset<T, BookDeleteArgs<ExtArgs>>): Prisma__BookClient<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Book.
     * @param {BookUpdateArgs} args - Arguments to update one Book.
     * @example
     * // Update one Book
     * const book = await prisma.book.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BookUpdateArgs>(args: SelectSubset<T, BookUpdateArgs<ExtArgs>>): Prisma__BookClient<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Books.
     * @param {BookDeleteManyArgs} args - Arguments to filter Books to delete.
     * @example
     * // Delete a few Books
     * const { count } = await prisma.book.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BookDeleteManyArgs>(args?: SelectSubset<T, BookDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Books.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Books
     * const book = await prisma.book.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BookUpdateManyArgs>(args: SelectSubset<T, BookUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Books and returns the data updated in the database.
     * @param {BookUpdateManyAndReturnArgs} args - Arguments to update many Books.
     * @example
     * // Update many Books
     * const book = await prisma.book.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Books and only return the `id`
     * const bookWithIdOnly = await prisma.book.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BookUpdateManyAndReturnArgs>(args: SelectSubset<T, BookUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Book.
     * @param {BookUpsertArgs} args - Arguments to update or create a Book.
     * @example
     * // Update or create a Book
     * const book = await prisma.book.upsert({
     *   create: {
     *     // ... data to create a Book
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Book we want to update
     *   }
     * })
     */
    upsert<T extends BookUpsertArgs>(args: SelectSubset<T, BookUpsertArgs<ExtArgs>>): Prisma__BookClient<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Books.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookCountArgs} args - Arguments to filter Books to count.
     * @example
     * // Count the number of Books
     * const count = await prisma.book.count({
     *   where: {
     *     // ... the filter for the Books we want to count
     *   }
     * })
    **/
    count<T extends BookCountArgs>(
      args?: Subset<T, BookCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BookCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Book.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BookAggregateArgs>(args: Subset<T, BookAggregateArgs>): Prisma.PrismaPromise<GetBookAggregateType<T>>

    /**
     * Group by Book.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BookGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BookGroupByArgs['orderBy'] }
        : { orderBy?: BookGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BookGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBookGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Book model
   */
  readonly fields: BookFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Book.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BookClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    pages<T extends Book$pagesArgs<ExtArgs> = {}>(args?: Subset<T, Book$pagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    character<T extends Book$characterArgs<ExtArgs> = {}>(args?: Subset<T, Book$characterArgs<ExtArgs>>): Prisma__CharacterClient<$Result.GetResult<Prisma.$CharacterPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    template<T extends BookTemplateDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BookTemplateDefaultArgs<ExtArgs>>): Prisma__BookTemplateClient<$Result.GetResult<Prisma.$BookTemplatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends Book$userArgs<ExtArgs> = {}>(args?: Subset<T, Book$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    guestSession<T extends Book$guestSessionArgs<ExtArgs> = {}>(args?: Subset<T, Book$guestSessionArgs<ExtArgs>>): Prisma__GuestSessionClient<$Result.GetResult<Prisma.$GuestSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    imageGenerations<T extends Book$imageGenerationsArgs<ExtArgs> = {}>(args?: Subset<T, Book$imageGenerationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImageGenerationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    order<T extends Book$orderArgs<ExtArgs> = {}>(args?: Subset<T, Book$orderArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    printJob<T extends Book$printJobArgs<ExtArgs> = {}>(args?: Subset<T, Book$printJobArgs<ExtArgs>>): Prisma__PrintJobClient<$Result.GetResult<Prisma.$PrintJobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Book model
   */
  interface BookFieldRefs {
    readonly id: FieldRef<"Book", 'String'>
    readonly title: FieldRef<"Book", 'String'>
    readonly status: FieldRef<"Book", 'BookStatus'>
    readonly characterImageReference: FieldRef<"Book", 'String'>
    readonly coverImage: FieldRef<"Book", 'String'>
    readonly coverImageOptions: FieldRef<"Book", 'String[]'>
    readonly coverPrompt: FieldRef<"Book", 'String'>
    readonly pageCount: FieldRef<"Book", 'Int'>
    readonly coverDedication: FieldRef<"Book", 'String'>
    readonly pageDedication: FieldRef<"Book", 'String'>
    readonly templateId: FieldRef<"Book", 'String'>
    readonly userId: FieldRef<"Book", 'String'>
    readonly guestSessionId: FieldRef<"Book", 'String'>
    readonly orderId: FieldRef<"Book", 'String'>
    readonly printJobId: FieldRef<"Book", 'String'>
    readonly printingDeadline: FieldRef<"Book", 'DateTime'>
    readonly ebookS3Key: FieldRef<"Book", 'String'>
    readonly ebookFileName: FieldRef<"Book", 'String'>
    readonly ebookFileType: FieldRef<"Book", 'String'>
    readonly ebookExpiresAt: FieldRef<"Book", 'DateTime'>
    readonly createdAt: FieldRef<"Book", 'DateTime'>
    readonly updatedAt: FieldRef<"Book", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Book findUnique
   */
  export type BookFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Book
     */
    omit?: BookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    /**
     * Filter, which Book to fetch.
     */
    where: BookWhereUniqueInput
  }

  /**
   * Book findUniqueOrThrow
   */
  export type BookFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Book
     */
    omit?: BookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    /**
     * Filter, which Book to fetch.
     */
    where: BookWhereUniqueInput
  }

  /**
   * Book findFirst
   */
  export type BookFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Book
     */
    omit?: BookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    /**
     * Filter, which Book to fetch.
     */
    where?: BookWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Books to fetch.
     */
    orderBy?: BookOrderByWithRelationInput | BookOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Books.
     */
    cursor?: BookWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Books from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Books.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Books.
     */
    distinct?: BookScalarFieldEnum | BookScalarFieldEnum[]
  }

  /**
   * Book findFirstOrThrow
   */
  export type BookFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Book
     */
    omit?: BookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    /**
     * Filter, which Book to fetch.
     */
    where?: BookWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Books to fetch.
     */
    orderBy?: BookOrderByWithRelationInput | BookOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Books.
     */
    cursor?: BookWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Books from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Books.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Books.
     */
    distinct?: BookScalarFieldEnum | BookScalarFieldEnum[]
  }

  /**
   * Book findMany
   */
  export type BookFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Book
     */
    omit?: BookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    /**
     * Filter, which Books to fetch.
     */
    where?: BookWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Books to fetch.
     */
    orderBy?: BookOrderByWithRelationInput | BookOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Books.
     */
    cursor?: BookWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Books from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Books.
     */
    skip?: number
    distinct?: BookScalarFieldEnum | BookScalarFieldEnum[]
  }

  /**
   * Book create
   */
  export type BookCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Book
     */
    omit?: BookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    /**
     * The data needed to create a Book.
     */
    data: XOR<BookCreateInput, BookUncheckedCreateInput>
  }

  /**
   * Book createMany
   */
  export type BookCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Books.
     */
    data: BookCreateManyInput | BookCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Book createManyAndReturn
   */
  export type BookCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Book
     */
    omit?: BookOmit<ExtArgs> | null
    /**
     * The data used to create many Books.
     */
    data: BookCreateManyInput | BookCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Book update
   */
  export type BookUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Book
     */
    omit?: BookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    /**
     * The data needed to update a Book.
     */
    data: XOR<BookUpdateInput, BookUncheckedUpdateInput>
    /**
     * Choose, which Book to update.
     */
    where: BookWhereUniqueInput
  }

  /**
   * Book updateMany
   */
  export type BookUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Books.
     */
    data: XOR<BookUpdateManyMutationInput, BookUncheckedUpdateManyInput>
    /**
     * Filter which Books to update
     */
    where?: BookWhereInput
    /**
     * Limit how many Books to update.
     */
    limit?: number
  }

  /**
   * Book updateManyAndReturn
   */
  export type BookUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Book
     */
    omit?: BookOmit<ExtArgs> | null
    /**
     * The data used to update Books.
     */
    data: XOR<BookUpdateManyMutationInput, BookUncheckedUpdateManyInput>
    /**
     * Filter which Books to update
     */
    where?: BookWhereInput
    /**
     * Limit how many Books to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Book upsert
   */
  export type BookUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Book
     */
    omit?: BookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    /**
     * The filter to search for the Book to update in case it exists.
     */
    where: BookWhereUniqueInput
    /**
     * In case the Book found by the `where` argument doesn't exist, create a new Book with this data.
     */
    create: XOR<BookCreateInput, BookUncheckedCreateInput>
    /**
     * In case the Book was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BookUpdateInput, BookUncheckedUpdateInput>
  }

  /**
   * Book delete
   */
  export type BookDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Book
     */
    omit?: BookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    /**
     * Filter which Book to delete.
     */
    where: BookWhereUniqueInput
  }

  /**
   * Book deleteMany
   */
  export type BookDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Books to delete
     */
    where?: BookWhereInput
    /**
     * Limit how many Books to delete.
     */
    limit?: number
  }

  /**
   * Book.pages
   */
  export type Book$pagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    where?: PageWhereInput
    orderBy?: PageOrderByWithRelationInput | PageOrderByWithRelationInput[]
    cursor?: PageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PageScalarFieldEnum | PageScalarFieldEnum[]
  }

  /**
   * Book.character
   */
  export type Book$characterArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Character
     */
    select?: CharacterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Character
     */
    omit?: CharacterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharacterInclude<ExtArgs> | null
    where?: CharacterWhereInput
  }

  /**
   * Book.user
   */
  export type Book$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Book.guestSession
   */
  export type Book$guestSessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuestSession
     */
    select?: GuestSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuestSession
     */
    omit?: GuestSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestSessionInclude<ExtArgs> | null
    where?: GuestSessionWhereInput
  }

  /**
   * Book.imageGenerations
   */
  export type Book$imageGenerationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImageGeneration
     */
    select?: ImageGenerationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImageGeneration
     */
    omit?: ImageGenerationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageGenerationInclude<ExtArgs> | null
    where?: ImageGenerationWhereInput
    orderBy?: ImageGenerationOrderByWithRelationInput | ImageGenerationOrderByWithRelationInput[]
    cursor?: ImageGenerationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ImageGenerationScalarFieldEnum | ImageGenerationScalarFieldEnum[]
  }

  /**
   * Book.order
   */
  export type Book$orderArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    where?: OrderWhereInput
  }

  /**
   * Book.printJob
   */
  export type Book$printJobArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrintJob
     */
    select?: PrintJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PrintJob
     */
    omit?: PrintJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrintJobInclude<ExtArgs> | null
    where?: PrintJobWhereInput
  }

  /**
   * Book without action
   */
  export type BookDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Book
     */
    omit?: BookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
  }


  /**
   * Model Character
   */

  export type AggregateCharacter = {
    _count: CharacterCountAggregateOutputType | null
    _avg: CharacterAvgAggregateOutputType | null
    _sum: CharacterSumAggregateOutputType | null
    _min: CharacterMinAggregateOutputType | null
    _max: CharacterMaxAggregateOutputType | null
  }

  export type CharacterAvgAggregateOutputType = {
    age: number | null
  }

  export type CharacterSumAggregateOutputType = {
    age: number | null
  }

  export type CharacterMinAggregateOutputType = {
    id: string | null
    name: string | null
    age: number | null
    gender: string | null
    eyeColor: string | null
    hairColor: string | null
    hairStyle: string | null
    skinTone: string | null
    wearingGlasses: boolean | null
    bookId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CharacterMaxAggregateOutputType = {
    id: string | null
    name: string | null
    age: number | null
    gender: string | null
    eyeColor: string | null
    hairColor: string | null
    hairStyle: string | null
    skinTone: string | null
    wearingGlasses: boolean | null
    bookId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CharacterCountAggregateOutputType = {
    id: number
    name: number
    age: number
    gender: number
    eyeColor: number
    hairColor: number
    hairStyle: number
    skinTone: number
    wearingGlasses: number
    bookId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CharacterAvgAggregateInputType = {
    age?: true
  }

  export type CharacterSumAggregateInputType = {
    age?: true
  }

  export type CharacterMinAggregateInputType = {
    id?: true
    name?: true
    age?: true
    gender?: true
    eyeColor?: true
    hairColor?: true
    hairStyle?: true
    skinTone?: true
    wearingGlasses?: true
    bookId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CharacterMaxAggregateInputType = {
    id?: true
    name?: true
    age?: true
    gender?: true
    eyeColor?: true
    hairColor?: true
    hairStyle?: true
    skinTone?: true
    wearingGlasses?: true
    bookId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CharacterCountAggregateInputType = {
    id?: true
    name?: true
    age?: true
    gender?: true
    eyeColor?: true
    hairColor?: true
    hairStyle?: true
    skinTone?: true
    wearingGlasses?: true
    bookId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CharacterAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Character to aggregate.
     */
    where?: CharacterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Characters to fetch.
     */
    orderBy?: CharacterOrderByWithRelationInput | CharacterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CharacterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Characters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Characters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Characters
    **/
    _count?: true | CharacterCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CharacterAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CharacterSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CharacterMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CharacterMaxAggregateInputType
  }

  export type GetCharacterAggregateType<T extends CharacterAggregateArgs> = {
        [P in keyof T & keyof AggregateCharacter]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCharacter[P]>
      : GetScalarType<T[P], AggregateCharacter[P]>
  }




  export type CharacterGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CharacterWhereInput
    orderBy?: CharacterOrderByWithAggregationInput | CharacterOrderByWithAggregationInput[]
    by: CharacterScalarFieldEnum[] | CharacterScalarFieldEnum
    having?: CharacterScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CharacterCountAggregateInputType | true
    _avg?: CharacterAvgAggregateInputType
    _sum?: CharacterSumAggregateInputType
    _min?: CharacterMinAggregateInputType
    _max?: CharacterMaxAggregateInputType
  }

  export type CharacterGroupByOutputType = {
    id: string
    name: string
    age: number
    gender: string
    eyeColor: string | null
    hairColor: string | null
    hairStyle: string | null
    skinTone: string | null
    wearingGlasses: boolean | null
    bookId: string
    createdAt: Date
    updatedAt: Date
    _count: CharacterCountAggregateOutputType | null
    _avg: CharacterAvgAggregateOutputType | null
    _sum: CharacterSumAggregateOutputType | null
    _min: CharacterMinAggregateOutputType | null
    _max: CharacterMaxAggregateOutputType | null
  }

  type GetCharacterGroupByPayload<T extends CharacterGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CharacterGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CharacterGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CharacterGroupByOutputType[P]>
            : GetScalarType<T[P], CharacterGroupByOutputType[P]>
        }
      >
    >


  export type CharacterSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    age?: boolean
    gender?: boolean
    eyeColor?: boolean
    hairColor?: boolean
    hairStyle?: boolean
    skinTone?: boolean
    wearingGlasses?: boolean
    bookId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    book?: boolean | BookDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["character"]>

  export type CharacterSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    age?: boolean
    gender?: boolean
    eyeColor?: boolean
    hairColor?: boolean
    hairStyle?: boolean
    skinTone?: boolean
    wearingGlasses?: boolean
    bookId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    book?: boolean | BookDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["character"]>

  export type CharacterSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    age?: boolean
    gender?: boolean
    eyeColor?: boolean
    hairColor?: boolean
    hairStyle?: boolean
    skinTone?: boolean
    wearingGlasses?: boolean
    bookId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    book?: boolean | BookDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["character"]>

  export type CharacterSelectScalar = {
    id?: boolean
    name?: boolean
    age?: boolean
    gender?: boolean
    eyeColor?: boolean
    hairColor?: boolean
    hairStyle?: boolean
    skinTone?: boolean
    wearingGlasses?: boolean
    bookId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CharacterOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "age" | "gender" | "eyeColor" | "hairColor" | "hairStyle" | "skinTone" | "wearingGlasses" | "bookId" | "createdAt" | "updatedAt", ExtArgs["result"]["character"]>
  export type CharacterInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    book?: boolean | BookDefaultArgs<ExtArgs>
  }
  export type CharacterIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    book?: boolean | BookDefaultArgs<ExtArgs>
  }
  export type CharacterIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    book?: boolean | BookDefaultArgs<ExtArgs>
  }

  export type $CharacterPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Character"
    objects: {
      book: Prisma.$BookPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      age: number
      gender: string
      eyeColor: string | null
      hairColor: string | null
      hairStyle: string | null
      skinTone: string | null
      wearingGlasses: boolean | null
      bookId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["character"]>
    composites: {}
  }

  type CharacterGetPayload<S extends boolean | null | undefined | CharacterDefaultArgs> = $Result.GetResult<Prisma.$CharacterPayload, S>

  type CharacterCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CharacterFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CharacterCountAggregateInputType | true
    }

  export interface CharacterDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Character'], meta: { name: 'Character' } }
    /**
     * Find zero or one Character that matches the filter.
     * @param {CharacterFindUniqueArgs} args - Arguments to find a Character
     * @example
     * // Get one Character
     * const character = await prisma.character.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CharacterFindUniqueArgs>(args: SelectSubset<T, CharacterFindUniqueArgs<ExtArgs>>): Prisma__CharacterClient<$Result.GetResult<Prisma.$CharacterPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Character that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CharacterFindUniqueOrThrowArgs} args - Arguments to find a Character
     * @example
     * // Get one Character
     * const character = await prisma.character.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CharacterFindUniqueOrThrowArgs>(args: SelectSubset<T, CharacterFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CharacterClient<$Result.GetResult<Prisma.$CharacterPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Character that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CharacterFindFirstArgs} args - Arguments to find a Character
     * @example
     * // Get one Character
     * const character = await prisma.character.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CharacterFindFirstArgs>(args?: SelectSubset<T, CharacterFindFirstArgs<ExtArgs>>): Prisma__CharacterClient<$Result.GetResult<Prisma.$CharacterPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Character that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CharacterFindFirstOrThrowArgs} args - Arguments to find a Character
     * @example
     * // Get one Character
     * const character = await prisma.character.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CharacterFindFirstOrThrowArgs>(args?: SelectSubset<T, CharacterFindFirstOrThrowArgs<ExtArgs>>): Prisma__CharacterClient<$Result.GetResult<Prisma.$CharacterPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Characters that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CharacterFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Characters
     * const characters = await prisma.character.findMany()
     * 
     * // Get first 10 Characters
     * const characters = await prisma.character.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const characterWithIdOnly = await prisma.character.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CharacterFindManyArgs>(args?: SelectSubset<T, CharacterFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CharacterPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Character.
     * @param {CharacterCreateArgs} args - Arguments to create a Character.
     * @example
     * // Create one Character
     * const Character = await prisma.character.create({
     *   data: {
     *     // ... data to create a Character
     *   }
     * })
     * 
     */
    create<T extends CharacterCreateArgs>(args: SelectSubset<T, CharacterCreateArgs<ExtArgs>>): Prisma__CharacterClient<$Result.GetResult<Prisma.$CharacterPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Characters.
     * @param {CharacterCreateManyArgs} args - Arguments to create many Characters.
     * @example
     * // Create many Characters
     * const character = await prisma.character.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CharacterCreateManyArgs>(args?: SelectSubset<T, CharacterCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Characters and returns the data saved in the database.
     * @param {CharacterCreateManyAndReturnArgs} args - Arguments to create many Characters.
     * @example
     * // Create many Characters
     * const character = await prisma.character.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Characters and only return the `id`
     * const characterWithIdOnly = await prisma.character.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CharacterCreateManyAndReturnArgs>(args?: SelectSubset<T, CharacterCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CharacterPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Character.
     * @param {CharacterDeleteArgs} args - Arguments to delete one Character.
     * @example
     * // Delete one Character
     * const Character = await prisma.character.delete({
     *   where: {
     *     // ... filter to delete one Character
     *   }
     * })
     * 
     */
    delete<T extends CharacterDeleteArgs>(args: SelectSubset<T, CharacterDeleteArgs<ExtArgs>>): Prisma__CharacterClient<$Result.GetResult<Prisma.$CharacterPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Character.
     * @param {CharacterUpdateArgs} args - Arguments to update one Character.
     * @example
     * // Update one Character
     * const character = await prisma.character.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CharacterUpdateArgs>(args: SelectSubset<T, CharacterUpdateArgs<ExtArgs>>): Prisma__CharacterClient<$Result.GetResult<Prisma.$CharacterPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Characters.
     * @param {CharacterDeleteManyArgs} args - Arguments to filter Characters to delete.
     * @example
     * // Delete a few Characters
     * const { count } = await prisma.character.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CharacterDeleteManyArgs>(args?: SelectSubset<T, CharacterDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Characters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CharacterUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Characters
     * const character = await prisma.character.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CharacterUpdateManyArgs>(args: SelectSubset<T, CharacterUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Characters and returns the data updated in the database.
     * @param {CharacterUpdateManyAndReturnArgs} args - Arguments to update many Characters.
     * @example
     * // Update many Characters
     * const character = await prisma.character.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Characters and only return the `id`
     * const characterWithIdOnly = await prisma.character.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CharacterUpdateManyAndReturnArgs>(args: SelectSubset<T, CharacterUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CharacterPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Character.
     * @param {CharacterUpsertArgs} args - Arguments to update or create a Character.
     * @example
     * // Update or create a Character
     * const character = await prisma.character.upsert({
     *   create: {
     *     // ... data to create a Character
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Character we want to update
     *   }
     * })
     */
    upsert<T extends CharacterUpsertArgs>(args: SelectSubset<T, CharacterUpsertArgs<ExtArgs>>): Prisma__CharacterClient<$Result.GetResult<Prisma.$CharacterPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Characters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CharacterCountArgs} args - Arguments to filter Characters to count.
     * @example
     * // Count the number of Characters
     * const count = await prisma.character.count({
     *   where: {
     *     // ... the filter for the Characters we want to count
     *   }
     * })
    **/
    count<T extends CharacterCountArgs>(
      args?: Subset<T, CharacterCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CharacterCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Character.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CharacterAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CharacterAggregateArgs>(args: Subset<T, CharacterAggregateArgs>): Prisma.PrismaPromise<GetCharacterAggregateType<T>>

    /**
     * Group by Character.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CharacterGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CharacterGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CharacterGroupByArgs['orderBy'] }
        : { orderBy?: CharacterGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CharacterGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCharacterGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Character model
   */
  readonly fields: CharacterFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Character.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CharacterClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    book<T extends BookDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BookDefaultArgs<ExtArgs>>): Prisma__BookClient<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Character model
   */
  interface CharacterFieldRefs {
    readonly id: FieldRef<"Character", 'String'>
    readonly name: FieldRef<"Character", 'String'>
    readonly age: FieldRef<"Character", 'Int'>
    readonly gender: FieldRef<"Character", 'String'>
    readonly eyeColor: FieldRef<"Character", 'String'>
    readonly hairColor: FieldRef<"Character", 'String'>
    readonly hairStyle: FieldRef<"Character", 'String'>
    readonly skinTone: FieldRef<"Character", 'String'>
    readonly wearingGlasses: FieldRef<"Character", 'Boolean'>
    readonly bookId: FieldRef<"Character", 'String'>
    readonly createdAt: FieldRef<"Character", 'DateTime'>
    readonly updatedAt: FieldRef<"Character", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Character findUnique
   */
  export type CharacterFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Character
     */
    select?: CharacterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Character
     */
    omit?: CharacterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharacterInclude<ExtArgs> | null
    /**
     * Filter, which Character to fetch.
     */
    where: CharacterWhereUniqueInput
  }

  /**
   * Character findUniqueOrThrow
   */
  export type CharacterFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Character
     */
    select?: CharacterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Character
     */
    omit?: CharacterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharacterInclude<ExtArgs> | null
    /**
     * Filter, which Character to fetch.
     */
    where: CharacterWhereUniqueInput
  }

  /**
   * Character findFirst
   */
  export type CharacterFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Character
     */
    select?: CharacterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Character
     */
    omit?: CharacterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharacterInclude<ExtArgs> | null
    /**
     * Filter, which Character to fetch.
     */
    where?: CharacterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Characters to fetch.
     */
    orderBy?: CharacterOrderByWithRelationInput | CharacterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Characters.
     */
    cursor?: CharacterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Characters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Characters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Characters.
     */
    distinct?: CharacterScalarFieldEnum | CharacterScalarFieldEnum[]
  }

  /**
   * Character findFirstOrThrow
   */
  export type CharacterFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Character
     */
    select?: CharacterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Character
     */
    omit?: CharacterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharacterInclude<ExtArgs> | null
    /**
     * Filter, which Character to fetch.
     */
    where?: CharacterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Characters to fetch.
     */
    orderBy?: CharacterOrderByWithRelationInput | CharacterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Characters.
     */
    cursor?: CharacterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Characters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Characters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Characters.
     */
    distinct?: CharacterScalarFieldEnum | CharacterScalarFieldEnum[]
  }

  /**
   * Character findMany
   */
  export type CharacterFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Character
     */
    select?: CharacterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Character
     */
    omit?: CharacterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharacterInclude<ExtArgs> | null
    /**
     * Filter, which Characters to fetch.
     */
    where?: CharacterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Characters to fetch.
     */
    orderBy?: CharacterOrderByWithRelationInput | CharacterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Characters.
     */
    cursor?: CharacterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Characters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Characters.
     */
    skip?: number
    distinct?: CharacterScalarFieldEnum | CharacterScalarFieldEnum[]
  }

  /**
   * Character create
   */
  export type CharacterCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Character
     */
    select?: CharacterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Character
     */
    omit?: CharacterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharacterInclude<ExtArgs> | null
    /**
     * The data needed to create a Character.
     */
    data: XOR<CharacterCreateInput, CharacterUncheckedCreateInput>
  }

  /**
   * Character createMany
   */
  export type CharacterCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Characters.
     */
    data: CharacterCreateManyInput | CharacterCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Character createManyAndReturn
   */
  export type CharacterCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Character
     */
    select?: CharacterSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Character
     */
    omit?: CharacterOmit<ExtArgs> | null
    /**
     * The data used to create many Characters.
     */
    data: CharacterCreateManyInput | CharacterCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharacterIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Character update
   */
  export type CharacterUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Character
     */
    select?: CharacterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Character
     */
    omit?: CharacterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharacterInclude<ExtArgs> | null
    /**
     * The data needed to update a Character.
     */
    data: XOR<CharacterUpdateInput, CharacterUncheckedUpdateInput>
    /**
     * Choose, which Character to update.
     */
    where: CharacterWhereUniqueInput
  }

  /**
   * Character updateMany
   */
  export type CharacterUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Characters.
     */
    data: XOR<CharacterUpdateManyMutationInput, CharacterUncheckedUpdateManyInput>
    /**
     * Filter which Characters to update
     */
    where?: CharacterWhereInput
    /**
     * Limit how many Characters to update.
     */
    limit?: number
  }

  /**
   * Character updateManyAndReturn
   */
  export type CharacterUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Character
     */
    select?: CharacterSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Character
     */
    omit?: CharacterOmit<ExtArgs> | null
    /**
     * The data used to update Characters.
     */
    data: XOR<CharacterUpdateManyMutationInput, CharacterUncheckedUpdateManyInput>
    /**
     * Filter which Characters to update
     */
    where?: CharacterWhereInput
    /**
     * Limit how many Characters to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharacterIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Character upsert
   */
  export type CharacterUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Character
     */
    select?: CharacterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Character
     */
    omit?: CharacterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharacterInclude<ExtArgs> | null
    /**
     * The filter to search for the Character to update in case it exists.
     */
    where: CharacterWhereUniqueInput
    /**
     * In case the Character found by the `where` argument doesn't exist, create a new Character with this data.
     */
    create: XOR<CharacterCreateInput, CharacterUncheckedCreateInput>
    /**
     * In case the Character was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CharacterUpdateInput, CharacterUncheckedUpdateInput>
  }

  /**
   * Character delete
   */
  export type CharacterDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Character
     */
    select?: CharacterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Character
     */
    omit?: CharacterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharacterInclude<ExtArgs> | null
    /**
     * Filter which Character to delete.
     */
    where: CharacterWhereUniqueInput
  }

  /**
   * Character deleteMany
   */
  export type CharacterDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Characters to delete
     */
    where?: CharacterWhereInput
    /**
     * Limit how many Characters to delete.
     */
    limit?: number
  }

  /**
   * Character without action
   */
  export type CharacterDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Character
     */
    select?: CharacterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Character
     */
    omit?: CharacterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharacterInclude<ExtArgs> | null
  }


  /**
   * Model BookTemplate
   */

  export type AggregateBookTemplate = {
    _count: BookTemplateCountAggregateOutputType | null
    _avg: BookTemplateAvgAggregateOutputType | null
    _sum: BookTemplateSumAggregateOutputType | null
    _min: BookTemplateMinAggregateOutputType | null
    _max: BookTemplateMaxAggregateOutputType | null
  }

  export type BookTemplateAvgAggregateOutputType = {
    pageCount: number | null
    minAge: number | null
    maxAge: number | null
  }

  export type BookTemplateSumAggregateOutputType = {
    pageCount: number | null
    minAge: number | null
    maxAge: number | null
  }

  export type BookTemplateMinAggregateOutputType = {
    id: string | null
    title: string | null
    slug: string | null
    description: string | null
    pageCount: number | null
    published: boolean | null
    coverImage: string | null
    coverPrompt: string | null
    characterGender: string | null
    minAge: number | null
    maxAge: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BookTemplateMaxAggregateOutputType = {
    id: string | null
    title: string | null
    slug: string | null
    description: string | null
    pageCount: number | null
    published: boolean | null
    coverImage: string | null
    coverPrompt: string | null
    characterGender: string | null
    minAge: number | null
    maxAge: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BookTemplateCountAggregateOutputType = {
    id: number
    title: number
    slug: number
    description: number
    pageCount: number
    published: number
    coverImage: number
    coverPrompt: number
    characterGender: number
    minAge: number
    maxAge: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BookTemplateAvgAggregateInputType = {
    pageCount?: true
    minAge?: true
    maxAge?: true
  }

  export type BookTemplateSumAggregateInputType = {
    pageCount?: true
    minAge?: true
    maxAge?: true
  }

  export type BookTemplateMinAggregateInputType = {
    id?: true
    title?: true
    slug?: true
    description?: true
    pageCount?: true
    published?: true
    coverImage?: true
    coverPrompt?: true
    characterGender?: true
    minAge?: true
    maxAge?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BookTemplateMaxAggregateInputType = {
    id?: true
    title?: true
    slug?: true
    description?: true
    pageCount?: true
    published?: true
    coverImage?: true
    coverPrompt?: true
    characterGender?: true
    minAge?: true
    maxAge?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BookTemplateCountAggregateInputType = {
    id?: true
    title?: true
    slug?: true
    description?: true
    pageCount?: true
    published?: true
    coverImage?: true
    coverPrompt?: true
    characterGender?: true
    minAge?: true
    maxAge?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BookTemplateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BookTemplate to aggregate.
     */
    where?: BookTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BookTemplates to fetch.
     */
    orderBy?: BookTemplateOrderByWithRelationInput | BookTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BookTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BookTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BookTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BookTemplates
    **/
    _count?: true | BookTemplateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BookTemplateAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BookTemplateSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BookTemplateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BookTemplateMaxAggregateInputType
  }

  export type GetBookTemplateAggregateType<T extends BookTemplateAggregateArgs> = {
        [P in keyof T & keyof AggregateBookTemplate]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBookTemplate[P]>
      : GetScalarType<T[P], AggregateBookTemplate[P]>
  }




  export type BookTemplateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookTemplateWhereInput
    orderBy?: BookTemplateOrderByWithAggregationInput | BookTemplateOrderByWithAggregationInput[]
    by: BookTemplateScalarFieldEnum[] | BookTemplateScalarFieldEnum
    having?: BookTemplateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BookTemplateCountAggregateInputType | true
    _avg?: BookTemplateAvgAggregateInputType
    _sum?: BookTemplateSumAggregateInputType
    _min?: BookTemplateMinAggregateInputType
    _max?: BookTemplateMaxAggregateInputType
  }

  export type BookTemplateGroupByOutputType = {
    id: string
    title: string
    slug: string
    description: string
    pageCount: number
    published: boolean
    coverImage: string
    coverPrompt: string
    characterGender: string
    minAge: number
    maxAge: number
    createdAt: Date
    updatedAt: Date
    _count: BookTemplateCountAggregateOutputType | null
    _avg: BookTemplateAvgAggregateOutputType | null
    _sum: BookTemplateSumAggregateOutputType | null
    _min: BookTemplateMinAggregateOutputType | null
    _max: BookTemplateMaxAggregateOutputType | null
  }

  type GetBookTemplateGroupByPayload<T extends BookTemplateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BookTemplateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BookTemplateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BookTemplateGroupByOutputType[P]>
            : GetScalarType<T[P], BookTemplateGroupByOutputType[P]>
        }
      >
    >


  export type BookTemplateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    slug?: boolean
    description?: boolean
    pageCount?: boolean
    published?: boolean
    coverImage?: boolean
    coverPrompt?: boolean
    characterGender?: boolean
    minAge?: boolean
    maxAge?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    pages?: boolean | BookTemplate$pagesArgs<ExtArgs>
    books?: boolean | BookTemplate$booksArgs<ExtArgs>
    genres?: boolean | BookTemplate$genresArgs<ExtArgs>
    _count?: boolean | BookTemplateCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bookTemplate"]>

  export type BookTemplateSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    slug?: boolean
    description?: boolean
    pageCount?: boolean
    published?: boolean
    coverImage?: boolean
    coverPrompt?: boolean
    characterGender?: boolean
    minAge?: boolean
    maxAge?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["bookTemplate"]>

  export type BookTemplateSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    slug?: boolean
    description?: boolean
    pageCount?: boolean
    published?: boolean
    coverImage?: boolean
    coverPrompt?: boolean
    characterGender?: boolean
    minAge?: boolean
    maxAge?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["bookTemplate"]>

  export type BookTemplateSelectScalar = {
    id?: boolean
    title?: boolean
    slug?: boolean
    description?: boolean
    pageCount?: boolean
    published?: boolean
    coverImage?: boolean
    coverPrompt?: boolean
    characterGender?: boolean
    minAge?: boolean
    maxAge?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BookTemplateOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "slug" | "description" | "pageCount" | "published" | "coverImage" | "coverPrompt" | "characterGender" | "minAge" | "maxAge" | "createdAt" | "updatedAt", ExtArgs["result"]["bookTemplate"]>
  export type BookTemplateInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pages?: boolean | BookTemplate$pagesArgs<ExtArgs>
    books?: boolean | BookTemplate$booksArgs<ExtArgs>
    genres?: boolean | BookTemplate$genresArgs<ExtArgs>
    _count?: boolean | BookTemplateCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BookTemplateIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type BookTemplateIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $BookTemplatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BookTemplate"
    objects: {
      pages: Prisma.$TemplatePageContentPayload<ExtArgs>[]
      books: Prisma.$BookPayload<ExtArgs>[]
      genres: Prisma.$GenrePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      slug: string
      description: string
      pageCount: number
      published: boolean
      coverImage: string
      coverPrompt: string
      characterGender: string
      minAge: number
      maxAge: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["bookTemplate"]>
    composites: {}
  }

  type BookTemplateGetPayload<S extends boolean | null | undefined | BookTemplateDefaultArgs> = $Result.GetResult<Prisma.$BookTemplatePayload, S>

  type BookTemplateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BookTemplateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BookTemplateCountAggregateInputType | true
    }

  export interface BookTemplateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BookTemplate'], meta: { name: 'BookTemplate' } }
    /**
     * Find zero or one BookTemplate that matches the filter.
     * @param {BookTemplateFindUniqueArgs} args - Arguments to find a BookTemplate
     * @example
     * // Get one BookTemplate
     * const bookTemplate = await prisma.bookTemplate.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BookTemplateFindUniqueArgs>(args: SelectSubset<T, BookTemplateFindUniqueArgs<ExtArgs>>): Prisma__BookTemplateClient<$Result.GetResult<Prisma.$BookTemplatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BookTemplate that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BookTemplateFindUniqueOrThrowArgs} args - Arguments to find a BookTemplate
     * @example
     * // Get one BookTemplate
     * const bookTemplate = await prisma.bookTemplate.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BookTemplateFindUniqueOrThrowArgs>(args: SelectSubset<T, BookTemplateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BookTemplateClient<$Result.GetResult<Prisma.$BookTemplatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BookTemplate that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookTemplateFindFirstArgs} args - Arguments to find a BookTemplate
     * @example
     * // Get one BookTemplate
     * const bookTemplate = await prisma.bookTemplate.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BookTemplateFindFirstArgs>(args?: SelectSubset<T, BookTemplateFindFirstArgs<ExtArgs>>): Prisma__BookTemplateClient<$Result.GetResult<Prisma.$BookTemplatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BookTemplate that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookTemplateFindFirstOrThrowArgs} args - Arguments to find a BookTemplate
     * @example
     * // Get one BookTemplate
     * const bookTemplate = await prisma.bookTemplate.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BookTemplateFindFirstOrThrowArgs>(args?: SelectSubset<T, BookTemplateFindFirstOrThrowArgs<ExtArgs>>): Prisma__BookTemplateClient<$Result.GetResult<Prisma.$BookTemplatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BookTemplates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookTemplateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BookTemplates
     * const bookTemplates = await prisma.bookTemplate.findMany()
     * 
     * // Get first 10 BookTemplates
     * const bookTemplates = await prisma.bookTemplate.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bookTemplateWithIdOnly = await prisma.bookTemplate.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BookTemplateFindManyArgs>(args?: SelectSubset<T, BookTemplateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookTemplatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BookTemplate.
     * @param {BookTemplateCreateArgs} args - Arguments to create a BookTemplate.
     * @example
     * // Create one BookTemplate
     * const BookTemplate = await prisma.bookTemplate.create({
     *   data: {
     *     // ... data to create a BookTemplate
     *   }
     * })
     * 
     */
    create<T extends BookTemplateCreateArgs>(args: SelectSubset<T, BookTemplateCreateArgs<ExtArgs>>): Prisma__BookTemplateClient<$Result.GetResult<Prisma.$BookTemplatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BookTemplates.
     * @param {BookTemplateCreateManyArgs} args - Arguments to create many BookTemplates.
     * @example
     * // Create many BookTemplates
     * const bookTemplate = await prisma.bookTemplate.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BookTemplateCreateManyArgs>(args?: SelectSubset<T, BookTemplateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BookTemplates and returns the data saved in the database.
     * @param {BookTemplateCreateManyAndReturnArgs} args - Arguments to create many BookTemplates.
     * @example
     * // Create many BookTemplates
     * const bookTemplate = await prisma.bookTemplate.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BookTemplates and only return the `id`
     * const bookTemplateWithIdOnly = await prisma.bookTemplate.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BookTemplateCreateManyAndReturnArgs>(args?: SelectSubset<T, BookTemplateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookTemplatePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BookTemplate.
     * @param {BookTemplateDeleteArgs} args - Arguments to delete one BookTemplate.
     * @example
     * // Delete one BookTemplate
     * const BookTemplate = await prisma.bookTemplate.delete({
     *   where: {
     *     // ... filter to delete one BookTemplate
     *   }
     * })
     * 
     */
    delete<T extends BookTemplateDeleteArgs>(args: SelectSubset<T, BookTemplateDeleteArgs<ExtArgs>>): Prisma__BookTemplateClient<$Result.GetResult<Prisma.$BookTemplatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BookTemplate.
     * @param {BookTemplateUpdateArgs} args - Arguments to update one BookTemplate.
     * @example
     * // Update one BookTemplate
     * const bookTemplate = await prisma.bookTemplate.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BookTemplateUpdateArgs>(args: SelectSubset<T, BookTemplateUpdateArgs<ExtArgs>>): Prisma__BookTemplateClient<$Result.GetResult<Prisma.$BookTemplatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BookTemplates.
     * @param {BookTemplateDeleteManyArgs} args - Arguments to filter BookTemplates to delete.
     * @example
     * // Delete a few BookTemplates
     * const { count } = await prisma.bookTemplate.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BookTemplateDeleteManyArgs>(args?: SelectSubset<T, BookTemplateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BookTemplates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookTemplateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BookTemplates
     * const bookTemplate = await prisma.bookTemplate.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BookTemplateUpdateManyArgs>(args: SelectSubset<T, BookTemplateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BookTemplates and returns the data updated in the database.
     * @param {BookTemplateUpdateManyAndReturnArgs} args - Arguments to update many BookTemplates.
     * @example
     * // Update many BookTemplates
     * const bookTemplate = await prisma.bookTemplate.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BookTemplates and only return the `id`
     * const bookTemplateWithIdOnly = await prisma.bookTemplate.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BookTemplateUpdateManyAndReturnArgs>(args: SelectSubset<T, BookTemplateUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookTemplatePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BookTemplate.
     * @param {BookTemplateUpsertArgs} args - Arguments to update or create a BookTemplate.
     * @example
     * // Update or create a BookTemplate
     * const bookTemplate = await prisma.bookTemplate.upsert({
     *   create: {
     *     // ... data to create a BookTemplate
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BookTemplate we want to update
     *   }
     * })
     */
    upsert<T extends BookTemplateUpsertArgs>(args: SelectSubset<T, BookTemplateUpsertArgs<ExtArgs>>): Prisma__BookTemplateClient<$Result.GetResult<Prisma.$BookTemplatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BookTemplates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookTemplateCountArgs} args - Arguments to filter BookTemplates to count.
     * @example
     * // Count the number of BookTemplates
     * const count = await prisma.bookTemplate.count({
     *   where: {
     *     // ... the filter for the BookTemplates we want to count
     *   }
     * })
    **/
    count<T extends BookTemplateCountArgs>(
      args?: Subset<T, BookTemplateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BookTemplateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BookTemplate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookTemplateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BookTemplateAggregateArgs>(args: Subset<T, BookTemplateAggregateArgs>): Prisma.PrismaPromise<GetBookTemplateAggregateType<T>>

    /**
     * Group by BookTemplate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookTemplateGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BookTemplateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BookTemplateGroupByArgs['orderBy'] }
        : { orderBy?: BookTemplateGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BookTemplateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBookTemplateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BookTemplate model
   */
  readonly fields: BookTemplateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BookTemplate.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BookTemplateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    pages<T extends BookTemplate$pagesArgs<ExtArgs> = {}>(args?: Subset<T, BookTemplate$pagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TemplatePageContentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    books<T extends BookTemplate$booksArgs<ExtArgs> = {}>(args?: Subset<T, BookTemplate$booksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    genres<T extends BookTemplate$genresArgs<ExtArgs> = {}>(args?: Subset<T, BookTemplate$genresArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GenrePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BookTemplate model
   */
  interface BookTemplateFieldRefs {
    readonly id: FieldRef<"BookTemplate", 'String'>
    readonly title: FieldRef<"BookTemplate", 'String'>
    readonly slug: FieldRef<"BookTemplate", 'String'>
    readonly description: FieldRef<"BookTemplate", 'String'>
    readonly pageCount: FieldRef<"BookTemplate", 'Int'>
    readonly published: FieldRef<"BookTemplate", 'Boolean'>
    readonly coverImage: FieldRef<"BookTemplate", 'String'>
    readonly coverPrompt: FieldRef<"BookTemplate", 'String'>
    readonly characterGender: FieldRef<"BookTemplate", 'String'>
    readonly minAge: FieldRef<"BookTemplate", 'Int'>
    readonly maxAge: FieldRef<"BookTemplate", 'Int'>
    readonly createdAt: FieldRef<"BookTemplate", 'DateTime'>
    readonly updatedAt: FieldRef<"BookTemplate", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BookTemplate findUnique
   */
  export type BookTemplateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookTemplate
     */
    select?: BookTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookTemplate
     */
    omit?: BookTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookTemplateInclude<ExtArgs> | null
    /**
     * Filter, which BookTemplate to fetch.
     */
    where: BookTemplateWhereUniqueInput
  }

  /**
   * BookTemplate findUniqueOrThrow
   */
  export type BookTemplateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookTemplate
     */
    select?: BookTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookTemplate
     */
    omit?: BookTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookTemplateInclude<ExtArgs> | null
    /**
     * Filter, which BookTemplate to fetch.
     */
    where: BookTemplateWhereUniqueInput
  }

  /**
   * BookTemplate findFirst
   */
  export type BookTemplateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookTemplate
     */
    select?: BookTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookTemplate
     */
    omit?: BookTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookTemplateInclude<ExtArgs> | null
    /**
     * Filter, which BookTemplate to fetch.
     */
    where?: BookTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BookTemplates to fetch.
     */
    orderBy?: BookTemplateOrderByWithRelationInput | BookTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BookTemplates.
     */
    cursor?: BookTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BookTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BookTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BookTemplates.
     */
    distinct?: BookTemplateScalarFieldEnum | BookTemplateScalarFieldEnum[]
  }

  /**
   * BookTemplate findFirstOrThrow
   */
  export type BookTemplateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookTemplate
     */
    select?: BookTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookTemplate
     */
    omit?: BookTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookTemplateInclude<ExtArgs> | null
    /**
     * Filter, which BookTemplate to fetch.
     */
    where?: BookTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BookTemplates to fetch.
     */
    orderBy?: BookTemplateOrderByWithRelationInput | BookTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BookTemplates.
     */
    cursor?: BookTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BookTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BookTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BookTemplates.
     */
    distinct?: BookTemplateScalarFieldEnum | BookTemplateScalarFieldEnum[]
  }

  /**
   * BookTemplate findMany
   */
  export type BookTemplateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookTemplate
     */
    select?: BookTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookTemplate
     */
    omit?: BookTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookTemplateInclude<ExtArgs> | null
    /**
     * Filter, which BookTemplates to fetch.
     */
    where?: BookTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BookTemplates to fetch.
     */
    orderBy?: BookTemplateOrderByWithRelationInput | BookTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BookTemplates.
     */
    cursor?: BookTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BookTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BookTemplates.
     */
    skip?: number
    distinct?: BookTemplateScalarFieldEnum | BookTemplateScalarFieldEnum[]
  }

  /**
   * BookTemplate create
   */
  export type BookTemplateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookTemplate
     */
    select?: BookTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookTemplate
     */
    omit?: BookTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookTemplateInclude<ExtArgs> | null
    /**
     * The data needed to create a BookTemplate.
     */
    data: XOR<BookTemplateCreateInput, BookTemplateUncheckedCreateInput>
  }

  /**
   * BookTemplate createMany
   */
  export type BookTemplateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BookTemplates.
     */
    data: BookTemplateCreateManyInput | BookTemplateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BookTemplate createManyAndReturn
   */
  export type BookTemplateCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookTemplate
     */
    select?: BookTemplateSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BookTemplate
     */
    omit?: BookTemplateOmit<ExtArgs> | null
    /**
     * The data used to create many BookTemplates.
     */
    data: BookTemplateCreateManyInput | BookTemplateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BookTemplate update
   */
  export type BookTemplateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookTemplate
     */
    select?: BookTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookTemplate
     */
    omit?: BookTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookTemplateInclude<ExtArgs> | null
    /**
     * The data needed to update a BookTemplate.
     */
    data: XOR<BookTemplateUpdateInput, BookTemplateUncheckedUpdateInput>
    /**
     * Choose, which BookTemplate to update.
     */
    where: BookTemplateWhereUniqueInput
  }

  /**
   * BookTemplate updateMany
   */
  export type BookTemplateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BookTemplates.
     */
    data: XOR<BookTemplateUpdateManyMutationInput, BookTemplateUncheckedUpdateManyInput>
    /**
     * Filter which BookTemplates to update
     */
    where?: BookTemplateWhereInput
    /**
     * Limit how many BookTemplates to update.
     */
    limit?: number
  }

  /**
   * BookTemplate updateManyAndReturn
   */
  export type BookTemplateUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookTemplate
     */
    select?: BookTemplateSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BookTemplate
     */
    omit?: BookTemplateOmit<ExtArgs> | null
    /**
     * The data used to update BookTemplates.
     */
    data: XOR<BookTemplateUpdateManyMutationInput, BookTemplateUncheckedUpdateManyInput>
    /**
     * Filter which BookTemplates to update
     */
    where?: BookTemplateWhereInput
    /**
     * Limit how many BookTemplates to update.
     */
    limit?: number
  }

  /**
   * BookTemplate upsert
   */
  export type BookTemplateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookTemplate
     */
    select?: BookTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookTemplate
     */
    omit?: BookTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookTemplateInclude<ExtArgs> | null
    /**
     * The filter to search for the BookTemplate to update in case it exists.
     */
    where: BookTemplateWhereUniqueInput
    /**
     * In case the BookTemplate found by the `where` argument doesn't exist, create a new BookTemplate with this data.
     */
    create: XOR<BookTemplateCreateInput, BookTemplateUncheckedCreateInput>
    /**
     * In case the BookTemplate was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BookTemplateUpdateInput, BookTemplateUncheckedUpdateInput>
  }

  /**
   * BookTemplate delete
   */
  export type BookTemplateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookTemplate
     */
    select?: BookTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookTemplate
     */
    omit?: BookTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookTemplateInclude<ExtArgs> | null
    /**
     * Filter which BookTemplate to delete.
     */
    where: BookTemplateWhereUniqueInput
  }

  /**
   * BookTemplate deleteMany
   */
  export type BookTemplateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BookTemplates to delete
     */
    where?: BookTemplateWhereInput
    /**
     * Limit how many BookTemplates to delete.
     */
    limit?: number
  }

  /**
   * BookTemplate.pages
   */
  export type BookTemplate$pagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplatePageContent
     */
    select?: TemplatePageContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplatePageContent
     */
    omit?: TemplatePageContentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplatePageContentInclude<ExtArgs> | null
    where?: TemplatePageContentWhereInput
    orderBy?: TemplatePageContentOrderByWithRelationInput | TemplatePageContentOrderByWithRelationInput[]
    cursor?: TemplatePageContentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TemplatePageContentScalarFieldEnum | TemplatePageContentScalarFieldEnum[]
  }

  /**
   * BookTemplate.books
   */
  export type BookTemplate$booksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Book
     */
    omit?: BookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    where?: BookWhereInput
    orderBy?: BookOrderByWithRelationInput | BookOrderByWithRelationInput[]
    cursor?: BookWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookScalarFieldEnum | BookScalarFieldEnum[]
  }

  /**
   * BookTemplate.genres
   */
  export type BookTemplate$genresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Genre
     */
    select?: GenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Genre
     */
    omit?: GenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenreInclude<ExtArgs> | null
    where?: GenreWhereInput
    orderBy?: GenreOrderByWithRelationInput | GenreOrderByWithRelationInput[]
    cursor?: GenreWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GenreScalarFieldEnum | GenreScalarFieldEnum[]
  }

  /**
   * BookTemplate without action
   */
  export type BookTemplateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookTemplate
     */
    select?: BookTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookTemplate
     */
    omit?: BookTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookTemplateInclude<ExtArgs> | null
  }


  /**
   * Model TemplatePageContent
   */

  export type AggregateTemplatePageContent = {
    _count: TemplatePageContentCountAggregateOutputType | null
    _avg: TemplatePageContentAvgAggregateOutputType | null
    _sum: TemplatePageContentSumAggregateOutputType | null
    _min: TemplatePageContentMinAggregateOutputType | null
    _max: TemplatePageContentMaxAggregateOutputType | null
  }

  export type TemplatePageContentAvgAggregateOutputType = {
    pageNumber: number | null
  }

  export type TemplatePageContentSumAggregateOutputType = {
    pageNumber: number | null
  }

  export type TemplatePageContentMinAggregateOutputType = {
    id: string | null
    pageNumber: number | null
    content: string | null
    imagePrompt: string | null
    imageUrl: string | null
    templateId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TemplatePageContentMaxAggregateOutputType = {
    id: string | null
    pageNumber: number | null
    content: string | null
    imagePrompt: string | null
    imageUrl: string | null
    templateId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TemplatePageContentCountAggregateOutputType = {
    id: number
    pageNumber: number
    content: number
    imagePrompt: number
    imageUrl: number
    templateId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TemplatePageContentAvgAggregateInputType = {
    pageNumber?: true
  }

  export type TemplatePageContentSumAggregateInputType = {
    pageNumber?: true
  }

  export type TemplatePageContentMinAggregateInputType = {
    id?: true
    pageNumber?: true
    content?: true
    imagePrompt?: true
    imageUrl?: true
    templateId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TemplatePageContentMaxAggregateInputType = {
    id?: true
    pageNumber?: true
    content?: true
    imagePrompt?: true
    imageUrl?: true
    templateId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TemplatePageContentCountAggregateInputType = {
    id?: true
    pageNumber?: true
    content?: true
    imagePrompt?: true
    imageUrl?: true
    templateId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TemplatePageContentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TemplatePageContent to aggregate.
     */
    where?: TemplatePageContentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TemplatePageContents to fetch.
     */
    orderBy?: TemplatePageContentOrderByWithRelationInput | TemplatePageContentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TemplatePageContentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TemplatePageContents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TemplatePageContents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TemplatePageContents
    **/
    _count?: true | TemplatePageContentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TemplatePageContentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TemplatePageContentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TemplatePageContentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TemplatePageContentMaxAggregateInputType
  }

  export type GetTemplatePageContentAggregateType<T extends TemplatePageContentAggregateArgs> = {
        [P in keyof T & keyof AggregateTemplatePageContent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTemplatePageContent[P]>
      : GetScalarType<T[P], AggregateTemplatePageContent[P]>
  }




  export type TemplatePageContentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TemplatePageContentWhereInput
    orderBy?: TemplatePageContentOrderByWithAggregationInput | TemplatePageContentOrderByWithAggregationInput[]
    by: TemplatePageContentScalarFieldEnum[] | TemplatePageContentScalarFieldEnum
    having?: TemplatePageContentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TemplatePageContentCountAggregateInputType | true
    _avg?: TemplatePageContentAvgAggregateInputType
    _sum?: TemplatePageContentSumAggregateInputType
    _min?: TemplatePageContentMinAggregateInputType
    _max?: TemplatePageContentMaxAggregateInputType
  }

  export type TemplatePageContentGroupByOutputType = {
    id: string
    pageNumber: number
    content: string
    imagePrompt: string
    imageUrl: string
    templateId: string
    createdAt: Date
    updatedAt: Date
    _count: TemplatePageContentCountAggregateOutputType | null
    _avg: TemplatePageContentAvgAggregateOutputType | null
    _sum: TemplatePageContentSumAggregateOutputType | null
    _min: TemplatePageContentMinAggregateOutputType | null
    _max: TemplatePageContentMaxAggregateOutputType | null
  }

  type GetTemplatePageContentGroupByPayload<T extends TemplatePageContentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TemplatePageContentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TemplatePageContentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TemplatePageContentGroupByOutputType[P]>
            : GetScalarType<T[P], TemplatePageContentGroupByOutputType[P]>
        }
      >
    >


  export type TemplatePageContentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pageNumber?: boolean
    content?: boolean
    imagePrompt?: boolean
    imageUrl?: boolean
    templateId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    template?: boolean | BookTemplateDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["templatePageContent"]>

  export type TemplatePageContentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pageNumber?: boolean
    content?: boolean
    imagePrompt?: boolean
    imageUrl?: boolean
    templateId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    template?: boolean | BookTemplateDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["templatePageContent"]>

  export type TemplatePageContentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pageNumber?: boolean
    content?: boolean
    imagePrompt?: boolean
    imageUrl?: boolean
    templateId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    template?: boolean | BookTemplateDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["templatePageContent"]>

  export type TemplatePageContentSelectScalar = {
    id?: boolean
    pageNumber?: boolean
    content?: boolean
    imagePrompt?: boolean
    imageUrl?: boolean
    templateId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TemplatePageContentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "pageNumber" | "content" | "imagePrompt" | "imageUrl" | "templateId" | "createdAt" | "updatedAt", ExtArgs["result"]["templatePageContent"]>
  export type TemplatePageContentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    template?: boolean | BookTemplateDefaultArgs<ExtArgs>
  }
  export type TemplatePageContentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    template?: boolean | BookTemplateDefaultArgs<ExtArgs>
  }
  export type TemplatePageContentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    template?: boolean | BookTemplateDefaultArgs<ExtArgs>
  }

  export type $TemplatePageContentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TemplatePageContent"
    objects: {
      template: Prisma.$BookTemplatePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      pageNumber: number
      content: string
      imagePrompt: string
      imageUrl: string
      templateId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["templatePageContent"]>
    composites: {}
  }

  type TemplatePageContentGetPayload<S extends boolean | null | undefined | TemplatePageContentDefaultArgs> = $Result.GetResult<Prisma.$TemplatePageContentPayload, S>

  type TemplatePageContentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TemplatePageContentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TemplatePageContentCountAggregateInputType | true
    }

  export interface TemplatePageContentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TemplatePageContent'], meta: { name: 'TemplatePageContent' } }
    /**
     * Find zero or one TemplatePageContent that matches the filter.
     * @param {TemplatePageContentFindUniqueArgs} args - Arguments to find a TemplatePageContent
     * @example
     * // Get one TemplatePageContent
     * const templatePageContent = await prisma.templatePageContent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TemplatePageContentFindUniqueArgs>(args: SelectSubset<T, TemplatePageContentFindUniqueArgs<ExtArgs>>): Prisma__TemplatePageContentClient<$Result.GetResult<Prisma.$TemplatePageContentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TemplatePageContent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TemplatePageContentFindUniqueOrThrowArgs} args - Arguments to find a TemplatePageContent
     * @example
     * // Get one TemplatePageContent
     * const templatePageContent = await prisma.templatePageContent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TemplatePageContentFindUniqueOrThrowArgs>(args: SelectSubset<T, TemplatePageContentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TemplatePageContentClient<$Result.GetResult<Prisma.$TemplatePageContentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TemplatePageContent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplatePageContentFindFirstArgs} args - Arguments to find a TemplatePageContent
     * @example
     * // Get one TemplatePageContent
     * const templatePageContent = await prisma.templatePageContent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TemplatePageContentFindFirstArgs>(args?: SelectSubset<T, TemplatePageContentFindFirstArgs<ExtArgs>>): Prisma__TemplatePageContentClient<$Result.GetResult<Prisma.$TemplatePageContentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TemplatePageContent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplatePageContentFindFirstOrThrowArgs} args - Arguments to find a TemplatePageContent
     * @example
     * // Get one TemplatePageContent
     * const templatePageContent = await prisma.templatePageContent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TemplatePageContentFindFirstOrThrowArgs>(args?: SelectSubset<T, TemplatePageContentFindFirstOrThrowArgs<ExtArgs>>): Prisma__TemplatePageContentClient<$Result.GetResult<Prisma.$TemplatePageContentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TemplatePageContents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplatePageContentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TemplatePageContents
     * const templatePageContents = await prisma.templatePageContent.findMany()
     * 
     * // Get first 10 TemplatePageContents
     * const templatePageContents = await prisma.templatePageContent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const templatePageContentWithIdOnly = await prisma.templatePageContent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TemplatePageContentFindManyArgs>(args?: SelectSubset<T, TemplatePageContentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TemplatePageContentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TemplatePageContent.
     * @param {TemplatePageContentCreateArgs} args - Arguments to create a TemplatePageContent.
     * @example
     * // Create one TemplatePageContent
     * const TemplatePageContent = await prisma.templatePageContent.create({
     *   data: {
     *     // ... data to create a TemplatePageContent
     *   }
     * })
     * 
     */
    create<T extends TemplatePageContentCreateArgs>(args: SelectSubset<T, TemplatePageContentCreateArgs<ExtArgs>>): Prisma__TemplatePageContentClient<$Result.GetResult<Prisma.$TemplatePageContentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TemplatePageContents.
     * @param {TemplatePageContentCreateManyArgs} args - Arguments to create many TemplatePageContents.
     * @example
     * // Create many TemplatePageContents
     * const templatePageContent = await prisma.templatePageContent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TemplatePageContentCreateManyArgs>(args?: SelectSubset<T, TemplatePageContentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TemplatePageContents and returns the data saved in the database.
     * @param {TemplatePageContentCreateManyAndReturnArgs} args - Arguments to create many TemplatePageContents.
     * @example
     * // Create many TemplatePageContents
     * const templatePageContent = await prisma.templatePageContent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TemplatePageContents and only return the `id`
     * const templatePageContentWithIdOnly = await prisma.templatePageContent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TemplatePageContentCreateManyAndReturnArgs>(args?: SelectSubset<T, TemplatePageContentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TemplatePageContentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TemplatePageContent.
     * @param {TemplatePageContentDeleteArgs} args - Arguments to delete one TemplatePageContent.
     * @example
     * // Delete one TemplatePageContent
     * const TemplatePageContent = await prisma.templatePageContent.delete({
     *   where: {
     *     // ... filter to delete one TemplatePageContent
     *   }
     * })
     * 
     */
    delete<T extends TemplatePageContentDeleteArgs>(args: SelectSubset<T, TemplatePageContentDeleteArgs<ExtArgs>>): Prisma__TemplatePageContentClient<$Result.GetResult<Prisma.$TemplatePageContentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TemplatePageContent.
     * @param {TemplatePageContentUpdateArgs} args - Arguments to update one TemplatePageContent.
     * @example
     * // Update one TemplatePageContent
     * const templatePageContent = await prisma.templatePageContent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TemplatePageContentUpdateArgs>(args: SelectSubset<T, TemplatePageContentUpdateArgs<ExtArgs>>): Prisma__TemplatePageContentClient<$Result.GetResult<Prisma.$TemplatePageContentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TemplatePageContents.
     * @param {TemplatePageContentDeleteManyArgs} args - Arguments to filter TemplatePageContents to delete.
     * @example
     * // Delete a few TemplatePageContents
     * const { count } = await prisma.templatePageContent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TemplatePageContentDeleteManyArgs>(args?: SelectSubset<T, TemplatePageContentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TemplatePageContents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplatePageContentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TemplatePageContents
     * const templatePageContent = await prisma.templatePageContent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TemplatePageContentUpdateManyArgs>(args: SelectSubset<T, TemplatePageContentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TemplatePageContents and returns the data updated in the database.
     * @param {TemplatePageContentUpdateManyAndReturnArgs} args - Arguments to update many TemplatePageContents.
     * @example
     * // Update many TemplatePageContents
     * const templatePageContent = await prisma.templatePageContent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TemplatePageContents and only return the `id`
     * const templatePageContentWithIdOnly = await prisma.templatePageContent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TemplatePageContentUpdateManyAndReturnArgs>(args: SelectSubset<T, TemplatePageContentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TemplatePageContentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TemplatePageContent.
     * @param {TemplatePageContentUpsertArgs} args - Arguments to update or create a TemplatePageContent.
     * @example
     * // Update or create a TemplatePageContent
     * const templatePageContent = await prisma.templatePageContent.upsert({
     *   create: {
     *     // ... data to create a TemplatePageContent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TemplatePageContent we want to update
     *   }
     * })
     */
    upsert<T extends TemplatePageContentUpsertArgs>(args: SelectSubset<T, TemplatePageContentUpsertArgs<ExtArgs>>): Prisma__TemplatePageContentClient<$Result.GetResult<Prisma.$TemplatePageContentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TemplatePageContents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplatePageContentCountArgs} args - Arguments to filter TemplatePageContents to count.
     * @example
     * // Count the number of TemplatePageContents
     * const count = await prisma.templatePageContent.count({
     *   where: {
     *     // ... the filter for the TemplatePageContents we want to count
     *   }
     * })
    **/
    count<T extends TemplatePageContentCountArgs>(
      args?: Subset<T, TemplatePageContentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TemplatePageContentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TemplatePageContent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplatePageContentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TemplatePageContentAggregateArgs>(args: Subset<T, TemplatePageContentAggregateArgs>): Prisma.PrismaPromise<GetTemplatePageContentAggregateType<T>>

    /**
     * Group by TemplatePageContent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplatePageContentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TemplatePageContentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TemplatePageContentGroupByArgs['orderBy'] }
        : { orderBy?: TemplatePageContentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TemplatePageContentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTemplatePageContentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TemplatePageContent model
   */
  readonly fields: TemplatePageContentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TemplatePageContent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TemplatePageContentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    template<T extends BookTemplateDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BookTemplateDefaultArgs<ExtArgs>>): Prisma__BookTemplateClient<$Result.GetResult<Prisma.$BookTemplatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TemplatePageContent model
   */
  interface TemplatePageContentFieldRefs {
    readonly id: FieldRef<"TemplatePageContent", 'String'>
    readonly pageNumber: FieldRef<"TemplatePageContent", 'Int'>
    readonly content: FieldRef<"TemplatePageContent", 'String'>
    readonly imagePrompt: FieldRef<"TemplatePageContent", 'String'>
    readonly imageUrl: FieldRef<"TemplatePageContent", 'String'>
    readonly templateId: FieldRef<"TemplatePageContent", 'String'>
    readonly createdAt: FieldRef<"TemplatePageContent", 'DateTime'>
    readonly updatedAt: FieldRef<"TemplatePageContent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TemplatePageContent findUnique
   */
  export type TemplatePageContentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplatePageContent
     */
    select?: TemplatePageContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplatePageContent
     */
    omit?: TemplatePageContentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplatePageContentInclude<ExtArgs> | null
    /**
     * Filter, which TemplatePageContent to fetch.
     */
    where: TemplatePageContentWhereUniqueInput
  }

  /**
   * TemplatePageContent findUniqueOrThrow
   */
  export type TemplatePageContentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplatePageContent
     */
    select?: TemplatePageContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplatePageContent
     */
    omit?: TemplatePageContentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplatePageContentInclude<ExtArgs> | null
    /**
     * Filter, which TemplatePageContent to fetch.
     */
    where: TemplatePageContentWhereUniqueInput
  }

  /**
   * TemplatePageContent findFirst
   */
  export type TemplatePageContentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplatePageContent
     */
    select?: TemplatePageContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplatePageContent
     */
    omit?: TemplatePageContentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplatePageContentInclude<ExtArgs> | null
    /**
     * Filter, which TemplatePageContent to fetch.
     */
    where?: TemplatePageContentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TemplatePageContents to fetch.
     */
    orderBy?: TemplatePageContentOrderByWithRelationInput | TemplatePageContentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TemplatePageContents.
     */
    cursor?: TemplatePageContentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TemplatePageContents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TemplatePageContents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TemplatePageContents.
     */
    distinct?: TemplatePageContentScalarFieldEnum | TemplatePageContentScalarFieldEnum[]
  }

  /**
   * TemplatePageContent findFirstOrThrow
   */
  export type TemplatePageContentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplatePageContent
     */
    select?: TemplatePageContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplatePageContent
     */
    omit?: TemplatePageContentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplatePageContentInclude<ExtArgs> | null
    /**
     * Filter, which TemplatePageContent to fetch.
     */
    where?: TemplatePageContentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TemplatePageContents to fetch.
     */
    orderBy?: TemplatePageContentOrderByWithRelationInput | TemplatePageContentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TemplatePageContents.
     */
    cursor?: TemplatePageContentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TemplatePageContents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TemplatePageContents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TemplatePageContents.
     */
    distinct?: TemplatePageContentScalarFieldEnum | TemplatePageContentScalarFieldEnum[]
  }

  /**
   * TemplatePageContent findMany
   */
  export type TemplatePageContentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplatePageContent
     */
    select?: TemplatePageContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplatePageContent
     */
    omit?: TemplatePageContentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplatePageContentInclude<ExtArgs> | null
    /**
     * Filter, which TemplatePageContents to fetch.
     */
    where?: TemplatePageContentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TemplatePageContents to fetch.
     */
    orderBy?: TemplatePageContentOrderByWithRelationInput | TemplatePageContentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TemplatePageContents.
     */
    cursor?: TemplatePageContentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TemplatePageContents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TemplatePageContents.
     */
    skip?: number
    distinct?: TemplatePageContentScalarFieldEnum | TemplatePageContentScalarFieldEnum[]
  }

  /**
   * TemplatePageContent create
   */
  export type TemplatePageContentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplatePageContent
     */
    select?: TemplatePageContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplatePageContent
     */
    omit?: TemplatePageContentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplatePageContentInclude<ExtArgs> | null
    /**
     * The data needed to create a TemplatePageContent.
     */
    data: XOR<TemplatePageContentCreateInput, TemplatePageContentUncheckedCreateInput>
  }

  /**
   * TemplatePageContent createMany
   */
  export type TemplatePageContentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TemplatePageContents.
     */
    data: TemplatePageContentCreateManyInput | TemplatePageContentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TemplatePageContent createManyAndReturn
   */
  export type TemplatePageContentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplatePageContent
     */
    select?: TemplatePageContentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TemplatePageContent
     */
    omit?: TemplatePageContentOmit<ExtArgs> | null
    /**
     * The data used to create many TemplatePageContents.
     */
    data: TemplatePageContentCreateManyInput | TemplatePageContentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplatePageContentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TemplatePageContent update
   */
  export type TemplatePageContentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplatePageContent
     */
    select?: TemplatePageContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplatePageContent
     */
    omit?: TemplatePageContentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplatePageContentInclude<ExtArgs> | null
    /**
     * The data needed to update a TemplatePageContent.
     */
    data: XOR<TemplatePageContentUpdateInput, TemplatePageContentUncheckedUpdateInput>
    /**
     * Choose, which TemplatePageContent to update.
     */
    where: TemplatePageContentWhereUniqueInput
  }

  /**
   * TemplatePageContent updateMany
   */
  export type TemplatePageContentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TemplatePageContents.
     */
    data: XOR<TemplatePageContentUpdateManyMutationInput, TemplatePageContentUncheckedUpdateManyInput>
    /**
     * Filter which TemplatePageContents to update
     */
    where?: TemplatePageContentWhereInput
    /**
     * Limit how many TemplatePageContents to update.
     */
    limit?: number
  }

  /**
   * TemplatePageContent updateManyAndReturn
   */
  export type TemplatePageContentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplatePageContent
     */
    select?: TemplatePageContentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TemplatePageContent
     */
    omit?: TemplatePageContentOmit<ExtArgs> | null
    /**
     * The data used to update TemplatePageContents.
     */
    data: XOR<TemplatePageContentUpdateManyMutationInput, TemplatePageContentUncheckedUpdateManyInput>
    /**
     * Filter which TemplatePageContents to update
     */
    where?: TemplatePageContentWhereInput
    /**
     * Limit how many TemplatePageContents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplatePageContentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TemplatePageContent upsert
   */
  export type TemplatePageContentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplatePageContent
     */
    select?: TemplatePageContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplatePageContent
     */
    omit?: TemplatePageContentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplatePageContentInclude<ExtArgs> | null
    /**
     * The filter to search for the TemplatePageContent to update in case it exists.
     */
    where: TemplatePageContentWhereUniqueInput
    /**
     * In case the TemplatePageContent found by the `where` argument doesn't exist, create a new TemplatePageContent with this data.
     */
    create: XOR<TemplatePageContentCreateInput, TemplatePageContentUncheckedCreateInput>
    /**
     * In case the TemplatePageContent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TemplatePageContentUpdateInput, TemplatePageContentUncheckedUpdateInput>
  }

  /**
   * TemplatePageContent delete
   */
  export type TemplatePageContentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplatePageContent
     */
    select?: TemplatePageContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplatePageContent
     */
    omit?: TemplatePageContentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplatePageContentInclude<ExtArgs> | null
    /**
     * Filter which TemplatePageContent to delete.
     */
    where: TemplatePageContentWhereUniqueInput
  }

  /**
   * TemplatePageContent deleteMany
   */
  export type TemplatePageContentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TemplatePageContents to delete
     */
    where?: TemplatePageContentWhereInput
    /**
     * Limit how many TemplatePageContents to delete.
     */
    limit?: number
  }

  /**
   * TemplatePageContent without action
   */
  export type TemplatePageContentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplatePageContent
     */
    select?: TemplatePageContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplatePageContent
     */
    omit?: TemplatePageContentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplatePageContentInclude<ExtArgs> | null
  }


  /**
   * Model Page
   */

  export type AggregatePage = {
    _count: PageCountAggregateOutputType | null
    _avg: PageAvgAggregateOutputType | null
    _sum: PageSumAggregateOutputType | null
    _min: PageMinAggregateOutputType | null
    _max: PageMaxAggregateOutputType | null
  }

  export type PageAvgAggregateOutputType = {
    pageNumber: number | null
  }

  export type PageSumAggregateOutputType = {
    pageNumber: number | null
  }

  export type PageMinAggregateOutputType = {
    id: string | null
    type: $Enums.PageType | null
    pageNumber: number | null
    textContent: string | null
    imagePrompt: string | null
    imageUrl: string | null
    bookId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PageMaxAggregateOutputType = {
    id: string | null
    type: $Enums.PageType | null
    pageNumber: number | null
    textContent: string | null
    imagePrompt: string | null
    imageUrl: string | null
    bookId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PageCountAggregateOutputType = {
    id: number
    type: number
    pageNumber: number
    textContent: number
    imagePrompt: number
    imageUrl: number
    imageOptions: number
    bookId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PageAvgAggregateInputType = {
    pageNumber?: true
  }

  export type PageSumAggregateInputType = {
    pageNumber?: true
  }

  export type PageMinAggregateInputType = {
    id?: true
    type?: true
    pageNumber?: true
    textContent?: true
    imagePrompt?: true
    imageUrl?: true
    bookId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PageMaxAggregateInputType = {
    id?: true
    type?: true
    pageNumber?: true
    textContent?: true
    imagePrompt?: true
    imageUrl?: true
    bookId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PageCountAggregateInputType = {
    id?: true
    type?: true
    pageNumber?: true
    textContent?: true
    imagePrompt?: true
    imageUrl?: true
    imageOptions?: true
    bookId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Page to aggregate.
     */
    where?: PageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pages to fetch.
     */
    orderBy?: PageOrderByWithRelationInput | PageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Pages
    **/
    _count?: true | PageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PageMaxAggregateInputType
  }

  export type GetPageAggregateType<T extends PageAggregateArgs> = {
        [P in keyof T & keyof AggregatePage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePage[P]>
      : GetScalarType<T[P], AggregatePage[P]>
  }




  export type PageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PageWhereInput
    orderBy?: PageOrderByWithAggregationInput | PageOrderByWithAggregationInput[]
    by: PageScalarFieldEnum[] | PageScalarFieldEnum
    having?: PageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PageCountAggregateInputType | true
    _avg?: PageAvgAggregateInputType
    _sum?: PageSumAggregateInputType
    _min?: PageMinAggregateInputType
    _max?: PageMaxAggregateInputType
  }

  export type PageGroupByOutputType = {
    id: string
    type: $Enums.PageType
    pageNumber: number
    textContent: string | null
    imagePrompt: string | null
    imageUrl: string | null
    imageOptions: string[]
    bookId: string
    createdAt: Date
    updatedAt: Date
    _count: PageCountAggregateOutputType | null
    _avg: PageAvgAggregateOutputType | null
    _sum: PageSumAggregateOutputType | null
    _min: PageMinAggregateOutputType | null
    _max: PageMaxAggregateOutputType | null
  }

  type GetPageGroupByPayload<T extends PageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PageGroupByOutputType[P]>
            : GetScalarType<T[P], PageGroupByOutputType[P]>
        }
      >
    >


  export type PageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    pageNumber?: boolean
    textContent?: boolean
    imagePrompt?: boolean
    imageUrl?: boolean
    imageOptions?: boolean
    bookId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    book?: boolean | BookDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["page"]>

  export type PageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    pageNumber?: boolean
    textContent?: boolean
    imagePrompt?: boolean
    imageUrl?: boolean
    imageOptions?: boolean
    bookId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    book?: boolean | BookDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["page"]>

  export type PageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    pageNumber?: boolean
    textContent?: boolean
    imagePrompt?: boolean
    imageUrl?: boolean
    imageOptions?: boolean
    bookId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    book?: boolean | BookDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["page"]>

  export type PageSelectScalar = {
    id?: boolean
    type?: boolean
    pageNumber?: boolean
    textContent?: boolean
    imagePrompt?: boolean
    imageUrl?: boolean
    imageOptions?: boolean
    bookId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "type" | "pageNumber" | "textContent" | "imagePrompt" | "imageUrl" | "imageOptions" | "bookId" | "createdAt" | "updatedAt", ExtArgs["result"]["page"]>
  export type PageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    book?: boolean | BookDefaultArgs<ExtArgs>
  }
  export type PageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    book?: boolean | BookDefaultArgs<ExtArgs>
  }
  export type PageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    book?: boolean | BookDefaultArgs<ExtArgs>
  }

  export type $PagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Page"
    objects: {
      book: Prisma.$BookPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      type: $Enums.PageType
      pageNumber: number
      textContent: string | null
      imagePrompt: string | null
      imageUrl: string | null
      imageOptions: string[]
      bookId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["page"]>
    composites: {}
  }

  type PageGetPayload<S extends boolean | null | undefined | PageDefaultArgs> = $Result.GetResult<Prisma.$PagePayload, S>

  type PageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PageCountAggregateInputType | true
    }

  export interface PageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Page'], meta: { name: 'Page' } }
    /**
     * Find zero or one Page that matches the filter.
     * @param {PageFindUniqueArgs} args - Arguments to find a Page
     * @example
     * // Get one Page
     * const page = await prisma.page.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PageFindUniqueArgs>(args: SelectSubset<T, PageFindUniqueArgs<ExtArgs>>): Prisma__PageClient<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Page that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PageFindUniqueOrThrowArgs} args - Arguments to find a Page
     * @example
     * // Get one Page
     * const page = await prisma.page.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PageFindUniqueOrThrowArgs>(args: SelectSubset<T, PageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PageClient<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Page that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageFindFirstArgs} args - Arguments to find a Page
     * @example
     * // Get one Page
     * const page = await prisma.page.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PageFindFirstArgs>(args?: SelectSubset<T, PageFindFirstArgs<ExtArgs>>): Prisma__PageClient<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Page that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageFindFirstOrThrowArgs} args - Arguments to find a Page
     * @example
     * // Get one Page
     * const page = await prisma.page.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PageFindFirstOrThrowArgs>(args?: SelectSubset<T, PageFindFirstOrThrowArgs<ExtArgs>>): Prisma__PageClient<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Pages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pages
     * const pages = await prisma.page.findMany()
     * 
     * // Get first 10 Pages
     * const pages = await prisma.page.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pageWithIdOnly = await prisma.page.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PageFindManyArgs>(args?: SelectSubset<T, PageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Page.
     * @param {PageCreateArgs} args - Arguments to create a Page.
     * @example
     * // Create one Page
     * const Page = await prisma.page.create({
     *   data: {
     *     // ... data to create a Page
     *   }
     * })
     * 
     */
    create<T extends PageCreateArgs>(args: SelectSubset<T, PageCreateArgs<ExtArgs>>): Prisma__PageClient<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Pages.
     * @param {PageCreateManyArgs} args - Arguments to create many Pages.
     * @example
     * // Create many Pages
     * const page = await prisma.page.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PageCreateManyArgs>(args?: SelectSubset<T, PageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Pages and returns the data saved in the database.
     * @param {PageCreateManyAndReturnArgs} args - Arguments to create many Pages.
     * @example
     * // Create many Pages
     * const page = await prisma.page.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Pages and only return the `id`
     * const pageWithIdOnly = await prisma.page.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PageCreateManyAndReturnArgs>(args?: SelectSubset<T, PageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Page.
     * @param {PageDeleteArgs} args - Arguments to delete one Page.
     * @example
     * // Delete one Page
     * const Page = await prisma.page.delete({
     *   where: {
     *     // ... filter to delete one Page
     *   }
     * })
     * 
     */
    delete<T extends PageDeleteArgs>(args: SelectSubset<T, PageDeleteArgs<ExtArgs>>): Prisma__PageClient<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Page.
     * @param {PageUpdateArgs} args - Arguments to update one Page.
     * @example
     * // Update one Page
     * const page = await prisma.page.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PageUpdateArgs>(args: SelectSubset<T, PageUpdateArgs<ExtArgs>>): Prisma__PageClient<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Pages.
     * @param {PageDeleteManyArgs} args - Arguments to filter Pages to delete.
     * @example
     * // Delete a few Pages
     * const { count } = await prisma.page.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PageDeleteManyArgs>(args?: SelectSubset<T, PageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pages
     * const page = await prisma.page.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PageUpdateManyArgs>(args: SelectSubset<T, PageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pages and returns the data updated in the database.
     * @param {PageUpdateManyAndReturnArgs} args - Arguments to update many Pages.
     * @example
     * // Update many Pages
     * const page = await prisma.page.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Pages and only return the `id`
     * const pageWithIdOnly = await prisma.page.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PageUpdateManyAndReturnArgs>(args: SelectSubset<T, PageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Page.
     * @param {PageUpsertArgs} args - Arguments to update or create a Page.
     * @example
     * // Update or create a Page
     * const page = await prisma.page.upsert({
     *   create: {
     *     // ... data to create a Page
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Page we want to update
     *   }
     * })
     */
    upsert<T extends PageUpsertArgs>(args: SelectSubset<T, PageUpsertArgs<ExtArgs>>): Prisma__PageClient<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Pages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageCountArgs} args - Arguments to filter Pages to count.
     * @example
     * // Count the number of Pages
     * const count = await prisma.page.count({
     *   where: {
     *     // ... the filter for the Pages we want to count
     *   }
     * })
    **/
    count<T extends PageCountArgs>(
      args?: Subset<T, PageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Page.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PageAggregateArgs>(args: Subset<T, PageAggregateArgs>): Prisma.PrismaPromise<GetPageAggregateType<T>>

    /**
     * Group by Page.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PageGroupByArgs['orderBy'] }
        : { orderBy?: PageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Page model
   */
  readonly fields: PageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Page.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    book<T extends BookDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BookDefaultArgs<ExtArgs>>): Prisma__BookClient<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Page model
   */
  interface PageFieldRefs {
    readonly id: FieldRef<"Page", 'String'>
    readonly type: FieldRef<"Page", 'PageType'>
    readonly pageNumber: FieldRef<"Page", 'Int'>
    readonly textContent: FieldRef<"Page", 'String'>
    readonly imagePrompt: FieldRef<"Page", 'String'>
    readonly imageUrl: FieldRef<"Page", 'String'>
    readonly imageOptions: FieldRef<"Page", 'String[]'>
    readonly bookId: FieldRef<"Page", 'String'>
    readonly createdAt: FieldRef<"Page", 'DateTime'>
    readonly updatedAt: FieldRef<"Page", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Page findUnique
   */
  export type PageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * Filter, which Page to fetch.
     */
    where: PageWhereUniqueInput
  }

  /**
   * Page findUniqueOrThrow
   */
  export type PageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * Filter, which Page to fetch.
     */
    where: PageWhereUniqueInput
  }

  /**
   * Page findFirst
   */
  export type PageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * Filter, which Page to fetch.
     */
    where?: PageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pages to fetch.
     */
    orderBy?: PageOrderByWithRelationInput | PageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pages.
     */
    cursor?: PageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pages.
     */
    distinct?: PageScalarFieldEnum | PageScalarFieldEnum[]
  }

  /**
   * Page findFirstOrThrow
   */
  export type PageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * Filter, which Page to fetch.
     */
    where?: PageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pages to fetch.
     */
    orderBy?: PageOrderByWithRelationInput | PageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pages.
     */
    cursor?: PageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pages.
     */
    distinct?: PageScalarFieldEnum | PageScalarFieldEnum[]
  }

  /**
   * Page findMany
   */
  export type PageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * Filter, which Pages to fetch.
     */
    where?: PageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pages to fetch.
     */
    orderBy?: PageOrderByWithRelationInput | PageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Pages.
     */
    cursor?: PageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pages.
     */
    skip?: number
    distinct?: PageScalarFieldEnum | PageScalarFieldEnum[]
  }

  /**
   * Page create
   */
  export type PageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * The data needed to create a Page.
     */
    data: XOR<PageCreateInput, PageUncheckedCreateInput>
  }

  /**
   * Page createMany
   */
  export type PageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Pages.
     */
    data: PageCreateManyInput | PageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Page createManyAndReturn
   */
  export type PageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * The data used to create many Pages.
     */
    data: PageCreateManyInput | PageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Page update
   */
  export type PageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * The data needed to update a Page.
     */
    data: XOR<PageUpdateInput, PageUncheckedUpdateInput>
    /**
     * Choose, which Page to update.
     */
    where: PageWhereUniqueInput
  }

  /**
   * Page updateMany
   */
  export type PageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Pages.
     */
    data: XOR<PageUpdateManyMutationInput, PageUncheckedUpdateManyInput>
    /**
     * Filter which Pages to update
     */
    where?: PageWhereInput
    /**
     * Limit how many Pages to update.
     */
    limit?: number
  }

  /**
   * Page updateManyAndReturn
   */
  export type PageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * The data used to update Pages.
     */
    data: XOR<PageUpdateManyMutationInput, PageUncheckedUpdateManyInput>
    /**
     * Filter which Pages to update
     */
    where?: PageWhereInput
    /**
     * Limit how many Pages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Page upsert
   */
  export type PageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * The filter to search for the Page to update in case it exists.
     */
    where: PageWhereUniqueInput
    /**
     * In case the Page found by the `where` argument doesn't exist, create a new Page with this data.
     */
    create: XOR<PageCreateInput, PageUncheckedCreateInput>
    /**
     * In case the Page was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PageUpdateInput, PageUncheckedUpdateInput>
  }

  /**
   * Page delete
   */
  export type PageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * Filter which Page to delete.
     */
    where: PageWhereUniqueInput
  }

  /**
   * Page deleteMany
   */
  export type PageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pages to delete
     */
    where?: PageWhereInput
    /**
     * Limit how many Pages to delete.
     */
    limit?: number
  }

  /**
   * Page without action
   */
  export type PageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
  }


  /**
   * Model ImageGeneration
   */

  export type AggregateImageGeneration = {
    _count: ImageGenerationCountAggregateOutputType | null
    _avg: ImageGenerationAvgAggregateOutputType | null
    _sum: ImageGenerationSumAggregateOutputType | null
    _min: ImageGenerationMinAggregateOutputType | null
    _max: ImageGenerationMaxAggregateOutputType | null
  }

  export type ImageGenerationAvgAggregateOutputType = {
    apiCreditCost: number | null
  }

  export type ImageGenerationSumAggregateOutputType = {
    apiCreditCost: number | null
  }

  export type ImageGenerationMinAggregateOutputType = {
    id: string | null
    generationId: string | null
    bookId: string | null
    pageId: string | null
    type: $Enums.ImageType | null
    prompt: string | null
    status: $Enums.GenerationStatus | null
    errorMessage: string | null
    apiCreditCost: number | null
    createdAt: Date | null
    completedAt: Date | null
  }

  export type ImageGenerationMaxAggregateOutputType = {
    id: string | null
    generationId: string | null
    bookId: string | null
    pageId: string | null
    type: $Enums.ImageType | null
    prompt: string | null
    status: $Enums.GenerationStatus | null
    errorMessage: string | null
    apiCreditCost: number | null
    createdAt: Date | null
    completedAt: Date | null
  }

  export type ImageGenerationCountAggregateOutputType = {
    id: number
    generationId: number
    bookId: number
    pageId: number
    type: number
    prompt: number
    status: number
    errorMessage: number
    apiCreditCost: number
    createdAt: number
    completedAt: number
    _all: number
  }


  export type ImageGenerationAvgAggregateInputType = {
    apiCreditCost?: true
  }

  export type ImageGenerationSumAggregateInputType = {
    apiCreditCost?: true
  }

  export type ImageGenerationMinAggregateInputType = {
    id?: true
    generationId?: true
    bookId?: true
    pageId?: true
    type?: true
    prompt?: true
    status?: true
    errorMessage?: true
    apiCreditCost?: true
    createdAt?: true
    completedAt?: true
  }

  export type ImageGenerationMaxAggregateInputType = {
    id?: true
    generationId?: true
    bookId?: true
    pageId?: true
    type?: true
    prompt?: true
    status?: true
    errorMessage?: true
    apiCreditCost?: true
    createdAt?: true
    completedAt?: true
  }

  export type ImageGenerationCountAggregateInputType = {
    id?: true
    generationId?: true
    bookId?: true
    pageId?: true
    type?: true
    prompt?: true
    status?: true
    errorMessage?: true
    apiCreditCost?: true
    createdAt?: true
    completedAt?: true
    _all?: true
  }

  export type ImageGenerationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ImageGeneration to aggregate.
     */
    where?: ImageGenerationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ImageGenerations to fetch.
     */
    orderBy?: ImageGenerationOrderByWithRelationInput | ImageGenerationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ImageGenerationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ImageGenerations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ImageGenerations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ImageGenerations
    **/
    _count?: true | ImageGenerationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ImageGenerationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ImageGenerationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ImageGenerationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ImageGenerationMaxAggregateInputType
  }

  export type GetImageGenerationAggregateType<T extends ImageGenerationAggregateArgs> = {
        [P in keyof T & keyof AggregateImageGeneration]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateImageGeneration[P]>
      : GetScalarType<T[P], AggregateImageGeneration[P]>
  }




  export type ImageGenerationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ImageGenerationWhereInput
    orderBy?: ImageGenerationOrderByWithAggregationInput | ImageGenerationOrderByWithAggregationInput[]
    by: ImageGenerationScalarFieldEnum[] | ImageGenerationScalarFieldEnum
    having?: ImageGenerationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ImageGenerationCountAggregateInputType | true
    _avg?: ImageGenerationAvgAggregateInputType
    _sum?: ImageGenerationSumAggregateInputType
    _min?: ImageGenerationMinAggregateInputType
    _max?: ImageGenerationMaxAggregateInputType
  }

  export type ImageGenerationGroupByOutputType = {
    id: string
    generationId: string
    bookId: string
    pageId: string | null
    type: $Enums.ImageType
    prompt: string
    status: $Enums.GenerationStatus
    errorMessage: string | null
    apiCreditCost: number | null
    createdAt: Date
    completedAt: Date | null
    _count: ImageGenerationCountAggregateOutputType | null
    _avg: ImageGenerationAvgAggregateOutputType | null
    _sum: ImageGenerationSumAggregateOutputType | null
    _min: ImageGenerationMinAggregateOutputType | null
    _max: ImageGenerationMaxAggregateOutputType | null
  }

  type GetImageGenerationGroupByPayload<T extends ImageGenerationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ImageGenerationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ImageGenerationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ImageGenerationGroupByOutputType[P]>
            : GetScalarType<T[P], ImageGenerationGroupByOutputType[P]>
        }
      >
    >


  export type ImageGenerationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    generationId?: boolean
    bookId?: boolean
    pageId?: boolean
    type?: boolean
    prompt?: boolean
    status?: boolean
    errorMessage?: boolean
    apiCreditCost?: boolean
    createdAt?: boolean
    completedAt?: boolean
    book?: boolean | BookDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["imageGeneration"]>

  export type ImageGenerationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    generationId?: boolean
    bookId?: boolean
    pageId?: boolean
    type?: boolean
    prompt?: boolean
    status?: boolean
    errorMessage?: boolean
    apiCreditCost?: boolean
    createdAt?: boolean
    completedAt?: boolean
    book?: boolean | BookDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["imageGeneration"]>

  export type ImageGenerationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    generationId?: boolean
    bookId?: boolean
    pageId?: boolean
    type?: boolean
    prompt?: boolean
    status?: boolean
    errorMessage?: boolean
    apiCreditCost?: boolean
    createdAt?: boolean
    completedAt?: boolean
    book?: boolean | BookDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["imageGeneration"]>

  export type ImageGenerationSelectScalar = {
    id?: boolean
    generationId?: boolean
    bookId?: boolean
    pageId?: boolean
    type?: boolean
    prompt?: boolean
    status?: boolean
    errorMessage?: boolean
    apiCreditCost?: boolean
    createdAt?: boolean
    completedAt?: boolean
  }

  export type ImageGenerationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "generationId" | "bookId" | "pageId" | "type" | "prompt" | "status" | "errorMessage" | "apiCreditCost" | "createdAt" | "completedAt", ExtArgs["result"]["imageGeneration"]>
  export type ImageGenerationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    book?: boolean | BookDefaultArgs<ExtArgs>
  }
  export type ImageGenerationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    book?: boolean | BookDefaultArgs<ExtArgs>
  }
  export type ImageGenerationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    book?: boolean | BookDefaultArgs<ExtArgs>
  }

  export type $ImageGenerationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ImageGeneration"
    objects: {
      book: Prisma.$BookPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      generationId: string
      bookId: string
      pageId: string | null
      type: $Enums.ImageType
      prompt: string
      status: $Enums.GenerationStatus
      errorMessage: string | null
      apiCreditCost: number | null
      createdAt: Date
      completedAt: Date | null
    }, ExtArgs["result"]["imageGeneration"]>
    composites: {}
  }

  type ImageGenerationGetPayload<S extends boolean | null | undefined | ImageGenerationDefaultArgs> = $Result.GetResult<Prisma.$ImageGenerationPayload, S>

  type ImageGenerationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ImageGenerationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ImageGenerationCountAggregateInputType | true
    }

  export interface ImageGenerationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ImageGeneration'], meta: { name: 'ImageGeneration' } }
    /**
     * Find zero or one ImageGeneration that matches the filter.
     * @param {ImageGenerationFindUniqueArgs} args - Arguments to find a ImageGeneration
     * @example
     * // Get one ImageGeneration
     * const imageGeneration = await prisma.imageGeneration.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ImageGenerationFindUniqueArgs>(args: SelectSubset<T, ImageGenerationFindUniqueArgs<ExtArgs>>): Prisma__ImageGenerationClient<$Result.GetResult<Prisma.$ImageGenerationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ImageGeneration that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ImageGenerationFindUniqueOrThrowArgs} args - Arguments to find a ImageGeneration
     * @example
     * // Get one ImageGeneration
     * const imageGeneration = await prisma.imageGeneration.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ImageGenerationFindUniqueOrThrowArgs>(args: SelectSubset<T, ImageGenerationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ImageGenerationClient<$Result.GetResult<Prisma.$ImageGenerationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ImageGeneration that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageGenerationFindFirstArgs} args - Arguments to find a ImageGeneration
     * @example
     * // Get one ImageGeneration
     * const imageGeneration = await prisma.imageGeneration.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ImageGenerationFindFirstArgs>(args?: SelectSubset<T, ImageGenerationFindFirstArgs<ExtArgs>>): Prisma__ImageGenerationClient<$Result.GetResult<Prisma.$ImageGenerationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ImageGeneration that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageGenerationFindFirstOrThrowArgs} args - Arguments to find a ImageGeneration
     * @example
     * // Get one ImageGeneration
     * const imageGeneration = await prisma.imageGeneration.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ImageGenerationFindFirstOrThrowArgs>(args?: SelectSubset<T, ImageGenerationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ImageGenerationClient<$Result.GetResult<Prisma.$ImageGenerationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ImageGenerations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageGenerationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ImageGenerations
     * const imageGenerations = await prisma.imageGeneration.findMany()
     * 
     * // Get first 10 ImageGenerations
     * const imageGenerations = await prisma.imageGeneration.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const imageGenerationWithIdOnly = await prisma.imageGeneration.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ImageGenerationFindManyArgs>(args?: SelectSubset<T, ImageGenerationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImageGenerationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ImageGeneration.
     * @param {ImageGenerationCreateArgs} args - Arguments to create a ImageGeneration.
     * @example
     * // Create one ImageGeneration
     * const ImageGeneration = await prisma.imageGeneration.create({
     *   data: {
     *     // ... data to create a ImageGeneration
     *   }
     * })
     * 
     */
    create<T extends ImageGenerationCreateArgs>(args: SelectSubset<T, ImageGenerationCreateArgs<ExtArgs>>): Prisma__ImageGenerationClient<$Result.GetResult<Prisma.$ImageGenerationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ImageGenerations.
     * @param {ImageGenerationCreateManyArgs} args - Arguments to create many ImageGenerations.
     * @example
     * // Create many ImageGenerations
     * const imageGeneration = await prisma.imageGeneration.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ImageGenerationCreateManyArgs>(args?: SelectSubset<T, ImageGenerationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ImageGenerations and returns the data saved in the database.
     * @param {ImageGenerationCreateManyAndReturnArgs} args - Arguments to create many ImageGenerations.
     * @example
     * // Create many ImageGenerations
     * const imageGeneration = await prisma.imageGeneration.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ImageGenerations and only return the `id`
     * const imageGenerationWithIdOnly = await prisma.imageGeneration.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ImageGenerationCreateManyAndReturnArgs>(args?: SelectSubset<T, ImageGenerationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImageGenerationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ImageGeneration.
     * @param {ImageGenerationDeleteArgs} args - Arguments to delete one ImageGeneration.
     * @example
     * // Delete one ImageGeneration
     * const ImageGeneration = await prisma.imageGeneration.delete({
     *   where: {
     *     // ... filter to delete one ImageGeneration
     *   }
     * })
     * 
     */
    delete<T extends ImageGenerationDeleteArgs>(args: SelectSubset<T, ImageGenerationDeleteArgs<ExtArgs>>): Prisma__ImageGenerationClient<$Result.GetResult<Prisma.$ImageGenerationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ImageGeneration.
     * @param {ImageGenerationUpdateArgs} args - Arguments to update one ImageGeneration.
     * @example
     * // Update one ImageGeneration
     * const imageGeneration = await prisma.imageGeneration.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ImageGenerationUpdateArgs>(args: SelectSubset<T, ImageGenerationUpdateArgs<ExtArgs>>): Prisma__ImageGenerationClient<$Result.GetResult<Prisma.$ImageGenerationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ImageGenerations.
     * @param {ImageGenerationDeleteManyArgs} args - Arguments to filter ImageGenerations to delete.
     * @example
     * // Delete a few ImageGenerations
     * const { count } = await prisma.imageGeneration.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ImageGenerationDeleteManyArgs>(args?: SelectSubset<T, ImageGenerationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ImageGenerations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageGenerationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ImageGenerations
     * const imageGeneration = await prisma.imageGeneration.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ImageGenerationUpdateManyArgs>(args: SelectSubset<T, ImageGenerationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ImageGenerations and returns the data updated in the database.
     * @param {ImageGenerationUpdateManyAndReturnArgs} args - Arguments to update many ImageGenerations.
     * @example
     * // Update many ImageGenerations
     * const imageGeneration = await prisma.imageGeneration.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ImageGenerations and only return the `id`
     * const imageGenerationWithIdOnly = await prisma.imageGeneration.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ImageGenerationUpdateManyAndReturnArgs>(args: SelectSubset<T, ImageGenerationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImageGenerationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ImageGeneration.
     * @param {ImageGenerationUpsertArgs} args - Arguments to update or create a ImageGeneration.
     * @example
     * // Update or create a ImageGeneration
     * const imageGeneration = await prisma.imageGeneration.upsert({
     *   create: {
     *     // ... data to create a ImageGeneration
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ImageGeneration we want to update
     *   }
     * })
     */
    upsert<T extends ImageGenerationUpsertArgs>(args: SelectSubset<T, ImageGenerationUpsertArgs<ExtArgs>>): Prisma__ImageGenerationClient<$Result.GetResult<Prisma.$ImageGenerationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ImageGenerations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageGenerationCountArgs} args - Arguments to filter ImageGenerations to count.
     * @example
     * // Count the number of ImageGenerations
     * const count = await prisma.imageGeneration.count({
     *   where: {
     *     // ... the filter for the ImageGenerations we want to count
     *   }
     * })
    **/
    count<T extends ImageGenerationCountArgs>(
      args?: Subset<T, ImageGenerationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ImageGenerationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ImageGeneration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageGenerationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ImageGenerationAggregateArgs>(args: Subset<T, ImageGenerationAggregateArgs>): Prisma.PrismaPromise<GetImageGenerationAggregateType<T>>

    /**
     * Group by ImageGeneration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageGenerationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ImageGenerationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ImageGenerationGroupByArgs['orderBy'] }
        : { orderBy?: ImageGenerationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ImageGenerationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetImageGenerationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ImageGeneration model
   */
  readonly fields: ImageGenerationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ImageGeneration.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ImageGenerationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    book<T extends BookDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BookDefaultArgs<ExtArgs>>): Prisma__BookClient<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ImageGeneration model
   */
  interface ImageGenerationFieldRefs {
    readonly id: FieldRef<"ImageGeneration", 'String'>
    readonly generationId: FieldRef<"ImageGeneration", 'String'>
    readonly bookId: FieldRef<"ImageGeneration", 'String'>
    readonly pageId: FieldRef<"ImageGeneration", 'String'>
    readonly type: FieldRef<"ImageGeneration", 'ImageType'>
    readonly prompt: FieldRef<"ImageGeneration", 'String'>
    readonly status: FieldRef<"ImageGeneration", 'GenerationStatus'>
    readonly errorMessage: FieldRef<"ImageGeneration", 'String'>
    readonly apiCreditCost: FieldRef<"ImageGeneration", 'Float'>
    readonly createdAt: FieldRef<"ImageGeneration", 'DateTime'>
    readonly completedAt: FieldRef<"ImageGeneration", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ImageGeneration findUnique
   */
  export type ImageGenerationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImageGeneration
     */
    select?: ImageGenerationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImageGeneration
     */
    omit?: ImageGenerationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageGenerationInclude<ExtArgs> | null
    /**
     * Filter, which ImageGeneration to fetch.
     */
    where: ImageGenerationWhereUniqueInput
  }

  /**
   * ImageGeneration findUniqueOrThrow
   */
  export type ImageGenerationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImageGeneration
     */
    select?: ImageGenerationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImageGeneration
     */
    omit?: ImageGenerationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageGenerationInclude<ExtArgs> | null
    /**
     * Filter, which ImageGeneration to fetch.
     */
    where: ImageGenerationWhereUniqueInput
  }

  /**
   * ImageGeneration findFirst
   */
  export type ImageGenerationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImageGeneration
     */
    select?: ImageGenerationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImageGeneration
     */
    omit?: ImageGenerationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageGenerationInclude<ExtArgs> | null
    /**
     * Filter, which ImageGeneration to fetch.
     */
    where?: ImageGenerationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ImageGenerations to fetch.
     */
    orderBy?: ImageGenerationOrderByWithRelationInput | ImageGenerationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ImageGenerations.
     */
    cursor?: ImageGenerationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ImageGenerations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ImageGenerations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ImageGenerations.
     */
    distinct?: ImageGenerationScalarFieldEnum | ImageGenerationScalarFieldEnum[]
  }

  /**
   * ImageGeneration findFirstOrThrow
   */
  export type ImageGenerationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImageGeneration
     */
    select?: ImageGenerationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImageGeneration
     */
    omit?: ImageGenerationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageGenerationInclude<ExtArgs> | null
    /**
     * Filter, which ImageGeneration to fetch.
     */
    where?: ImageGenerationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ImageGenerations to fetch.
     */
    orderBy?: ImageGenerationOrderByWithRelationInput | ImageGenerationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ImageGenerations.
     */
    cursor?: ImageGenerationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ImageGenerations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ImageGenerations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ImageGenerations.
     */
    distinct?: ImageGenerationScalarFieldEnum | ImageGenerationScalarFieldEnum[]
  }

  /**
   * ImageGeneration findMany
   */
  export type ImageGenerationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImageGeneration
     */
    select?: ImageGenerationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImageGeneration
     */
    omit?: ImageGenerationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageGenerationInclude<ExtArgs> | null
    /**
     * Filter, which ImageGenerations to fetch.
     */
    where?: ImageGenerationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ImageGenerations to fetch.
     */
    orderBy?: ImageGenerationOrderByWithRelationInput | ImageGenerationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ImageGenerations.
     */
    cursor?: ImageGenerationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ImageGenerations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ImageGenerations.
     */
    skip?: number
    distinct?: ImageGenerationScalarFieldEnum | ImageGenerationScalarFieldEnum[]
  }

  /**
   * ImageGeneration create
   */
  export type ImageGenerationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImageGeneration
     */
    select?: ImageGenerationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImageGeneration
     */
    omit?: ImageGenerationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageGenerationInclude<ExtArgs> | null
    /**
     * The data needed to create a ImageGeneration.
     */
    data: XOR<ImageGenerationCreateInput, ImageGenerationUncheckedCreateInput>
  }

  /**
   * ImageGeneration createMany
   */
  export type ImageGenerationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ImageGenerations.
     */
    data: ImageGenerationCreateManyInput | ImageGenerationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ImageGeneration createManyAndReturn
   */
  export type ImageGenerationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImageGeneration
     */
    select?: ImageGenerationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ImageGeneration
     */
    omit?: ImageGenerationOmit<ExtArgs> | null
    /**
     * The data used to create many ImageGenerations.
     */
    data: ImageGenerationCreateManyInput | ImageGenerationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageGenerationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ImageGeneration update
   */
  export type ImageGenerationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImageGeneration
     */
    select?: ImageGenerationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImageGeneration
     */
    omit?: ImageGenerationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageGenerationInclude<ExtArgs> | null
    /**
     * The data needed to update a ImageGeneration.
     */
    data: XOR<ImageGenerationUpdateInput, ImageGenerationUncheckedUpdateInput>
    /**
     * Choose, which ImageGeneration to update.
     */
    where: ImageGenerationWhereUniqueInput
  }

  /**
   * ImageGeneration updateMany
   */
  export type ImageGenerationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ImageGenerations.
     */
    data: XOR<ImageGenerationUpdateManyMutationInput, ImageGenerationUncheckedUpdateManyInput>
    /**
     * Filter which ImageGenerations to update
     */
    where?: ImageGenerationWhereInput
    /**
     * Limit how many ImageGenerations to update.
     */
    limit?: number
  }

  /**
   * ImageGeneration updateManyAndReturn
   */
  export type ImageGenerationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImageGeneration
     */
    select?: ImageGenerationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ImageGeneration
     */
    omit?: ImageGenerationOmit<ExtArgs> | null
    /**
     * The data used to update ImageGenerations.
     */
    data: XOR<ImageGenerationUpdateManyMutationInput, ImageGenerationUncheckedUpdateManyInput>
    /**
     * Filter which ImageGenerations to update
     */
    where?: ImageGenerationWhereInput
    /**
     * Limit how many ImageGenerations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageGenerationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ImageGeneration upsert
   */
  export type ImageGenerationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImageGeneration
     */
    select?: ImageGenerationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImageGeneration
     */
    omit?: ImageGenerationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageGenerationInclude<ExtArgs> | null
    /**
     * The filter to search for the ImageGeneration to update in case it exists.
     */
    where: ImageGenerationWhereUniqueInput
    /**
     * In case the ImageGeneration found by the `where` argument doesn't exist, create a new ImageGeneration with this data.
     */
    create: XOR<ImageGenerationCreateInput, ImageGenerationUncheckedCreateInput>
    /**
     * In case the ImageGeneration was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ImageGenerationUpdateInput, ImageGenerationUncheckedUpdateInput>
  }

  /**
   * ImageGeneration delete
   */
  export type ImageGenerationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImageGeneration
     */
    select?: ImageGenerationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImageGeneration
     */
    omit?: ImageGenerationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageGenerationInclude<ExtArgs> | null
    /**
     * Filter which ImageGeneration to delete.
     */
    where: ImageGenerationWhereUniqueInput
  }

  /**
   * ImageGeneration deleteMany
   */
  export type ImageGenerationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ImageGenerations to delete
     */
    where?: ImageGenerationWhereInput
    /**
     * Limit how many ImageGenerations to delete.
     */
    limit?: number
  }

  /**
   * ImageGeneration without action
   */
  export type ImageGenerationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImageGeneration
     */
    select?: ImageGenerationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImageGeneration
     */
    omit?: ImageGenerationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageGenerationInclude<ExtArgs> | null
  }


  /**
   * Model Order
   */

  export type AggregateOrder = {
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  export type OrderAvgAggregateOutputType = {
    totalPrice: Decimal | null
    quantity: number | null
    pricePaid: number | null
    shippingCost: Decimal | null
    printingCost: Decimal | null
    imagesCost: Decimal | null
  }

  export type OrderSumAggregateOutputType = {
    totalPrice: Decimal | null
    quantity: number | null
    pricePaid: number | null
    shippingCost: Decimal | null
    printingCost: Decimal | null
    imagesCost: Decimal | null
  }

  export type OrderMinAggregateOutputType = {
    id: string | null
    orderNumber: string | null
    productType: $Enums.ProductType | null
    totalPrice: Decimal | null
    currency: string | null
    status: $Enums.OrderStatus | null
    paymentProvider: string | null
    quantity: number | null
    paymentId: string | null
    transactionId: string | null
    pricePaid: number | null
    payerEmail: string | null
    shippingCost: Decimal | null
    printingCost: Decimal | null
    imagesCost: Decimal | null
    shippingLevel: $Enums.ShippingLevel | null
    phoneNumber: string | null
    name: string | null
    street1: string | null
    street2: string | null
    city: string | null
    state_code: string | null
    postcode: string | null
    country: string | null
    poProviderOrderId: string | null
    trackingNumber: string | null
    customerEmail: string | null
    bookId: string | null
    userId: string | null
    printJobId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    paidAt: Date | null
    fulfilledAt: Date | null
  }

  export type OrderMaxAggregateOutputType = {
    id: string | null
    orderNumber: string | null
    productType: $Enums.ProductType | null
    totalPrice: Decimal | null
    currency: string | null
    status: $Enums.OrderStatus | null
    paymentProvider: string | null
    quantity: number | null
    paymentId: string | null
    transactionId: string | null
    pricePaid: number | null
    payerEmail: string | null
    shippingCost: Decimal | null
    printingCost: Decimal | null
    imagesCost: Decimal | null
    shippingLevel: $Enums.ShippingLevel | null
    phoneNumber: string | null
    name: string | null
    street1: string | null
    street2: string | null
    city: string | null
    state_code: string | null
    postcode: string | null
    country: string | null
    poProviderOrderId: string | null
    trackingNumber: string | null
    customerEmail: string | null
    bookId: string | null
    userId: string | null
    printJobId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    paidAt: Date | null
    fulfilledAt: Date | null
  }

  export type OrderCountAggregateOutputType = {
    id: number
    orderNumber: number
    productType: number
    totalPrice: number
    currency: number
    status: number
    paymentProvider: number
    quantity: number
    paymentId: number
    transactionId: number
    pricePaid: number
    payerEmail: number
    shippingCost: number
    printingCost: number
    imagesCost: number
    shippingLevel: number
    phoneNumber: number
    name: number
    street1: number
    street2: number
    city: number
    state_code: number
    postcode: number
    country: number
    poProviderOrderId: number
    trackingNumber: number
    customerEmail: number
    bookId: number
    userId: number
    printJobId: number
    createdAt: number
    updatedAt: number
    paidAt: number
    fulfilledAt: number
    _all: number
  }


  export type OrderAvgAggregateInputType = {
    totalPrice?: true
    quantity?: true
    pricePaid?: true
    shippingCost?: true
    printingCost?: true
    imagesCost?: true
  }

  export type OrderSumAggregateInputType = {
    totalPrice?: true
    quantity?: true
    pricePaid?: true
    shippingCost?: true
    printingCost?: true
    imagesCost?: true
  }

  export type OrderMinAggregateInputType = {
    id?: true
    orderNumber?: true
    productType?: true
    totalPrice?: true
    currency?: true
    status?: true
    paymentProvider?: true
    quantity?: true
    paymentId?: true
    transactionId?: true
    pricePaid?: true
    payerEmail?: true
    shippingCost?: true
    printingCost?: true
    imagesCost?: true
    shippingLevel?: true
    phoneNumber?: true
    name?: true
    street1?: true
    street2?: true
    city?: true
    state_code?: true
    postcode?: true
    country?: true
    poProviderOrderId?: true
    trackingNumber?: true
    customerEmail?: true
    bookId?: true
    userId?: true
    printJobId?: true
    createdAt?: true
    updatedAt?: true
    paidAt?: true
    fulfilledAt?: true
  }

  export type OrderMaxAggregateInputType = {
    id?: true
    orderNumber?: true
    productType?: true
    totalPrice?: true
    currency?: true
    status?: true
    paymentProvider?: true
    quantity?: true
    paymentId?: true
    transactionId?: true
    pricePaid?: true
    payerEmail?: true
    shippingCost?: true
    printingCost?: true
    imagesCost?: true
    shippingLevel?: true
    phoneNumber?: true
    name?: true
    street1?: true
    street2?: true
    city?: true
    state_code?: true
    postcode?: true
    country?: true
    poProviderOrderId?: true
    trackingNumber?: true
    customerEmail?: true
    bookId?: true
    userId?: true
    printJobId?: true
    createdAt?: true
    updatedAt?: true
    paidAt?: true
    fulfilledAt?: true
  }

  export type OrderCountAggregateInputType = {
    id?: true
    orderNumber?: true
    productType?: true
    totalPrice?: true
    currency?: true
    status?: true
    paymentProvider?: true
    quantity?: true
    paymentId?: true
    transactionId?: true
    pricePaid?: true
    payerEmail?: true
    shippingCost?: true
    printingCost?: true
    imagesCost?: true
    shippingLevel?: true
    phoneNumber?: true
    name?: true
    street1?: true
    street2?: true
    city?: true
    state_code?: true
    postcode?: true
    country?: true
    poProviderOrderId?: true
    trackingNumber?: true
    customerEmail?: true
    bookId?: true
    userId?: true
    printJobId?: true
    createdAt?: true
    updatedAt?: true
    paidAt?: true
    fulfilledAt?: true
    _all?: true
  }

  export type OrderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Order to aggregate.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Orders
    **/
    _count?: true | OrderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrderAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrderSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderMaxAggregateInputType
  }

  export type GetOrderAggregateType<T extends OrderAggregateArgs> = {
        [P in keyof T & keyof AggregateOrder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrder[P]>
      : GetScalarType<T[P], AggregateOrder[P]>
  }




  export type OrderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithAggregationInput | OrderOrderByWithAggregationInput[]
    by: OrderScalarFieldEnum[] | OrderScalarFieldEnum
    having?: OrderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderCountAggregateInputType | true
    _avg?: OrderAvgAggregateInputType
    _sum?: OrderSumAggregateInputType
    _min?: OrderMinAggregateInputType
    _max?: OrderMaxAggregateInputType
  }

  export type OrderGroupByOutputType = {
    id: string
    orderNumber: string
    productType: $Enums.ProductType
    totalPrice: Decimal
    currency: string
    status: $Enums.OrderStatus
    paymentProvider: string
    quantity: number
    paymentId: string | null
    transactionId: string | null
    pricePaid: number | null
    payerEmail: string | null
    shippingCost: Decimal | null
    printingCost: Decimal | null
    imagesCost: Decimal | null
    shippingLevel: $Enums.ShippingLevel | null
    phoneNumber: string | null
    name: string | null
    street1: string | null
    street2: string | null
    city: string | null
    state_code: string | null
    postcode: string | null
    country: string | null
    poProviderOrderId: string | null
    trackingNumber: string | null
    customerEmail: string
    bookId: string
    userId: string | null
    printJobId: string | null
    createdAt: Date
    updatedAt: Date
    paidAt: Date | null
    fulfilledAt: Date | null
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  type GetOrderGroupByPayload<T extends OrderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderGroupByOutputType[P]>
            : GetScalarType<T[P], OrderGroupByOutputType[P]>
        }
      >
    >


  export type OrderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderNumber?: boolean
    productType?: boolean
    totalPrice?: boolean
    currency?: boolean
    status?: boolean
    paymentProvider?: boolean
    quantity?: boolean
    paymentId?: boolean
    transactionId?: boolean
    pricePaid?: boolean
    payerEmail?: boolean
    shippingCost?: boolean
    printingCost?: boolean
    imagesCost?: boolean
    shippingLevel?: boolean
    phoneNumber?: boolean
    name?: boolean
    street1?: boolean
    street2?: boolean
    city?: boolean
    state_code?: boolean
    postcode?: boolean
    country?: boolean
    poProviderOrderId?: boolean
    trackingNumber?: boolean
    customerEmail?: boolean
    bookId?: boolean
    userId?: boolean
    printJobId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    paidAt?: boolean
    fulfilledAt?: boolean
    book?: boolean | BookDefaultArgs<ExtArgs>
    user?: boolean | Order$userArgs<ExtArgs>
    printJob?: boolean | Order$printJobArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderNumber?: boolean
    productType?: boolean
    totalPrice?: boolean
    currency?: boolean
    status?: boolean
    paymentProvider?: boolean
    quantity?: boolean
    paymentId?: boolean
    transactionId?: boolean
    pricePaid?: boolean
    payerEmail?: boolean
    shippingCost?: boolean
    printingCost?: boolean
    imagesCost?: boolean
    shippingLevel?: boolean
    phoneNumber?: boolean
    name?: boolean
    street1?: boolean
    street2?: boolean
    city?: boolean
    state_code?: boolean
    postcode?: boolean
    country?: boolean
    poProviderOrderId?: boolean
    trackingNumber?: boolean
    customerEmail?: boolean
    bookId?: boolean
    userId?: boolean
    printJobId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    paidAt?: boolean
    fulfilledAt?: boolean
    book?: boolean | BookDefaultArgs<ExtArgs>
    user?: boolean | Order$userArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderNumber?: boolean
    productType?: boolean
    totalPrice?: boolean
    currency?: boolean
    status?: boolean
    paymentProvider?: boolean
    quantity?: boolean
    paymentId?: boolean
    transactionId?: boolean
    pricePaid?: boolean
    payerEmail?: boolean
    shippingCost?: boolean
    printingCost?: boolean
    imagesCost?: boolean
    shippingLevel?: boolean
    phoneNumber?: boolean
    name?: boolean
    street1?: boolean
    street2?: boolean
    city?: boolean
    state_code?: boolean
    postcode?: boolean
    country?: boolean
    poProviderOrderId?: boolean
    trackingNumber?: boolean
    customerEmail?: boolean
    bookId?: boolean
    userId?: boolean
    printJobId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    paidAt?: boolean
    fulfilledAt?: boolean
    book?: boolean | BookDefaultArgs<ExtArgs>
    user?: boolean | Order$userArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectScalar = {
    id?: boolean
    orderNumber?: boolean
    productType?: boolean
    totalPrice?: boolean
    currency?: boolean
    status?: boolean
    paymentProvider?: boolean
    quantity?: boolean
    paymentId?: boolean
    transactionId?: boolean
    pricePaid?: boolean
    payerEmail?: boolean
    shippingCost?: boolean
    printingCost?: boolean
    imagesCost?: boolean
    shippingLevel?: boolean
    phoneNumber?: boolean
    name?: boolean
    street1?: boolean
    street2?: boolean
    city?: boolean
    state_code?: boolean
    postcode?: boolean
    country?: boolean
    poProviderOrderId?: boolean
    trackingNumber?: boolean
    customerEmail?: boolean
    bookId?: boolean
    userId?: boolean
    printJobId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    paidAt?: boolean
    fulfilledAt?: boolean
  }

  export type OrderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "orderNumber" | "productType" | "totalPrice" | "currency" | "status" | "paymentProvider" | "quantity" | "paymentId" | "transactionId" | "pricePaid" | "payerEmail" | "shippingCost" | "printingCost" | "imagesCost" | "shippingLevel" | "phoneNumber" | "name" | "street1" | "street2" | "city" | "state_code" | "postcode" | "country" | "poProviderOrderId" | "trackingNumber" | "customerEmail" | "bookId" | "userId" | "printJobId" | "createdAt" | "updatedAt" | "paidAt" | "fulfilledAt", ExtArgs["result"]["order"]>
  export type OrderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    book?: boolean | BookDefaultArgs<ExtArgs>
    user?: boolean | Order$userArgs<ExtArgs>
    printJob?: boolean | Order$printJobArgs<ExtArgs>
  }
  export type OrderIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    book?: boolean | BookDefaultArgs<ExtArgs>
    user?: boolean | Order$userArgs<ExtArgs>
  }
  export type OrderIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    book?: boolean | BookDefaultArgs<ExtArgs>
    user?: boolean | Order$userArgs<ExtArgs>
  }

  export type $OrderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Order"
    objects: {
      book: Prisma.$BookPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs> | null
      printJob: Prisma.$PrintJobPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orderNumber: string
      productType: $Enums.ProductType
      totalPrice: Prisma.Decimal
      currency: string
      status: $Enums.OrderStatus
      paymentProvider: string
      quantity: number
      paymentId: string | null
      transactionId: string | null
      pricePaid: number | null
      payerEmail: string | null
      shippingCost: Prisma.Decimal | null
      printingCost: Prisma.Decimal | null
      imagesCost: Prisma.Decimal | null
      shippingLevel: $Enums.ShippingLevel | null
      phoneNumber: string | null
      name: string | null
      street1: string | null
      street2: string | null
      city: string | null
      state_code: string | null
      postcode: string | null
      country: string | null
      poProviderOrderId: string | null
      trackingNumber: string | null
      customerEmail: string
      bookId: string
      userId: string | null
      printJobId: string | null
      createdAt: Date
      updatedAt: Date
      paidAt: Date | null
      fulfilledAt: Date | null
    }, ExtArgs["result"]["order"]>
    composites: {}
  }

  type OrderGetPayload<S extends boolean | null | undefined | OrderDefaultArgs> = $Result.GetResult<Prisma.$OrderPayload, S>

  type OrderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrderCountAggregateInputType | true
    }

  export interface OrderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Order'], meta: { name: 'Order' } }
    /**
     * Find zero or one Order that matches the filter.
     * @param {OrderFindUniqueArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderFindUniqueArgs>(args: SelectSubset<T, OrderFindUniqueArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Order that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderFindUniqueOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Order that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderFindFirstArgs>(args?: SelectSubset<T, OrderFindFirstArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Order that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Orders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Orders
     * const orders = await prisma.order.findMany()
     * 
     * // Get first 10 Orders
     * const orders = await prisma.order.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderWithIdOnly = await prisma.order.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderFindManyArgs>(args?: SelectSubset<T, OrderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Order.
     * @param {OrderCreateArgs} args - Arguments to create a Order.
     * @example
     * // Create one Order
     * const Order = await prisma.order.create({
     *   data: {
     *     // ... data to create a Order
     *   }
     * })
     * 
     */
    create<T extends OrderCreateArgs>(args: SelectSubset<T, OrderCreateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Orders.
     * @param {OrderCreateManyArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderCreateManyArgs>(args?: SelectSubset<T, OrderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Orders and returns the data saved in the database.
     * @param {OrderCreateManyAndReturnArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Orders and only return the `id`
     * const orderWithIdOnly = await prisma.order.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrderCreateManyAndReturnArgs>(args?: SelectSubset<T, OrderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Order.
     * @param {OrderDeleteArgs} args - Arguments to delete one Order.
     * @example
     * // Delete one Order
     * const Order = await prisma.order.delete({
     *   where: {
     *     // ... filter to delete one Order
     *   }
     * })
     * 
     */
    delete<T extends OrderDeleteArgs>(args: SelectSubset<T, OrderDeleteArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Order.
     * @param {OrderUpdateArgs} args - Arguments to update one Order.
     * @example
     * // Update one Order
     * const order = await prisma.order.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderUpdateArgs>(args: SelectSubset<T, OrderUpdateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Orders.
     * @param {OrderDeleteManyArgs} args - Arguments to filter Orders to delete.
     * @example
     * // Delete a few Orders
     * const { count } = await prisma.order.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderDeleteManyArgs>(args?: SelectSubset<T, OrderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderUpdateManyArgs>(args: SelectSubset<T, OrderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orders and returns the data updated in the database.
     * @param {OrderUpdateManyAndReturnArgs} args - Arguments to update many Orders.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Orders and only return the `id`
     * const orderWithIdOnly = await prisma.order.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OrderUpdateManyAndReturnArgs>(args: SelectSubset<T, OrderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Order.
     * @param {OrderUpsertArgs} args - Arguments to update or create a Order.
     * @example
     * // Update or create a Order
     * const order = await prisma.order.upsert({
     *   create: {
     *     // ... data to create a Order
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Order we want to update
     *   }
     * })
     */
    upsert<T extends OrderUpsertArgs>(args: SelectSubset<T, OrderUpsertArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderCountArgs} args - Arguments to filter Orders to count.
     * @example
     * // Count the number of Orders
     * const count = await prisma.order.count({
     *   where: {
     *     // ... the filter for the Orders we want to count
     *   }
     * })
    **/
    count<T extends OrderCountArgs>(
      args?: Subset<T, OrderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrderAggregateArgs>(args: Subset<T, OrderAggregateArgs>): Prisma.PrismaPromise<GetOrderAggregateType<T>>

    /**
     * Group by Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderGroupByArgs['orderBy'] }
        : { orderBy?: OrderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Order model
   */
  readonly fields: OrderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Order.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    book<T extends BookDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BookDefaultArgs<ExtArgs>>): Prisma__BookClient<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends Order$userArgs<ExtArgs> = {}>(args?: Subset<T, Order$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    printJob<T extends Order$printJobArgs<ExtArgs> = {}>(args?: Subset<T, Order$printJobArgs<ExtArgs>>): Prisma__PrintJobClient<$Result.GetResult<Prisma.$PrintJobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Order model
   */
  interface OrderFieldRefs {
    readonly id: FieldRef<"Order", 'String'>
    readonly orderNumber: FieldRef<"Order", 'String'>
    readonly productType: FieldRef<"Order", 'ProductType'>
    readonly totalPrice: FieldRef<"Order", 'Decimal'>
    readonly currency: FieldRef<"Order", 'String'>
    readonly status: FieldRef<"Order", 'OrderStatus'>
    readonly paymentProvider: FieldRef<"Order", 'String'>
    readonly quantity: FieldRef<"Order", 'Int'>
    readonly paymentId: FieldRef<"Order", 'String'>
    readonly transactionId: FieldRef<"Order", 'String'>
    readonly pricePaid: FieldRef<"Order", 'Float'>
    readonly payerEmail: FieldRef<"Order", 'String'>
    readonly shippingCost: FieldRef<"Order", 'Decimal'>
    readonly printingCost: FieldRef<"Order", 'Decimal'>
    readonly imagesCost: FieldRef<"Order", 'Decimal'>
    readonly shippingLevel: FieldRef<"Order", 'ShippingLevel'>
    readonly phoneNumber: FieldRef<"Order", 'String'>
    readonly name: FieldRef<"Order", 'String'>
    readonly street1: FieldRef<"Order", 'String'>
    readonly street2: FieldRef<"Order", 'String'>
    readonly city: FieldRef<"Order", 'String'>
    readonly state_code: FieldRef<"Order", 'String'>
    readonly postcode: FieldRef<"Order", 'String'>
    readonly country: FieldRef<"Order", 'String'>
    readonly poProviderOrderId: FieldRef<"Order", 'String'>
    readonly trackingNumber: FieldRef<"Order", 'String'>
    readonly customerEmail: FieldRef<"Order", 'String'>
    readonly bookId: FieldRef<"Order", 'String'>
    readonly userId: FieldRef<"Order", 'String'>
    readonly printJobId: FieldRef<"Order", 'String'>
    readonly createdAt: FieldRef<"Order", 'DateTime'>
    readonly updatedAt: FieldRef<"Order", 'DateTime'>
    readonly paidAt: FieldRef<"Order", 'DateTime'>
    readonly fulfilledAt: FieldRef<"Order", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Order findUnique
   */
  export type OrderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findUniqueOrThrow
   */
  export type OrderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findFirst
   */
  export type OrderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findFirstOrThrow
   */
  export type OrderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findMany
   */
  export type OrderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Orders to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order create
   */
  export type OrderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to create a Order.
     */
    data: XOR<OrderCreateInput, OrderUncheckedCreateInput>
  }

  /**
   * Order createMany
   */
  export type OrderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Order createManyAndReturn
   */
  export type OrderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Order update
   */
  export type OrderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to update a Order.
     */
    data: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
    /**
     * Choose, which Order to update.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order updateMany
   */
  export type OrderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to update.
     */
    limit?: number
  }

  /**
   * Order updateManyAndReturn
   */
  export type OrderUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Order upsert
   */
  export type OrderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The filter to search for the Order to update in case it exists.
     */
    where: OrderWhereUniqueInput
    /**
     * In case the Order found by the `where` argument doesn't exist, create a new Order with this data.
     */
    create: XOR<OrderCreateInput, OrderUncheckedCreateInput>
    /**
     * In case the Order was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
  }

  /**
   * Order delete
   */
  export type OrderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter which Order to delete.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order deleteMany
   */
  export type OrderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Orders to delete
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to delete.
     */
    limit?: number
  }

  /**
   * Order.user
   */
  export type Order$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Order.printJob
   */
  export type Order$printJobArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrintJob
     */
    select?: PrintJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PrintJob
     */
    omit?: PrintJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrintJobInclude<ExtArgs> | null
    where?: PrintJobWhereInput
  }

  /**
   * Order without action
   */
  export type OrderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
  }


  /**
   * Model PrintJob
   */

  export type AggregatePrintJob = {
    _count: PrintJobCountAggregateOutputType | null
    _avg: PrintJobAvgAggregateOutputType | null
    _sum: PrintJobSumAggregateOutputType | null
    _min: PrintJobMinAggregateOutputType | null
    _max: PrintJobMaxAggregateOutputType | null
  }

  export type PrintJobAvgAggregateOutputType = {
    luluPrintJobId: number | null
    paymentId: number | null
    pageCount: number | null
    interiorValidationId: number | null
    coverValidationId: number | null
    printingCostExclTax: Decimal | null
    printingCostInclTax: Decimal | null
    shippingCostExclTax: Decimal | null
    shippingCostInclTax: Decimal | null
    totalCostExclTax: Decimal | null
    totalCostInclTax: Decimal | null
    totalTax: Decimal | null
    attempts: number | null
  }

  export type PrintJobSumAggregateOutputType = {
    luluPrintJobId: number | null
    paymentId: number | null
    pageCount: number | null
    interiorValidationId: number | null
    coverValidationId: number | null
    printingCostExclTax: Decimal | null
    printingCostInclTax: Decimal | null
    shippingCostExclTax: Decimal | null
    shippingCostInclTax: Decimal | null
    totalCostExclTax: Decimal | null
    totalCostInclTax: Decimal | null
    totalTax: Decimal | null
    attempts: number | null
  }

  export type PrintJobMinAggregateOutputType = {
    id: string | null
    orderId: string | null
    bookId: string | null
    luluPrintJobId: number | null
    paymentId: number | null
    podPackageId: string | null
    interiorPdfUrl: string | null
    coverPdfUrl: string | null
    interiorS3Key: string | null
    coverS3Key: string | null
    pageCount: number | null
    interiorValidationId: number | null
    coverValidationId: number | null
    interiorValidationStatus: $Enums.FileValidationStatus | null
    coverValidationStatus: $Enums.FileValidationStatus | null
    status: $Enums.PrintJobStatus | null
    statusMessage: string | null
    currency: string | null
    printingCostExclTax: Decimal | null
    printingCostInclTax: Decimal | null
    shippingCostExclTax: Decimal | null
    shippingCostInclTax: Decimal | null
    totalCostExclTax: Decimal | null
    totalCostInclTax: Decimal | null
    totalTax: Decimal | null
    trackingNumber: string | null
    shippingCarrier: string | null
    estimatedShipDate: Date | null
    estimatedDeliveryDate: Date | null
    attempts: number | null
    errorMessage: string | null
    sentByAdminId: string | null
    adminNotes: string | null
    createdAt: Date | null
    updatedAt: Date | null
    sentToPrinterAt: Date | null
    paidAt: Date | null
    inProductionAt: Date | null
    shippedAt: Date | null
  }

  export type PrintJobMaxAggregateOutputType = {
    id: string | null
    orderId: string | null
    bookId: string | null
    luluPrintJobId: number | null
    paymentId: number | null
    podPackageId: string | null
    interiorPdfUrl: string | null
    coverPdfUrl: string | null
    interiorS3Key: string | null
    coverS3Key: string | null
    pageCount: number | null
    interiorValidationId: number | null
    coverValidationId: number | null
    interiorValidationStatus: $Enums.FileValidationStatus | null
    coverValidationStatus: $Enums.FileValidationStatus | null
    status: $Enums.PrintJobStatus | null
    statusMessage: string | null
    currency: string | null
    printingCostExclTax: Decimal | null
    printingCostInclTax: Decimal | null
    shippingCostExclTax: Decimal | null
    shippingCostInclTax: Decimal | null
    totalCostExclTax: Decimal | null
    totalCostInclTax: Decimal | null
    totalTax: Decimal | null
    trackingNumber: string | null
    shippingCarrier: string | null
    estimatedShipDate: Date | null
    estimatedDeliveryDate: Date | null
    attempts: number | null
    errorMessage: string | null
    sentByAdminId: string | null
    adminNotes: string | null
    createdAt: Date | null
    updatedAt: Date | null
    sentToPrinterAt: Date | null
    paidAt: Date | null
    inProductionAt: Date | null
    shippedAt: Date | null
  }

  export type PrintJobCountAggregateOutputType = {
    id: number
    orderId: number
    bookId: number
    luluPrintJobId: number
    paymentId: number
    podPackageId: number
    interiorPdfUrl: number
    coverPdfUrl: number
    interiorS3Key: number
    coverS3Key: number
    pageCount: number
    interiorValidationId: number
    coverValidationId: number
    interiorValidationStatus: number
    coverValidationStatus: number
    validationErrors: number
    status: number
    statusMessage: number
    currency: number
    printingCostExclTax: number
    printingCostInclTax: number
    shippingCostExclTax: number
    shippingCostInclTax: number
    totalCostExclTax: number
    totalCostInclTax: number
    totalTax: number
    trackingNumber: number
    trackingUrls: number
    shippingCarrier: number
    estimatedShipDate: number
    estimatedDeliveryDate: number
    attempts: number
    errorMessage: number
    sentByAdminId: number
    adminNotes: number
    createdAt: number
    updatedAt: number
    sentToPrinterAt: number
    paidAt: number
    inProductionAt: number
    shippedAt: number
    _all: number
  }


  export type PrintJobAvgAggregateInputType = {
    luluPrintJobId?: true
    paymentId?: true
    pageCount?: true
    interiorValidationId?: true
    coverValidationId?: true
    printingCostExclTax?: true
    printingCostInclTax?: true
    shippingCostExclTax?: true
    shippingCostInclTax?: true
    totalCostExclTax?: true
    totalCostInclTax?: true
    totalTax?: true
    attempts?: true
  }

  export type PrintJobSumAggregateInputType = {
    luluPrintJobId?: true
    paymentId?: true
    pageCount?: true
    interiorValidationId?: true
    coverValidationId?: true
    printingCostExclTax?: true
    printingCostInclTax?: true
    shippingCostExclTax?: true
    shippingCostInclTax?: true
    totalCostExclTax?: true
    totalCostInclTax?: true
    totalTax?: true
    attempts?: true
  }

  export type PrintJobMinAggregateInputType = {
    id?: true
    orderId?: true
    bookId?: true
    luluPrintJobId?: true
    paymentId?: true
    podPackageId?: true
    interiorPdfUrl?: true
    coverPdfUrl?: true
    interiorS3Key?: true
    coverS3Key?: true
    pageCount?: true
    interiorValidationId?: true
    coverValidationId?: true
    interiorValidationStatus?: true
    coverValidationStatus?: true
    status?: true
    statusMessage?: true
    currency?: true
    printingCostExclTax?: true
    printingCostInclTax?: true
    shippingCostExclTax?: true
    shippingCostInclTax?: true
    totalCostExclTax?: true
    totalCostInclTax?: true
    totalTax?: true
    trackingNumber?: true
    shippingCarrier?: true
    estimatedShipDate?: true
    estimatedDeliveryDate?: true
    attempts?: true
    errorMessage?: true
    sentByAdminId?: true
    adminNotes?: true
    createdAt?: true
    updatedAt?: true
    sentToPrinterAt?: true
    paidAt?: true
    inProductionAt?: true
    shippedAt?: true
  }

  export type PrintJobMaxAggregateInputType = {
    id?: true
    orderId?: true
    bookId?: true
    luluPrintJobId?: true
    paymentId?: true
    podPackageId?: true
    interiorPdfUrl?: true
    coverPdfUrl?: true
    interiorS3Key?: true
    coverS3Key?: true
    pageCount?: true
    interiorValidationId?: true
    coverValidationId?: true
    interiorValidationStatus?: true
    coverValidationStatus?: true
    status?: true
    statusMessage?: true
    currency?: true
    printingCostExclTax?: true
    printingCostInclTax?: true
    shippingCostExclTax?: true
    shippingCostInclTax?: true
    totalCostExclTax?: true
    totalCostInclTax?: true
    totalTax?: true
    trackingNumber?: true
    shippingCarrier?: true
    estimatedShipDate?: true
    estimatedDeliveryDate?: true
    attempts?: true
    errorMessage?: true
    sentByAdminId?: true
    adminNotes?: true
    createdAt?: true
    updatedAt?: true
    sentToPrinterAt?: true
    paidAt?: true
    inProductionAt?: true
    shippedAt?: true
  }

  export type PrintJobCountAggregateInputType = {
    id?: true
    orderId?: true
    bookId?: true
    luluPrintJobId?: true
    paymentId?: true
    podPackageId?: true
    interiorPdfUrl?: true
    coverPdfUrl?: true
    interiorS3Key?: true
    coverS3Key?: true
    pageCount?: true
    interiorValidationId?: true
    coverValidationId?: true
    interiorValidationStatus?: true
    coverValidationStatus?: true
    validationErrors?: true
    status?: true
    statusMessage?: true
    currency?: true
    printingCostExclTax?: true
    printingCostInclTax?: true
    shippingCostExclTax?: true
    shippingCostInclTax?: true
    totalCostExclTax?: true
    totalCostInclTax?: true
    totalTax?: true
    trackingNumber?: true
    trackingUrls?: true
    shippingCarrier?: true
    estimatedShipDate?: true
    estimatedDeliveryDate?: true
    attempts?: true
    errorMessage?: true
    sentByAdminId?: true
    adminNotes?: true
    createdAt?: true
    updatedAt?: true
    sentToPrinterAt?: true
    paidAt?: true
    inProductionAt?: true
    shippedAt?: true
    _all?: true
  }

  export type PrintJobAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PrintJob to aggregate.
     */
    where?: PrintJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PrintJobs to fetch.
     */
    orderBy?: PrintJobOrderByWithRelationInput | PrintJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PrintJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PrintJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PrintJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PrintJobs
    **/
    _count?: true | PrintJobCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PrintJobAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PrintJobSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PrintJobMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PrintJobMaxAggregateInputType
  }

  export type GetPrintJobAggregateType<T extends PrintJobAggregateArgs> = {
        [P in keyof T & keyof AggregatePrintJob]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePrintJob[P]>
      : GetScalarType<T[P], AggregatePrintJob[P]>
  }




  export type PrintJobGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PrintJobWhereInput
    orderBy?: PrintJobOrderByWithAggregationInput | PrintJobOrderByWithAggregationInput[]
    by: PrintJobScalarFieldEnum[] | PrintJobScalarFieldEnum
    having?: PrintJobScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PrintJobCountAggregateInputType | true
    _avg?: PrintJobAvgAggregateInputType
    _sum?: PrintJobSumAggregateInputType
    _min?: PrintJobMinAggregateInputType
    _max?: PrintJobMaxAggregateInputType
  }

  export type PrintJobGroupByOutputType = {
    id: string
    orderId: string
    bookId: string
    luluPrintJobId: number | null
    paymentId: number | null
    podPackageId: string
    interiorPdfUrl: string | null
    coverPdfUrl: string | null
    interiorS3Key: string | null
    coverS3Key: string | null
    pageCount: number
    interiorValidationId: number | null
    coverValidationId: number | null
    interiorValidationStatus: $Enums.FileValidationStatus
    coverValidationStatus: $Enums.FileValidationStatus
    validationErrors: string[]
    status: $Enums.PrintJobStatus
    statusMessage: string | null
    currency: string
    printingCostExclTax: Decimal | null
    printingCostInclTax: Decimal | null
    shippingCostExclTax: Decimal | null
    shippingCostInclTax: Decimal | null
    totalCostExclTax: Decimal | null
    totalCostInclTax: Decimal | null
    totalTax: Decimal | null
    trackingNumber: string | null
    trackingUrls: string[]
    shippingCarrier: string | null
    estimatedShipDate: Date | null
    estimatedDeliveryDate: Date | null
    attempts: number
    errorMessage: string | null
    sentByAdminId: string | null
    adminNotes: string | null
    createdAt: Date
    updatedAt: Date
    sentToPrinterAt: Date | null
    paidAt: Date | null
    inProductionAt: Date | null
    shippedAt: Date | null
    _count: PrintJobCountAggregateOutputType | null
    _avg: PrintJobAvgAggregateOutputType | null
    _sum: PrintJobSumAggregateOutputType | null
    _min: PrintJobMinAggregateOutputType | null
    _max: PrintJobMaxAggregateOutputType | null
  }

  type GetPrintJobGroupByPayload<T extends PrintJobGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PrintJobGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PrintJobGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PrintJobGroupByOutputType[P]>
            : GetScalarType<T[P], PrintJobGroupByOutputType[P]>
        }
      >
    >


  export type PrintJobSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    bookId?: boolean
    luluPrintJobId?: boolean
    paymentId?: boolean
    podPackageId?: boolean
    interiorPdfUrl?: boolean
    coverPdfUrl?: boolean
    interiorS3Key?: boolean
    coverS3Key?: boolean
    pageCount?: boolean
    interiorValidationId?: boolean
    coverValidationId?: boolean
    interiorValidationStatus?: boolean
    coverValidationStatus?: boolean
    validationErrors?: boolean
    status?: boolean
    statusMessage?: boolean
    currency?: boolean
    printingCostExclTax?: boolean
    printingCostInclTax?: boolean
    shippingCostExclTax?: boolean
    shippingCostInclTax?: boolean
    totalCostExclTax?: boolean
    totalCostInclTax?: boolean
    totalTax?: boolean
    trackingNumber?: boolean
    trackingUrls?: boolean
    shippingCarrier?: boolean
    estimatedShipDate?: boolean
    estimatedDeliveryDate?: boolean
    attempts?: boolean
    errorMessage?: boolean
    sentByAdminId?: boolean
    adminNotes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sentToPrinterAt?: boolean
    paidAt?: boolean
    inProductionAt?: boolean
    shippedAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
    book?: boolean | BookDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["printJob"]>

  export type PrintJobSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    bookId?: boolean
    luluPrintJobId?: boolean
    paymentId?: boolean
    podPackageId?: boolean
    interiorPdfUrl?: boolean
    coverPdfUrl?: boolean
    interiorS3Key?: boolean
    coverS3Key?: boolean
    pageCount?: boolean
    interiorValidationId?: boolean
    coverValidationId?: boolean
    interiorValidationStatus?: boolean
    coverValidationStatus?: boolean
    validationErrors?: boolean
    status?: boolean
    statusMessage?: boolean
    currency?: boolean
    printingCostExclTax?: boolean
    printingCostInclTax?: boolean
    shippingCostExclTax?: boolean
    shippingCostInclTax?: boolean
    totalCostExclTax?: boolean
    totalCostInclTax?: boolean
    totalTax?: boolean
    trackingNumber?: boolean
    trackingUrls?: boolean
    shippingCarrier?: boolean
    estimatedShipDate?: boolean
    estimatedDeliveryDate?: boolean
    attempts?: boolean
    errorMessage?: boolean
    sentByAdminId?: boolean
    adminNotes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sentToPrinterAt?: boolean
    paidAt?: boolean
    inProductionAt?: boolean
    shippedAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
    book?: boolean | BookDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["printJob"]>

  export type PrintJobSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    bookId?: boolean
    luluPrintJobId?: boolean
    paymentId?: boolean
    podPackageId?: boolean
    interiorPdfUrl?: boolean
    coverPdfUrl?: boolean
    interiorS3Key?: boolean
    coverS3Key?: boolean
    pageCount?: boolean
    interiorValidationId?: boolean
    coverValidationId?: boolean
    interiorValidationStatus?: boolean
    coverValidationStatus?: boolean
    validationErrors?: boolean
    status?: boolean
    statusMessage?: boolean
    currency?: boolean
    printingCostExclTax?: boolean
    printingCostInclTax?: boolean
    shippingCostExclTax?: boolean
    shippingCostInclTax?: boolean
    totalCostExclTax?: boolean
    totalCostInclTax?: boolean
    totalTax?: boolean
    trackingNumber?: boolean
    trackingUrls?: boolean
    shippingCarrier?: boolean
    estimatedShipDate?: boolean
    estimatedDeliveryDate?: boolean
    attempts?: boolean
    errorMessage?: boolean
    sentByAdminId?: boolean
    adminNotes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sentToPrinterAt?: boolean
    paidAt?: boolean
    inProductionAt?: boolean
    shippedAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
    book?: boolean | BookDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["printJob"]>

  export type PrintJobSelectScalar = {
    id?: boolean
    orderId?: boolean
    bookId?: boolean
    luluPrintJobId?: boolean
    paymentId?: boolean
    podPackageId?: boolean
    interiorPdfUrl?: boolean
    coverPdfUrl?: boolean
    interiorS3Key?: boolean
    coverS3Key?: boolean
    pageCount?: boolean
    interiorValidationId?: boolean
    coverValidationId?: boolean
    interiorValidationStatus?: boolean
    coverValidationStatus?: boolean
    validationErrors?: boolean
    status?: boolean
    statusMessage?: boolean
    currency?: boolean
    printingCostExclTax?: boolean
    printingCostInclTax?: boolean
    shippingCostExclTax?: boolean
    shippingCostInclTax?: boolean
    totalCostExclTax?: boolean
    totalCostInclTax?: boolean
    totalTax?: boolean
    trackingNumber?: boolean
    trackingUrls?: boolean
    shippingCarrier?: boolean
    estimatedShipDate?: boolean
    estimatedDeliveryDate?: boolean
    attempts?: boolean
    errorMessage?: boolean
    sentByAdminId?: boolean
    adminNotes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sentToPrinterAt?: boolean
    paidAt?: boolean
    inProductionAt?: boolean
    shippedAt?: boolean
  }

  export type PrintJobOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "orderId" | "bookId" | "luluPrintJobId" | "paymentId" | "podPackageId" | "interiorPdfUrl" | "coverPdfUrl" | "interiorS3Key" | "coverS3Key" | "pageCount" | "interiorValidationId" | "coverValidationId" | "interiorValidationStatus" | "coverValidationStatus" | "validationErrors" | "status" | "statusMessage" | "currency" | "printingCostExclTax" | "printingCostInclTax" | "shippingCostExclTax" | "shippingCostInclTax" | "totalCostExclTax" | "totalCostInclTax" | "totalTax" | "trackingNumber" | "trackingUrls" | "shippingCarrier" | "estimatedShipDate" | "estimatedDeliveryDate" | "attempts" | "errorMessage" | "sentByAdminId" | "adminNotes" | "createdAt" | "updatedAt" | "sentToPrinterAt" | "paidAt" | "inProductionAt" | "shippedAt", ExtArgs["result"]["printJob"]>
  export type PrintJobInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
    book?: boolean | BookDefaultArgs<ExtArgs>
  }
  export type PrintJobIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
    book?: boolean | BookDefaultArgs<ExtArgs>
  }
  export type PrintJobIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
    book?: boolean | BookDefaultArgs<ExtArgs>
  }

  export type $PrintJobPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PrintJob"
    objects: {
      order: Prisma.$OrderPayload<ExtArgs>
      book: Prisma.$BookPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orderId: string
      bookId: string
      luluPrintJobId: number | null
      paymentId: number | null
      podPackageId: string
      interiorPdfUrl: string | null
      coverPdfUrl: string | null
      interiorS3Key: string | null
      coverS3Key: string | null
      pageCount: number
      interiorValidationId: number | null
      coverValidationId: number | null
      interiorValidationStatus: $Enums.FileValidationStatus
      coverValidationStatus: $Enums.FileValidationStatus
      validationErrors: string[]
      status: $Enums.PrintJobStatus
      statusMessage: string | null
      currency: string
      printingCostExclTax: Prisma.Decimal | null
      printingCostInclTax: Prisma.Decimal | null
      shippingCostExclTax: Prisma.Decimal | null
      shippingCostInclTax: Prisma.Decimal | null
      totalCostExclTax: Prisma.Decimal | null
      totalCostInclTax: Prisma.Decimal | null
      totalTax: Prisma.Decimal | null
      trackingNumber: string | null
      trackingUrls: string[]
      shippingCarrier: string | null
      estimatedShipDate: Date | null
      estimatedDeliveryDate: Date | null
      attempts: number
      errorMessage: string | null
      sentByAdminId: string | null
      adminNotes: string | null
      createdAt: Date
      updatedAt: Date
      sentToPrinterAt: Date | null
      paidAt: Date | null
      inProductionAt: Date | null
      shippedAt: Date | null
    }, ExtArgs["result"]["printJob"]>
    composites: {}
  }

  type PrintJobGetPayload<S extends boolean | null | undefined | PrintJobDefaultArgs> = $Result.GetResult<Prisma.$PrintJobPayload, S>

  type PrintJobCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PrintJobFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PrintJobCountAggregateInputType | true
    }

  export interface PrintJobDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PrintJob'], meta: { name: 'PrintJob' } }
    /**
     * Find zero or one PrintJob that matches the filter.
     * @param {PrintJobFindUniqueArgs} args - Arguments to find a PrintJob
     * @example
     * // Get one PrintJob
     * const printJob = await prisma.printJob.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PrintJobFindUniqueArgs>(args: SelectSubset<T, PrintJobFindUniqueArgs<ExtArgs>>): Prisma__PrintJobClient<$Result.GetResult<Prisma.$PrintJobPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PrintJob that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PrintJobFindUniqueOrThrowArgs} args - Arguments to find a PrintJob
     * @example
     * // Get one PrintJob
     * const printJob = await prisma.printJob.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PrintJobFindUniqueOrThrowArgs>(args: SelectSubset<T, PrintJobFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PrintJobClient<$Result.GetResult<Prisma.$PrintJobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PrintJob that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrintJobFindFirstArgs} args - Arguments to find a PrintJob
     * @example
     * // Get one PrintJob
     * const printJob = await prisma.printJob.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PrintJobFindFirstArgs>(args?: SelectSubset<T, PrintJobFindFirstArgs<ExtArgs>>): Prisma__PrintJobClient<$Result.GetResult<Prisma.$PrintJobPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PrintJob that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrintJobFindFirstOrThrowArgs} args - Arguments to find a PrintJob
     * @example
     * // Get one PrintJob
     * const printJob = await prisma.printJob.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PrintJobFindFirstOrThrowArgs>(args?: SelectSubset<T, PrintJobFindFirstOrThrowArgs<ExtArgs>>): Prisma__PrintJobClient<$Result.GetResult<Prisma.$PrintJobPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PrintJobs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrintJobFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PrintJobs
     * const printJobs = await prisma.printJob.findMany()
     * 
     * // Get first 10 PrintJobs
     * const printJobs = await prisma.printJob.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const printJobWithIdOnly = await prisma.printJob.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PrintJobFindManyArgs>(args?: SelectSubset<T, PrintJobFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrintJobPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PrintJob.
     * @param {PrintJobCreateArgs} args - Arguments to create a PrintJob.
     * @example
     * // Create one PrintJob
     * const PrintJob = await prisma.printJob.create({
     *   data: {
     *     // ... data to create a PrintJob
     *   }
     * })
     * 
     */
    create<T extends PrintJobCreateArgs>(args: SelectSubset<T, PrintJobCreateArgs<ExtArgs>>): Prisma__PrintJobClient<$Result.GetResult<Prisma.$PrintJobPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PrintJobs.
     * @param {PrintJobCreateManyArgs} args - Arguments to create many PrintJobs.
     * @example
     * // Create many PrintJobs
     * const printJob = await prisma.printJob.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PrintJobCreateManyArgs>(args?: SelectSubset<T, PrintJobCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PrintJobs and returns the data saved in the database.
     * @param {PrintJobCreateManyAndReturnArgs} args - Arguments to create many PrintJobs.
     * @example
     * // Create many PrintJobs
     * const printJob = await prisma.printJob.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PrintJobs and only return the `id`
     * const printJobWithIdOnly = await prisma.printJob.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PrintJobCreateManyAndReturnArgs>(args?: SelectSubset<T, PrintJobCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrintJobPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PrintJob.
     * @param {PrintJobDeleteArgs} args - Arguments to delete one PrintJob.
     * @example
     * // Delete one PrintJob
     * const PrintJob = await prisma.printJob.delete({
     *   where: {
     *     // ... filter to delete one PrintJob
     *   }
     * })
     * 
     */
    delete<T extends PrintJobDeleteArgs>(args: SelectSubset<T, PrintJobDeleteArgs<ExtArgs>>): Prisma__PrintJobClient<$Result.GetResult<Prisma.$PrintJobPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PrintJob.
     * @param {PrintJobUpdateArgs} args - Arguments to update one PrintJob.
     * @example
     * // Update one PrintJob
     * const printJob = await prisma.printJob.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PrintJobUpdateArgs>(args: SelectSubset<T, PrintJobUpdateArgs<ExtArgs>>): Prisma__PrintJobClient<$Result.GetResult<Prisma.$PrintJobPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PrintJobs.
     * @param {PrintJobDeleteManyArgs} args - Arguments to filter PrintJobs to delete.
     * @example
     * // Delete a few PrintJobs
     * const { count } = await prisma.printJob.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PrintJobDeleteManyArgs>(args?: SelectSubset<T, PrintJobDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PrintJobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrintJobUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PrintJobs
     * const printJob = await prisma.printJob.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PrintJobUpdateManyArgs>(args: SelectSubset<T, PrintJobUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PrintJobs and returns the data updated in the database.
     * @param {PrintJobUpdateManyAndReturnArgs} args - Arguments to update many PrintJobs.
     * @example
     * // Update many PrintJobs
     * const printJob = await prisma.printJob.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PrintJobs and only return the `id`
     * const printJobWithIdOnly = await prisma.printJob.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PrintJobUpdateManyAndReturnArgs>(args: SelectSubset<T, PrintJobUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrintJobPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PrintJob.
     * @param {PrintJobUpsertArgs} args - Arguments to update or create a PrintJob.
     * @example
     * // Update or create a PrintJob
     * const printJob = await prisma.printJob.upsert({
     *   create: {
     *     // ... data to create a PrintJob
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PrintJob we want to update
     *   }
     * })
     */
    upsert<T extends PrintJobUpsertArgs>(args: SelectSubset<T, PrintJobUpsertArgs<ExtArgs>>): Prisma__PrintJobClient<$Result.GetResult<Prisma.$PrintJobPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PrintJobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrintJobCountArgs} args - Arguments to filter PrintJobs to count.
     * @example
     * // Count the number of PrintJobs
     * const count = await prisma.printJob.count({
     *   where: {
     *     // ... the filter for the PrintJobs we want to count
     *   }
     * })
    **/
    count<T extends PrintJobCountArgs>(
      args?: Subset<T, PrintJobCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PrintJobCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PrintJob.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrintJobAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PrintJobAggregateArgs>(args: Subset<T, PrintJobAggregateArgs>): Prisma.PrismaPromise<GetPrintJobAggregateType<T>>

    /**
     * Group by PrintJob.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrintJobGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PrintJobGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PrintJobGroupByArgs['orderBy'] }
        : { orderBy?: PrintJobGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PrintJobGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPrintJobGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PrintJob model
   */
  readonly fields: PrintJobFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PrintJob.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PrintJobClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    order<T extends OrderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrderDefaultArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    book<T extends BookDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BookDefaultArgs<ExtArgs>>): Prisma__BookClient<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PrintJob model
   */
  interface PrintJobFieldRefs {
    readonly id: FieldRef<"PrintJob", 'String'>
    readonly orderId: FieldRef<"PrintJob", 'String'>
    readonly bookId: FieldRef<"PrintJob", 'String'>
    readonly luluPrintJobId: FieldRef<"PrintJob", 'Int'>
    readonly paymentId: FieldRef<"PrintJob", 'Int'>
    readonly podPackageId: FieldRef<"PrintJob", 'String'>
    readonly interiorPdfUrl: FieldRef<"PrintJob", 'String'>
    readonly coverPdfUrl: FieldRef<"PrintJob", 'String'>
    readonly interiorS3Key: FieldRef<"PrintJob", 'String'>
    readonly coverS3Key: FieldRef<"PrintJob", 'String'>
    readonly pageCount: FieldRef<"PrintJob", 'Int'>
    readonly interiorValidationId: FieldRef<"PrintJob", 'Int'>
    readonly coverValidationId: FieldRef<"PrintJob", 'Int'>
    readonly interiorValidationStatus: FieldRef<"PrintJob", 'FileValidationStatus'>
    readonly coverValidationStatus: FieldRef<"PrintJob", 'FileValidationStatus'>
    readonly validationErrors: FieldRef<"PrintJob", 'String[]'>
    readonly status: FieldRef<"PrintJob", 'PrintJobStatus'>
    readonly statusMessage: FieldRef<"PrintJob", 'String'>
    readonly currency: FieldRef<"PrintJob", 'String'>
    readonly printingCostExclTax: FieldRef<"PrintJob", 'Decimal'>
    readonly printingCostInclTax: FieldRef<"PrintJob", 'Decimal'>
    readonly shippingCostExclTax: FieldRef<"PrintJob", 'Decimal'>
    readonly shippingCostInclTax: FieldRef<"PrintJob", 'Decimal'>
    readonly totalCostExclTax: FieldRef<"PrintJob", 'Decimal'>
    readonly totalCostInclTax: FieldRef<"PrintJob", 'Decimal'>
    readonly totalTax: FieldRef<"PrintJob", 'Decimal'>
    readonly trackingNumber: FieldRef<"PrintJob", 'String'>
    readonly trackingUrls: FieldRef<"PrintJob", 'String[]'>
    readonly shippingCarrier: FieldRef<"PrintJob", 'String'>
    readonly estimatedShipDate: FieldRef<"PrintJob", 'DateTime'>
    readonly estimatedDeliveryDate: FieldRef<"PrintJob", 'DateTime'>
    readonly attempts: FieldRef<"PrintJob", 'Int'>
    readonly errorMessage: FieldRef<"PrintJob", 'String'>
    readonly sentByAdminId: FieldRef<"PrintJob", 'String'>
    readonly adminNotes: FieldRef<"PrintJob", 'String'>
    readonly createdAt: FieldRef<"PrintJob", 'DateTime'>
    readonly updatedAt: FieldRef<"PrintJob", 'DateTime'>
    readonly sentToPrinterAt: FieldRef<"PrintJob", 'DateTime'>
    readonly paidAt: FieldRef<"PrintJob", 'DateTime'>
    readonly inProductionAt: FieldRef<"PrintJob", 'DateTime'>
    readonly shippedAt: FieldRef<"PrintJob", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PrintJob findUnique
   */
  export type PrintJobFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrintJob
     */
    select?: PrintJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PrintJob
     */
    omit?: PrintJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrintJobInclude<ExtArgs> | null
    /**
     * Filter, which PrintJob to fetch.
     */
    where: PrintJobWhereUniqueInput
  }

  /**
   * PrintJob findUniqueOrThrow
   */
  export type PrintJobFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrintJob
     */
    select?: PrintJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PrintJob
     */
    omit?: PrintJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrintJobInclude<ExtArgs> | null
    /**
     * Filter, which PrintJob to fetch.
     */
    where: PrintJobWhereUniqueInput
  }

  /**
   * PrintJob findFirst
   */
  export type PrintJobFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrintJob
     */
    select?: PrintJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PrintJob
     */
    omit?: PrintJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrintJobInclude<ExtArgs> | null
    /**
     * Filter, which PrintJob to fetch.
     */
    where?: PrintJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PrintJobs to fetch.
     */
    orderBy?: PrintJobOrderByWithRelationInput | PrintJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PrintJobs.
     */
    cursor?: PrintJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PrintJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PrintJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PrintJobs.
     */
    distinct?: PrintJobScalarFieldEnum | PrintJobScalarFieldEnum[]
  }

  /**
   * PrintJob findFirstOrThrow
   */
  export type PrintJobFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrintJob
     */
    select?: PrintJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PrintJob
     */
    omit?: PrintJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrintJobInclude<ExtArgs> | null
    /**
     * Filter, which PrintJob to fetch.
     */
    where?: PrintJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PrintJobs to fetch.
     */
    orderBy?: PrintJobOrderByWithRelationInput | PrintJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PrintJobs.
     */
    cursor?: PrintJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PrintJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PrintJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PrintJobs.
     */
    distinct?: PrintJobScalarFieldEnum | PrintJobScalarFieldEnum[]
  }

  /**
   * PrintJob findMany
   */
  export type PrintJobFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrintJob
     */
    select?: PrintJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PrintJob
     */
    omit?: PrintJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrintJobInclude<ExtArgs> | null
    /**
     * Filter, which PrintJobs to fetch.
     */
    where?: PrintJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PrintJobs to fetch.
     */
    orderBy?: PrintJobOrderByWithRelationInput | PrintJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PrintJobs.
     */
    cursor?: PrintJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PrintJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PrintJobs.
     */
    skip?: number
    distinct?: PrintJobScalarFieldEnum | PrintJobScalarFieldEnum[]
  }

  /**
   * PrintJob create
   */
  export type PrintJobCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrintJob
     */
    select?: PrintJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PrintJob
     */
    omit?: PrintJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrintJobInclude<ExtArgs> | null
    /**
     * The data needed to create a PrintJob.
     */
    data: XOR<PrintJobCreateInput, PrintJobUncheckedCreateInput>
  }

  /**
   * PrintJob createMany
   */
  export type PrintJobCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PrintJobs.
     */
    data: PrintJobCreateManyInput | PrintJobCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PrintJob createManyAndReturn
   */
  export type PrintJobCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrintJob
     */
    select?: PrintJobSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PrintJob
     */
    omit?: PrintJobOmit<ExtArgs> | null
    /**
     * The data used to create many PrintJobs.
     */
    data: PrintJobCreateManyInput | PrintJobCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrintJobIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PrintJob update
   */
  export type PrintJobUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrintJob
     */
    select?: PrintJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PrintJob
     */
    omit?: PrintJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrintJobInclude<ExtArgs> | null
    /**
     * The data needed to update a PrintJob.
     */
    data: XOR<PrintJobUpdateInput, PrintJobUncheckedUpdateInput>
    /**
     * Choose, which PrintJob to update.
     */
    where: PrintJobWhereUniqueInput
  }

  /**
   * PrintJob updateMany
   */
  export type PrintJobUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PrintJobs.
     */
    data: XOR<PrintJobUpdateManyMutationInput, PrintJobUncheckedUpdateManyInput>
    /**
     * Filter which PrintJobs to update
     */
    where?: PrintJobWhereInput
    /**
     * Limit how many PrintJobs to update.
     */
    limit?: number
  }

  /**
   * PrintJob updateManyAndReturn
   */
  export type PrintJobUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrintJob
     */
    select?: PrintJobSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PrintJob
     */
    omit?: PrintJobOmit<ExtArgs> | null
    /**
     * The data used to update PrintJobs.
     */
    data: XOR<PrintJobUpdateManyMutationInput, PrintJobUncheckedUpdateManyInput>
    /**
     * Filter which PrintJobs to update
     */
    where?: PrintJobWhereInput
    /**
     * Limit how many PrintJobs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrintJobIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PrintJob upsert
   */
  export type PrintJobUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrintJob
     */
    select?: PrintJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PrintJob
     */
    omit?: PrintJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrintJobInclude<ExtArgs> | null
    /**
     * The filter to search for the PrintJob to update in case it exists.
     */
    where: PrintJobWhereUniqueInput
    /**
     * In case the PrintJob found by the `where` argument doesn't exist, create a new PrintJob with this data.
     */
    create: XOR<PrintJobCreateInput, PrintJobUncheckedCreateInput>
    /**
     * In case the PrintJob was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PrintJobUpdateInput, PrintJobUncheckedUpdateInput>
  }

  /**
   * PrintJob delete
   */
  export type PrintJobDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrintJob
     */
    select?: PrintJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PrintJob
     */
    omit?: PrintJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrintJobInclude<ExtArgs> | null
    /**
     * Filter which PrintJob to delete.
     */
    where: PrintJobWhereUniqueInput
  }

  /**
   * PrintJob deleteMany
   */
  export type PrintJobDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PrintJobs to delete
     */
    where?: PrintJobWhereInput
    /**
     * Limit how many PrintJobs to delete.
     */
    limit?: number
  }

  /**
   * PrintJob without action
   */
  export type PrintJobDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrintJob
     */
    select?: PrintJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PrintJob
     */
    omit?: PrintJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrintJobInclude<ExtArgs> | null
  }


  /**
   * Model Configuration
   */

  export type AggregateConfiguration = {
    _count: ConfigurationCountAggregateOutputType | null
    _min: ConfigurationMinAggregateOutputType | null
    _max: ConfigurationMaxAggregateOutputType | null
  }

  export type ConfigurationMinAggregateOutputType = {
    key: string | null
    value: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ConfigurationMaxAggregateOutputType = {
    key: string | null
    value: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ConfigurationCountAggregateOutputType = {
    key: number
    value: number
    description: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ConfigurationMinAggregateInputType = {
    key?: true
    value?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ConfigurationMaxAggregateInputType = {
    key?: true
    value?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ConfigurationCountAggregateInputType = {
    key?: true
    value?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ConfigurationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Configuration to aggregate.
     */
    where?: ConfigurationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Configurations to fetch.
     */
    orderBy?: ConfigurationOrderByWithRelationInput | ConfigurationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConfigurationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Configurations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Configurations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Configurations
    **/
    _count?: true | ConfigurationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConfigurationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConfigurationMaxAggregateInputType
  }

  export type GetConfigurationAggregateType<T extends ConfigurationAggregateArgs> = {
        [P in keyof T & keyof AggregateConfiguration]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConfiguration[P]>
      : GetScalarType<T[P], AggregateConfiguration[P]>
  }




  export type ConfigurationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConfigurationWhereInput
    orderBy?: ConfigurationOrderByWithAggregationInput | ConfigurationOrderByWithAggregationInput[]
    by: ConfigurationScalarFieldEnum[] | ConfigurationScalarFieldEnum
    having?: ConfigurationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConfigurationCountAggregateInputType | true
    _min?: ConfigurationMinAggregateInputType
    _max?: ConfigurationMaxAggregateInputType
  }

  export type ConfigurationGroupByOutputType = {
    key: string
    value: string
    description: string | null
    createdAt: Date
    updatedAt: Date
    _count: ConfigurationCountAggregateOutputType | null
    _min: ConfigurationMinAggregateOutputType | null
    _max: ConfigurationMaxAggregateOutputType | null
  }

  type GetConfigurationGroupByPayload<T extends ConfigurationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConfigurationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConfigurationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConfigurationGroupByOutputType[P]>
            : GetScalarType<T[P], ConfigurationGroupByOutputType[P]>
        }
      >
    >


  export type ConfigurationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    key?: boolean
    value?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["configuration"]>

  export type ConfigurationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    key?: boolean
    value?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["configuration"]>

  export type ConfigurationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    key?: boolean
    value?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["configuration"]>

  export type ConfigurationSelectScalar = {
    key?: boolean
    value?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ConfigurationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"key" | "value" | "description" | "createdAt" | "updatedAt", ExtArgs["result"]["configuration"]>

  export type $ConfigurationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Configuration"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      key: string
      value: string
      description: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["configuration"]>
    composites: {}
  }

  type ConfigurationGetPayload<S extends boolean | null | undefined | ConfigurationDefaultArgs> = $Result.GetResult<Prisma.$ConfigurationPayload, S>

  type ConfigurationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ConfigurationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ConfigurationCountAggregateInputType | true
    }

  export interface ConfigurationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Configuration'], meta: { name: 'Configuration' } }
    /**
     * Find zero or one Configuration that matches the filter.
     * @param {ConfigurationFindUniqueArgs} args - Arguments to find a Configuration
     * @example
     * // Get one Configuration
     * const configuration = await prisma.configuration.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConfigurationFindUniqueArgs>(args: SelectSubset<T, ConfigurationFindUniqueArgs<ExtArgs>>): Prisma__ConfigurationClient<$Result.GetResult<Prisma.$ConfigurationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Configuration that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ConfigurationFindUniqueOrThrowArgs} args - Arguments to find a Configuration
     * @example
     * // Get one Configuration
     * const configuration = await prisma.configuration.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConfigurationFindUniqueOrThrowArgs>(args: SelectSubset<T, ConfigurationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConfigurationClient<$Result.GetResult<Prisma.$ConfigurationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Configuration that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfigurationFindFirstArgs} args - Arguments to find a Configuration
     * @example
     * // Get one Configuration
     * const configuration = await prisma.configuration.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConfigurationFindFirstArgs>(args?: SelectSubset<T, ConfigurationFindFirstArgs<ExtArgs>>): Prisma__ConfigurationClient<$Result.GetResult<Prisma.$ConfigurationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Configuration that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfigurationFindFirstOrThrowArgs} args - Arguments to find a Configuration
     * @example
     * // Get one Configuration
     * const configuration = await prisma.configuration.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConfigurationFindFirstOrThrowArgs>(args?: SelectSubset<T, ConfigurationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConfigurationClient<$Result.GetResult<Prisma.$ConfigurationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Configurations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfigurationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Configurations
     * const configurations = await prisma.configuration.findMany()
     * 
     * // Get first 10 Configurations
     * const configurations = await prisma.configuration.findMany({ take: 10 })
     * 
     * // Only select the `key`
     * const configurationWithKeyOnly = await prisma.configuration.findMany({ select: { key: true } })
     * 
     */
    findMany<T extends ConfigurationFindManyArgs>(args?: SelectSubset<T, ConfigurationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConfigurationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Configuration.
     * @param {ConfigurationCreateArgs} args - Arguments to create a Configuration.
     * @example
     * // Create one Configuration
     * const Configuration = await prisma.configuration.create({
     *   data: {
     *     // ... data to create a Configuration
     *   }
     * })
     * 
     */
    create<T extends ConfigurationCreateArgs>(args: SelectSubset<T, ConfigurationCreateArgs<ExtArgs>>): Prisma__ConfigurationClient<$Result.GetResult<Prisma.$ConfigurationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Configurations.
     * @param {ConfigurationCreateManyArgs} args - Arguments to create many Configurations.
     * @example
     * // Create many Configurations
     * const configuration = await prisma.configuration.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ConfigurationCreateManyArgs>(args?: SelectSubset<T, ConfigurationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Configurations and returns the data saved in the database.
     * @param {ConfigurationCreateManyAndReturnArgs} args - Arguments to create many Configurations.
     * @example
     * // Create many Configurations
     * const configuration = await prisma.configuration.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Configurations and only return the `key`
     * const configurationWithKeyOnly = await prisma.configuration.createManyAndReturn({
     *   select: { key: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ConfigurationCreateManyAndReturnArgs>(args?: SelectSubset<T, ConfigurationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConfigurationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Configuration.
     * @param {ConfigurationDeleteArgs} args - Arguments to delete one Configuration.
     * @example
     * // Delete one Configuration
     * const Configuration = await prisma.configuration.delete({
     *   where: {
     *     // ... filter to delete one Configuration
     *   }
     * })
     * 
     */
    delete<T extends ConfigurationDeleteArgs>(args: SelectSubset<T, ConfigurationDeleteArgs<ExtArgs>>): Prisma__ConfigurationClient<$Result.GetResult<Prisma.$ConfigurationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Configuration.
     * @param {ConfigurationUpdateArgs} args - Arguments to update one Configuration.
     * @example
     * // Update one Configuration
     * const configuration = await prisma.configuration.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ConfigurationUpdateArgs>(args: SelectSubset<T, ConfigurationUpdateArgs<ExtArgs>>): Prisma__ConfigurationClient<$Result.GetResult<Prisma.$ConfigurationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Configurations.
     * @param {ConfigurationDeleteManyArgs} args - Arguments to filter Configurations to delete.
     * @example
     * // Delete a few Configurations
     * const { count } = await prisma.configuration.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ConfigurationDeleteManyArgs>(args?: SelectSubset<T, ConfigurationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Configurations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfigurationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Configurations
     * const configuration = await prisma.configuration.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ConfigurationUpdateManyArgs>(args: SelectSubset<T, ConfigurationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Configurations and returns the data updated in the database.
     * @param {ConfigurationUpdateManyAndReturnArgs} args - Arguments to update many Configurations.
     * @example
     * // Update many Configurations
     * const configuration = await prisma.configuration.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Configurations and only return the `key`
     * const configurationWithKeyOnly = await prisma.configuration.updateManyAndReturn({
     *   select: { key: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ConfigurationUpdateManyAndReturnArgs>(args: SelectSubset<T, ConfigurationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConfigurationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Configuration.
     * @param {ConfigurationUpsertArgs} args - Arguments to update or create a Configuration.
     * @example
     * // Update or create a Configuration
     * const configuration = await prisma.configuration.upsert({
     *   create: {
     *     // ... data to create a Configuration
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Configuration we want to update
     *   }
     * })
     */
    upsert<T extends ConfigurationUpsertArgs>(args: SelectSubset<T, ConfigurationUpsertArgs<ExtArgs>>): Prisma__ConfigurationClient<$Result.GetResult<Prisma.$ConfigurationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Configurations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfigurationCountArgs} args - Arguments to filter Configurations to count.
     * @example
     * // Count the number of Configurations
     * const count = await prisma.configuration.count({
     *   where: {
     *     // ... the filter for the Configurations we want to count
     *   }
     * })
    **/
    count<T extends ConfigurationCountArgs>(
      args?: Subset<T, ConfigurationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConfigurationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Configuration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfigurationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ConfigurationAggregateArgs>(args: Subset<T, ConfigurationAggregateArgs>): Prisma.PrismaPromise<GetConfigurationAggregateType<T>>

    /**
     * Group by Configuration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfigurationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ConfigurationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConfigurationGroupByArgs['orderBy'] }
        : { orderBy?: ConfigurationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ConfigurationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConfigurationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Configuration model
   */
  readonly fields: ConfigurationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Configuration.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConfigurationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Configuration model
   */
  interface ConfigurationFieldRefs {
    readonly key: FieldRef<"Configuration", 'String'>
    readonly value: FieldRef<"Configuration", 'String'>
    readonly description: FieldRef<"Configuration", 'String'>
    readonly createdAt: FieldRef<"Configuration", 'DateTime'>
    readonly updatedAt: FieldRef<"Configuration", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Configuration findUnique
   */
  export type ConfigurationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Configuration
     */
    select?: ConfigurationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Configuration
     */
    omit?: ConfigurationOmit<ExtArgs> | null
    /**
     * Filter, which Configuration to fetch.
     */
    where: ConfigurationWhereUniqueInput
  }

  /**
   * Configuration findUniqueOrThrow
   */
  export type ConfigurationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Configuration
     */
    select?: ConfigurationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Configuration
     */
    omit?: ConfigurationOmit<ExtArgs> | null
    /**
     * Filter, which Configuration to fetch.
     */
    where: ConfigurationWhereUniqueInput
  }

  /**
   * Configuration findFirst
   */
  export type ConfigurationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Configuration
     */
    select?: ConfigurationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Configuration
     */
    omit?: ConfigurationOmit<ExtArgs> | null
    /**
     * Filter, which Configuration to fetch.
     */
    where?: ConfigurationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Configurations to fetch.
     */
    orderBy?: ConfigurationOrderByWithRelationInput | ConfigurationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Configurations.
     */
    cursor?: ConfigurationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Configurations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Configurations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Configurations.
     */
    distinct?: ConfigurationScalarFieldEnum | ConfigurationScalarFieldEnum[]
  }

  /**
   * Configuration findFirstOrThrow
   */
  export type ConfigurationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Configuration
     */
    select?: ConfigurationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Configuration
     */
    omit?: ConfigurationOmit<ExtArgs> | null
    /**
     * Filter, which Configuration to fetch.
     */
    where?: ConfigurationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Configurations to fetch.
     */
    orderBy?: ConfigurationOrderByWithRelationInput | ConfigurationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Configurations.
     */
    cursor?: ConfigurationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Configurations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Configurations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Configurations.
     */
    distinct?: ConfigurationScalarFieldEnum | ConfigurationScalarFieldEnum[]
  }

  /**
   * Configuration findMany
   */
  export type ConfigurationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Configuration
     */
    select?: ConfigurationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Configuration
     */
    omit?: ConfigurationOmit<ExtArgs> | null
    /**
     * Filter, which Configurations to fetch.
     */
    where?: ConfigurationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Configurations to fetch.
     */
    orderBy?: ConfigurationOrderByWithRelationInput | ConfigurationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Configurations.
     */
    cursor?: ConfigurationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Configurations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Configurations.
     */
    skip?: number
    distinct?: ConfigurationScalarFieldEnum | ConfigurationScalarFieldEnum[]
  }

  /**
   * Configuration create
   */
  export type ConfigurationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Configuration
     */
    select?: ConfigurationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Configuration
     */
    omit?: ConfigurationOmit<ExtArgs> | null
    /**
     * The data needed to create a Configuration.
     */
    data: XOR<ConfigurationCreateInput, ConfigurationUncheckedCreateInput>
  }

  /**
   * Configuration createMany
   */
  export type ConfigurationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Configurations.
     */
    data: ConfigurationCreateManyInput | ConfigurationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Configuration createManyAndReturn
   */
  export type ConfigurationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Configuration
     */
    select?: ConfigurationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Configuration
     */
    omit?: ConfigurationOmit<ExtArgs> | null
    /**
     * The data used to create many Configurations.
     */
    data: ConfigurationCreateManyInput | ConfigurationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Configuration update
   */
  export type ConfigurationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Configuration
     */
    select?: ConfigurationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Configuration
     */
    omit?: ConfigurationOmit<ExtArgs> | null
    /**
     * The data needed to update a Configuration.
     */
    data: XOR<ConfigurationUpdateInput, ConfigurationUncheckedUpdateInput>
    /**
     * Choose, which Configuration to update.
     */
    where: ConfigurationWhereUniqueInput
  }

  /**
   * Configuration updateMany
   */
  export type ConfigurationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Configurations.
     */
    data: XOR<ConfigurationUpdateManyMutationInput, ConfigurationUncheckedUpdateManyInput>
    /**
     * Filter which Configurations to update
     */
    where?: ConfigurationWhereInput
    /**
     * Limit how many Configurations to update.
     */
    limit?: number
  }

  /**
   * Configuration updateManyAndReturn
   */
  export type ConfigurationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Configuration
     */
    select?: ConfigurationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Configuration
     */
    omit?: ConfigurationOmit<ExtArgs> | null
    /**
     * The data used to update Configurations.
     */
    data: XOR<ConfigurationUpdateManyMutationInput, ConfigurationUncheckedUpdateManyInput>
    /**
     * Filter which Configurations to update
     */
    where?: ConfigurationWhereInput
    /**
     * Limit how many Configurations to update.
     */
    limit?: number
  }

  /**
   * Configuration upsert
   */
  export type ConfigurationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Configuration
     */
    select?: ConfigurationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Configuration
     */
    omit?: ConfigurationOmit<ExtArgs> | null
    /**
     * The filter to search for the Configuration to update in case it exists.
     */
    where: ConfigurationWhereUniqueInput
    /**
     * In case the Configuration found by the `where` argument doesn't exist, create a new Configuration with this data.
     */
    create: XOR<ConfigurationCreateInput, ConfigurationUncheckedCreateInput>
    /**
     * In case the Configuration was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConfigurationUpdateInput, ConfigurationUncheckedUpdateInput>
  }

  /**
   * Configuration delete
   */
  export type ConfigurationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Configuration
     */
    select?: ConfigurationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Configuration
     */
    omit?: ConfigurationOmit<ExtArgs> | null
    /**
     * Filter which Configuration to delete.
     */
    where: ConfigurationWhereUniqueInput
  }

  /**
   * Configuration deleteMany
   */
  export type ConfigurationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Configurations to delete
     */
    where?: ConfigurationWhereInput
    /**
     * Limit how many Configurations to delete.
     */
    limit?: number
  }

  /**
   * Configuration without action
   */
  export type ConfigurationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Configuration
     */
    select?: ConfigurationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Configuration
     */
    omit?: ConfigurationOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    clerkId: 'clerkId',
    email: 'email',
    isAdmin: 'isAdmin',
    firstName: 'firstName',
    lastName: 'lastName',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const GuestSessionScalarFieldEnum: {
    id: 'id',
    sessionId: 'sessionId',
    lastActive: 'lastActive',
    createdAt: 'createdAt',
    expiresAt: 'expiresAt'
  };

  export type GuestSessionScalarFieldEnum = (typeof GuestSessionScalarFieldEnum)[keyof typeof GuestSessionScalarFieldEnum]


  export const GenreScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type GenreScalarFieldEnum = (typeof GenreScalarFieldEnum)[keyof typeof GenreScalarFieldEnum]


  export const BookScalarFieldEnum: {
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

  export type BookScalarFieldEnum = (typeof BookScalarFieldEnum)[keyof typeof BookScalarFieldEnum]


  export const CharacterScalarFieldEnum: {
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

  export type CharacterScalarFieldEnum = (typeof CharacterScalarFieldEnum)[keyof typeof CharacterScalarFieldEnum]


  export const BookTemplateScalarFieldEnum: {
    id: 'id',
    title: 'title',
    slug: 'slug',
    description: 'description',
    pageCount: 'pageCount',
    published: 'published',
    coverImage: 'coverImage',
    coverPrompt: 'coverPrompt',
    characterGender: 'characterGender',
    minAge: 'minAge',
    maxAge: 'maxAge',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BookTemplateScalarFieldEnum = (typeof BookTemplateScalarFieldEnum)[keyof typeof BookTemplateScalarFieldEnum]


  export const TemplatePageContentScalarFieldEnum: {
    id: 'id',
    pageNumber: 'pageNumber',
    content: 'content',
    imagePrompt: 'imagePrompt',
    imageUrl: 'imageUrl',
    templateId: 'templateId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TemplatePageContentScalarFieldEnum = (typeof TemplatePageContentScalarFieldEnum)[keyof typeof TemplatePageContentScalarFieldEnum]


  export const PageScalarFieldEnum: {
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

  export type PageScalarFieldEnum = (typeof PageScalarFieldEnum)[keyof typeof PageScalarFieldEnum]


  export const ImageGenerationScalarFieldEnum: {
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

  export type ImageGenerationScalarFieldEnum = (typeof ImageGenerationScalarFieldEnum)[keyof typeof ImageGenerationScalarFieldEnum]


  export const OrderScalarFieldEnum: {
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

  export type OrderScalarFieldEnum = (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum]


  export const PrintJobScalarFieldEnum: {
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

  export type PrintJobScalarFieldEnum = (typeof PrintJobScalarFieldEnum)[keyof typeof PrintJobScalarFieldEnum]


  export const ConfigurationScalarFieldEnum: {
    key: 'key',
    value: 'value',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ConfigurationScalarFieldEnum = (typeof ConfigurationScalarFieldEnum)[keyof typeof ConfigurationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'BookStatus'
   */
  export type EnumBookStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BookStatus'>
    


  /**
   * Reference to a field of type 'BookStatus[]'
   */
  export type ListEnumBookStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BookStatus[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'PageType'
   */
  export type EnumPageTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PageType'>
    


  /**
   * Reference to a field of type 'PageType[]'
   */
  export type ListEnumPageTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PageType[]'>
    


  /**
   * Reference to a field of type 'ImageType'
   */
  export type EnumImageTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ImageType'>
    


  /**
   * Reference to a field of type 'ImageType[]'
   */
  export type ListEnumImageTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ImageType[]'>
    


  /**
   * Reference to a field of type 'GenerationStatus'
   */
  export type EnumGenerationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GenerationStatus'>
    


  /**
   * Reference to a field of type 'GenerationStatus[]'
   */
  export type ListEnumGenerationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GenerationStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'ProductType'
   */
  export type EnumProductTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProductType'>
    


  /**
   * Reference to a field of type 'ProductType[]'
   */
  export type ListEnumProductTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProductType[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'OrderStatus'
   */
  export type EnumOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderStatus'>
    


  /**
   * Reference to a field of type 'OrderStatus[]'
   */
  export type ListEnumOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderStatus[]'>
    


  /**
   * Reference to a field of type 'ShippingLevel'
   */
  export type EnumShippingLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ShippingLevel'>
    


  /**
   * Reference to a field of type 'ShippingLevel[]'
   */
  export type ListEnumShippingLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ShippingLevel[]'>
    


  /**
   * Reference to a field of type 'FileValidationStatus'
   */
  export type EnumFileValidationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FileValidationStatus'>
    


  /**
   * Reference to a field of type 'FileValidationStatus[]'
   */
  export type ListEnumFileValidationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FileValidationStatus[]'>
    


  /**
   * Reference to a field of type 'PrintJobStatus'
   */
  export type EnumPrintJobStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PrintJobStatus'>
    


  /**
   * Reference to a field of type 'PrintJobStatus[]'
   */
  export type ListEnumPrintJobStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PrintJobStatus[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    clerkId?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    isAdmin?: BoolFilter<"User"> | boolean
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    books?: BookListRelationFilter
    orders?: OrderListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    clerkId?: SortOrder
    email?: SortOrder
    isAdmin?: SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    books?: BookOrderByRelationAggregateInput
    orders?: OrderOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    clerkId?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    isAdmin?: BoolFilter<"User"> | boolean
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    books?: BookListRelationFilter
    orders?: OrderListRelationFilter
  }, "id" | "clerkId" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    clerkId?: SortOrder
    email?: SortOrder
    isAdmin?: SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    clerkId?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    isAdmin?: BoolWithAggregatesFilter<"User"> | boolean
    firstName?: StringNullableWithAggregatesFilter<"User"> | string | null
    lastName?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type GuestSessionWhereInput = {
    AND?: GuestSessionWhereInput | GuestSessionWhereInput[]
    OR?: GuestSessionWhereInput[]
    NOT?: GuestSessionWhereInput | GuestSessionWhereInput[]
    id?: StringFilter<"GuestSession"> | string
    sessionId?: StringFilter<"GuestSession"> | string
    lastActive?: DateTimeFilter<"GuestSession"> | Date | string
    createdAt?: DateTimeFilter<"GuestSession"> | Date | string
    expiresAt?: DateTimeFilter<"GuestSession"> | Date | string
    books?: BookListRelationFilter
  }

  export type GuestSessionOrderByWithRelationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    lastActive?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
    books?: BookOrderByRelationAggregateInput
  }

  export type GuestSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sessionId?: string
    AND?: GuestSessionWhereInput | GuestSessionWhereInput[]
    OR?: GuestSessionWhereInput[]
    NOT?: GuestSessionWhereInput | GuestSessionWhereInput[]
    lastActive?: DateTimeFilter<"GuestSession"> | Date | string
    createdAt?: DateTimeFilter<"GuestSession"> | Date | string
    expiresAt?: DateTimeFilter<"GuestSession"> | Date | string
    books?: BookListRelationFilter
  }, "id" | "sessionId">

  export type GuestSessionOrderByWithAggregationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    lastActive?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
    _count?: GuestSessionCountOrderByAggregateInput
    _max?: GuestSessionMaxOrderByAggregateInput
    _min?: GuestSessionMinOrderByAggregateInput
  }

  export type GuestSessionScalarWhereWithAggregatesInput = {
    AND?: GuestSessionScalarWhereWithAggregatesInput | GuestSessionScalarWhereWithAggregatesInput[]
    OR?: GuestSessionScalarWhereWithAggregatesInput[]
    NOT?: GuestSessionScalarWhereWithAggregatesInput | GuestSessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GuestSession"> | string
    sessionId?: StringWithAggregatesFilter<"GuestSession"> | string
    lastActive?: DateTimeWithAggregatesFilter<"GuestSession"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"GuestSession"> | Date | string
    expiresAt?: DateTimeWithAggregatesFilter<"GuestSession"> | Date | string
  }

  export type GenreWhereInput = {
    AND?: GenreWhereInput | GenreWhereInput[]
    OR?: GenreWhereInput[]
    NOT?: GenreWhereInput | GenreWhereInput[]
    id?: StringFilter<"Genre"> | string
    name?: StringFilter<"Genre"> | string
    templates?: BookTemplateListRelationFilter
  }

  export type GenreOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    templates?: BookTemplateOrderByRelationAggregateInput
  }

  export type GenreWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: GenreWhereInput | GenreWhereInput[]
    OR?: GenreWhereInput[]
    NOT?: GenreWhereInput | GenreWhereInput[]
    templates?: BookTemplateListRelationFilter
  }, "id" | "name">

  export type GenreOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    _count?: GenreCountOrderByAggregateInput
    _max?: GenreMaxOrderByAggregateInput
    _min?: GenreMinOrderByAggregateInput
  }

  export type GenreScalarWhereWithAggregatesInput = {
    AND?: GenreScalarWhereWithAggregatesInput | GenreScalarWhereWithAggregatesInput[]
    OR?: GenreScalarWhereWithAggregatesInput[]
    NOT?: GenreScalarWhereWithAggregatesInput | GenreScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Genre"> | string
    name?: StringWithAggregatesFilter<"Genre"> | string
  }

  export type BookWhereInput = {
    AND?: BookWhereInput | BookWhereInput[]
    OR?: BookWhereInput[]
    NOT?: BookWhereInput | BookWhereInput[]
    id?: StringFilter<"Book"> | string
    title?: StringFilter<"Book"> | string
    status?: EnumBookStatusFilter<"Book"> | $Enums.BookStatus
    characterImageReference?: StringNullableFilter<"Book"> | string | null
    coverImage?: StringNullableFilter<"Book"> | string | null
    coverImageOptions?: StringNullableListFilter<"Book">
    coverPrompt?: StringFilter<"Book"> | string
    pageCount?: IntFilter<"Book"> | number
    coverDedication?: StringNullableFilter<"Book"> | string | null
    pageDedication?: StringNullableFilter<"Book"> | string | null
    templateId?: StringFilter<"Book"> | string
    userId?: StringNullableFilter<"Book"> | string | null
    guestSessionId?: StringNullableFilter<"Book"> | string | null
    orderId?: StringNullableFilter<"Book"> | string | null
    printJobId?: StringNullableFilter<"Book"> | string | null
    printingDeadline?: DateTimeNullableFilter<"Book"> | Date | string | null
    ebookS3Key?: StringNullableFilter<"Book"> | string | null
    ebookFileName?: StringNullableFilter<"Book"> | string | null
    ebookFileType?: StringNullableFilter<"Book"> | string | null
    ebookExpiresAt?: DateTimeNullableFilter<"Book"> | Date | string | null
    createdAt?: DateTimeFilter<"Book"> | Date | string
    updatedAt?: DateTimeFilter<"Book"> | Date | string
    pages?: PageListRelationFilter
    character?: XOR<CharacterNullableScalarRelationFilter, CharacterWhereInput> | null
    template?: XOR<BookTemplateScalarRelationFilter, BookTemplateWhereInput>
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    guestSession?: XOR<GuestSessionNullableScalarRelationFilter, GuestSessionWhereInput> | null
    imageGenerations?: ImageGenerationListRelationFilter
    order?: XOR<OrderNullableScalarRelationFilter, OrderWhereInput> | null
    printJob?: XOR<PrintJobNullableScalarRelationFilter, PrintJobWhereInput> | null
  }

  export type BookOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    status?: SortOrder
    characterImageReference?: SortOrderInput | SortOrder
    coverImage?: SortOrderInput | SortOrder
    coverImageOptions?: SortOrder
    coverPrompt?: SortOrder
    pageCount?: SortOrder
    coverDedication?: SortOrderInput | SortOrder
    pageDedication?: SortOrderInput | SortOrder
    templateId?: SortOrder
    userId?: SortOrderInput | SortOrder
    guestSessionId?: SortOrderInput | SortOrder
    orderId?: SortOrderInput | SortOrder
    printJobId?: SortOrderInput | SortOrder
    printingDeadline?: SortOrderInput | SortOrder
    ebookS3Key?: SortOrderInput | SortOrder
    ebookFileName?: SortOrderInput | SortOrder
    ebookFileType?: SortOrderInput | SortOrder
    ebookExpiresAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    pages?: PageOrderByRelationAggregateInput
    character?: CharacterOrderByWithRelationInput
    template?: BookTemplateOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    guestSession?: GuestSessionOrderByWithRelationInput
    imageGenerations?: ImageGenerationOrderByRelationAggregateInput
    order?: OrderOrderByWithRelationInput
    printJob?: PrintJobOrderByWithRelationInput
  }

  export type BookWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BookWhereInput | BookWhereInput[]
    OR?: BookWhereInput[]
    NOT?: BookWhereInput | BookWhereInput[]
    title?: StringFilter<"Book"> | string
    status?: EnumBookStatusFilter<"Book"> | $Enums.BookStatus
    characterImageReference?: StringNullableFilter<"Book"> | string | null
    coverImage?: StringNullableFilter<"Book"> | string | null
    coverImageOptions?: StringNullableListFilter<"Book">
    coverPrompt?: StringFilter<"Book"> | string
    pageCount?: IntFilter<"Book"> | number
    coverDedication?: StringNullableFilter<"Book"> | string | null
    pageDedication?: StringNullableFilter<"Book"> | string | null
    templateId?: StringFilter<"Book"> | string
    userId?: StringNullableFilter<"Book"> | string | null
    guestSessionId?: StringNullableFilter<"Book"> | string | null
    orderId?: StringNullableFilter<"Book"> | string | null
    printJobId?: StringNullableFilter<"Book"> | string | null
    printingDeadline?: DateTimeNullableFilter<"Book"> | Date | string | null
    ebookS3Key?: StringNullableFilter<"Book"> | string | null
    ebookFileName?: StringNullableFilter<"Book"> | string | null
    ebookFileType?: StringNullableFilter<"Book"> | string | null
    ebookExpiresAt?: DateTimeNullableFilter<"Book"> | Date | string | null
    createdAt?: DateTimeFilter<"Book"> | Date | string
    updatedAt?: DateTimeFilter<"Book"> | Date | string
    pages?: PageListRelationFilter
    character?: XOR<CharacterNullableScalarRelationFilter, CharacterWhereInput> | null
    template?: XOR<BookTemplateScalarRelationFilter, BookTemplateWhereInput>
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    guestSession?: XOR<GuestSessionNullableScalarRelationFilter, GuestSessionWhereInput> | null
    imageGenerations?: ImageGenerationListRelationFilter
    order?: XOR<OrderNullableScalarRelationFilter, OrderWhereInput> | null
    printJob?: XOR<PrintJobNullableScalarRelationFilter, PrintJobWhereInput> | null
  }, "id">

  export type BookOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    status?: SortOrder
    characterImageReference?: SortOrderInput | SortOrder
    coverImage?: SortOrderInput | SortOrder
    coverImageOptions?: SortOrder
    coverPrompt?: SortOrder
    pageCount?: SortOrder
    coverDedication?: SortOrderInput | SortOrder
    pageDedication?: SortOrderInput | SortOrder
    templateId?: SortOrder
    userId?: SortOrderInput | SortOrder
    guestSessionId?: SortOrderInput | SortOrder
    orderId?: SortOrderInput | SortOrder
    printJobId?: SortOrderInput | SortOrder
    printingDeadline?: SortOrderInput | SortOrder
    ebookS3Key?: SortOrderInput | SortOrder
    ebookFileName?: SortOrderInput | SortOrder
    ebookFileType?: SortOrderInput | SortOrder
    ebookExpiresAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BookCountOrderByAggregateInput
    _avg?: BookAvgOrderByAggregateInput
    _max?: BookMaxOrderByAggregateInput
    _min?: BookMinOrderByAggregateInput
    _sum?: BookSumOrderByAggregateInput
  }

  export type BookScalarWhereWithAggregatesInput = {
    AND?: BookScalarWhereWithAggregatesInput | BookScalarWhereWithAggregatesInput[]
    OR?: BookScalarWhereWithAggregatesInput[]
    NOT?: BookScalarWhereWithAggregatesInput | BookScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Book"> | string
    title?: StringWithAggregatesFilter<"Book"> | string
    status?: EnumBookStatusWithAggregatesFilter<"Book"> | $Enums.BookStatus
    characterImageReference?: StringNullableWithAggregatesFilter<"Book"> | string | null
    coverImage?: StringNullableWithAggregatesFilter<"Book"> | string | null
    coverImageOptions?: StringNullableListFilter<"Book">
    coverPrompt?: StringWithAggregatesFilter<"Book"> | string
    pageCount?: IntWithAggregatesFilter<"Book"> | number
    coverDedication?: StringNullableWithAggregatesFilter<"Book"> | string | null
    pageDedication?: StringNullableWithAggregatesFilter<"Book"> | string | null
    templateId?: StringWithAggregatesFilter<"Book"> | string
    userId?: StringNullableWithAggregatesFilter<"Book"> | string | null
    guestSessionId?: StringNullableWithAggregatesFilter<"Book"> | string | null
    orderId?: StringNullableWithAggregatesFilter<"Book"> | string | null
    printJobId?: StringNullableWithAggregatesFilter<"Book"> | string | null
    printingDeadline?: DateTimeNullableWithAggregatesFilter<"Book"> | Date | string | null
    ebookS3Key?: StringNullableWithAggregatesFilter<"Book"> | string | null
    ebookFileName?: StringNullableWithAggregatesFilter<"Book"> | string | null
    ebookFileType?: StringNullableWithAggregatesFilter<"Book"> | string | null
    ebookExpiresAt?: DateTimeNullableWithAggregatesFilter<"Book"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Book"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Book"> | Date | string
  }

  export type CharacterWhereInput = {
    AND?: CharacterWhereInput | CharacterWhereInput[]
    OR?: CharacterWhereInput[]
    NOT?: CharacterWhereInput | CharacterWhereInput[]
    id?: StringFilter<"Character"> | string
    name?: StringFilter<"Character"> | string
    age?: IntFilter<"Character"> | number
    gender?: StringFilter<"Character"> | string
    eyeColor?: StringNullableFilter<"Character"> | string | null
    hairColor?: StringNullableFilter<"Character"> | string | null
    hairStyle?: StringNullableFilter<"Character"> | string | null
    skinTone?: StringNullableFilter<"Character"> | string | null
    wearingGlasses?: BoolNullableFilter<"Character"> | boolean | null
    bookId?: StringFilter<"Character"> | string
    createdAt?: DateTimeFilter<"Character"> | Date | string
    updatedAt?: DateTimeFilter<"Character"> | Date | string
    book?: XOR<BookScalarRelationFilter, BookWhereInput>
  }

  export type CharacterOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    age?: SortOrder
    gender?: SortOrder
    eyeColor?: SortOrderInput | SortOrder
    hairColor?: SortOrderInput | SortOrder
    hairStyle?: SortOrderInput | SortOrder
    skinTone?: SortOrderInput | SortOrder
    wearingGlasses?: SortOrderInput | SortOrder
    bookId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    book?: BookOrderByWithRelationInput
  }

  export type CharacterWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    bookId?: string
    AND?: CharacterWhereInput | CharacterWhereInput[]
    OR?: CharacterWhereInput[]
    NOT?: CharacterWhereInput | CharacterWhereInput[]
    name?: StringFilter<"Character"> | string
    age?: IntFilter<"Character"> | number
    gender?: StringFilter<"Character"> | string
    eyeColor?: StringNullableFilter<"Character"> | string | null
    hairColor?: StringNullableFilter<"Character"> | string | null
    hairStyle?: StringNullableFilter<"Character"> | string | null
    skinTone?: StringNullableFilter<"Character"> | string | null
    wearingGlasses?: BoolNullableFilter<"Character"> | boolean | null
    createdAt?: DateTimeFilter<"Character"> | Date | string
    updatedAt?: DateTimeFilter<"Character"> | Date | string
    book?: XOR<BookScalarRelationFilter, BookWhereInput>
  }, "id" | "bookId">

  export type CharacterOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    age?: SortOrder
    gender?: SortOrder
    eyeColor?: SortOrderInput | SortOrder
    hairColor?: SortOrderInput | SortOrder
    hairStyle?: SortOrderInput | SortOrder
    skinTone?: SortOrderInput | SortOrder
    wearingGlasses?: SortOrderInput | SortOrder
    bookId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CharacterCountOrderByAggregateInput
    _avg?: CharacterAvgOrderByAggregateInput
    _max?: CharacterMaxOrderByAggregateInput
    _min?: CharacterMinOrderByAggregateInput
    _sum?: CharacterSumOrderByAggregateInput
  }

  export type CharacterScalarWhereWithAggregatesInput = {
    AND?: CharacterScalarWhereWithAggregatesInput | CharacterScalarWhereWithAggregatesInput[]
    OR?: CharacterScalarWhereWithAggregatesInput[]
    NOT?: CharacterScalarWhereWithAggregatesInput | CharacterScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Character"> | string
    name?: StringWithAggregatesFilter<"Character"> | string
    age?: IntWithAggregatesFilter<"Character"> | number
    gender?: StringWithAggregatesFilter<"Character"> | string
    eyeColor?: StringNullableWithAggregatesFilter<"Character"> | string | null
    hairColor?: StringNullableWithAggregatesFilter<"Character"> | string | null
    hairStyle?: StringNullableWithAggregatesFilter<"Character"> | string | null
    skinTone?: StringNullableWithAggregatesFilter<"Character"> | string | null
    wearingGlasses?: BoolNullableWithAggregatesFilter<"Character"> | boolean | null
    bookId?: StringWithAggregatesFilter<"Character"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Character"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Character"> | Date | string
  }

  export type BookTemplateWhereInput = {
    AND?: BookTemplateWhereInput | BookTemplateWhereInput[]
    OR?: BookTemplateWhereInput[]
    NOT?: BookTemplateWhereInput | BookTemplateWhereInput[]
    id?: StringFilter<"BookTemplate"> | string
    title?: StringFilter<"BookTemplate"> | string
    slug?: StringFilter<"BookTemplate"> | string
    description?: StringFilter<"BookTemplate"> | string
    pageCount?: IntFilter<"BookTemplate"> | number
    published?: BoolFilter<"BookTemplate"> | boolean
    coverImage?: StringFilter<"BookTemplate"> | string
    coverPrompt?: StringFilter<"BookTemplate"> | string
    characterGender?: StringFilter<"BookTemplate"> | string
    minAge?: IntFilter<"BookTemplate"> | number
    maxAge?: IntFilter<"BookTemplate"> | number
    createdAt?: DateTimeFilter<"BookTemplate"> | Date | string
    updatedAt?: DateTimeFilter<"BookTemplate"> | Date | string
    pages?: TemplatePageContentListRelationFilter
    books?: BookListRelationFilter
    genres?: GenreListRelationFilter
  }

  export type BookTemplateOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    pageCount?: SortOrder
    published?: SortOrder
    coverImage?: SortOrder
    coverPrompt?: SortOrder
    characterGender?: SortOrder
    minAge?: SortOrder
    maxAge?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    pages?: TemplatePageContentOrderByRelationAggregateInput
    books?: BookOrderByRelationAggregateInput
    genres?: GenreOrderByRelationAggregateInput
  }

  export type BookTemplateWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    title?: string
    slug?: string
    AND?: BookTemplateWhereInput | BookTemplateWhereInput[]
    OR?: BookTemplateWhereInput[]
    NOT?: BookTemplateWhereInput | BookTemplateWhereInput[]
    description?: StringFilter<"BookTemplate"> | string
    pageCount?: IntFilter<"BookTemplate"> | number
    published?: BoolFilter<"BookTemplate"> | boolean
    coverImage?: StringFilter<"BookTemplate"> | string
    coverPrompt?: StringFilter<"BookTemplate"> | string
    characterGender?: StringFilter<"BookTemplate"> | string
    minAge?: IntFilter<"BookTemplate"> | number
    maxAge?: IntFilter<"BookTemplate"> | number
    createdAt?: DateTimeFilter<"BookTemplate"> | Date | string
    updatedAt?: DateTimeFilter<"BookTemplate"> | Date | string
    pages?: TemplatePageContentListRelationFilter
    books?: BookListRelationFilter
    genres?: GenreListRelationFilter
  }, "id" | "title" | "slug">

  export type BookTemplateOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    pageCount?: SortOrder
    published?: SortOrder
    coverImage?: SortOrder
    coverPrompt?: SortOrder
    characterGender?: SortOrder
    minAge?: SortOrder
    maxAge?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BookTemplateCountOrderByAggregateInput
    _avg?: BookTemplateAvgOrderByAggregateInput
    _max?: BookTemplateMaxOrderByAggregateInput
    _min?: BookTemplateMinOrderByAggregateInput
    _sum?: BookTemplateSumOrderByAggregateInput
  }

  export type BookTemplateScalarWhereWithAggregatesInput = {
    AND?: BookTemplateScalarWhereWithAggregatesInput | BookTemplateScalarWhereWithAggregatesInput[]
    OR?: BookTemplateScalarWhereWithAggregatesInput[]
    NOT?: BookTemplateScalarWhereWithAggregatesInput | BookTemplateScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BookTemplate"> | string
    title?: StringWithAggregatesFilter<"BookTemplate"> | string
    slug?: StringWithAggregatesFilter<"BookTemplate"> | string
    description?: StringWithAggregatesFilter<"BookTemplate"> | string
    pageCount?: IntWithAggregatesFilter<"BookTemplate"> | number
    published?: BoolWithAggregatesFilter<"BookTemplate"> | boolean
    coverImage?: StringWithAggregatesFilter<"BookTemplate"> | string
    coverPrompt?: StringWithAggregatesFilter<"BookTemplate"> | string
    characterGender?: StringWithAggregatesFilter<"BookTemplate"> | string
    minAge?: IntWithAggregatesFilter<"BookTemplate"> | number
    maxAge?: IntWithAggregatesFilter<"BookTemplate"> | number
    createdAt?: DateTimeWithAggregatesFilter<"BookTemplate"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"BookTemplate"> | Date | string
  }

  export type TemplatePageContentWhereInput = {
    AND?: TemplatePageContentWhereInput | TemplatePageContentWhereInput[]
    OR?: TemplatePageContentWhereInput[]
    NOT?: TemplatePageContentWhereInput | TemplatePageContentWhereInput[]
    id?: StringFilter<"TemplatePageContent"> | string
    pageNumber?: IntFilter<"TemplatePageContent"> | number
    content?: StringFilter<"TemplatePageContent"> | string
    imagePrompt?: StringFilter<"TemplatePageContent"> | string
    imageUrl?: StringFilter<"TemplatePageContent"> | string
    templateId?: StringFilter<"TemplatePageContent"> | string
    createdAt?: DateTimeFilter<"TemplatePageContent"> | Date | string
    updatedAt?: DateTimeFilter<"TemplatePageContent"> | Date | string
    template?: XOR<BookTemplateScalarRelationFilter, BookTemplateWhereInput>
  }

  export type TemplatePageContentOrderByWithRelationInput = {
    id?: SortOrder
    pageNumber?: SortOrder
    content?: SortOrder
    imagePrompt?: SortOrder
    imageUrl?: SortOrder
    templateId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    template?: BookTemplateOrderByWithRelationInput
  }

  export type TemplatePageContentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    templateId_pageNumber?: TemplatePageContentTemplateIdPageNumberCompoundUniqueInput
    AND?: TemplatePageContentWhereInput | TemplatePageContentWhereInput[]
    OR?: TemplatePageContentWhereInput[]
    NOT?: TemplatePageContentWhereInput | TemplatePageContentWhereInput[]
    pageNumber?: IntFilter<"TemplatePageContent"> | number
    content?: StringFilter<"TemplatePageContent"> | string
    imagePrompt?: StringFilter<"TemplatePageContent"> | string
    imageUrl?: StringFilter<"TemplatePageContent"> | string
    templateId?: StringFilter<"TemplatePageContent"> | string
    createdAt?: DateTimeFilter<"TemplatePageContent"> | Date | string
    updatedAt?: DateTimeFilter<"TemplatePageContent"> | Date | string
    template?: XOR<BookTemplateScalarRelationFilter, BookTemplateWhereInput>
  }, "id" | "templateId_pageNumber">

  export type TemplatePageContentOrderByWithAggregationInput = {
    id?: SortOrder
    pageNumber?: SortOrder
    content?: SortOrder
    imagePrompt?: SortOrder
    imageUrl?: SortOrder
    templateId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TemplatePageContentCountOrderByAggregateInput
    _avg?: TemplatePageContentAvgOrderByAggregateInput
    _max?: TemplatePageContentMaxOrderByAggregateInput
    _min?: TemplatePageContentMinOrderByAggregateInput
    _sum?: TemplatePageContentSumOrderByAggregateInput
  }

  export type TemplatePageContentScalarWhereWithAggregatesInput = {
    AND?: TemplatePageContentScalarWhereWithAggregatesInput | TemplatePageContentScalarWhereWithAggregatesInput[]
    OR?: TemplatePageContentScalarWhereWithAggregatesInput[]
    NOT?: TemplatePageContentScalarWhereWithAggregatesInput | TemplatePageContentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TemplatePageContent"> | string
    pageNumber?: IntWithAggregatesFilter<"TemplatePageContent"> | number
    content?: StringWithAggregatesFilter<"TemplatePageContent"> | string
    imagePrompt?: StringWithAggregatesFilter<"TemplatePageContent"> | string
    imageUrl?: StringWithAggregatesFilter<"TemplatePageContent"> | string
    templateId?: StringWithAggregatesFilter<"TemplatePageContent"> | string
    createdAt?: DateTimeWithAggregatesFilter<"TemplatePageContent"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TemplatePageContent"> | Date | string
  }

  export type PageWhereInput = {
    AND?: PageWhereInput | PageWhereInput[]
    OR?: PageWhereInput[]
    NOT?: PageWhereInput | PageWhereInput[]
    id?: StringFilter<"Page"> | string
    type?: EnumPageTypeFilter<"Page"> | $Enums.PageType
    pageNumber?: IntFilter<"Page"> | number
    textContent?: StringNullableFilter<"Page"> | string | null
    imagePrompt?: StringNullableFilter<"Page"> | string | null
    imageUrl?: StringNullableFilter<"Page"> | string | null
    imageOptions?: StringNullableListFilter<"Page">
    bookId?: StringFilter<"Page"> | string
    createdAt?: DateTimeFilter<"Page"> | Date | string
    updatedAt?: DateTimeFilter<"Page"> | Date | string
    book?: XOR<BookScalarRelationFilter, BookWhereInput>
  }

  export type PageOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    pageNumber?: SortOrder
    textContent?: SortOrderInput | SortOrder
    imagePrompt?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    imageOptions?: SortOrder
    bookId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    book?: BookOrderByWithRelationInput
  }

  export type PageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    bookId_pageNumber?: PageBookIdPageNumberCompoundUniqueInput
    AND?: PageWhereInput | PageWhereInput[]
    OR?: PageWhereInput[]
    NOT?: PageWhereInput | PageWhereInput[]
    type?: EnumPageTypeFilter<"Page"> | $Enums.PageType
    pageNumber?: IntFilter<"Page"> | number
    textContent?: StringNullableFilter<"Page"> | string | null
    imagePrompt?: StringNullableFilter<"Page"> | string | null
    imageUrl?: StringNullableFilter<"Page"> | string | null
    imageOptions?: StringNullableListFilter<"Page">
    bookId?: StringFilter<"Page"> | string
    createdAt?: DateTimeFilter<"Page"> | Date | string
    updatedAt?: DateTimeFilter<"Page"> | Date | string
    book?: XOR<BookScalarRelationFilter, BookWhereInput>
  }, "id" | "bookId_pageNumber">

  export type PageOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    pageNumber?: SortOrder
    textContent?: SortOrderInput | SortOrder
    imagePrompt?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    imageOptions?: SortOrder
    bookId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PageCountOrderByAggregateInput
    _avg?: PageAvgOrderByAggregateInput
    _max?: PageMaxOrderByAggregateInput
    _min?: PageMinOrderByAggregateInput
    _sum?: PageSumOrderByAggregateInput
  }

  export type PageScalarWhereWithAggregatesInput = {
    AND?: PageScalarWhereWithAggregatesInput | PageScalarWhereWithAggregatesInput[]
    OR?: PageScalarWhereWithAggregatesInput[]
    NOT?: PageScalarWhereWithAggregatesInput | PageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Page"> | string
    type?: EnumPageTypeWithAggregatesFilter<"Page"> | $Enums.PageType
    pageNumber?: IntWithAggregatesFilter<"Page"> | number
    textContent?: StringNullableWithAggregatesFilter<"Page"> | string | null
    imagePrompt?: StringNullableWithAggregatesFilter<"Page"> | string | null
    imageUrl?: StringNullableWithAggregatesFilter<"Page"> | string | null
    imageOptions?: StringNullableListFilter<"Page">
    bookId?: StringWithAggregatesFilter<"Page"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Page"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Page"> | Date | string
  }

  export type ImageGenerationWhereInput = {
    AND?: ImageGenerationWhereInput | ImageGenerationWhereInput[]
    OR?: ImageGenerationWhereInput[]
    NOT?: ImageGenerationWhereInput | ImageGenerationWhereInput[]
    id?: StringFilter<"ImageGeneration"> | string
    generationId?: StringFilter<"ImageGeneration"> | string
    bookId?: StringFilter<"ImageGeneration"> | string
    pageId?: StringNullableFilter<"ImageGeneration"> | string | null
    type?: EnumImageTypeFilter<"ImageGeneration"> | $Enums.ImageType
    prompt?: StringFilter<"ImageGeneration"> | string
    status?: EnumGenerationStatusFilter<"ImageGeneration"> | $Enums.GenerationStatus
    errorMessage?: StringNullableFilter<"ImageGeneration"> | string | null
    apiCreditCost?: FloatNullableFilter<"ImageGeneration"> | number | null
    createdAt?: DateTimeFilter<"ImageGeneration"> | Date | string
    completedAt?: DateTimeNullableFilter<"ImageGeneration"> | Date | string | null
    book?: XOR<BookScalarRelationFilter, BookWhereInput>
  }

  export type ImageGenerationOrderByWithRelationInput = {
    id?: SortOrder
    generationId?: SortOrder
    bookId?: SortOrder
    pageId?: SortOrderInput | SortOrder
    type?: SortOrder
    prompt?: SortOrder
    status?: SortOrder
    errorMessage?: SortOrderInput | SortOrder
    apiCreditCost?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    book?: BookOrderByWithRelationInput
  }

  export type ImageGenerationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    generationId?: string
    AND?: ImageGenerationWhereInput | ImageGenerationWhereInput[]
    OR?: ImageGenerationWhereInput[]
    NOT?: ImageGenerationWhereInput | ImageGenerationWhereInput[]
    bookId?: StringFilter<"ImageGeneration"> | string
    pageId?: StringNullableFilter<"ImageGeneration"> | string | null
    type?: EnumImageTypeFilter<"ImageGeneration"> | $Enums.ImageType
    prompt?: StringFilter<"ImageGeneration"> | string
    status?: EnumGenerationStatusFilter<"ImageGeneration"> | $Enums.GenerationStatus
    errorMessage?: StringNullableFilter<"ImageGeneration"> | string | null
    apiCreditCost?: FloatNullableFilter<"ImageGeneration"> | number | null
    createdAt?: DateTimeFilter<"ImageGeneration"> | Date | string
    completedAt?: DateTimeNullableFilter<"ImageGeneration"> | Date | string | null
    book?: XOR<BookScalarRelationFilter, BookWhereInput>
  }, "id" | "generationId">

  export type ImageGenerationOrderByWithAggregationInput = {
    id?: SortOrder
    generationId?: SortOrder
    bookId?: SortOrder
    pageId?: SortOrderInput | SortOrder
    type?: SortOrder
    prompt?: SortOrder
    status?: SortOrder
    errorMessage?: SortOrderInput | SortOrder
    apiCreditCost?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    _count?: ImageGenerationCountOrderByAggregateInput
    _avg?: ImageGenerationAvgOrderByAggregateInput
    _max?: ImageGenerationMaxOrderByAggregateInput
    _min?: ImageGenerationMinOrderByAggregateInput
    _sum?: ImageGenerationSumOrderByAggregateInput
  }

  export type ImageGenerationScalarWhereWithAggregatesInput = {
    AND?: ImageGenerationScalarWhereWithAggregatesInput | ImageGenerationScalarWhereWithAggregatesInput[]
    OR?: ImageGenerationScalarWhereWithAggregatesInput[]
    NOT?: ImageGenerationScalarWhereWithAggregatesInput | ImageGenerationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ImageGeneration"> | string
    generationId?: StringWithAggregatesFilter<"ImageGeneration"> | string
    bookId?: StringWithAggregatesFilter<"ImageGeneration"> | string
    pageId?: StringNullableWithAggregatesFilter<"ImageGeneration"> | string | null
    type?: EnumImageTypeWithAggregatesFilter<"ImageGeneration"> | $Enums.ImageType
    prompt?: StringWithAggregatesFilter<"ImageGeneration"> | string
    status?: EnumGenerationStatusWithAggregatesFilter<"ImageGeneration"> | $Enums.GenerationStatus
    errorMessage?: StringNullableWithAggregatesFilter<"ImageGeneration"> | string | null
    apiCreditCost?: FloatNullableWithAggregatesFilter<"ImageGeneration"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"ImageGeneration"> | Date | string
    completedAt?: DateTimeNullableWithAggregatesFilter<"ImageGeneration"> | Date | string | null
  }

  export type OrderWhereInput = {
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    id?: StringFilter<"Order"> | string
    orderNumber?: StringFilter<"Order"> | string
    productType?: EnumProductTypeFilter<"Order"> | $Enums.ProductType
    totalPrice?: DecimalFilter<"Order"> | Decimal | DecimalJsLike | number | string
    currency?: StringFilter<"Order"> | string
    status?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus
    paymentProvider?: StringFilter<"Order"> | string
    quantity?: IntFilter<"Order"> | number
    paymentId?: StringNullableFilter<"Order"> | string | null
    transactionId?: StringNullableFilter<"Order"> | string | null
    pricePaid?: FloatNullableFilter<"Order"> | number | null
    payerEmail?: StringNullableFilter<"Order"> | string | null
    shippingCost?: DecimalNullableFilter<"Order"> | Decimal | DecimalJsLike | number | string | null
    printingCost?: DecimalNullableFilter<"Order"> | Decimal | DecimalJsLike | number | string | null
    imagesCost?: DecimalNullableFilter<"Order"> | Decimal | DecimalJsLike | number | string | null
    shippingLevel?: EnumShippingLevelNullableFilter<"Order"> | $Enums.ShippingLevel | null
    phoneNumber?: StringNullableFilter<"Order"> | string | null
    name?: StringNullableFilter<"Order"> | string | null
    street1?: StringNullableFilter<"Order"> | string | null
    street2?: StringNullableFilter<"Order"> | string | null
    city?: StringNullableFilter<"Order"> | string | null
    state_code?: StringNullableFilter<"Order"> | string | null
    postcode?: StringNullableFilter<"Order"> | string | null
    country?: StringNullableFilter<"Order"> | string | null
    poProviderOrderId?: StringNullableFilter<"Order"> | string | null
    trackingNumber?: StringNullableFilter<"Order"> | string | null
    customerEmail?: StringFilter<"Order"> | string
    bookId?: StringFilter<"Order"> | string
    userId?: StringNullableFilter<"Order"> | string | null
    printJobId?: StringNullableFilter<"Order"> | string | null
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
    paidAt?: DateTimeNullableFilter<"Order"> | Date | string | null
    fulfilledAt?: DateTimeNullableFilter<"Order"> | Date | string | null
    book?: XOR<BookScalarRelationFilter, BookWhereInput>
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    printJob?: XOR<PrintJobNullableScalarRelationFilter, PrintJobWhereInput> | null
  }

  export type OrderOrderByWithRelationInput = {
    id?: SortOrder
    orderNumber?: SortOrder
    productType?: SortOrder
    totalPrice?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    paymentProvider?: SortOrder
    quantity?: SortOrder
    paymentId?: SortOrderInput | SortOrder
    transactionId?: SortOrderInput | SortOrder
    pricePaid?: SortOrderInput | SortOrder
    payerEmail?: SortOrderInput | SortOrder
    shippingCost?: SortOrderInput | SortOrder
    printingCost?: SortOrderInput | SortOrder
    imagesCost?: SortOrderInput | SortOrder
    shippingLevel?: SortOrderInput | SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    street1?: SortOrderInput | SortOrder
    street2?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    state_code?: SortOrderInput | SortOrder
    postcode?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    poProviderOrderId?: SortOrderInput | SortOrder
    trackingNumber?: SortOrderInput | SortOrder
    customerEmail?: SortOrder
    bookId?: SortOrder
    userId?: SortOrderInput | SortOrder
    printJobId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    paidAt?: SortOrderInput | SortOrder
    fulfilledAt?: SortOrderInput | SortOrder
    book?: BookOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    printJob?: PrintJobOrderByWithRelationInput
  }

  export type OrderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    orderNumber?: string
    bookId?: string
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    productType?: EnumProductTypeFilter<"Order"> | $Enums.ProductType
    totalPrice?: DecimalFilter<"Order"> | Decimal | DecimalJsLike | number | string
    currency?: StringFilter<"Order"> | string
    status?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus
    paymentProvider?: StringFilter<"Order"> | string
    quantity?: IntFilter<"Order"> | number
    paymentId?: StringNullableFilter<"Order"> | string | null
    transactionId?: StringNullableFilter<"Order"> | string | null
    pricePaid?: FloatNullableFilter<"Order"> | number | null
    payerEmail?: StringNullableFilter<"Order"> | string | null
    shippingCost?: DecimalNullableFilter<"Order"> | Decimal | DecimalJsLike | number | string | null
    printingCost?: DecimalNullableFilter<"Order"> | Decimal | DecimalJsLike | number | string | null
    imagesCost?: DecimalNullableFilter<"Order"> | Decimal | DecimalJsLike | number | string | null
    shippingLevel?: EnumShippingLevelNullableFilter<"Order"> | $Enums.ShippingLevel | null
    phoneNumber?: StringNullableFilter<"Order"> | string | null
    name?: StringNullableFilter<"Order"> | string | null
    street1?: StringNullableFilter<"Order"> | string | null
    street2?: StringNullableFilter<"Order"> | string | null
    city?: StringNullableFilter<"Order"> | string | null
    state_code?: StringNullableFilter<"Order"> | string | null
    postcode?: StringNullableFilter<"Order"> | string | null
    country?: StringNullableFilter<"Order"> | string | null
    poProviderOrderId?: StringNullableFilter<"Order"> | string | null
    trackingNumber?: StringNullableFilter<"Order"> | string | null
    customerEmail?: StringFilter<"Order"> | string
    userId?: StringNullableFilter<"Order"> | string | null
    printJobId?: StringNullableFilter<"Order"> | string | null
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
    paidAt?: DateTimeNullableFilter<"Order"> | Date | string | null
    fulfilledAt?: DateTimeNullableFilter<"Order"> | Date | string | null
    book?: XOR<BookScalarRelationFilter, BookWhereInput>
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    printJob?: XOR<PrintJobNullableScalarRelationFilter, PrintJobWhereInput> | null
  }, "id" | "orderNumber" | "bookId">

  export type OrderOrderByWithAggregationInput = {
    id?: SortOrder
    orderNumber?: SortOrder
    productType?: SortOrder
    totalPrice?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    paymentProvider?: SortOrder
    quantity?: SortOrder
    paymentId?: SortOrderInput | SortOrder
    transactionId?: SortOrderInput | SortOrder
    pricePaid?: SortOrderInput | SortOrder
    payerEmail?: SortOrderInput | SortOrder
    shippingCost?: SortOrderInput | SortOrder
    printingCost?: SortOrderInput | SortOrder
    imagesCost?: SortOrderInput | SortOrder
    shippingLevel?: SortOrderInput | SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    street1?: SortOrderInput | SortOrder
    street2?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    state_code?: SortOrderInput | SortOrder
    postcode?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    poProviderOrderId?: SortOrderInput | SortOrder
    trackingNumber?: SortOrderInput | SortOrder
    customerEmail?: SortOrder
    bookId?: SortOrder
    userId?: SortOrderInput | SortOrder
    printJobId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    paidAt?: SortOrderInput | SortOrder
    fulfilledAt?: SortOrderInput | SortOrder
    _count?: OrderCountOrderByAggregateInput
    _avg?: OrderAvgOrderByAggregateInput
    _max?: OrderMaxOrderByAggregateInput
    _min?: OrderMinOrderByAggregateInput
    _sum?: OrderSumOrderByAggregateInput
  }

  export type OrderScalarWhereWithAggregatesInput = {
    AND?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    OR?: OrderScalarWhereWithAggregatesInput[]
    NOT?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Order"> | string
    orderNumber?: StringWithAggregatesFilter<"Order"> | string
    productType?: EnumProductTypeWithAggregatesFilter<"Order"> | $Enums.ProductType
    totalPrice?: DecimalWithAggregatesFilter<"Order"> | Decimal | DecimalJsLike | number | string
    currency?: StringWithAggregatesFilter<"Order"> | string
    status?: EnumOrderStatusWithAggregatesFilter<"Order"> | $Enums.OrderStatus
    paymentProvider?: StringWithAggregatesFilter<"Order"> | string
    quantity?: IntWithAggregatesFilter<"Order"> | number
    paymentId?: StringNullableWithAggregatesFilter<"Order"> | string | null
    transactionId?: StringNullableWithAggregatesFilter<"Order"> | string | null
    pricePaid?: FloatNullableWithAggregatesFilter<"Order"> | number | null
    payerEmail?: StringNullableWithAggregatesFilter<"Order"> | string | null
    shippingCost?: DecimalNullableWithAggregatesFilter<"Order"> | Decimal | DecimalJsLike | number | string | null
    printingCost?: DecimalNullableWithAggregatesFilter<"Order"> | Decimal | DecimalJsLike | number | string | null
    imagesCost?: DecimalNullableWithAggregatesFilter<"Order"> | Decimal | DecimalJsLike | number | string | null
    shippingLevel?: EnumShippingLevelNullableWithAggregatesFilter<"Order"> | $Enums.ShippingLevel | null
    phoneNumber?: StringNullableWithAggregatesFilter<"Order"> | string | null
    name?: StringNullableWithAggregatesFilter<"Order"> | string | null
    street1?: StringNullableWithAggregatesFilter<"Order"> | string | null
    street2?: StringNullableWithAggregatesFilter<"Order"> | string | null
    city?: StringNullableWithAggregatesFilter<"Order"> | string | null
    state_code?: StringNullableWithAggregatesFilter<"Order"> | string | null
    postcode?: StringNullableWithAggregatesFilter<"Order"> | string | null
    country?: StringNullableWithAggregatesFilter<"Order"> | string | null
    poProviderOrderId?: StringNullableWithAggregatesFilter<"Order"> | string | null
    trackingNumber?: StringNullableWithAggregatesFilter<"Order"> | string | null
    customerEmail?: StringWithAggregatesFilter<"Order"> | string
    bookId?: StringWithAggregatesFilter<"Order"> | string
    userId?: StringNullableWithAggregatesFilter<"Order"> | string | null
    printJobId?: StringNullableWithAggregatesFilter<"Order"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Order"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Order"> | Date | string
    paidAt?: DateTimeNullableWithAggregatesFilter<"Order"> | Date | string | null
    fulfilledAt?: DateTimeNullableWithAggregatesFilter<"Order"> | Date | string | null
  }

  export type PrintJobWhereInput = {
    AND?: PrintJobWhereInput | PrintJobWhereInput[]
    OR?: PrintJobWhereInput[]
    NOT?: PrintJobWhereInput | PrintJobWhereInput[]
    id?: StringFilter<"PrintJob"> | string
    orderId?: StringFilter<"PrintJob"> | string
    bookId?: StringFilter<"PrintJob"> | string
    luluPrintJobId?: IntNullableFilter<"PrintJob"> | number | null
    paymentId?: IntNullableFilter<"PrintJob"> | number | null
    podPackageId?: StringFilter<"PrintJob"> | string
    interiorPdfUrl?: StringNullableFilter<"PrintJob"> | string | null
    coverPdfUrl?: StringNullableFilter<"PrintJob"> | string | null
    interiorS3Key?: StringNullableFilter<"PrintJob"> | string | null
    coverS3Key?: StringNullableFilter<"PrintJob"> | string | null
    pageCount?: IntFilter<"PrintJob"> | number
    interiorValidationId?: IntNullableFilter<"PrintJob"> | number | null
    coverValidationId?: IntNullableFilter<"PrintJob"> | number | null
    interiorValidationStatus?: EnumFileValidationStatusFilter<"PrintJob"> | $Enums.FileValidationStatus
    coverValidationStatus?: EnumFileValidationStatusFilter<"PrintJob"> | $Enums.FileValidationStatus
    validationErrors?: StringNullableListFilter<"PrintJob">
    status?: EnumPrintJobStatusFilter<"PrintJob"> | $Enums.PrintJobStatus
    statusMessage?: StringNullableFilter<"PrintJob"> | string | null
    currency?: StringFilter<"PrintJob"> | string
    printingCostExclTax?: DecimalNullableFilter<"PrintJob"> | Decimal | DecimalJsLike | number | string | null
    printingCostInclTax?: DecimalNullableFilter<"PrintJob"> | Decimal | DecimalJsLike | number | string | null
    shippingCostExclTax?: DecimalNullableFilter<"PrintJob"> | Decimal | DecimalJsLike | number | string | null
    shippingCostInclTax?: DecimalNullableFilter<"PrintJob"> | Decimal | DecimalJsLike | number | string | null
    totalCostExclTax?: DecimalNullableFilter<"PrintJob"> | Decimal | DecimalJsLike | number | string | null
    totalCostInclTax?: DecimalNullableFilter<"PrintJob"> | Decimal | DecimalJsLike | number | string | null
    totalTax?: DecimalNullableFilter<"PrintJob"> | Decimal | DecimalJsLike | number | string | null
    trackingNumber?: StringNullableFilter<"PrintJob"> | string | null
    trackingUrls?: StringNullableListFilter<"PrintJob">
    shippingCarrier?: StringNullableFilter<"PrintJob"> | string | null
    estimatedShipDate?: DateTimeNullableFilter<"PrintJob"> | Date | string | null
    estimatedDeliveryDate?: DateTimeNullableFilter<"PrintJob"> | Date | string | null
    attempts?: IntFilter<"PrintJob"> | number
    errorMessage?: StringNullableFilter<"PrintJob"> | string | null
    sentByAdminId?: StringNullableFilter<"PrintJob"> | string | null
    adminNotes?: StringNullableFilter<"PrintJob"> | string | null
    createdAt?: DateTimeFilter<"PrintJob"> | Date | string
    updatedAt?: DateTimeFilter<"PrintJob"> | Date | string
    sentToPrinterAt?: DateTimeNullableFilter<"PrintJob"> | Date | string | null
    paidAt?: DateTimeNullableFilter<"PrintJob"> | Date | string | null
    inProductionAt?: DateTimeNullableFilter<"PrintJob"> | Date | string | null
    shippedAt?: DateTimeNullableFilter<"PrintJob"> | Date | string | null
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
    book?: XOR<BookScalarRelationFilter, BookWhereInput>
  }

  export type PrintJobOrderByWithRelationInput = {
    id?: SortOrder
    orderId?: SortOrder
    bookId?: SortOrder
    luluPrintJobId?: SortOrderInput | SortOrder
    paymentId?: SortOrderInput | SortOrder
    podPackageId?: SortOrder
    interiorPdfUrl?: SortOrderInput | SortOrder
    coverPdfUrl?: SortOrderInput | SortOrder
    interiorS3Key?: SortOrderInput | SortOrder
    coverS3Key?: SortOrderInput | SortOrder
    pageCount?: SortOrder
    interiorValidationId?: SortOrderInput | SortOrder
    coverValidationId?: SortOrderInput | SortOrder
    interiorValidationStatus?: SortOrder
    coverValidationStatus?: SortOrder
    validationErrors?: SortOrder
    status?: SortOrder
    statusMessage?: SortOrderInput | SortOrder
    currency?: SortOrder
    printingCostExclTax?: SortOrderInput | SortOrder
    printingCostInclTax?: SortOrderInput | SortOrder
    shippingCostExclTax?: SortOrderInput | SortOrder
    shippingCostInclTax?: SortOrderInput | SortOrder
    totalCostExclTax?: SortOrderInput | SortOrder
    totalCostInclTax?: SortOrderInput | SortOrder
    totalTax?: SortOrderInput | SortOrder
    trackingNumber?: SortOrderInput | SortOrder
    trackingUrls?: SortOrder
    shippingCarrier?: SortOrderInput | SortOrder
    estimatedShipDate?: SortOrderInput | SortOrder
    estimatedDeliveryDate?: SortOrderInput | SortOrder
    attempts?: SortOrder
    errorMessage?: SortOrderInput | SortOrder
    sentByAdminId?: SortOrderInput | SortOrder
    adminNotes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sentToPrinterAt?: SortOrderInput | SortOrder
    paidAt?: SortOrderInput | SortOrder
    inProductionAt?: SortOrderInput | SortOrder
    shippedAt?: SortOrderInput | SortOrder
    order?: OrderOrderByWithRelationInput
    book?: BookOrderByWithRelationInput
  }

  export type PrintJobWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    orderId?: string
    bookId?: string
    AND?: PrintJobWhereInput | PrintJobWhereInput[]
    OR?: PrintJobWhereInput[]
    NOT?: PrintJobWhereInput | PrintJobWhereInput[]
    luluPrintJobId?: IntNullableFilter<"PrintJob"> | number | null
    paymentId?: IntNullableFilter<"PrintJob"> | number | null
    podPackageId?: StringFilter<"PrintJob"> | string
    interiorPdfUrl?: StringNullableFilter<"PrintJob"> | string | null
    coverPdfUrl?: StringNullableFilter<"PrintJob"> | string | null
    interiorS3Key?: StringNullableFilter<"PrintJob"> | string | null
    coverS3Key?: StringNullableFilter<"PrintJob"> | string | null
    pageCount?: IntFilter<"PrintJob"> | number
    interiorValidationId?: IntNullableFilter<"PrintJob"> | number | null
    coverValidationId?: IntNullableFilter<"PrintJob"> | number | null
    interiorValidationStatus?: EnumFileValidationStatusFilter<"PrintJob"> | $Enums.FileValidationStatus
    coverValidationStatus?: EnumFileValidationStatusFilter<"PrintJob"> | $Enums.FileValidationStatus
    validationErrors?: StringNullableListFilter<"PrintJob">
    status?: EnumPrintJobStatusFilter<"PrintJob"> | $Enums.PrintJobStatus
    statusMessage?: StringNullableFilter<"PrintJob"> | string | null
    currency?: StringFilter<"PrintJob"> | string
    printingCostExclTax?: DecimalNullableFilter<"PrintJob"> | Decimal | DecimalJsLike | number | string | null
    printingCostInclTax?: DecimalNullableFilter<"PrintJob"> | Decimal | DecimalJsLike | number | string | null
    shippingCostExclTax?: DecimalNullableFilter<"PrintJob"> | Decimal | DecimalJsLike | number | string | null
    shippingCostInclTax?: DecimalNullableFilter<"PrintJob"> | Decimal | DecimalJsLike | number | string | null
    totalCostExclTax?: DecimalNullableFilter<"PrintJob"> | Decimal | DecimalJsLike | number | string | null
    totalCostInclTax?: DecimalNullableFilter<"PrintJob"> | Decimal | DecimalJsLike | number | string | null
    totalTax?: DecimalNullableFilter<"PrintJob"> | Decimal | DecimalJsLike | number | string | null
    trackingNumber?: StringNullableFilter<"PrintJob"> | string | null
    trackingUrls?: StringNullableListFilter<"PrintJob">
    shippingCarrier?: StringNullableFilter<"PrintJob"> | string | null
    estimatedShipDate?: DateTimeNullableFilter<"PrintJob"> | Date | string | null
    estimatedDeliveryDate?: DateTimeNullableFilter<"PrintJob"> | Date | string | null
    attempts?: IntFilter<"PrintJob"> | number
    errorMessage?: StringNullableFilter<"PrintJob"> | string | null
    sentByAdminId?: StringNullableFilter<"PrintJob"> | string | null
    adminNotes?: StringNullableFilter<"PrintJob"> | string | null
    createdAt?: DateTimeFilter<"PrintJob"> | Date | string
    updatedAt?: DateTimeFilter<"PrintJob"> | Date | string
    sentToPrinterAt?: DateTimeNullableFilter<"PrintJob"> | Date | string | null
    paidAt?: DateTimeNullableFilter<"PrintJob"> | Date | string | null
    inProductionAt?: DateTimeNullableFilter<"PrintJob"> | Date | string | null
    shippedAt?: DateTimeNullableFilter<"PrintJob"> | Date | string | null
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
    book?: XOR<BookScalarRelationFilter, BookWhereInput>
  }, "id" | "orderId" | "bookId">

  export type PrintJobOrderByWithAggregationInput = {
    id?: SortOrder
    orderId?: SortOrder
    bookId?: SortOrder
    luluPrintJobId?: SortOrderInput | SortOrder
    paymentId?: SortOrderInput | SortOrder
    podPackageId?: SortOrder
    interiorPdfUrl?: SortOrderInput | SortOrder
    coverPdfUrl?: SortOrderInput | SortOrder
    interiorS3Key?: SortOrderInput | SortOrder
    coverS3Key?: SortOrderInput | SortOrder
    pageCount?: SortOrder
    interiorValidationId?: SortOrderInput | SortOrder
    coverValidationId?: SortOrderInput | SortOrder
    interiorValidationStatus?: SortOrder
    coverValidationStatus?: SortOrder
    validationErrors?: SortOrder
    status?: SortOrder
    statusMessage?: SortOrderInput | SortOrder
    currency?: SortOrder
    printingCostExclTax?: SortOrderInput | SortOrder
    printingCostInclTax?: SortOrderInput | SortOrder
    shippingCostExclTax?: SortOrderInput | SortOrder
    shippingCostInclTax?: SortOrderInput | SortOrder
    totalCostExclTax?: SortOrderInput | SortOrder
    totalCostInclTax?: SortOrderInput | SortOrder
    totalTax?: SortOrderInput | SortOrder
    trackingNumber?: SortOrderInput | SortOrder
    trackingUrls?: SortOrder
    shippingCarrier?: SortOrderInput | SortOrder
    estimatedShipDate?: SortOrderInput | SortOrder
    estimatedDeliveryDate?: SortOrderInput | SortOrder
    attempts?: SortOrder
    errorMessage?: SortOrderInput | SortOrder
    sentByAdminId?: SortOrderInput | SortOrder
    adminNotes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sentToPrinterAt?: SortOrderInput | SortOrder
    paidAt?: SortOrderInput | SortOrder
    inProductionAt?: SortOrderInput | SortOrder
    shippedAt?: SortOrderInput | SortOrder
    _count?: PrintJobCountOrderByAggregateInput
    _avg?: PrintJobAvgOrderByAggregateInput
    _max?: PrintJobMaxOrderByAggregateInput
    _min?: PrintJobMinOrderByAggregateInput
    _sum?: PrintJobSumOrderByAggregateInput
  }

  export type PrintJobScalarWhereWithAggregatesInput = {
    AND?: PrintJobScalarWhereWithAggregatesInput | PrintJobScalarWhereWithAggregatesInput[]
    OR?: PrintJobScalarWhereWithAggregatesInput[]
    NOT?: PrintJobScalarWhereWithAggregatesInput | PrintJobScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PrintJob"> | string
    orderId?: StringWithAggregatesFilter<"PrintJob"> | string
    bookId?: StringWithAggregatesFilter<"PrintJob"> | string
    luluPrintJobId?: IntNullableWithAggregatesFilter<"PrintJob"> | number | null
    paymentId?: IntNullableWithAggregatesFilter<"PrintJob"> | number | null
    podPackageId?: StringWithAggregatesFilter<"PrintJob"> | string
    interiorPdfUrl?: StringNullableWithAggregatesFilter<"PrintJob"> | string | null
    coverPdfUrl?: StringNullableWithAggregatesFilter<"PrintJob"> | string | null
    interiorS3Key?: StringNullableWithAggregatesFilter<"PrintJob"> | string | null
    coverS3Key?: StringNullableWithAggregatesFilter<"PrintJob"> | string | null
    pageCount?: IntWithAggregatesFilter<"PrintJob"> | number
    interiorValidationId?: IntNullableWithAggregatesFilter<"PrintJob"> | number | null
    coverValidationId?: IntNullableWithAggregatesFilter<"PrintJob"> | number | null
    interiorValidationStatus?: EnumFileValidationStatusWithAggregatesFilter<"PrintJob"> | $Enums.FileValidationStatus
    coverValidationStatus?: EnumFileValidationStatusWithAggregatesFilter<"PrintJob"> | $Enums.FileValidationStatus
    validationErrors?: StringNullableListFilter<"PrintJob">
    status?: EnumPrintJobStatusWithAggregatesFilter<"PrintJob"> | $Enums.PrintJobStatus
    statusMessage?: StringNullableWithAggregatesFilter<"PrintJob"> | string | null
    currency?: StringWithAggregatesFilter<"PrintJob"> | string
    printingCostExclTax?: DecimalNullableWithAggregatesFilter<"PrintJob"> | Decimal | DecimalJsLike | number | string | null
    printingCostInclTax?: DecimalNullableWithAggregatesFilter<"PrintJob"> | Decimal | DecimalJsLike | number | string | null
    shippingCostExclTax?: DecimalNullableWithAggregatesFilter<"PrintJob"> | Decimal | DecimalJsLike | number | string | null
    shippingCostInclTax?: DecimalNullableWithAggregatesFilter<"PrintJob"> | Decimal | DecimalJsLike | number | string | null
    totalCostExclTax?: DecimalNullableWithAggregatesFilter<"PrintJob"> | Decimal | DecimalJsLike | number | string | null
    totalCostInclTax?: DecimalNullableWithAggregatesFilter<"PrintJob"> | Decimal | DecimalJsLike | number | string | null
    totalTax?: DecimalNullableWithAggregatesFilter<"PrintJob"> | Decimal | DecimalJsLike | number | string | null
    trackingNumber?: StringNullableWithAggregatesFilter<"PrintJob"> | string | null
    trackingUrls?: StringNullableListFilter<"PrintJob">
    shippingCarrier?: StringNullableWithAggregatesFilter<"PrintJob"> | string | null
    estimatedShipDate?: DateTimeNullableWithAggregatesFilter<"PrintJob"> | Date | string | null
    estimatedDeliveryDate?: DateTimeNullableWithAggregatesFilter<"PrintJob"> | Date | string | null
    attempts?: IntWithAggregatesFilter<"PrintJob"> | number
    errorMessage?: StringNullableWithAggregatesFilter<"PrintJob"> | string | null
    sentByAdminId?: StringNullableWithAggregatesFilter<"PrintJob"> | string | null
    adminNotes?: StringNullableWithAggregatesFilter<"PrintJob"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"PrintJob"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PrintJob"> | Date | string
    sentToPrinterAt?: DateTimeNullableWithAggregatesFilter<"PrintJob"> | Date | string | null
    paidAt?: DateTimeNullableWithAggregatesFilter<"PrintJob"> | Date | string | null
    inProductionAt?: DateTimeNullableWithAggregatesFilter<"PrintJob"> | Date | string | null
    shippedAt?: DateTimeNullableWithAggregatesFilter<"PrintJob"> | Date | string | null
  }

  export type ConfigurationWhereInput = {
    AND?: ConfigurationWhereInput | ConfigurationWhereInput[]
    OR?: ConfigurationWhereInput[]
    NOT?: ConfigurationWhereInput | ConfigurationWhereInput[]
    key?: StringFilter<"Configuration"> | string
    value?: StringFilter<"Configuration"> | string
    description?: StringNullableFilter<"Configuration"> | string | null
    createdAt?: DateTimeFilter<"Configuration"> | Date | string
    updatedAt?: DateTimeFilter<"Configuration"> | Date | string
  }

  export type ConfigurationOrderByWithRelationInput = {
    key?: SortOrder
    value?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ConfigurationWhereUniqueInput = Prisma.AtLeast<{
    key?: string
    AND?: ConfigurationWhereInput | ConfigurationWhereInput[]
    OR?: ConfigurationWhereInput[]
    NOT?: ConfigurationWhereInput | ConfigurationWhereInput[]
    value?: StringFilter<"Configuration"> | string
    description?: StringNullableFilter<"Configuration"> | string | null
    createdAt?: DateTimeFilter<"Configuration"> | Date | string
    updatedAt?: DateTimeFilter<"Configuration"> | Date | string
  }, "key">

  export type ConfigurationOrderByWithAggregationInput = {
    key?: SortOrder
    value?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ConfigurationCountOrderByAggregateInput
    _max?: ConfigurationMaxOrderByAggregateInput
    _min?: ConfigurationMinOrderByAggregateInput
  }

  export type ConfigurationScalarWhereWithAggregatesInput = {
    AND?: ConfigurationScalarWhereWithAggregatesInput | ConfigurationScalarWhereWithAggregatesInput[]
    OR?: ConfigurationScalarWhereWithAggregatesInput[]
    NOT?: ConfigurationScalarWhereWithAggregatesInput | ConfigurationScalarWhereWithAggregatesInput[]
    key?: StringWithAggregatesFilter<"Configuration"> | string
    value?: StringWithAggregatesFilter<"Configuration"> | string
    description?: StringNullableWithAggregatesFilter<"Configuration"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Configuration"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Configuration"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    clerkId: string
    email: string
    isAdmin?: boolean
    firstName?: string | null
    lastName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    books?: BookCreateNestedManyWithoutUserInput
    orders?: OrderCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    clerkId: string
    email: string
    isAdmin?: boolean
    firstName?: string | null
    lastName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    books?: BookUncheckedCreateNestedManyWithoutUserInput
    orders?: OrderUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    books?: BookUpdateManyWithoutUserNestedInput
    orders?: OrderUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    books?: BookUncheckedUpdateManyWithoutUserNestedInput
    orders?: OrderUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    clerkId: string
    email: string
    isAdmin?: boolean
    firstName?: string | null
    lastName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GuestSessionCreateInput = {
    id?: string
    sessionId: string
    lastActive?: Date | string
    createdAt?: Date | string
    expiresAt: Date | string
    books?: BookCreateNestedManyWithoutGuestSessionInput
  }

  export type GuestSessionUncheckedCreateInput = {
    id?: string
    sessionId: string
    lastActive?: Date | string
    createdAt?: Date | string
    expiresAt: Date | string
    books?: BookUncheckedCreateNestedManyWithoutGuestSessionInput
  }

  export type GuestSessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    lastActive?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    books?: BookUpdateManyWithoutGuestSessionNestedInput
  }

  export type GuestSessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    lastActive?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    books?: BookUncheckedUpdateManyWithoutGuestSessionNestedInput
  }

  export type GuestSessionCreateManyInput = {
    id?: string
    sessionId: string
    lastActive?: Date | string
    createdAt?: Date | string
    expiresAt: Date | string
  }

  export type GuestSessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    lastActive?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GuestSessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    lastActive?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GenreCreateInput = {
    id?: string
    name: string
    templates?: BookTemplateCreateNestedManyWithoutGenresInput
  }

  export type GenreUncheckedCreateInput = {
    id?: string
    name: string
    templates?: BookTemplateUncheckedCreateNestedManyWithoutGenresInput
  }

  export type GenreUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    templates?: BookTemplateUpdateManyWithoutGenresNestedInput
  }

  export type GenreUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    templates?: BookTemplateUncheckedUpdateManyWithoutGenresNestedInput
  }

  export type GenreCreateManyInput = {
    id?: string
    name: string
  }

  export type GenreUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type GenreUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type BookCreateInput = {
    id?: string
    title: string
    status?: $Enums.BookStatus
    characterImageReference?: string | null
    coverImage?: string | null
    coverImageOptions?: BookCreatecoverImageOptionsInput | string[]
    coverPrompt: string
    pageCount: number
    coverDedication?: string | null
    pageDedication?: string | null
    orderId?: string | null
    printJobId?: string | null
    printingDeadline?: Date | string | null
    ebookS3Key?: string | null
    ebookFileName?: string | null
    ebookFileType?: string | null
    ebookExpiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    pages?: PageCreateNestedManyWithoutBookInput
    character?: CharacterCreateNestedOneWithoutBookInput
    template: BookTemplateCreateNestedOneWithoutBooksInput
    user?: UserCreateNestedOneWithoutBooksInput
    guestSession?: GuestSessionCreateNestedOneWithoutBooksInput
    imageGenerations?: ImageGenerationCreateNestedManyWithoutBookInput
    order?: OrderCreateNestedOneWithoutBookInput
    printJob?: PrintJobCreateNestedOneWithoutBookInput
  }

  export type BookUncheckedCreateInput = {
    id?: string
    title: string
    status?: $Enums.BookStatus
    characterImageReference?: string | null
    coverImage?: string | null
    coverImageOptions?: BookCreatecoverImageOptionsInput | string[]
    coverPrompt: string
    pageCount: number
    coverDedication?: string | null
    pageDedication?: string | null
    templateId: string
    userId?: string | null
    guestSessionId?: string | null
    orderId?: string | null
    printJobId?: string | null
    printingDeadline?: Date | string | null
    ebookS3Key?: string | null
    ebookFileName?: string | null
    ebookFileType?: string | null
    ebookExpiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    pages?: PageUncheckedCreateNestedManyWithoutBookInput
    character?: CharacterUncheckedCreateNestedOneWithoutBookInput
    imageGenerations?: ImageGenerationUncheckedCreateNestedManyWithoutBookInput
    order?: OrderUncheckedCreateNestedOneWithoutBookInput
    printJob?: PrintJobUncheckedCreateNestedOneWithoutBookInput
  }

  export type BookUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumBookStatusFieldUpdateOperationsInput | $Enums.BookStatus
    characterImageReference?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageOptions?: BookUpdatecoverImageOptionsInput | string[]
    coverPrompt?: StringFieldUpdateOperationsInput | string
    pageCount?: IntFieldUpdateOperationsInput | number
    coverDedication?: NullableStringFieldUpdateOperationsInput | string | null
    pageDedication?: NullableStringFieldUpdateOperationsInput | string | null
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    printJobId?: NullableStringFieldUpdateOperationsInput | string | null
    printingDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ebookS3Key?: NullableStringFieldUpdateOperationsInput | string | null
    ebookFileName?: NullableStringFieldUpdateOperationsInput | string | null
    ebookFileType?: NullableStringFieldUpdateOperationsInput | string | null
    ebookExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pages?: PageUpdateManyWithoutBookNestedInput
    character?: CharacterUpdateOneWithoutBookNestedInput
    template?: BookTemplateUpdateOneRequiredWithoutBooksNestedInput
    user?: UserUpdateOneWithoutBooksNestedInput
    guestSession?: GuestSessionUpdateOneWithoutBooksNestedInput
    imageGenerations?: ImageGenerationUpdateManyWithoutBookNestedInput
    order?: OrderUpdateOneWithoutBookNestedInput
    printJob?: PrintJobUpdateOneWithoutBookNestedInput
  }

  export type BookUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumBookStatusFieldUpdateOperationsInput | $Enums.BookStatus
    characterImageReference?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageOptions?: BookUpdatecoverImageOptionsInput | string[]
    coverPrompt?: StringFieldUpdateOperationsInput | string
    pageCount?: IntFieldUpdateOperationsInput | number
    coverDedication?: NullableStringFieldUpdateOperationsInput | string | null
    pageDedication?: NullableStringFieldUpdateOperationsInput | string | null
    templateId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    guestSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    printJobId?: NullableStringFieldUpdateOperationsInput | string | null
    printingDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ebookS3Key?: NullableStringFieldUpdateOperationsInput | string | null
    ebookFileName?: NullableStringFieldUpdateOperationsInput | string | null
    ebookFileType?: NullableStringFieldUpdateOperationsInput | string | null
    ebookExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pages?: PageUncheckedUpdateManyWithoutBookNestedInput
    character?: CharacterUncheckedUpdateOneWithoutBookNestedInput
    imageGenerations?: ImageGenerationUncheckedUpdateManyWithoutBookNestedInput
    order?: OrderUncheckedUpdateOneWithoutBookNestedInput
    printJob?: PrintJobUncheckedUpdateOneWithoutBookNestedInput
  }

  export type BookCreateManyInput = {
    id?: string
    title: string
    status?: $Enums.BookStatus
    characterImageReference?: string | null
    coverImage?: string | null
    coverImageOptions?: BookCreatecoverImageOptionsInput | string[]
    coverPrompt: string
    pageCount: number
    coverDedication?: string | null
    pageDedication?: string | null
    templateId: string
    userId?: string | null
    guestSessionId?: string | null
    orderId?: string | null
    printJobId?: string | null
    printingDeadline?: Date | string | null
    ebookS3Key?: string | null
    ebookFileName?: string | null
    ebookFileType?: string | null
    ebookExpiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumBookStatusFieldUpdateOperationsInput | $Enums.BookStatus
    characterImageReference?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageOptions?: BookUpdatecoverImageOptionsInput | string[]
    coverPrompt?: StringFieldUpdateOperationsInput | string
    pageCount?: IntFieldUpdateOperationsInput | number
    coverDedication?: NullableStringFieldUpdateOperationsInput | string | null
    pageDedication?: NullableStringFieldUpdateOperationsInput | string | null
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    printJobId?: NullableStringFieldUpdateOperationsInput | string | null
    printingDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ebookS3Key?: NullableStringFieldUpdateOperationsInput | string | null
    ebookFileName?: NullableStringFieldUpdateOperationsInput | string | null
    ebookFileType?: NullableStringFieldUpdateOperationsInput | string | null
    ebookExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumBookStatusFieldUpdateOperationsInput | $Enums.BookStatus
    characterImageReference?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageOptions?: BookUpdatecoverImageOptionsInput | string[]
    coverPrompt?: StringFieldUpdateOperationsInput | string
    pageCount?: IntFieldUpdateOperationsInput | number
    coverDedication?: NullableStringFieldUpdateOperationsInput | string | null
    pageDedication?: NullableStringFieldUpdateOperationsInput | string | null
    templateId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    guestSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    printJobId?: NullableStringFieldUpdateOperationsInput | string | null
    printingDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ebookS3Key?: NullableStringFieldUpdateOperationsInput | string | null
    ebookFileName?: NullableStringFieldUpdateOperationsInput | string | null
    ebookFileType?: NullableStringFieldUpdateOperationsInput | string | null
    ebookExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CharacterCreateInput = {
    id?: string
    name: string
    age: number
    gender: string
    eyeColor?: string | null
    hairColor?: string | null
    hairStyle?: string | null
    skinTone?: string | null
    wearingGlasses?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
    book: BookCreateNestedOneWithoutCharacterInput
  }

  export type CharacterUncheckedCreateInput = {
    id?: string
    name: string
    age: number
    gender: string
    eyeColor?: string | null
    hairColor?: string | null
    hairStyle?: string | null
    skinTone?: string | null
    wearingGlasses?: boolean | null
    bookId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CharacterUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    gender?: StringFieldUpdateOperationsInput | string
    eyeColor?: NullableStringFieldUpdateOperationsInput | string | null
    hairColor?: NullableStringFieldUpdateOperationsInput | string | null
    hairStyle?: NullableStringFieldUpdateOperationsInput | string | null
    skinTone?: NullableStringFieldUpdateOperationsInput | string | null
    wearingGlasses?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    book?: BookUpdateOneRequiredWithoutCharacterNestedInput
  }

  export type CharacterUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    gender?: StringFieldUpdateOperationsInput | string
    eyeColor?: NullableStringFieldUpdateOperationsInput | string | null
    hairColor?: NullableStringFieldUpdateOperationsInput | string | null
    hairStyle?: NullableStringFieldUpdateOperationsInput | string | null
    skinTone?: NullableStringFieldUpdateOperationsInput | string | null
    wearingGlasses?: NullableBoolFieldUpdateOperationsInput | boolean | null
    bookId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CharacterCreateManyInput = {
    id?: string
    name: string
    age: number
    gender: string
    eyeColor?: string | null
    hairColor?: string | null
    hairStyle?: string | null
    skinTone?: string | null
    wearingGlasses?: boolean | null
    bookId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CharacterUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    gender?: StringFieldUpdateOperationsInput | string
    eyeColor?: NullableStringFieldUpdateOperationsInput | string | null
    hairColor?: NullableStringFieldUpdateOperationsInput | string | null
    hairStyle?: NullableStringFieldUpdateOperationsInput | string | null
    skinTone?: NullableStringFieldUpdateOperationsInput | string | null
    wearingGlasses?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CharacterUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    gender?: StringFieldUpdateOperationsInput | string
    eyeColor?: NullableStringFieldUpdateOperationsInput | string | null
    hairColor?: NullableStringFieldUpdateOperationsInput | string | null
    hairStyle?: NullableStringFieldUpdateOperationsInput | string | null
    skinTone?: NullableStringFieldUpdateOperationsInput | string | null
    wearingGlasses?: NullableBoolFieldUpdateOperationsInput | boolean | null
    bookId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookTemplateCreateInput = {
    id?: string
    title: string
    slug: string
    description: string
    pageCount: number
    published: boolean
    coverImage: string
    coverPrompt: string
    characterGender?: string
    minAge?: number
    maxAge?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    pages?: TemplatePageContentCreateNestedManyWithoutTemplateInput
    books?: BookCreateNestedManyWithoutTemplateInput
    genres?: GenreCreateNestedManyWithoutTemplatesInput
  }

  export type BookTemplateUncheckedCreateInput = {
    id?: string
    title: string
    slug: string
    description: string
    pageCount: number
    published: boolean
    coverImage: string
    coverPrompt: string
    characterGender?: string
    minAge?: number
    maxAge?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    pages?: TemplatePageContentUncheckedCreateNestedManyWithoutTemplateInput
    books?: BookUncheckedCreateNestedManyWithoutTemplateInput
    genres?: GenreUncheckedCreateNestedManyWithoutTemplatesInput
  }

  export type BookTemplateUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    pageCount?: IntFieldUpdateOperationsInput | number
    published?: BoolFieldUpdateOperationsInput | boolean
    coverImage?: StringFieldUpdateOperationsInput | string
    coverPrompt?: StringFieldUpdateOperationsInput | string
    characterGender?: StringFieldUpdateOperationsInput | string
    minAge?: IntFieldUpdateOperationsInput | number
    maxAge?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pages?: TemplatePageContentUpdateManyWithoutTemplateNestedInput
    books?: BookUpdateManyWithoutTemplateNestedInput
    genres?: GenreUpdateManyWithoutTemplatesNestedInput
  }

  export type BookTemplateUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    pageCount?: IntFieldUpdateOperationsInput | number
    published?: BoolFieldUpdateOperationsInput | boolean
    coverImage?: StringFieldUpdateOperationsInput | string
    coverPrompt?: StringFieldUpdateOperationsInput | string
    characterGender?: StringFieldUpdateOperationsInput | string
    minAge?: IntFieldUpdateOperationsInput | number
    maxAge?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pages?: TemplatePageContentUncheckedUpdateManyWithoutTemplateNestedInput
    books?: BookUncheckedUpdateManyWithoutTemplateNestedInput
    genres?: GenreUncheckedUpdateManyWithoutTemplatesNestedInput
  }

  export type BookTemplateCreateManyInput = {
    id?: string
    title: string
    slug: string
    description: string
    pageCount: number
    published: boolean
    coverImage: string
    coverPrompt: string
    characterGender?: string
    minAge?: number
    maxAge?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookTemplateUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    pageCount?: IntFieldUpdateOperationsInput | number
    published?: BoolFieldUpdateOperationsInput | boolean
    coverImage?: StringFieldUpdateOperationsInput | string
    coverPrompt?: StringFieldUpdateOperationsInput | string
    characterGender?: StringFieldUpdateOperationsInput | string
    minAge?: IntFieldUpdateOperationsInput | number
    maxAge?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookTemplateUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    pageCount?: IntFieldUpdateOperationsInput | number
    published?: BoolFieldUpdateOperationsInput | boolean
    coverImage?: StringFieldUpdateOperationsInput | string
    coverPrompt?: StringFieldUpdateOperationsInput | string
    characterGender?: StringFieldUpdateOperationsInput | string
    minAge?: IntFieldUpdateOperationsInput | number
    maxAge?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TemplatePageContentCreateInput = {
    id?: string
    pageNumber: number
    content: string
    imagePrompt: string
    imageUrl: string
    createdAt?: Date | string
    updatedAt?: Date | string
    template: BookTemplateCreateNestedOneWithoutPagesInput
  }

  export type TemplatePageContentUncheckedCreateInput = {
    id?: string
    pageNumber: number
    content: string
    imagePrompt: string
    imageUrl: string
    templateId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TemplatePageContentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    pageNumber?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    imagePrompt?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    template?: BookTemplateUpdateOneRequiredWithoutPagesNestedInput
  }

  export type TemplatePageContentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    pageNumber?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    imagePrompt?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    templateId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TemplatePageContentCreateManyInput = {
    id?: string
    pageNumber: number
    content: string
    imagePrompt: string
    imageUrl: string
    templateId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TemplatePageContentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    pageNumber?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    imagePrompt?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TemplatePageContentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    pageNumber?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    imagePrompt?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    templateId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PageCreateInput = {
    id?: string
    type?: $Enums.PageType
    pageNumber: number
    textContent?: string | null
    imagePrompt?: string | null
    imageUrl?: string | null
    imageOptions?: PageCreateimageOptionsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    book: BookCreateNestedOneWithoutPagesInput
  }

  export type PageUncheckedCreateInput = {
    id?: string
    type?: $Enums.PageType
    pageNumber: number
    textContent?: string | null
    imagePrompt?: string | null
    imageUrl?: string | null
    imageOptions?: PageCreateimageOptionsInput | string[]
    bookId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumPageTypeFieldUpdateOperationsInput | $Enums.PageType
    pageNumber?: IntFieldUpdateOperationsInput | number
    textContent?: NullableStringFieldUpdateOperationsInput | string | null
    imagePrompt?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageOptions?: PageUpdateimageOptionsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    book?: BookUpdateOneRequiredWithoutPagesNestedInput
  }

  export type PageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumPageTypeFieldUpdateOperationsInput | $Enums.PageType
    pageNumber?: IntFieldUpdateOperationsInput | number
    textContent?: NullableStringFieldUpdateOperationsInput | string | null
    imagePrompt?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageOptions?: PageUpdateimageOptionsInput | string[]
    bookId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PageCreateManyInput = {
    id?: string
    type?: $Enums.PageType
    pageNumber: number
    textContent?: string | null
    imagePrompt?: string | null
    imageUrl?: string | null
    imageOptions?: PageCreateimageOptionsInput | string[]
    bookId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumPageTypeFieldUpdateOperationsInput | $Enums.PageType
    pageNumber?: IntFieldUpdateOperationsInput | number
    textContent?: NullableStringFieldUpdateOperationsInput | string | null
    imagePrompt?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageOptions?: PageUpdateimageOptionsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumPageTypeFieldUpdateOperationsInput | $Enums.PageType
    pageNumber?: IntFieldUpdateOperationsInput | number
    textContent?: NullableStringFieldUpdateOperationsInput | string | null
    imagePrompt?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageOptions?: PageUpdateimageOptionsInput | string[]
    bookId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ImageGenerationCreateInput = {
    id?: string
    generationId: string
    pageId?: string | null
    type: $Enums.ImageType
    prompt: string
    status?: $Enums.GenerationStatus
    errorMessage?: string | null
    apiCreditCost?: number | null
    createdAt?: Date | string
    completedAt?: Date | string | null
    book: BookCreateNestedOneWithoutImageGenerationsInput
  }

  export type ImageGenerationUncheckedCreateInput = {
    id?: string
    generationId: string
    bookId: string
    pageId?: string | null
    type: $Enums.ImageType
    prompt: string
    status?: $Enums.GenerationStatus
    errorMessage?: string | null
    apiCreditCost?: number | null
    createdAt?: Date | string
    completedAt?: Date | string | null
  }

  export type ImageGenerationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    generationId?: StringFieldUpdateOperationsInput | string
    pageId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumImageTypeFieldUpdateOperationsInput | $Enums.ImageType
    prompt?: StringFieldUpdateOperationsInput | string
    status?: EnumGenerationStatusFieldUpdateOperationsInput | $Enums.GenerationStatus
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    apiCreditCost?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    book?: BookUpdateOneRequiredWithoutImageGenerationsNestedInput
  }

  export type ImageGenerationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    generationId?: StringFieldUpdateOperationsInput | string
    bookId?: StringFieldUpdateOperationsInput | string
    pageId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumImageTypeFieldUpdateOperationsInput | $Enums.ImageType
    prompt?: StringFieldUpdateOperationsInput | string
    status?: EnumGenerationStatusFieldUpdateOperationsInput | $Enums.GenerationStatus
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    apiCreditCost?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ImageGenerationCreateManyInput = {
    id?: string
    generationId: string
    bookId: string
    pageId?: string | null
    type: $Enums.ImageType
    prompt: string
    status?: $Enums.GenerationStatus
    errorMessage?: string | null
    apiCreditCost?: number | null
    createdAt?: Date | string
    completedAt?: Date | string | null
  }

  export type ImageGenerationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    generationId?: StringFieldUpdateOperationsInput | string
    pageId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumImageTypeFieldUpdateOperationsInput | $Enums.ImageType
    prompt?: StringFieldUpdateOperationsInput | string
    status?: EnumGenerationStatusFieldUpdateOperationsInput | $Enums.GenerationStatus
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    apiCreditCost?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ImageGenerationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    generationId?: StringFieldUpdateOperationsInput | string
    bookId?: StringFieldUpdateOperationsInput | string
    pageId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumImageTypeFieldUpdateOperationsInput | $Enums.ImageType
    prompt?: StringFieldUpdateOperationsInput | string
    status?: EnumGenerationStatusFieldUpdateOperationsInput | $Enums.GenerationStatus
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    apiCreditCost?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type OrderCreateInput = {
    id?: string
    orderNumber: string
    productType: $Enums.ProductType
    totalPrice: Decimal | DecimalJsLike | number | string
    currency?: string
    status?: $Enums.OrderStatus
    paymentProvider?: string
    quantity?: number
    paymentId?: string | null
    transactionId?: string | null
    pricePaid?: number | null
    payerEmail?: string | null
    shippingCost?: Decimal | DecimalJsLike | number | string | null
    printingCost?: Decimal | DecimalJsLike | number | string | null
    imagesCost?: Decimal | DecimalJsLike | number | string | null
    shippingLevel?: $Enums.ShippingLevel | null
    phoneNumber?: string | null
    name?: string | null
    street1?: string | null
    street2?: string | null
    city?: string | null
    state_code?: string | null
    postcode?: string | null
    country?: string | null
    poProviderOrderId?: string | null
    trackingNumber?: string | null
    customerEmail: string
    printJobId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    paidAt?: Date | string | null
    fulfilledAt?: Date | string | null
    book: BookCreateNestedOneWithoutOrderInput
    user?: UserCreateNestedOneWithoutOrdersInput
    printJob?: PrintJobCreateNestedOneWithoutOrderInput
  }

  export type OrderUncheckedCreateInput = {
    id?: string
    orderNumber: string
    productType: $Enums.ProductType
    totalPrice: Decimal | DecimalJsLike | number | string
    currency?: string
    status?: $Enums.OrderStatus
    paymentProvider?: string
    quantity?: number
    paymentId?: string | null
    transactionId?: string | null
    pricePaid?: number | null
    payerEmail?: string | null
    shippingCost?: Decimal | DecimalJsLike | number | string | null
    printingCost?: Decimal | DecimalJsLike | number | string | null
    imagesCost?: Decimal | DecimalJsLike | number | string | null
    shippingLevel?: $Enums.ShippingLevel | null
    phoneNumber?: string | null
    name?: string | null
    street1?: string | null
    street2?: string | null
    city?: string | null
    state_code?: string | null
    postcode?: string | null
    country?: string | null
    poProviderOrderId?: string | null
    trackingNumber?: string | null
    customerEmail: string
    bookId: string
    userId?: string | null
    printJobId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    paidAt?: Date | string | null
    fulfilledAt?: Date | string | null
    printJob?: PrintJobUncheckedCreateNestedOneWithoutOrderInput
  }

  export type OrderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: StringFieldUpdateOperationsInput | string
    productType?: EnumProductTypeFieldUpdateOperationsInput | $Enums.ProductType
    totalPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    paymentProvider?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    pricePaid?: NullableFloatFieldUpdateOperationsInput | number | null
    payerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    shippingCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    printingCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    imagesCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    shippingLevel?: NullableEnumShippingLevelFieldUpdateOperationsInput | $Enums.ShippingLevel | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    street1?: NullableStringFieldUpdateOperationsInput | string | null
    street2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state_code?: NullableStringFieldUpdateOperationsInput | string | null
    postcode?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    poProviderOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    trackingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    customerEmail?: StringFieldUpdateOperationsInput | string
    printJobId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fulfilledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    book?: BookUpdateOneRequiredWithoutOrderNestedInput
    user?: UserUpdateOneWithoutOrdersNestedInput
    printJob?: PrintJobUpdateOneWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: StringFieldUpdateOperationsInput | string
    productType?: EnumProductTypeFieldUpdateOperationsInput | $Enums.ProductType
    totalPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    paymentProvider?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    pricePaid?: NullableFloatFieldUpdateOperationsInput | number | null
    payerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    shippingCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    printingCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    imagesCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    shippingLevel?: NullableEnumShippingLevelFieldUpdateOperationsInput | $Enums.ShippingLevel | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    street1?: NullableStringFieldUpdateOperationsInput | string | null
    street2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state_code?: NullableStringFieldUpdateOperationsInput | string | null
    postcode?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    poProviderOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    trackingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    customerEmail?: StringFieldUpdateOperationsInput | string
    bookId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    printJobId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fulfilledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    printJob?: PrintJobUncheckedUpdateOneWithoutOrderNestedInput
  }

  export type OrderCreateManyInput = {
    id?: string
    orderNumber: string
    productType: $Enums.ProductType
    totalPrice: Decimal | DecimalJsLike | number | string
    currency?: string
    status?: $Enums.OrderStatus
    paymentProvider?: string
    quantity?: number
    paymentId?: string | null
    transactionId?: string | null
    pricePaid?: number | null
    payerEmail?: string | null
    shippingCost?: Decimal | DecimalJsLike | number | string | null
    printingCost?: Decimal | DecimalJsLike | number | string | null
    imagesCost?: Decimal | DecimalJsLike | number | string | null
    shippingLevel?: $Enums.ShippingLevel | null
    phoneNumber?: string | null
    name?: string | null
    street1?: string | null
    street2?: string | null
    city?: string | null
    state_code?: string | null
    postcode?: string | null
    country?: string | null
    poProviderOrderId?: string | null
    trackingNumber?: string | null
    customerEmail: string
    bookId: string
    userId?: string | null
    printJobId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    paidAt?: Date | string | null
    fulfilledAt?: Date | string | null
  }

  export type OrderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: StringFieldUpdateOperationsInput | string
    productType?: EnumProductTypeFieldUpdateOperationsInput | $Enums.ProductType
    totalPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    paymentProvider?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    pricePaid?: NullableFloatFieldUpdateOperationsInput | number | null
    payerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    shippingCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    printingCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    imagesCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    shippingLevel?: NullableEnumShippingLevelFieldUpdateOperationsInput | $Enums.ShippingLevel | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    street1?: NullableStringFieldUpdateOperationsInput | string | null
    street2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state_code?: NullableStringFieldUpdateOperationsInput | string | null
    postcode?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    poProviderOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    trackingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    customerEmail?: StringFieldUpdateOperationsInput | string
    printJobId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fulfilledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type OrderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: StringFieldUpdateOperationsInput | string
    productType?: EnumProductTypeFieldUpdateOperationsInput | $Enums.ProductType
    totalPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    paymentProvider?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    pricePaid?: NullableFloatFieldUpdateOperationsInput | number | null
    payerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    shippingCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    printingCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    imagesCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    shippingLevel?: NullableEnumShippingLevelFieldUpdateOperationsInput | $Enums.ShippingLevel | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    street1?: NullableStringFieldUpdateOperationsInput | string | null
    street2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state_code?: NullableStringFieldUpdateOperationsInput | string | null
    postcode?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    poProviderOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    trackingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    customerEmail?: StringFieldUpdateOperationsInput | string
    bookId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    printJobId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fulfilledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PrintJobCreateInput = {
    id?: string
    luluPrintJobId?: number | null
    paymentId?: number | null
    podPackageId: string
    interiorPdfUrl?: string | null
    coverPdfUrl?: string | null
    interiorS3Key?: string | null
    coverS3Key?: string | null
    pageCount: number
    interiorValidationId?: number | null
    coverValidationId?: number | null
    interiorValidationStatus?: $Enums.FileValidationStatus
    coverValidationStatus?: $Enums.FileValidationStatus
    validationErrors?: PrintJobCreatevalidationErrorsInput | string[]
    status?: $Enums.PrintJobStatus
    statusMessage?: string | null
    currency?: string
    printingCostExclTax?: Decimal | DecimalJsLike | number | string | null
    printingCostInclTax?: Decimal | DecimalJsLike | number | string | null
    shippingCostExclTax?: Decimal | DecimalJsLike | number | string | null
    shippingCostInclTax?: Decimal | DecimalJsLike | number | string | null
    totalCostExclTax?: Decimal | DecimalJsLike | number | string | null
    totalCostInclTax?: Decimal | DecimalJsLike | number | string | null
    totalTax?: Decimal | DecimalJsLike | number | string | null
    trackingNumber?: string | null
    trackingUrls?: PrintJobCreatetrackingUrlsInput | string[]
    shippingCarrier?: string | null
    estimatedShipDate?: Date | string | null
    estimatedDeliveryDate?: Date | string | null
    attempts?: number
    errorMessage?: string | null
    sentByAdminId?: string | null
    adminNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sentToPrinterAt?: Date | string | null
    paidAt?: Date | string | null
    inProductionAt?: Date | string | null
    shippedAt?: Date | string | null
    order: OrderCreateNestedOneWithoutPrintJobInput
    book: BookCreateNestedOneWithoutPrintJobInput
  }

  export type PrintJobUncheckedCreateInput = {
    id?: string
    orderId: string
    bookId: string
    luluPrintJobId?: number | null
    paymentId?: number | null
    podPackageId: string
    interiorPdfUrl?: string | null
    coverPdfUrl?: string | null
    interiorS3Key?: string | null
    coverS3Key?: string | null
    pageCount: number
    interiorValidationId?: number | null
    coverValidationId?: number | null
    interiorValidationStatus?: $Enums.FileValidationStatus
    coverValidationStatus?: $Enums.FileValidationStatus
    validationErrors?: PrintJobCreatevalidationErrorsInput | string[]
    status?: $Enums.PrintJobStatus
    statusMessage?: string | null
    currency?: string
    printingCostExclTax?: Decimal | DecimalJsLike | number | string | null
    printingCostInclTax?: Decimal | DecimalJsLike | number | string | null
    shippingCostExclTax?: Decimal | DecimalJsLike | number | string | null
    shippingCostInclTax?: Decimal | DecimalJsLike | number | string | null
    totalCostExclTax?: Decimal | DecimalJsLike | number | string | null
    totalCostInclTax?: Decimal | DecimalJsLike | number | string | null
    totalTax?: Decimal | DecimalJsLike | number | string | null
    trackingNumber?: string | null
    trackingUrls?: PrintJobCreatetrackingUrlsInput | string[]
    shippingCarrier?: string | null
    estimatedShipDate?: Date | string | null
    estimatedDeliveryDate?: Date | string | null
    attempts?: number
    errorMessage?: string | null
    sentByAdminId?: string | null
    adminNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sentToPrinterAt?: Date | string | null
    paidAt?: Date | string | null
    inProductionAt?: Date | string | null
    shippedAt?: Date | string | null
  }

  export type PrintJobUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    luluPrintJobId?: NullableIntFieldUpdateOperationsInput | number | null
    paymentId?: NullableIntFieldUpdateOperationsInput | number | null
    podPackageId?: StringFieldUpdateOperationsInput | string
    interiorPdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverPdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    interiorS3Key?: NullableStringFieldUpdateOperationsInput | string | null
    coverS3Key?: NullableStringFieldUpdateOperationsInput | string | null
    pageCount?: IntFieldUpdateOperationsInput | number
    interiorValidationId?: NullableIntFieldUpdateOperationsInput | number | null
    coverValidationId?: NullableIntFieldUpdateOperationsInput | number | null
    interiorValidationStatus?: EnumFileValidationStatusFieldUpdateOperationsInput | $Enums.FileValidationStatus
    coverValidationStatus?: EnumFileValidationStatusFieldUpdateOperationsInput | $Enums.FileValidationStatus
    validationErrors?: PrintJobUpdatevalidationErrorsInput | string[]
    status?: EnumPrintJobStatusFieldUpdateOperationsInput | $Enums.PrintJobStatus
    statusMessage?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    printingCostExclTax?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    printingCostInclTax?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    shippingCostExclTax?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    shippingCostInclTax?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalCostExclTax?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalCostInclTax?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalTax?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    trackingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    trackingUrls?: PrintJobUpdatetrackingUrlsInput | string[]
    shippingCarrier?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedShipDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estimatedDeliveryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    attempts?: IntFieldUpdateOperationsInput | number
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    sentByAdminId?: NullableStringFieldUpdateOperationsInput | string | null
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentToPrinterAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    inProductionAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    shippedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    order?: OrderUpdateOneRequiredWithoutPrintJobNestedInput
    book?: BookUpdateOneRequiredWithoutPrintJobNestedInput
  }

  export type PrintJobUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    bookId?: StringFieldUpdateOperationsInput | string
    luluPrintJobId?: NullableIntFieldUpdateOperationsInput | number | null
    paymentId?: NullableIntFieldUpdateOperationsInput | number | null
    podPackageId?: StringFieldUpdateOperationsInput | string
    interiorPdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverPdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    interiorS3Key?: NullableStringFieldUpdateOperationsInput | string | null
    coverS3Key?: NullableStringFieldUpdateOperationsInput | string | null
    pageCount?: IntFieldUpdateOperationsInput | number
    interiorValidationId?: NullableIntFieldUpdateOperationsInput | number | null
    coverValidationId?: NullableIntFieldUpdateOperationsInput | number | null
    interiorValidationStatus?: EnumFileValidationStatusFieldUpdateOperationsInput | $Enums.FileValidationStatus
    coverValidationStatus?: EnumFileValidationStatusFieldUpdateOperationsInput | $Enums.FileValidationStatus
    validationErrors?: PrintJobUpdatevalidationErrorsInput | string[]
    status?: EnumPrintJobStatusFieldUpdateOperationsInput | $Enums.PrintJobStatus
    statusMessage?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    printingCostExclTax?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    printingCostInclTax?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    shippingCostExclTax?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    shippingCostInclTax?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalCostExclTax?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalCostInclTax?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalTax?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    trackingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    trackingUrls?: PrintJobUpdatetrackingUrlsInput | string[]
    shippingCarrier?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedShipDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estimatedDeliveryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    attempts?: IntFieldUpdateOperationsInput | number
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    sentByAdminId?: NullableStringFieldUpdateOperationsInput | string | null
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentToPrinterAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    inProductionAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    shippedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PrintJobCreateManyInput = {
    id?: string
    orderId: string
    bookId: string
    luluPrintJobId?: number | null
    paymentId?: number | null
    podPackageId: string
    interiorPdfUrl?: string | null
    coverPdfUrl?: string | null
    interiorS3Key?: string | null
    coverS3Key?: string | null
    pageCount: number
    interiorValidationId?: number | null
    coverValidationId?: number | null
    interiorValidationStatus?: $Enums.FileValidationStatus
    coverValidationStatus?: $Enums.FileValidationStatus
    validationErrors?: PrintJobCreatevalidationErrorsInput | string[]
    status?: $Enums.PrintJobStatus
    statusMessage?: string | null
    currency?: string
    printingCostExclTax?: Decimal | DecimalJsLike | number | string | null
    printingCostInclTax?: Decimal | DecimalJsLike | number | string | null
    shippingCostExclTax?: Decimal | DecimalJsLike | number | string | null
    shippingCostInclTax?: Decimal | DecimalJsLike | number | string | null
    totalCostExclTax?: Decimal | DecimalJsLike | number | string | null
    totalCostInclTax?: Decimal | DecimalJsLike | number | string | null
    totalTax?: Decimal | DecimalJsLike | number | string | null
    trackingNumber?: string | null
    trackingUrls?: PrintJobCreatetrackingUrlsInput | string[]
    shippingCarrier?: string | null
    estimatedShipDate?: Date | string | null
    estimatedDeliveryDate?: Date | string | null
    attempts?: number
    errorMessage?: string | null
    sentByAdminId?: string | null
    adminNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sentToPrinterAt?: Date | string | null
    paidAt?: Date | string | null
    inProductionAt?: Date | string | null
    shippedAt?: Date | string | null
  }

  export type PrintJobUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    luluPrintJobId?: NullableIntFieldUpdateOperationsInput | number | null
    paymentId?: NullableIntFieldUpdateOperationsInput | number | null
    podPackageId?: StringFieldUpdateOperationsInput | string
    interiorPdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverPdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    interiorS3Key?: NullableStringFieldUpdateOperationsInput | string | null
    coverS3Key?: NullableStringFieldUpdateOperationsInput | string | null
    pageCount?: IntFieldUpdateOperationsInput | number
    interiorValidationId?: NullableIntFieldUpdateOperationsInput | number | null
    coverValidationId?: NullableIntFieldUpdateOperationsInput | number | null
    interiorValidationStatus?: EnumFileValidationStatusFieldUpdateOperationsInput | $Enums.FileValidationStatus
    coverValidationStatus?: EnumFileValidationStatusFieldUpdateOperationsInput | $Enums.FileValidationStatus
    validationErrors?: PrintJobUpdatevalidationErrorsInput | string[]
    status?: EnumPrintJobStatusFieldUpdateOperationsInput | $Enums.PrintJobStatus
    statusMessage?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    printingCostExclTax?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    printingCostInclTax?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    shippingCostExclTax?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    shippingCostInclTax?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalCostExclTax?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalCostInclTax?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalTax?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    trackingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    trackingUrls?: PrintJobUpdatetrackingUrlsInput | string[]
    shippingCarrier?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedShipDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estimatedDeliveryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    attempts?: IntFieldUpdateOperationsInput | number
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    sentByAdminId?: NullableStringFieldUpdateOperationsInput | string | null
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentToPrinterAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    inProductionAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    shippedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PrintJobUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    bookId?: StringFieldUpdateOperationsInput | string
    luluPrintJobId?: NullableIntFieldUpdateOperationsInput | number | null
    paymentId?: NullableIntFieldUpdateOperationsInput | number | null
    podPackageId?: StringFieldUpdateOperationsInput | string
    interiorPdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverPdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    interiorS3Key?: NullableStringFieldUpdateOperationsInput | string | null
    coverS3Key?: NullableStringFieldUpdateOperationsInput | string | null
    pageCount?: IntFieldUpdateOperationsInput | number
    interiorValidationId?: NullableIntFieldUpdateOperationsInput | number | null
    coverValidationId?: NullableIntFieldUpdateOperationsInput | number | null
    interiorValidationStatus?: EnumFileValidationStatusFieldUpdateOperationsInput | $Enums.FileValidationStatus
    coverValidationStatus?: EnumFileValidationStatusFieldUpdateOperationsInput | $Enums.FileValidationStatus
    validationErrors?: PrintJobUpdatevalidationErrorsInput | string[]
    status?: EnumPrintJobStatusFieldUpdateOperationsInput | $Enums.PrintJobStatus
    statusMessage?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    printingCostExclTax?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    printingCostInclTax?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    shippingCostExclTax?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    shippingCostInclTax?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalCostExclTax?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalCostInclTax?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalTax?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    trackingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    trackingUrls?: PrintJobUpdatetrackingUrlsInput | string[]
    shippingCarrier?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedShipDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estimatedDeliveryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    attempts?: IntFieldUpdateOperationsInput | number
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    sentByAdminId?: NullableStringFieldUpdateOperationsInput | string | null
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentToPrinterAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    inProductionAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    shippedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ConfigurationCreateInput = {
    key: string
    value: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConfigurationUncheckedCreateInput = {
    key: string
    value: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConfigurationUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConfigurationUncheckedUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConfigurationCreateManyInput = {
    key: string
    value: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConfigurationUpdateManyMutationInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConfigurationUncheckedUpdateManyInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type BookListRelationFilter = {
    every?: BookWhereInput
    some?: BookWhereInput
    none?: BookWhereInput
  }

  export type OrderListRelationFilter = {
    every?: OrderWhereInput
    some?: OrderWhereInput
    none?: OrderWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type BookOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrderOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    clerkId?: SortOrder
    email?: SortOrder
    isAdmin?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    clerkId?: SortOrder
    email?: SortOrder
    isAdmin?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    clerkId?: SortOrder
    email?: SortOrder
    isAdmin?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type GuestSessionCountOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    lastActive?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type GuestSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    lastActive?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type GuestSessionMinOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    lastActive?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type BookTemplateListRelationFilter = {
    every?: BookTemplateWhereInput
    some?: BookTemplateWhereInput
    none?: BookTemplateWhereInput
  }

  export type BookTemplateOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GenreCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type GenreMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type GenreMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type EnumBookStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BookStatus | EnumBookStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookStatus[] | ListEnumBookStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookStatus[] | ListEnumBookStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookStatusFilter<$PrismaModel> | $Enums.BookStatus
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type PageListRelationFilter = {
    every?: PageWhereInput
    some?: PageWhereInput
    none?: PageWhereInput
  }

  export type CharacterNullableScalarRelationFilter = {
    is?: CharacterWhereInput | null
    isNot?: CharacterWhereInput | null
  }

  export type BookTemplateScalarRelationFilter = {
    is?: BookTemplateWhereInput
    isNot?: BookTemplateWhereInput
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type GuestSessionNullableScalarRelationFilter = {
    is?: GuestSessionWhereInput | null
    isNot?: GuestSessionWhereInput | null
  }

  export type ImageGenerationListRelationFilter = {
    every?: ImageGenerationWhereInput
    some?: ImageGenerationWhereInput
    none?: ImageGenerationWhereInput
  }

  export type OrderNullableScalarRelationFilter = {
    is?: OrderWhereInput | null
    isNot?: OrderWhereInput | null
  }

  export type PrintJobNullableScalarRelationFilter = {
    is?: PrintJobWhereInput | null
    isNot?: PrintJobWhereInput | null
  }

  export type PageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ImageGenerationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BookCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    status?: SortOrder
    characterImageReference?: SortOrder
    coverImage?: SortOrder
    coverImageOptions?: SortOrder
    coverPrompt?: SortOrder
    pageCount?: SortOrder
    coverDedication?: SortOrder
    pageDedication?: SortOrder
    templateId?: SortOrder
    userId?: SortOrder
    guestSessionId?: SortOrder
    orderId?: SortOrder
    printJobId?: SortOrder
    printingDeadline?: SortOrder
    ebookS3Key?: SortOrder
    ebookFileName?: SortOrder
    ebookFileType?: SortOrder
    ebookExpiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BookAvgOrderByAggregateInput = {
    pageCount?: SortOrder
  }

  export type BookMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    status?: SortOrder
    characterImageReference?: SortOrder
    coverImage?: SortOrder
    coverPrompt?: SortOrder
    pageCount?: SortOrder
    coverDedication?: SortOrder
    pageDedication?: SortOrder
    templateId?: SortOrder
    userId?: SortOrder
    guestSessionId?: SortOrder
    orderId?: SortOrder
    printJobId?: SortOrder
    printingDeadline?: SortOrder
    ebookS3Key?: SortOrder
    ebookFileName?: SortOrder
    ebookFileType?: SortOrder
    ebookExpiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BookMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    status?: SortOrder
    characterImageReference?: SortOrder
    coverImage?: SortOrder
    coverPrompt?: SortOrder
    pageCount?: SortOrder
    coverDedication?: SortOrder
    pageDedication?: SortOrder
    templateId?: SortOrder
    userId?: SortOrder
    guestSessionId?: SortOrder
    orderId?: SortOrder
    printJobId?: SortOrder
    printingDeadline?: SortOrder
    ebookS3Key?: SortOrder
    ebookFileName?: SortOrder
    ebookFileType?: SortOrder
    ebookExpiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BookSumOrderByAggregateInput = {
    pageCount?: SortOrder
  }

  export type EnumBookStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BookStatus | EnumBookStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookStatus[] | ListEnumBookStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookStatus[] | ListEnumBookStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookStatusWithAggregatesFilter<$PrismaModel> | $Enums.BookStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBookStatusFilter<$PrismaModel>
    _max?: NestedEnumBookStatusFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type BookScalarRelationFilter = {
    is?: BookWhereInput
    isNot?: BookWhereInput
  }

  export type CharacterCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    age?: SortOrder
    gender?: SortOrder
    eyeColor?: SortOrder
    hairColor?: SortOrder
    hairStyle?: SortOrder
    skinTone?: SortOrder
    wearingGlasses?: SortOrder
    bookId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CharacterAvgOrderByAggregateInput = {
    age?: SortOrder
  }

  export type CharacterMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    age?: SortOrder
    gender?: SortOrder
    eyeColor?: SortOrder
    hairColor?: SortOrder
    hairStyle?: SortOrder
    skinTone?: SortOrder
    wearingGlasses?: SortOrder
    bookId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CharacterMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    age?: SortOrder
    gender?: SortOrder
    eyeColor?: SortOrder
    hairColor?: SortOrder
    hairStyle?: SortOrder
    skinTone?: SortOrder
    wearingGlasses?: SortOrder
    bookId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CharacterSumOrderByAggregateInput = {
    age?: SortOrder
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type TemplatePageContentListRelationFilter = {
    every?: TemplatePageContentWhereInput
    some?: TemplatePageContentWhereInput
    none?: TemplatePageContentWhereInput
  }

  export type GenreListRelationFilter = {
    every?: GenreWhereInput
    some?: GenreWhereInput
    none?: GenreWhereInput
  }

  export type TemplatePageContentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GenreOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BookTemplateCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    pageCount?: SortOrder
    published?: SortOrder
    coverImage?: SortOrder
    coverPrompt?: SortOrder
    characterGender?: SortOrder
    minAge?: SortOrder
    maxAge?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BookTemplateAvgOrderByAggregateInput = {
    pageCount?: SortOrder
    minAge?: SortOrder
    maxAge?: SortOrder
  }

  export type BookTemplateMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    pageCount?: SortOrder
    published?: SortOrder
    coverImage?: SortOrder
    coverPrompt?: SortOrder
    characterGender?: SortOrder
    minAge?: SortOrder
    maxAge?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BookTemplateMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    pageCount?: SortOrder
    published?: SortOrder
    coverImage?: SortOrder
    coverPrompt?: SortOrder
    characterGender?: SortOrder
    minAge?: SortOrder
    maxAge?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BookTemplateSumOrderByAggregateInput = {
    pageCount?: SortOrder
    minAge?: SortOrder
    maxAge?: SortOrder
  }

  export type TemplatePageContentTemplateIdPageNumberCompoundUniqueInput = {
    templateId: string
    pageNumber: number
  }

  export type TemplatePageContentCountOrderByAggregateInput = {
    id?: SortOrder
    pageNumber?: SortOrder
    content?: SortOrder
    imagePrompt?: SortOrder
    imageUrl?: SortOrder
    templateId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TemplatePageContentAvgOrderByAggregateInput = {
    pageNumber?: SortOrder
  }

  export type TemplatePageContentMaxOrderByAggregateInput = {
    id?: SortOrder
    pageNumber?: SortOrder
    content?: SortOrder
    imagePrompt?: SortOrder
    imageUrl?: SortOrder
    templateId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TemplatePageContentMinOrderByAggregateInput = {
    id?: SortOrder
    pageNumber?: SortOrder
    content?: SortOrder
    imagePrompt?: SortOrder
    imageUrl?: SortOrder
    templateId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TemplatePageContentSumOrderByAggregateInput = {
    pageNumber?: SortOrder
  }

  export type EnumPageTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PageType | EnumPageTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PageType[] | ListEnumPageTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PageType[] | ListEnumPageTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPageTypeFilter<$PrismaModel> | $Enums.PageType
  }

  export type PageBookIdPageNumberCompoundUniqueInput = {
    bookId: string
    pageNumber: number
  }

  export type PageCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    pageNumber?: SortOrder
    textContent?: SortOrder
    imagePrompt?: SortOrder
    imageUrl?: SortOrder
    imageOptions?: SortOrder
    bookId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PageAvgOrderByAggregateInput = {
    pageNumber?: SortOrder
  }

  export type PageMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    pageNumber?: SortOrder
    textContent?: SortOrder
    imagePrompt?: SortOrder
    imageUrl?: SortOrder
    bookId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PageMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    pageNumber?: SortOrder
    textContent?: SortOrder
    imagePrompt?: SortOrder
    imageUrl?: SortOrder
    bookId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PageSumOrderByAggregateInput = {
    pageNumber?: SortOrder
  }

  export type EnumPageTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PageType | EnumPageTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PageType[] | ListEnumPageTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PageType[] | ListEnumPageTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPageTypeWithAggregatesFilter<$PrismaModel> | $Enums.PageType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPageTypeFilter<$PrismaModel>
    _max?: NestedEnumPageTypeFilter<$PrismaModel>
  }

  export type EnumImageTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ImageType | EnumImageTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ImageType[] | ListEnumImageTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ImageType[] | ListEnumImageTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumImageTypeFilter<$PrismaModel> | $Enums.ImageType
  }

  export type EnumGenerationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.GenerationStatus | EnumGenerationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.GenerationStatus[] | ListEnumGenerationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.GenerationStatus[] | ListEnumGenerationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumGenerationStatusFilter<$PrismaModel> | $Enums.GenerationStatus
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type ImageGenerationCountOrderByAggregateInput = {
    id?: SortOrder
    generationId?: SortOrder
    bookId?: SortOrder
    pageId?: SortOrder
    type?: SortOrder
    prompt?: SortOrder
    status?: SortOrder
    errorMessage?: SortOrder
    apiCreditCost?: SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrder
  }

  export type ImageGenerationAvgOrderByAggregateInput = {
    apiCreditCost?: SortOrder
  }

  export type ImageGenerationMaxOrderByAggregateInput = {
    id?: SortOrder
    generationId?: SortOrder
    bookId?: SortOrder
    pageId?: SortOrder
    type?: SortOrder
    prompt?: SortOrder
    status?: SortOrder
    errorMessage?: SortOrder
    apiCreditCost?: SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrder
  }

  export type ImageGenerationMinOrderByAggregateInput = {
    id?: SortOrder
    generationId?: SortOrder
    bookId?: SortOrder
    pageId?: SortOrder
    type?: SortOrder
    prompt?: SortOrder
    status?: SortOrder
    errorMessage?: SortOrder
    apiCreditCost?: SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrder
  }

  export type ImageGenerationSumOrderByAggregateInput = {
    apiCreditCost?: SortOrder
  }

  export type EnumImageTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ImageType | EnumImageTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ImageType[] | ListEnumImageTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ImageType[] | ListEnumImageTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumImageTypeWithAggregatesFilter<$PrismaModel> | $Enums.ImageType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumImageTypeFilter<$PrismaModel>
    _max?: NestedEnumImageTypeFilter<$PrismaModel>
  }

  export type EnumGenerationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GenerationStatus | EnumGenerationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.GenerationStatus[] | ListEnumGenerationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.GenerationStatus[] | ListEnumGenerationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumGenerationStatusWithAggregatesFilter<$PrismaModel> | $Enums.GenerationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGenerationStatusFilter<$PrismaModel>
    _max?: NestedEnumGenerationStatusFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type EnumProductTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ProductType | EnumProductTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ProductType[] | ListEnumProductTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProductType[] | ListEnumProductTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumProductTypeFilter<$PrismaModel> | $Enums.ProductType
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type EnumOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusFilter<$PrismaModel> | $Enums.OrderStatus
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type EnumShippingLevelNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.ShippingLevel | EnumShippingLevelFieldRefInput<$PrismaModel> | null
    in?: $Enums.ShippingLevel[] | ListEnumShippingLevelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ShippingLevel[] | ListEnumShippingLevelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumShippingLevelNullableFilter<$PrismaModel> | $Enums.ShippingLevel | null
  }

  export type OrderCountOrderByAggregateInput = {
    id?: SortOrder
    orderNumber?: SortOrder
    productType?: SortOrder
    totalPrice?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    paymentProvider?: SortOrder
    quantity?: SortOrder
    paymentId?: SortOrder
    transactionId?: SortOrder
    pricePaid?: SortOrder
    payerEmail?: SortOrder
    shippingCost?: SortOrder
    printingCost?: SortOrder
    imagesCost?: SortOrder
    shippingLevel?: SortOrder
    phoneNumber?: SortOrder
    name?: SortOrder
    street1?: SortOrder
    street2?: SortOrder
    city?: SortOrder
    state_code?: SortOrder
    postcode?: SortOrder
    country?: SortOrder
    poProviderOrderId?: SortOrder
    trackingNumber?: SortOrder
    customerEmail?: SortOrder
    bookId?: SortOrder
    userId?: SortOrder
    printJobId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    paidAt?: SortOrder
    fulfilledAt?: SortOrder
  }

  export type OrderAvgOrderByAggregateInput = {
    totalPrice?: SortOrder
    quantity?: SortOrder
    pricePaid?: SortOrder
    shippingCost?: SortOrder
    printingCost?: SortOrder
    imagesCost?: SortOrder
  }

  export type OrderMaxOrderByAggregateInput = {
    id?: SortOrder
    orderNumber?: SortOrder
    productType?: SortOrder
    totalPrice?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    paymentProvider?: SortOrder
    quantity?: SortOrder
    paymentId?: SortOrder
    transactionId?: SortOrder
    pricePaid?: SortOrder
    payerEmail?: SortOrder
    shippingCost?: SortOrder
    printingCost?: SortOrder
    imagesCost?: SortOrder
    shippingLevel?: SortOrder
    phoneNumber?: SortOrder
    name?: SortOrder
    street1?: SortOrder
    street2?: SortOrder
    city?: SortOrder
    state_code?: SortOrder
    postcode?: SortOrder
    country?: SortOrder
    poProviderOrderId?: SortOrder
    trackingNumber?: SortOrder
    customerEmail?: SortOrder
    bookId?: SortOrder
    userId?: SortOrder
    printJobId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    paidAt?: SortOrder
    fulfilledAt?: SortOrder
  }

  export type OrderMinOrderByAggregateInput = {
    id?: SortOrder
    orderNumber?: SortOrder
    productType?: SortOrder
    totalPrice?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    paymentProvider?: SortOrder
    quantity?: SortOrder
    paymentId?: SortOrder
    transactionId?: SortOrder
    pricePaid?: SortOrder
    payerEmail?: SortOrder
    shippingCost?: SortOrder
    printingCost?: SortOrder
    imagesCost?: SortOrder
    shippingLevel?: SortOrder
    phoneNumber?: SortOrder
    name?: SortOrder
    street1?: SortOrder
    street2?: SortOrder
    city?: SortOrder
    state_code?: SortOrder
    postcode?: SortOrder
    country?: SortOrder
    poProviderOrderId?: SortOrder
    trackingNumber?: SortOrder
    customerEmail?: SortOrder
    bookId?: SortOrder
    userId?: SortOrder
    printJobId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    paidAt?: SortOrder
    fulfilledAt?: SortOrder
  }

  export type OrderSumOrderByAggregateInput = {
    totalPrice?: SortOrder
    quantity?: SortOrder
    pricePaid?: SortOrder
    shippingCost?: SortOrder
    printingCost?: SortOrder
    imagesCost?: SortOrder
  }

  export type EnumProductTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProductType | EnumProductTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ProductType[] | ListEnumProductTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProductType[] | ListEnumProductTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumProductTypeWithAggregatesFilter<$PrismaModel> | $Enums.ProductType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProductTypeFilter<$PrismaModel>
    _max?: NestedEnumProductTypeFilter<$PrismaModel>
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type EnumOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.OrderStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderStatusFilter<$PrismaModel>
    _max?: NestedEnumOrderStatusFilter<$PrismaModel>
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type EnumShippingLevelNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ShippingLevel | EnumShippingLevelFieldRefInput<$PrismaModel> | null
    in?: $Enums.ShippingLevel[] | ListEnumShippingLevelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ShippingLevel[] | ListEnumShippingLevelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumShippingLevelNullableWithAggregatesFilter<$PrismaModel> | $Enums.ShippingLevel | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumShippingLevelNullableFilter<$PrismaModel>
    _max?: NestedEnumShippingLevelNullableFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type EnumFileValidationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.FileValidationStatus | EnumFileValidationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FileValidationStatus[] | ListEnumFileValidationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.FileValidationStatus[] | ListEnumFileValidationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumFileValidationStatusFilter<$PrismaModel> | $Enums.FileValidationStatus
  }

  export type EnumPrintJobStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PrintJobStatus | EnumPrintJobStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PrintJobStatus[] | ListEnumPrintJobStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PrintJobStatus[] | ListEnumPrintJobStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPrintJobStatusFilter<$PrismaModel> | $Enums.PrintJobStatus
  }

  export type OrderScalarRelationFilter = {
    is?: OrderWhereInput
    isNot?: OrderWhereInput
  }

  export type PrintJobCountOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    bookId?: SortOrder
    luluPrintJobId?: SortOrder
    paymentId?: SortOrder
    podPackageId?: SortOrder
    interiorPdfUrl?: SortOrder
    coverPdfUrl?: SortOrder
    interiorS3Key?: SortOrder
    coverS3Key?: SortOrder
    pageCount?: SortOrder
    interiorValidationId?: SortOrder
    coverValidationId?: SortOrder
    interiorValidationStatus?: SortOrder
    coverValidationStatus?: SortOrder
    validationErrors?: SortOrder
    status?: SortOrder
    statusMessage?: SortOrder
    currency?: SortOrder
    printingCostExclTax?: SortOrder
    printingCostInclTax?: SortOrder
    shippingCostExclTax?: SortOrder
    shippingCostInclTax?: SortOrder
    totalCostExclTax?: SortOrder
    totalCostInclTax?: SortOrder
    totalTax?: SortOrder
    trackingNumber?: SortOrder
    trackingUrls?: SortOrder
    shippingCarrier?: SortOrder
    estimatedShipDate?: SortOrder
    estimatedDeliveryDate?: SortOrder
    attempts?: SortOrder
    errorMessage?: SortOrder
    sentByAdminId?: SortOrder
    adminNotes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sentToPrinterAt?: SortOrder
    paidAt?: SortOrder
    inProductionAt?: SortOrder
    shippedAt?: SortOrder
  }

  export type PrintJobAvgOrderByAggregateInput = {
    luluPrintJobId?: SortOrder
    paymentId?: SortOrder
    pageCount?: SortOrder
    interiorValidationId?: SortOrder
    coverValidationId?: SortOrder
    printingCostExclTax?: SortOrder
    printingCostInclTax?: SortOrder
    shippingCostExclTax?: SortOrder
    shippingCostInclTax?: SortOrder
    totalCostExclTax?: SortOrder
    totalCostInclTax?: SortOrder
    totalTax?: SortOrder
    attempts?: SortOrder
  }

  export type PrintJobMaxOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    bookId?: SortOrder
    luluPrintJobId?: SortOrder
    paymentId?: SortOrder
    podPackageId?: SortOrder
    interiorPdfUrl?: SortOrder
    coverPdfUrl?: SortOrder
    interiorS3Key?: SortOrder
    coverS3Key?: SortOrder
    pageCount?: SortOrder
    interiorValidationId?: SortOrder
    coverValidationId?: SortOrder
    interiorValidationStatus?: SortOrder
    coverValidationStatus?: SortOrder
    status?: SortOrder
    statusMessage?: SortOrder
    currency?: SortOrder
    printingCostExclTax?: SortOrder
    printingCostInclTax?: SortOrder
    shippingCostExclTax?: SortOrder
    shippingCostInclTax?: SortOrder
    totalCostExclTax?: SortOrder
    totalCostInclTax?: SortOrder
    totalTax?: SortOrder
    trackingNumber?: SortOrder
    shippingCarrier?: SortOrder
    estimatedShipDate?: SortOrder
    estimatedDeliveryDate?: SortOrder
    attempts?: SortOrder
    errorMessage?: SortOrder
    sentByAdminId?: SortOrder
    adminNotes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sentToPrinterAt?: SortOrder
    paidAt?: SortOrder
    inProductionAt?: SortOrder
    shippedAt?: SortOrder
  }

  export type PrintJobMinOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    bookId?: SortOrder
    luluPrintJobId?: SortOrder
    paymentId?: SortOrder
    podPackageId?: SortOrder
    interiorPdfUrl?: SortOrder
    coverPdfUrl?: SortOrder
    interiorS3Key?: SortOrder
    coverS3Key?: SortOrder
    pageCount?: SortOrder
    interiorValidationId?: SortOrder
    coverValidationId?: SortOrder
    interiorValidationStatus?: SortOrder
    coverValidationStatus?: SortOrder
    status?: SortOrder
    statusMessage?: SortOrder
    currency?: SortOrder
    printingCostExclTax?: SortOrder
    printingCostInclTax?: SortOrder
    shippingCostExclTax?: SortOrder
    shippingCostInclTax?: SortOrder
    totalCostExclTax?: SortOrder
    totalCostInclTax?: SortOrder
    totalTax?: SortOrder
    trackingNumber?: SortOrder
    shippingCarrier?: SortOrder
    estimatedShipDate?: SortOrder
    estimatedDeliveryDate?: SortOrder
    attempts?: SortOrder
    errorMessage?: SortOrder
    sentByAdminId?: SortOrder
    adminNotes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sentToPrinterAt?: SortOrder
    paidAt?: SortOrder
    inProductionAt?: SortOrder
    shippedAt?: SortOrder
  }

  export type PrintJobSumOrderByAggregateInput = {
    luluPrintJobId?: SortOrder
    paymentId?: SortOrder
    pageCount?: SortOrder
    interiorValidationId?: SortOrder
    coverValidationId?: SortOrder
    printingCostExclTax?: SortOrder
    printingCostInclTax?: SortOrder
    shippingCostExclTax?: SortOrder
    shippingCostInclTax?: SortOrder
    totalCostExclTax?: SortOrder
    totalCostInclTax?: SortOrder
    totalTax?: SortOrder
    attempts?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumFileValidationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FileValidationStatus | EnumFileValidationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FileValidationStatus[] | ListEnumFileValidationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.FileValidationStatus[] | ListEnumFileValidationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumFileValidationStatusWithAggregatesFilter<$PrismaModel> | $Enums.FileValidationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFileValidationStatusFilter<$PrismaModel>
    _max?: NestedEnumFileValidationStatusFilter<$PrismaModel>
  }

  export type EnumPrintJobStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PrintJobStatus | EnumPrintJobStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PrintJobStatus[] | ListEnumPrintJobStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PrintJobStatus[] | ListEnumPrintJobStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPrintJobStatusWithAggregatesFilter<$PrismaModel> | $Enums.PrintJobStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPrintJobStatusFilter<$PrismaModel>
    _max?: NestedEnumPrintJobStatusFilter<$PrismaModel>
  }

  export type ConfigurationCountOrderByAggregateInput = {
    key?: SortOrder
    value?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ConfigurationMaxOrderByAggregateInput = {
    key?: SortOrder
    value?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ConfigurationMinOrderByAggregateInput = {
    key?: SortOrder
    value?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BookCreateNestedManyWithoutUserInput = {
    create?: XOR<BookCreateWithoutUserInput, BookUncheckedCreateWithoutUserInput> | BookCreateWithoutUserInput[] | BookUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BookCreateOrConnectWithoutUserInput | BookCreateOrConnectWithoutUserInput[]
    createMany?: BookCreateManyUserInputEnvelope
    connect?: BookWhereUniqueInput | BookWhereUniqueInput[]
  }

  export type OrderCreateNestedManyWithoutUserInput = {
    create?: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput> | OrderCreateWithoutUserInput[] | OrderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutUserInput | OrderCreateOrConnectWithoutUserInput[]
    createMany?: OrderCreateManyUserInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type BookUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<BookCreateWithoutUserInput, BookUncheckedCreateWithoutUserInput> | BookCreateWithoutUserInput[] | BookUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BookCreateOrConnectWithoutUserInput | BookCreateOrConnectWithoutUserInput[]
    createMany?: BookCreateManyUserInputEnvelope
    connect?: BookWhereUniqueInput | BookWhereUniqueInput[]
  }

  export type OrderUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput> | OrderCreateWithoutUserInput[] | OrderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutUserInput | OrderCreateOrConnectWithoutUserInput[]
    createMany?: OrderCreateManyUserInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BookUpdateManyWithoutUserNestedInput = {
    create?: XOR<BookCreateWithoutUserInput, BookUncheckedCreateWithoutUserInput> | BookCreateWithoutUserInput[] | BookUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BookCreateOrConnectWithoutUserInput | BookCreateOrConnectWithoutUserInput[]
    upsert?: BookUpsertWithWhereUniqueWithoutUserInput | BookUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BookCreateManyUserInputEnvelope
    set?: BookWhereUniqueInput | BookWhereUniqueInput[]
    disconnect?: BookWhereUniqueInput | BookWhereUniqueInput[]
    delete?: BookWhereUniqueInput | BookWhereUniqueInput[]
    connect?: BookWhereUniqueInput | BookWhereUniqueInput[]
    update?: BookUpdateWithWhereUniqueWithoutUserInput | BookUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BookUpdateManyWithWhereWithoutUserInput | BookUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BookScalarWhereInput | BookScalarWhereInput[]
  }

  export type OrderUpdateManyWithoutUserNestedInput = {
    create?: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput> | OrderCreateWithoutUserInput[] | OrderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutUserInput | OrderCreateOrConnectWithoutUserInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutUserInput | OrderUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OrderCreateManyUserInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutUserInput | OrderUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutUserInput | OrderUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type BookUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<BookCreateWithoutUserInput, BookUncheckedCreateWithoutUserInput> | BookCreateWithoutUserInput[] | BookUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BookCreateOrConnectWithoutUserInput | BookCreateOrConnectWithoutUserInput[]
    upsert?: BookUpsertWithWhereUniqueWithoutUserInput | BookUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BookCreateManyUserInputEnvelope
    set?: BookWhereUniqueInput | BookWhereUniqueInput[]
    disconnect?: BookWhereUniqueInput | BookWhereUniqueInput[]
    delete?: BookWhereUniqueInput | BookWhereUniqueInput[]
    connect?: BookWhereUniqueInput | BookWhereUniqueInput[]
    update?: BookUpdateWithWhereUniqueWithoutUserInput | BookUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BookUpdateManyWithWhereWithoutUserInput | BookUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BookScalarWhereInput | BookScalarWhereInput[]
  }

  export type OrderUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput> | OrderCreateWithoutUserInput[] | OrderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutUserInput | OrderCreateOrConnectWithoutUserInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutUserInput | OrderUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OrderCreateManyUserInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutUserInput | OrderUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutUserInput | OrderUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type BookCreateNestedManyWithoutGuestSessionInput = {
    create?: XOR<BookCreateWithoutGuestSessionInput, BookUncheckedCreateWithoutGuestSessionInput> | BookCreateWithoutGuestSessionInput[] | BookUncheckedCreateWithoutGuestSessionInput[]
    connectOrCreate?: BookCreateOrConnectWithoutGuestSessionInput | BookCreateOrConnectWithoutGuestSessionInput[]
    createMany?: BookCreateManyGuestSessionInputEnvelope
    connect?: BookWhereUniqueInput | BookWhereUniqueInput[]
  }

  export type BookUncheckedCreateNestedManyWithoutGuestSessionInput = {
    create?: XOR<BookCreateWithoutGuestSessionInput, BookUncheckedCreateWithoutGuestSessionInput> | BookCreateWithoutGuestSessionInput[] | BookUncheckedCreateWithoutGuestSessionInput[]
    connectOrCreate?: BookCreateOrConnectWithoutGuestSessionInput | BookCreateOrConnectWithoutGuestSessionInput[]
    createMany?: BookCreateManyGuestSessionInputEnvelope
    connect?: BookWhereUniqueInput | BookWhereUniqueInput[]
  }

  export type BookUpdateManyWithoutGuestSessionNestedInput = {
    create?: XOR<BookCreateWithoutGuestSessionInput, BookUncheckedCreateWithoutGuestSessionInput> | BookCreateWithoutGuestSessionInput[] | BookUncheckedCreateWithoutGuestSessionInput[]
    connectOrCreate?: BookCreateOrConnectWithoutGuestSessionInput | BookCreateOrConnectWithoutGuestSessionInput[]
    upsert?: BookUpsertWithWhereUniqueWithoutGuestSessionInput | BookUpsertWithWhereUniqueWithoutGuestSessionInput[]
    createMany?: BookCreateManyGuestSessionInputEnvelope
    set?: BookWhereUniqueInput | BookWhereUniqueInput[]
    disconnect?: BookWhereUniqueInput | BookWhereUniqueInput[]
    delete?: BookWhereUniqueInput | BookWhereUniqueInput[]
    connect?: BookWhereUniqueInput | BookWhereUniqueInput[]
    update?: BookUpdateWithWhereUniqueWithoutGuestSessionInput | BookUpdateWithWhereUniqueWithoutGuestSessionInput[]
    updateMany?: BookUpdateManyWithWhereWithoutGuestSessionInput | BookUpdateManyWithWhereWithoutGuestSessionInput[]
    deleteMany?: BookScalarWhereInput | BookScalarWhereInput[]
  }

  export type BookUncheckedUpdateManyWithoutGuestSessionNestedInput = {
    create?: XOR<BookCreateWithoutGuestSessionInput, BookUncheckedCreateWithoutGuestSessionInput> | BookCreateWithoutGuestSessionInput[] | BookUncheckedCreateWithoutGuestSessionInput[]
    connectOrCreate?: BookCreateOrConnectWithoutGuestSessionInput | BookCreateOrConnectWithoutGuestSessionInput[]
    upsert?: BookUpsertWithWhereUniqueWithoutGuestSessionInput | BookUpsertWithWhereUniqueWithoutGuestSessionInput[]
    createMany?: BookCreateManyGuestSessionInputEnvelope
    set?: BookWhereUniqueInput | BookWhereUniqueInput[]
    disconnect?: BookWhereUniqueInput | BookWhereUniqueInput[]
    delete?: BookWhereUniqueInput | BookWhereUniqueInput[]
    connect?: BookWhereUniqueInput | BookWhereUniqueInput[]
    update?: BookUpdateWithWhereUniqueWithoutGuestSessionInput | BookUpdateWithWhereUniqueWithoutGuestSessionInput[]
    updateMany?: BookUpdateManyWithWhereWithoutGuestSessionInput | BookUpdateManyWithWhereWithoutGuestSessionInput[]
    deleteMany?: BookScalarWhereInput | BookScalarWhereInput[]
  }

  export type BookTemplateCreateNestedManyWithoutGenresInput = {
    create?: XOR<BookTemplateCreateWithoutGenresInput, BookTemplateUncheckedCreateWithoutGenresInput> | BookTemplateCreateWithoutGenresInput[] | BookTemplateUncheckedCreateWithoutGenresInput[]
    connectOrCreate?: BookTemplateCreateOrConnectWithoutGenresInput | BookTemplateCreateOrConnectWithoutGenresInput[]
    connect?: BookTemplateWhereUniqueInput | BookTemplateWhereUniqueInput[]
  }

  export type BookTemplateUncheckedCreateNestedManyWithoutGenresInput = {
    create?: XOR<BookTemplateCreateWithoutGenresInput, BookTemplateUncheckedCreateWithoutGenresInput> | BookTemplateCreateWithoutGenresInput[] | BookTemplateUncheckedCreateWithoutGenresInput[]
    connectOrCreate?: BookTemplateCreateOrConnectWithoutGenresInput | BookTemplateCreateOrConnectWithoutGenresInput[]
    connect?: BookTemplateWhereUniqueInput | BookTemplateWhereUniqueInput[]
  }

  export type BookTemplateUpdateManyWithoutGenresNestedInput = {
    create?: XOR<BookTemplateCreateWithoutGenresInput, BookTemplateUncheckedCreateWithoutGenresInput> | BookTemplateCreateWithoutGenresInput[] | BookTemplateUncheckedCreateWithoutGenresInput[]
    connectOrCreate?: BookTemplateCreateOrConnectWithoutGenresInput | BookTemplateCreateOrConnectWithoutGenresInput[]
    upsert?: BookTemplateUpsertWithWhereUniqueWithoutGenresInput | BookTemplateUpsertWithWhereUniqueWithoutGenresInput[]
    set?: BookTemplateWhereUniqueInput | BookTemplateWhereUniqueInput[]
    disconnect?: BookTemplateWhereUniqueInput | BookTemplateWhereUniqueInput[]
    delete?: BookTemplateWhereUniqueInput | BookTemplateWhereUniqueInput[]
    connect?: BookTemplateWhereUniqueInput | BookTemplateWhereUniqueInput[]
    update?: BookTemplateUpdateWithWhereUniqueWithoutGenresInput | BookTemplateUpdateWithWhereUniqueWithoutGenresInput[]
    updateMany?: BookTemplateUpdateManyWithWhereWithoutGenresInput | BookTemplateUpdateManyWithWhereWithoutGenresInput[]
    deleteMany?: BookTemplateScalarWhereInput | BookTemplateScalarWhereInput[]
  }

  export type BookTemplateUncheckedUpdateManyWithoutGenresNestedInput = {
    create?: XOR<BookTemplateCreateWithoutGenresInput, BookTemplateUncheckedCreateWithoutGenresInput> | BookTemplateCreateWithoutGenresInput[] | BookTemplateUncheckedCreateWithoutGenresInput[]
    connectOrCreate?: BookTemplateCreateOrConnectWithoutGenresInput | BookTemplateCreateOrConnectWithoutGenresInput[]
    upsert?: BookTemplateUpsertWithWhereUniqueWithoutGenresInput | BookTemplateUpsertWithWhereUniqueWithoutGenresInput[]
    set?: BookTemplateWhereUniqueInput | BookTemplateWhereUniqueInput[]
    disconnect?: BookTemplateWhereUniqueInput | BookTemplateWhereUniqueInput[]
    delete?: BookTemplateWhereUniqueInput | BookTemplateWhereUniqueInput[]
    connect?: BookTemplateWhereUniqueInput | BookTemplateWhereUniqueInput[]
    update?: BookTemplateUpdateWithWhereUniqueWithoutGenresInput | BookTemplateUpdateWithWhereUniqueWithoutGenresInput[]
    updateMany?: BookTemplateUpdateManyWithWhereWithoutGenresInput | BookTemplateUpdateManyWithWhereWithoutGenresInput[]
    deleteMany?: BookTemplateScalarWhereInput | BookTemplateScalarWhereInput[]
  }

  export type BookCreatecoverImageOptionsInput = {
    set: string[]
  }

  export type PageCreateNestedManyWithoutBookInput = {
    create?: XOR<PageCreateWithoutBookInput, PageUncheckedCreateWithoutBookInput> | PageCreateWithoutBookInput[] | PageUncheckedCreateWithoutBookInput[]
    connectOrCreate?: PageCreateOrConnectWithoutBookInput | PageCreateOrConnectWithoutBookInput[]
    createMany?: PageCreateManyBookInputEnvelope
    connect?: PageWhereUniqueInput | PageWhereUniqueInput[]
  }

  export type CharacterCreateNestedOneWithoutBookInput = {
    create?: XOR<CharacterCreateWithoutBookInput, CharacterUncheckedCreateWithoutBookInput>
    connectOrCreate?: CharacterCreateOrConnectWithoutBookInput
    connect?: CharacterWhereUniqueInput
  }

  export type BookTemplateCreateNestedOneWithoutBooksInput = {
    create?: XOR<BookTemplateCreateWithoutBooksInput, BookTemplateUncheckedCreateWithoutBooksInput>
    connectOrCreate?: BookTemplateCreateOrConnectWithoutBooksInput
    connect?: BookTemplateWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutBooksInput = {
    create?: XOR<UserCreateWithoutBooksInput, UserUncheckedCreateWithoutBooksInput>
    connectOrCreate?: UserCreateOrConnectWithoutBooksInput
    connect?: UserWhereUniqueInput
  }

  export type GuestSessionCreateNestedOneWithoutBooksInput = {
    create?: XOR<GuestSessionCreateWithoutBooksInput, GuestSessionUncheckedCreateWithoutBooksInput>
    connectOrCreate?: GuestSessionCreateOrConnectWithoutBooksInput
    connect?: GuestSessionWhereUniqueInput
  }

  export type ImageGenerationCreateNestedManyWithoutBookInput = {
    create?: XOR<ImageGenerationCreateWithoutBookInput, ImageGenerationUncheckedCreateWithoutBookInput> | ImageGenerationCreateWithoutBookInput[] | ImageGenerationUncheckedCreateWithoutBookInput[]
    connectOrCreate?: ImageGenerationCreateOrConnectWithoutBookInput | ImageGenerationCreateOrConnectWithoutBookInput[]
    createMany?: ImageGenerationCreateManyBookInputEnvelope
    connect?: ImageGenerationWhereUniqueInput | ImageGenerationWhereUniqueInput[]
  }

  export type OrderCreateNestedOneWithoutBookInput = {
    create?: XOR<OrderCreateWithoutBookInput, OrderUncheckedCreateWithoutBookInput>
    connectOrCreate?: OrderCreateOrConnectWithoutBookInput
    connect?: OrderWhereUniqueInput
  }

  export type PrintJobCreateNestedOneWithoutBookInput = {
    create?: XOR<PrintJobCreateWithoutBookInput, PrintJobUncheckedCreateWithoutBookInput>
    connectOrCreate?: PrintJobCreateOrConnectWithoutBookInput
    connect?: PrintJobWhereUniqueInput
  }

  export type PageUncheckedCreateNestedManyWithoutBookInput = {
    create?: XOR<PageCreateWithoutBookInput, PageUncheckedCreateWithoutBookInput> | PageCreateWithoutBookInput[] | PageUncheckedCreateWithoutBookInput[]
    connectOrCreate?: PageCreateOrConnectWithoutBookInput | PageCreateOrConnectWithoutBookInput[]
    createMany?: PageCreateManyBookInputEnvelope
    connect?: PageWhereUniqueInput | PageWhereUniqueInput[]
  }

  export type CharacterUncheckedCreateNestedOneWithoutBookInput = {
    create?: XOR<CharacterCreateWithoutBookInput, CharacterUncheckedCreateWithoutBookInput>
    connectOrCreate?: CharacterCreateOrConnectWithoutBookInput
    connect?: CharacterWhereUniqueInput
  }

  export type ImageGenerationUncheckedCreateNestedManyWithoutBookInput = {
    create?: XOR<ImageGenerationCreateWithoutBookInput, ImageGenerationUncheckedCreateWithoutBookInput> | ImageGenerationCreateWithoutBookInput[] | ImageGenerationUncheckedCreateWithoutBookInput[]
    connectOrCreate?: ImageGenerationCreateOrConnectWithoutBookInput | ImageGenerationCreateOrConnectWithoutBookInput[]
    createMany?: ImageGenerationCreateManyBookInputEnvelope
    connect?: ImageGenerationWhereUniqueInput | ImageGenerationWhereUniqueInput[]
  }

  export type OrderUncheckedCreateNestedOneWithoutBookInput = {
    create?: XOR<OrderCreateWithoutBookInput, OrderUncheckedCreateWithoutBookInput>
    connectOrCreate?: OrderCreateOrConnectWithoutBookInput
    connect?: OrderWhereUniqueInput
  }

  export type PrintJobUncheckedCreateNestedOneWithoutBookInput = {
    create?: XOR<PrintJobCreateWithoutBookInput, PrintJobUncheckedCreateWithoutBookInput>
    connectOrCreate?: PrintJobCreateOrConnectWithoutBookInput
    connect?: PrintJobWhereUniqueInput
  }

  export type EnumBookStatusFieldUpdateOperationsInput = {
    set?: $Enums.BookStatus
  }

  export type BookUpdatecoverImageOptionsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type PageUpdateManyWithoutBookNestedInput = {
    create?: XOR<PageCreateWithoutBookInput, PageUncheckedCreateWithoutBookInput> | PageCreateWithoutBookInput[] | PageUncheckedCreateWithoutBookInput[]
    connectOrCreate?: PageCreateOrConnectWithoutBookInput | PageCreateOrConnectWithoutBookInput[]
    upsert?: PageUpsertWithWhereUniqueWithoutBookInput | PageUpsertWithWhereUniqueWithoutBookInput[]
    createMany?: PageCreateManyBookInputEnvelope
    set?: PageWhereUniqueInput | PageWhereUniqueInput[]
    disconnect?: PageWhereUniqueInput | PageWhereUniqueInput[]
    delete?: PageWhereUniqueInput | PageWhereUniqueInput[]
    connect?: PageWhereUniqueInput | PageWhereUniqueInput[]
    update?: PageUpdateWithWhereUniqueWithoutBookInput | PageUpdateWithWhereUniqueWithoutBookInput[]
    updateMany?: PageUpdateManyWithWhereWithoutBookInput | PageUpdateManyWithWhereWithoutBookInput[]
    deleteMany?: PageScalarWhereInput | PageScalarWhereInput[]
  }

  export type CharacterUpdateOneWithoutBookNestedInput = {
    create?: XOR<CharacterCreateWithoutBookInput, CharacterUncheckedCreateWithoutBookInput>
    connectOrCreate?: CharacterCreateOrConnectWithoutBookInput
    upsert?: CharacterUpsertWithoutBookInput
    disconnect?: CharacterWhereInput | boolean
    delete?: CharacterWhereInput | boolean
    connect?: CharacterWhereUniqueInput
    update?: XOR<XOR<CharacterUpdateToOneWithWhereWithoutBookInput, CharacterUpdateWithoutBookInput>, CharacterUncheckedUpdateWithoutBookInput>
  }

  export type BookTemplateUpdateOneRequiredWithoutBooksNestedInput = {
    create?: XOR<BookTemplateCreateWithoutBooksInput, BookTemplateUncheckedCreateWithoutBooksInput>
    connectOrCreate?: BookTemplateCreateOrConnectWithoutBooksInput
    upsert?: BookTemplateUpsertWithoutBooksInput
    connect?: BookTemplateWhereUniqueInput
    update?: XOR<XOR<BookTemplateUpdateToOneWithWhereWithoutBooksInput, BookTemplateUpdateWithoutBooksInput>, BookTemplateUncheckedUpdateWithoutBooksInput>
  }

  export type UserUpdateOneWithoutBooksNestedInput = {
    create?: XOR<UserCreateWithoutBooksInput, UserUncheckedCreateWithoutBooksInput>
    connectOrCreate?: UserCreateOrConnectWithoutBooksInput
    upsert?: UserUpsertWithoutBooksInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBooksInput, UserUpdateWithoutBooksInput>, UserUncheckedUpdateWithoutBooksInput>
  }

  export type GuestSessionUpdateOneWithoutBooksNestedInput = {
    create?: XOR<GuestSessionCreateWithoutBooksInput, GuestSessionUncheckedCreateWithoutBooksInput>
    connectOrCreate?: GuestSessionCreateOrConnectWithoutBooksInput
    upsert?: GuestSessionUpsertWithoutBooksInput
    disconnect?: GuestSessionWhereInput | boolean
    delete?: GuestSessionWhereInput | boolean
    connect?: GuestSessionWhereUniqueInput
    update?: XOR<XOR<GuestSessionUpdateToOneWithWhereWithoutBooksInput, GuestSessionUpdateWithoutBooksInput>, GuestSessionUncheckedUpdateWithoutBooksInput>
  }

  export type ImageGenerationUpdateManyWithoutBookNestedInput = {
    create?: XOR<ImageGenerationCreateWithoutBookInput, ImageGenerationUncheckedCreateWithoutBookInput> | ImageGenerationCreateWithoutBookInput[] | ImageGenerationUncheckedCreateWithoutBookInput[]
    connectOrCreate?: ImageGenerationCreateOrConnectWithoutBookInput | ImageGenerationCreateOrConnectWithoutBookInput[]
    upsert?: ImageGenerationUpsertWithWhereUniqueWithoutBookInput | ImageGenerationUpsertWithWhereUniqueWithoutBookInput[]
    createMany?: ImageGenerationCreateManyBookInputEnvelope
    set?: ImageGenerationWhereUniqueInput | ImageGenerationWhereUniqueInput[]
    disconnect?: ImageGenerationWhereUniqueInput | ImageGenerationWhereUniqueInput[]
    delete?: ImageGenerationWhereUniqueInput | ImageGenerationWhereUniqueInput[]
    connect?: ImageGenerationWhereUniqueInput | ImageGenerationWhereUniqueInput[]
    update?: ImageGenerationUpdateWithWhereUniqueWithoutBookInput | ImageGenerationUpdateWithWhereUniqueWithoutBookInput[]
    updateMany?: ImageGenerationUpdateManyWithWhereWithoutBookInput | ImageGenerationUpdateManyWithWhereWithoutBookInput[]
    deleteMany?: ImageGenerationScalarWhereInput | ImageGenerationScalarWhereInput[]
  }

  export type OrderUpdateOneWithoutBookNestedInput = {
    create?: XOR<OrderCreateWithoutBookInput, OrderUncheckedCreateWithoutBookInput>
    connectOrCreate?: OrderCreateOrConnectWithoutBookInput
    upsert?: OrderUpsertWithoutBookInput
    disconnect?: OrderWhereInput | boolean
    delete?: OrderWhereInput | boolean
    connect?: OrderWhereUniqueInput
    update?: XOR<XOR<OrderUpdateToOneWithWhereWithoutBookInput, OrderUpdateWithoutBookInput>, OrderUncheckedUpdateWithoutBookInput>
  }

  export type PrintJobUpdateOneWithoutBookNestedInput = {
    create?: XOR<PrintJobCreateWithoutBookInput, PrintJobUncheckedCreateWithoutBookInput>
    connectOrCreate?: PrintJobCreateOrConnectWithoutBookInput
    upsert?: PrintJobUpsertWithoutBookInput
    disconnect?: PrintJobWhereInput | boolean
    delete?: PrintJobWhereInput | boolean
    connect?: PrintJobWhereUniqueInput
    update?: XOR<XOR<PrintJobUpdateToOneWithWhereWithoutBookInput, PrintJobUpdateWithoutBookInput>, PrintJobUncheckedUpdateWithoutBookInput>
  }

  export type PageUncheckedUpdateManyWithoutBookNestedInput = {
    create?: XOR<PageCreateWithoutBookInput, PageUncheckedCreateWithoutBookInput> | PageCreateWithoutBookInput[] | PageUncheckedCreateWithoutBookInput[]
    connectOrCreate?: PageCreateOrConnectWithoutBookInput | PageCreateOrConnectWithoutBookInput[]
    upsert?: PageUpsertWithWhereUniqueWithoutBookInput | PageUpsertWithWhereUniqueWithoutBookInput[]
    createMany?: PageCreateManyBookInputEnvelope
    set?: PageWhereUniqueInput | PageWhereUniqueInput[]
    disconnect?: PageWhereUniqueInput | PageWhereUniqueInput[]
    delete?: PageWhereUniqueInput | PageWhereUniqueInput[]
    connect?: PageWhereUniqueInput | PageWhereUniqueInput[]
    update?: PageUpdateWithWhereUniqueWithoutBookInput | PageUpdateWithWhereUniqueWithoutBookInput[]
    updateMany?: PageUpdateManyWithWhereWithoutBookInput | PageUpdateManyWithWhereWithoutBookInput[]
    deleteMany?: PageScalarWhereInput | PageScalarWhereInput[]
  }

  export type CharacterUncheckedUpdateOneWithoutBookNestedInput = {
    create?: XOR<CharacterCreateWithoutBookInput, CharacterUncheckedCreateWithoutBookInput>
    connectOrCreate?: CharacterCreateOrConnectWithoutBookInput
    upsert?: CharacterUpsertWithoutBookInput
    disconnect?: CharacterWhereInput | boolean
    delete?: CharacterWhereInput | boolean
    connect?: CharacterWhereUniqueInput
    update?: XOR<XOR<CharacterUpdateToOneWithWhereWithoutBookInput, CharacterUpdateWithoutBookInput>, CharacterUncheckedUpdateWithoutBookInput>
  }

  export type ImageGenerationUncheckedUpdateManyWithoutBookNestedInput = {
    create?: XOR<ImageGenerationCreateWithoutBookInput, ImageGenerationUncheckedCreateWithoutBookInput> | ImageGenerationCreateWithoutBookInput[] | ImageGenerationUncheckedCreateWithoutBookInput[]
    connectOrCreate?: ImageGenerationCreateOrConnectWithoutBookInput | ImageGenerationCreateOrConnectWithoutBookInput[]
    upsert?: ImageGenerationUpsertWithWhereUniqueWithoutBookInput | ImageGenerationUpsertWithWhereUniqueWithoutBookInput[]
    createMany?: ImageGenerationCreateManyBookInputEnvelope
    set?: ImageGenerationWhereUniqueInput | ImageGenerationWhereUniqueInput[]
    disconnect?: ImageGenerationWhereUniqueInput | ImageGenerationWhereUniqueInput[]
    delete?: ImageGenerationWhereUniqueInput | ImageGenerationWhereUniqueInput[]
    connect?: ImageGenerationWhereUniqueInput | ImageGenerationWhereUniqueInput[]
    update?: ImageGenerationUpdateWithWhereUniqueWithoutBookInput | ImageGenerationUpdateWithWhereUniqueWithoutBookInput[]
    updateMany?: ImageGenerationUpdateManyWithWhereWithoutBookInput | ImageGenerationUpdateManyWithWhereWithoutBookInput[]
    deleteMany?: ImageGenerationScalarWhereInput | ImageGenerationScalarWhereInput[]
  }

  export type OrderUncheckedUpdateOneWithoutBookNestedInput = {
    create?: XOR<OrderCreateWithoutBookInput, OrderUncheckedCreateWithoutBookInput>
    connectOrCreate?: OrderCreateOrConnectWithoutBookInput
    upsert?: OrderUpsertWithoutBookInput
    disconnect?: OrderWhereInput | boolean
    delete?: OrderWhereInput | boolean
    connect?: OrderWhereUniqueInput
    update?: XOR<XOR<OrderUpdateToOneWithWhereWithoutBookInput, OrderUpdateWithoutBookInput>, OrderUncheckedUpdateWithoutBookInput>
  }

  export type PrintJobUncheckedUpdateOneWithoutBookNestedInput = {
    create?: XOR<PrintJobCreateWithoutBookInput, PrintJobUncheckedCreateWithoutBookInput>
    connectOrCreate?: PrintJobCreateOrConnectWithoutBookInput
    upsert?: PrintJobUpsertWithoutBookInput
    disconnect?: PrintJobWhereInput | boolean
    delete?: PrintJobWhereInput | boolean
    connect?: PrintJobWhereUniqueInput
    update?: XOR<XOR<PrintJobUpdateToOneWithWhereWithoutBookInput, PrintJobUpdateWithoutBookInput>, PrintJobUncheckedUpdateWithoutBookInput>
  }

  export type BookCreateNestedOneWithoutCharacterInput = {
    create?: XOR<BookCreateWithoutCharacterInput, BookUncheckedCreateWithoutCharacterInput>
    connectOrCreate?: BookCreateOrConnectWithoutCharacterInput
    connect?: BookWhereUniqueInput
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type BookUpdateOneRequiredWithoutCharacterNestedInput = {
    create?: XOR<BookCreateWithoutCharacterInput, BookUncheckedCreateWithoutCharacterInput>
    connectOrCreate?: BookCreateOrConnectWithoutCharacterInput
    upsert?: BookUpsertWithoutCharacterInput
    connect?: BookWhereUniqueInput
    update?: XOR<XOR<BookUpdateToOneWithWhereWithoutCharacterInput, BookUpdateWithoutCharacterInput>, BookUncheckedUpdateWithoutCharacterInput>
  }

  export type TemplatePageContentCreateNestedManyWithoutTemplateInput = {
    create?: XOR<TemplatePageContentCreateWithoutTemplateInput, TemplatePageContentUncheckedCreateWithoutTemplateInput> | TemplatePageContentCreateWithoutTemplateInput[] | TemplatePageContentUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: TemplatePageContentCreateOrConnectWithoutTemplateInput | TemplatePageContentCreateOrConnectWithoutTemplateInput[]
    createMany?: TemplatePageContentCreateManyTemplateInputEnvelope
    connect?: TemplatePageContentWhereUniqueInput | TemplatePageContentWhereUniqueInput[]
  }

  export type BookCreateNestedManyWithoutTemplateInput = {
    create?: XOR<BookCreateWithoutTemplateInput, BookUncheckedCreateWithoutTemplateInput> | BookCreateWithoutTemplateInput[] | BookUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: BookCreateOrConnectWithoutTemplateInput | BookCreateOrConnectWithoutTemplateInput[]
    createMany?: BookCreateManyTemplateInputEnvelope
    connect?: BookWhereUniqueInput | BookWhereUniqueInput[]
  }

  export type GenreCreateNestedManyWithoutTemplatesInput = {
    create?: XOR<GenreCreateWithoutTemplatesInput, GenreUncheckedCreateWithoutTemplatesInput> | GenreCreateWithoutTemplatesInput[] | GenreUncheckedCreateWithoutTemplatesInput[]
    connectOrCreate?: GenreCreateOrConnectWithoutTemplatesInput | GenreCreateOrConnectWithoutTemplatesInput[]
    connect?: GenreWhereUniqueInput | GenreWhereUniqueInput[]
  }

  export type TemplatePageContentUncheckedCreateNestedManyWithoutTemplateInput = {
    create?: XOR<TemplatePageContentCreateWithoutTemplateInput, TemplatePageContentUncheckedCreateWithoutTemplateInput> | TemplatePageContentCreateWithoutTemplateInput[] | TemplatePageContentUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: TemplatePageContentCreateOrConnectWithoutTemplateInput | TemplatePageContentCreateOrConnectWithoutTemplateInput[]
    createMany?: TemplatePageContentCreateManyTemplateInputEnvelope
    connect?: TemplatePageContentWhereUniqueInput | TemplatePageContentWhereUniqueInput[]
  }

  export type BookUncheckedCreateNestedManyWithoutTemplateInput = {
    create?: XOR<BookCreateWithoutTemplateInput, BookUncheckedCreateWithoutTemplateInput> | BookCreateWithoutTemplateInput[] | BookUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: BookCreateOrConnectWithoutTemplateInput | BookCreateOrConnectWithoutTemplateInput[]
    createMany?: BookCreateManyTemplateInputEnvelope
    connect?: BookWhereUniqueInput | BookWhereUniqueInput[]
  }

  export type GenreUncheckedCreateNestedManyWithoutTemplatesInput = {
    create?: XOR<GenreCreateWithoutTemplatesInput, GenreUncheckedCreateWithoutTemplatesInput> | GenreCreateWithoutTemplatesInput[] | GenreUncheckedCreateWithoutTemplatesInput[]
    connectOrCreate?: GenreCreateOrConnectWithoutTemplatesInput | GenreCreateOrConnectWithoutTemplatesInput[]
    connect?: GenreWhereUniqueInput | GenreWhereUniqueInput[]
  }

  export type TemplatePageContentUpdateManyWithoutTemplateNestedInput = {
    create?: XOR<TemplatePageContentCreateWithoutTemplateInput, TemplatePageContentUncheckedCreateWithoutTemplateInput> | TemplatePageContentCreateWithoutTemplateInput[] | TemplatePageContentUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: TemplatePageContentCreateOrConnectWithoutTemplateInput | TemplatePageContentCreateOrConnectWithoutTemplateInput[]
    upsert?: TemplatePageContentUpsertWithWhereUniqueWithoutTemplateInput | TemplatePageContentUpsertWithWhereUniqueWithoutTemplateInput[]
    createMany?: TemplatePageContentCreateManyTemplateInputEnvelope
    set?: TemplatePageContentWhereUniqueInput | TemplatePageContentWhereUniqueInput[]
    disconnect?: TemplatePageContentWhereUniqueInput | TemplatePageContentWhereUniqueInput[]
    delete?: TemplatePageContentWhereUniqueInput | TemplatePageContentWhereUniqueInput[]
    connect?: TemplatePageContentWhereUniqueInput | TemplatePageContentWhereUniqueInput[]
    update?: TemplatePageContentUpdateWithWhereUniqueWithoutTemplateInput | TemplatePageContentUpdateWithWhereUniqueWithoutTemplateInput[]
    updateMany?: TemplatePageContentUpdateManyWithWhereWithoutTemplateInput | TemplatePageContentUpdateManyWithWhereWithoutTemplateInput[]
    deleteMany?: TemplatePageContentScalarWhereInput | TemplatePageContentScalarWhereInput[]
  }

  export type BookUpdateManyWithoutTemplateNestedInput = {
    create?: XOR<BookCreateWithoutTemplateInput, BookUncheckedCreateWithoutTemplateInput> | BookCreateWithoutTemplateInput[] | BookUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: BookCreateOrConnectWithoutTemplateInput | BookCreateOrConnectWithoutTemplateInput[]
    upsert?: BookUpsertWithWhereUniqueWithoutTemplateInput | BookUpsertWithWhereUniqueWithoutTemplateInput[]
    createMany?: BookCreateManyTemplateInputEnvelope
    set?: BookWhereUniqueInput | BookWhereUniqueInput[]
    disconnect?: BookWhereUniqueInput | BookWhereUniqueInput[]
    delete?: BookWhereUniqueInput | BookWhereUniqueInput[]
    connect?: BookWhereUniqueInput | BookWhereUniqueInput[]
    update?: BookUpdateWithWhereUniqueWithoutTemplateInput | BookUpdateWithWhereUniqueWithoutTemplateInput[]
    updateMany?: BookUpdateManyWithWhereWithoutTemplateInput | BookUpdateManyWithWhereWithoutTemplateInput[]
    deleteMany?: BookScalarWhereInput | BookScalarWhereInput[]
  }

  export type GenreUpdateManyWithoutTemplatesNestedInput = {
    create?: XOR<GenreCreateWithoutTemplatesInput, GenreUncheckedCreateWithoutTemplatesInput> | GenreCreateWithoutTemplatesInput[] | GenreUncheckedCreateWithoutTemplatesInput[]
    connectOrCreate?: GenreCreateOrConnectWithoutTemplatesInput | GenreCreateOrConnectWithoutTemplatesInput[]
    upsert?: GenreUpsertWithWhereUniqueWithoutTemplatesInput | GenreUpsertWithWhereUniqueWithoutTemplatesInput[]
    set?: GenreWhereUniqueInput | GenreWhereUniqueInput[]
    disconnect?: GenreWhereUniqueInput | GenreWhereUniqueInput[]
    delete?: GenreWhereUniqueInput | GenreWhereUniqueInput[]
    connect?: GenreWhereUniqueInput | GenreWhereUniqueInput[]
    update?: GenreUpdateWithWhereUniqueWithoutTemplatesInput | GenreUpdateWithWhereUniqueWithoutTemplatesInput[]
    updateMany?: GenreUpdateManyWithWhereWithoutTemplatesInput | GenreUpdateManyWithWhereWithoutTemplatesInput[]
    deleteMany?: GenreScalarWhereInput | GenreScalarWhereInput[]
  }

  export type TemplatePageContentUncheckedUpdateManyWithoutTemplateNestedInput = {
    create?: XOR<TemplatePageContentCreateWithoutTemplateInput, TemplatePageContentUncheckedCreateWithoutTemplateInput> | TemplatePageContentCreateWithoutTemplateInput[] | TemplatePageContentUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: TemplatePageContentCreateOrConnectWithoutTemplateInput | TemplatePageContentCreateOrConnectWithoutTemplateInput[]
    upsert?: TemplatePageContentUpsertWithWhereUniqueWithoutTemplateInput | TemplatePageContentUpsertWithWhereUniqueWithoutTemplateInput[]
    createMany?: TemplatePageContentCreateManyTemplateInputEnvelope
    set?: TemplatePageContentWhereUniqueInput | TemplatePageContentWhereUniqueInput[]
    disconnect?: TemplatePageContentWhereUniqueInput | TemplatePageContentWhereUniqueInput[]
    delete?: TemplatePageContentWhereUniqueInput | TemplatePageContentWhereUniqueInput[]
    connect?: TemplatePageContentWhereUniqueInput | TemplatePageContentWhereUniqueInput[]
    update?: TemplatePageContentUpdateWithWhereUniqueWithoutTemplateInput | TemplatePageContentUpdateWithWhereUniqueWithoutTemplateInput[]
    updateMany?: TemplatePageContentUpdateManyWithWhereWithoutTemplateInput | TemplatePageContentUpdateManyWithWhereWithoutTemplateInput[]
    deleteMany?: TemplatePageContentScalarWhereInput | TemplatePageContentScalarWhereInput[]
  }

  export type BookUncheckedUpdateManyWithoutTemplateNestedInput = {
    create?: XOR<BookCreateWithoutTemplateInput, BookUncheckedCreateWithoutTemplateInput> | BookCreateWithoutTemplateInput[] | BookUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: BookCreateOrConnectWithoutTemplateInput | BookCreateOrConnectWithoutTemplateInput[]
    upsert?: BookUpsertWithWhereUniqueWithoutTemplateInput | BookUpsertWithWhereUniqueWithoutTemplateInput[]
    createMany?: BookCreateManyTemplateInputEnvelope
    set?: BookWhereUniqueInput | BookWhereUniqueInput[]
    disconnect?: BookWhereUniqueInput | BookWhereUniqueInput[]
    delete?: BookWhereUniqueInput | BookWhereUniqueInput[]
    connect?: BookWhereUniqueInput | BookWhereUniqueInput[]
    update?: BookUpdateWithWhereUniqueWithoutTemplateInput | BookUpdateWithWhereUniqueWithoutTemplateInput[]
    updateMany?: BookUpdateManyWithWhereWithoutTemplateInput | BookUpdateManyWithWhereWithoutTemplateInput[]
    deleteMany?: BookScalarWhereInput | BookScalarWhereInput[]
  }

  export type GenreUncheckedUpdateManyWithoutTemplatesNestedInput = {
    create?: XOR<GenreCreateWithoutTemplatesInput, GenreUncheckedCreateWithoutTemplatesInput> | GenreCreateWithoutTemplatesInput[] | GenreUncheckedCreateWithoutTemplatesInput[]
    connectOrCreate?: GenreCreateOrConnectWithoutTemplatesInput | GenreCreateOrConnectWithoutTemplatesInput[]
    upsert?: GenreUpsertWithWhereUniqueWithoutTemplatesInput | GenreUpsertWithWhereUniqueWithoutTemplatesInput[]
    set?: GenreWhereUniqueInput | GenreWhereUniqueInput[]
    disconnect?: GenreWhereUniqueInput | GenreWhereUniqueInput[]
    delete?: GenreWhereUniqueInput | GenreWhereUniqueInput[]
    connect?: GenreWhereUniqueInput | GenreWhereUniqueInput[]
    update?: GenreUpdateWithWhereUniqueWithoutTemplatesInput | GenreUpdateWithWhereUniqueWithoutTemplatesInput[]
    updateMany?: GenreUpdateManyWithWhereWithoutTemplatesInput | GenreUpdateManyWithWhereWithoutTemplatesInput[]
    deleteMany?: GenreScalarWhereInput | GenreScalarWhereInput[]
  }

  export type BookTemplateCreateNestedOneWithoutPagesInput = {
    create?: XOR<BookTemplateCreateWithoutPagesInput, BookTemplateUncheckedCreateWithoutPagesInput>
    connectOrCreate?: BookTemplateCreateOrConnectWithoutPagesInput
    connect?: BookTemplateWhereUniqueInput
  }

  export type BookTemplateUpdateOneRequiredWithoutPagesNestedInput = {
    create?: XOR<BookTemplateCreateWithoutPagesInput, BookTemplateUncheckedCreateWithoutPagesInput>
    connectOrCreate?: BookTemplateCreateOrConnectWithoutPagesInput
    upsert?: BookTemplateUpsertWithoutPagesInput
    connect?: BookTemplateWhereUniqueInput
    update?: XOR<XOR<BookTemplateUpdateToOneWithWhereWithoutPagesInput, BookTemplateUpdateWithoutPagesInput>, BookTemplateUncheckedUpdateWithoutPagesInput>
  }

  export type PageCreateimageOptionsInput = {
    set: string[]
  }

  export type BookCreateNestedOneWithoutPagesInput = {
    create?: XOR<BookCreateWithoutPagesInput, BookUncheckedCreateWithoutPagesInput>
    connectOrCreate?: BookCreateOrConnectWithoutPagesInput
    connect?: BookWhereUniqueInput
  }

  export type EnumPageTypeFieldUpdateOperationsInput = {
    set?: $Enums.PageType
  }

  export type PageUpdateimageOptionsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type BookUpdateOneRequiredWithoutPagesNestedInput = {
    create?: XOR<BookCreateWithoutPagesInput, BookUncheckedCreateWithoutPagesInput>
    connectOrCreate?: BookCreateOrConnectWithoutPagesInput
    upsert?: BookUpsertWithoutPagesInput
    connect?: BookWhereUniqueInput
    update?: XOR<XOR<BookUpdateToOneWithWhereWithoutPagesInput, BookUpdateWithoutPagesInput>, BookUncheckedUpdateWithoutPagesInput>
  }

  export type BookCreateNestedOneWithoutImageGenerationsInput = {
    create?: XOR<BookCreateWithoutImageGenerationsInput, BookUncheckedCreateWithoutImageGenerationsInput>
    connectOrCreate?: BookCreateOrConnectWithoutImageGenerationsInput
    connect?: BookWhereUniqueInput
  }

  export type EnumImageTypeFieldUpdateOperationsInput = {
    set?: $Enums.ImageType
  }

  export type EnumGenerationStatusFieldUpdateOperationsInput = {
    set?: $Enums.GenerationStatus
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BookUpdateOneRequiredWithoutImageGenerationsNestedInput = {
    create?: XOR<BookCreateWithoutImageGenerationsInput, BookUncheckedCreateWithoutImageGenerationsInput>
    connectOrCreate?: BookCreateOrConnectWithoutImageGenerationsInput
    upsert?: BookUpsertWithoutImageGenerationsInput
    connect?: BookWhereUniqueInput
    update?: XOR<XOR<BookUpdateToOneWithWhereWithoutImageGenerationsInput, BookUpdateWithoutImageGenerationsInput>, BookUncheckedUpdateWithoutImageGenerationsInput>
  }

  export type BookCreateNestedOneWithoutOrderInput = {
    create?: XOR<BookCreateWithoutOrderInput, BookUncheckedCreateWithoutOrderInput>
    connectOrCreate?: BookCreateOrConnectWithoutOrderInput
    connect?: BookWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutOrdersInput = {
    create?: XOR<UserCreateWithoutOrdersInput, UserUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: UserCreateOrConnectWithoutOrdersInput
    connect?: UserWhereUniqueInput
  }

  export type PrintJobCreateNestedOneWithoutOrderInput = {
    create?: XOR<PrintJobCreateWithoutOrderInput, PrintJobUncheckedCreateWithoutOrderInput>
    connectOrCreate?: PrintJobCreateOrConnectWithoutOrderInput
    connect?: PrintJobWhereUniqueInput
  }

  export type PrintJobUncheckedCreateNestedOneWithoutOrderInput = {
    create?: XOR<PrintJobCreateWithoutOrderInput, PrintJobUncheckedCreateWithoutOrderInput>
    connectOrCreate?: PrintJobCreateOrConnectWithoutOrderInput
    connect?: PrintJobWhereUniqueInput
  }

  export type EnumProductTypeFieldUpdateOperationsInput = {
    set?: $Enums.ProductType
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type EnumOrderStatusFieldUpdateOperationsInput = {
    set?: $Enums.OrderStatus
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type NullableEnumShippingLevelFieldUpdateOperationsInput = {
    set?: $Enums.ShippingLevel | null
  }

  export type BookUpdateOneRequiredWithoutOrderNestedInput = {
    create?: XOR<BookCreateWithoutOrderInput, BookUncheckedCreateWithoutOrderInput>
    connectOrCreate?: BookCreateOrConnectWithoutOrderInput
    upsert?: BookUpsertWithoutOrderInput
    connect?: BookWhereUniqueInput
    update?: XOR<XOR<BookUpdateToOneWithWhereWithoutOrderInput, BookUpdateWithoutOrderInput>, BookUncheckedUpdateWithoutOrderInput>
  }

  export type UserUpdateOneWithoutOrdersNestedInput = {
    create?: XOR<UserCreateWithoutOrdersInput, UserUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: UserCreateOrConnectWithoutOrdersInput
    upsert?: UserUpsertWithoutOrdersInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOrdersInput, UserUpdateWithoutOrdersInput>, UserUncheckedUpdateWithoutOrdersInput>
  }

  export type PrintJobUpdateOneWithoutOrderNestedInput = {
    create?: XOR<PrintJobCreateWithoutOrderInput, PrintJobUncheckedCreateWithoutOrderInput>
    connectOrCreate?: PrintJobCreateOrConnectWithoutOrderInput
    upsert?: PrintJobUpsertWithoutOrderInput
    disconnect?: PrintJobWhereInput | boolean
    delete?: PrintJobWhereInput | boolean
    connect?: PrintJobWhereUniqueInput
    update?: XOR<XOR<PrintJobUpdateToOneWithWhereWithoutOrderInput, PrintJobUpdateWithoutOrderInput>, PrintJobUncheckedUpdateWithoutOrderInput>
  }

  export type PrintJobUncheckedUpdateOneWithoutOrderNestedInput = {
    create?: XOR<PrintJobCreateWithoutOrderInput, PrintJobUncheckedCreateWithoutOrderInput>
    connectOrCreate?: PrintJobCreateOrConnectWithoutOrderInput
    upsert?: PrintJobUpsertWithoutOrderInput
    disconnect?: PrintJobWhereInput | boolean
    delete?: PrintJobWhereInput | boolean
    connect?: PrintJobWhereUniqueInput
    update?: XOR<XOR<PrintJobUpdateToOneWithWhereWithoutOrderInput, PrintJobUpdateWithoutOrderInput>, PrintJobUncheckedUpdateWithoutOrderInput>
  }

  export type PrintJobCreatevalidationErrorsInput = {
    set: string[]
  }

  export type PrintJobCreatetrackingUrlsInput = {
    set: string[]
  }

  export type OrderCreateNestedOneWithoutPrintJobInput = {
    create?: XOR<OrderCreateWithoutPrintJobInput, OrderUncheckedCreateWithoutPrintJobInput>
    connectOrCreate?: OrderCreateOrConnectWithoutPrintJobInput
    connect?: OrderWhereUniqueInput
  }

  export type BookCreateNestedOneWithoutPrintJobInput = {
    create?: XOR<BookCreateWithoutPrintJobInput, BookUncheckedCreateWithoutPrintJobInput>
    connectOrCreate?: BookCreateOrConnectWithoutPrintJobInput
    connect?: BookWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumFileValidationStatusFieldUpdateOperationsInput = {
    set?: $Enums.FileValidationStatus
  }

  export type PrintJobUpdatevalidationErrorsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type EnumPrintJobStatusFieldUpdateOperationsInput = {
    set?: $Enums.PrintJobStatus
  }

  export type PrintJobUpdatetrackingUrlsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type OrderUpdateOneRequiredWithoutPrintJobNestedInput = {
    create?: XOR<OrderCreateWithoutPrintJobInput, OrderUncheckedCreateWithoutPrintJobInput>
    connectOrCreate?: OrderCreateOrConnectWithoutPrintJobInput
    upsert?: OrderUpsertWithoutPrintJobInput
    connect?: OrderWhereUniqueInput
    update?: XOR<XOR<OrderUpdateToOneWithWhereWithoutPrintJobInput, OrderUpdateWithoutPrintJobInput>, OrderUncheckedUpdateWithoutPrintJobInput>
  }

  export type BookUpdateOneRequiredWithoutPrintJobNestedInput = {
    create?: XOR<BookCreateWithoutPrintJobInput, BookUncheckedCreateWithoutPrintJobInput>
    connectOrCreate?: BookCreateOrConnectWithoutPrintJobInput
    upsert?: BookUpsertWithoutPrintJobInput
    connect?: BookWhereUniqueInput
    update?: XOR<XOR<BookUpdateToOneWithWhereWithoutPrintJobInput, BookUpdateWithoutPrintJobInput>, BookUncheckedUpdateWithoutPrintJobInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumBookStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BookStatus | EnumBookStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookStatus[] | ListEnumBookStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookStatus[] | ListEnumBookStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookStatusFilter<$PrismaModel> | $Enums.BookStatus
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumBookStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BookStatus | EnumBookStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookStatus[] | ListEnumBookStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookStatus[] | ListEnumBookStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookStatusWithAggregatesFilter<$PrismaModel> | $Enums.BookStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBookStatusFilter<$PrismaModel>
    _max?: NestedEnumBookStatusFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedEnumPageTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PageType | EnumPageTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PageType[] | ListEnumPageTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PageType[] | ListEnumPageTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPageTypeFilter<$PrismaModel> | $Enums.PageType
  }

  export type NestedEnumPageTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PageType | EnumPageTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PageType[] | ListEnumPageTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PageType[] | ListEnumPageTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPageTypeWithAggregatesFilter<$PrismaModel> | $Enums.PageType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPageTypeFilter<$PrismaModel>
    _max?: NestedEnumPageTypeFilter<$PrismaModel>
  }

  export type NestedEnumImageTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ImageType | EnumImageTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ImageType[] | ListEnumImageTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ImageType[] | ListEnumImageTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumImageTypeFilter<$PrismaModel> | $Enums.ImageType
  }

  export type NestedEnumGenerationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.GenerationStatus | EnumGenerationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.GenerationStatus[] | ListEnumGenerationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.GenerationStatus[] | ListEnumGenerationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumGenerationStatusFilter<$PrismaModel> | $Enums.GenerationStatus
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumImageTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ImageType | EnumImageTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ImageType[] | ListEnumImageTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ImageType[] | ListEnumImageTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumImageTypeWithAggregatesFilter<$PrismaModel> | $Enums.ImageType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumImageTypeFilter<$PrismaModel>
    _max?: NestedEnumImageTypeFilter<$PrismaModel>
  }

  export type NestedEnumGenerationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GenerationStatus | EnumGenerationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.GenerationStatus[] | ListEnumGenerationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.GenerationStatus[] | ListEnumGenerationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumGenerationStatusWithAggregatesFilter<$PrismaModel> | $Enums.GenerationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGenerationStatusFilter<$PrismaModel>
    _max?: NestedEnumGenerationStatusFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedEnumProductTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ProductType | EnumProductTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ProductType[] | ListEnumProductTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProductType[] | ListEnumProductTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumProductTypeFilter<$PrismaModel> | $Enums.ProductType
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedEnumOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusFilter<$PrismaModel> | $Enums.OrderStatus
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedEnumShippingLevelNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.ShippingLevel | EnumShippingLevelFieldRefInput<$PrismaModel> | null
    in?: $Enums.ShippingLevel[] | ListEnumShippingLevelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ShippingLevel[] | ListEnumShippingLevelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumShippingLevelNullableFilter<$PrismaModel> | $Enums.ShippingLevel | null
  }

  export type NestedEnumProductTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProductType | EnumProductTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ProductType[] | ListEnumProductTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProductType[] | ListEnumProductTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumProductTypeWithAggregatesFilter<$PrismaModel> | $Enums.ProductType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProductTypeFilter<$PrismaModel>
    _max?: NestedEnumProductTypeFilter<$PrismaModel>
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.OrderStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderStatusFilter<$PrismaModel>
    _max?: NestedEnumOrderStatusFilter<$PrismaModel>
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type NestedEnumShippingLevelNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ShippingLevel | EnumShippingLevelFieldRefInput<$PrismaModel> | null
    in?: $Enums.ShippingLevel[] | ListEnumShippingLevelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ShippingLevel[] | ListEnumShippingLevelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumShippingLevelNullableWithAggregatesFilter<$PrismaModel> | $Enums.ShippingLevel | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumShippingLevelNullableFilter<$PrismaModel>
    _max?: NestedEnumShippingLevelNullableFilter<$PrismaModel>
  }

  export type NestedEnumFileValidationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.FileValidationStatus | EnumFileValidationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FileValidationStatus[] | ListEnumFileValidationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.FileValidationStatus[] | ListEnumFileValidationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumFileValidationStatusFilter<$PrismaModel> | $Enums.FileValidationStatus
  }

  export type NestedEnumPrintJobStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PrintJobStatus | EnumPrintJobStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PrintJobStatus[] | ListEnumPrintJobStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PrintJobStatus[] | ListEnumPrintJobStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPrintJobStatusFilter<$PrismaModel> | $Enums.PrintJobStatus
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedEnumFileValidationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FileValidationStatus | EnumFileValidationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FileValidationStatus[] | ListEnumFileValidationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.FileValidationStatus[] | ListEnumFileValidationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumFileValidationStatusWithAggregatesFilter<$PrismaModel> | $Enums.FileValidationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFileValidationStatusFilter<$PrismaModel>
    _max?: NestedEnumFileValidationStatusFilter<$PrismaModel>
  }

  export type NestedEnumPrintJobStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PrintJobStatus | EnumPrintJobStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PrintJobStatus[] | ListEnumPrintJobStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PrintJobStatus[] | ListEnumPrintJobStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPrintJobStatusWithAggregatesFilter<$PrismaModel> | $Enums.PrintJobStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPrintJobStatusFilter<$PrismaModel>
    _max?: NestedEnumPrintJobStatusFilter<$PrismaModel>
  }

  export type BookCreateWithoutUserInput = {
    id?: string
    title: string
    status?: $Enums.BookStatus
    characterImageReference?: string | null
    coverImage?: string | null
    coverImageOptions?: BookCreatecoverImageOptionsInput | string[]
    coverPrompt: string
    pageCount: number
    coverDedication?: string | null
    pageDedication?: string | null
    orderId?: string | null
    printJobId?: string | null
    printingDeadline?: Date | string | null
    ebookS3Key?: string | null
    ebookFileName?: string | null
    ebookFileType?: string | null
    ebookExpiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    pages?: PageCreateNestedManyWithoutBookInput
    character?: CharacterCreateNestedOneWithoutBookInput
    template: BookTemplateCreateNestedOneWithoutBooksInput
    guestSession?: GuestSessionCreateNestedOneWithoutBooksInput
    imageGenerations?: ImageGenerationCreateNestedManyWithoutBookInput
    order?: OrderCreateNestedOneWithoutBookInput
    printJob?: PrintJobCreateNestedOneWithoutBookInput
  }

  export type BookUncheckedCreateWithoutUserInput = {
    id?: string
    title: string
    status?: $Enums.BookStatus
    characterImageReference?: string | null
    coverImage?: string | null
    coverImageOptions?: BookCreatecoverImageOptionsInput | string[]
    coverPrompt: string
    pageCount: number
    coverDedication?: string | null
    pageDedication?: string | null
    templateId: string
    guestSessionId?: string | null
    orderId?: string | null
    printJobId?: string | null
    printingDeadline?: Date | string | null
    ebookS3Key?: string | null
    ebookFileName?: string | null
    ebookFileType?: string | null
    ebookExpiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    pages?: PageUncheckedCreateNestedManyWithoutBookInput
    character?: CharacterUncheckedCreateNestedOneWithoutBookInput
    imageGenerations?: ImageGenerationUncheckedCreateNestedManyWithoutBookInput
    order?: OrderUncheckedCreateNestedOneWithoutBookInput
    printJob?: PrintJobUncheckedCreateNestedOneWithoutBookInput
  }

  export type BookCreateOrConnectWithoutUserInput = {
    where: BookWhereUniqueInput
    create: XOR<BookCreateWithoutUserInput, BookUncheckedCreateWithoutUserInput>
  }

  export type BookCreateManyUserInputEnvelope = {
    data: BookCreateManyUserInput | BookCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type OrderCreateWithoutUserInput = {
    id?: string
    orderNumber: string
    productType: $Enums.ProductType
    totalPrice: Decimal | DecimalJsLike | number | string
    currency?: string
    status?: $Enums.OrderStatus
    paymentProvider?: string
    quantity?: number
    paymentId?: string | null
    transactionId?: string | null
    pricePaid?: number | null
    payerEmail?: string | null
    shippingCost?: Decimal | DecimalJsLike | number | string | null
    printingCost?: Decimal | DecimalJsLike | number | string | null
    imagesCost?: Decimal | DecimalJsLike | number | string | null
    shippingLevel?: $Enums.ShippingLevel | null
    phoneNumber?: string | null
    name?: string | null
    street1?: string | null
    street2?: string | null
    city?: string | null
    state_code?: string | null
    postcode?: string | null
    country?: string | null
    poProviderOrderId?: string | null
    trackingNumber?: string | null
    customerEmail: string
    printJobId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    paidAt?: Date | string | null
    fulfilledAt?: Date | string | null
    book: BookCreateNestedOneWithoutOrderInput
    printJob?: PrintJobCreateNestedOneWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutUserInput = {
    id?: string
    orderNumber: string
    productType: $Enums.ProductType
    totalPrice: Decimal | DecimalJsLike | number | string
    currency?: string
    status?: $Enums.OrderStatus
    paymentProvider?: string
    quantity?: number
    paymentId?: string | null
    transactionId?: string | null
    pricePaid?: number | null
    payerEmail?: string | null
    shippingCost?: Decimal | DecimalJsLike | number | string | null
    printingCost?: Decimal | DecimalJsLike | number | string | null
    imagesCost?: Decimal | DecimalJsLike | number | string | null
    shippingLevel?: $Enums.ShippingLevel | null
    phoneNumber?: string | null
    name?: string | null
    street1?: string | null
    street2?: string | null
    city?: string | null
    state_code?: string | null
    postcode?: string | null
    country?: string | null
    poProviderOrderId?: string | null
    trackingNumber?: string | null
    customerEmail: string
    bookId: string
    printJobId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    paidAt?: Date | string | null
    fulfilledAt?: Date | string | null
    printJob?: PrintJobUncheckedCreateNestedOneWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutUserInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput>
  }

  export type OrderCreateManyUserInputEnvelope = {
    data: OrderCreateManyUserInput | OrderCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type BookUpsertWithWhereUniqueWithoutUserInput = {
    where: BookWhereUniqueInput
    update: XOR<BookUpdateWithoutUserInput, BookUncheckedUpdateWithoutUserInput>
    create: XOR<BookCreateWithoutUserInput, BookUncheckedCreateWithoutUserInput>
  }

  export type BookUpdateWithWhereUniqueWithoutUserInput = {
    where: BookWhereUniqueInput
    data: XOR<BookUpdateWithoutUserInput, BookUncheckedUpdateWithoutUserInput>
  }

  export type BookUpdateManyWithWhereWithoutUserInput = {
    where: BookScalarWhereInput
    data: XOR<BookUpdateManyMutationInput, BookUncheckedUpdateManyWithoutUserInput>
  }

  export type BookScalarWhereInput = {
    AND?: BookScalarWhereInput | BookScalarWhereInput[]
    OR?: BookScalarWhereInput[]
    NOT?: BookScalarWhereInput | BookScalarWhereInput[]
    id?: StringFilter<"Book"> | string
    title?: StringFilter<"Book"> | string
    status?: EnumBookStatusFilter<"Book"> | $Enums.BookStatus
    characterImageReference?: StringNullableFilter<"Book"> | string | null
    coverImage?: StringNullableFilter<"Book"> | string | null
    coverImageOptions?: StringNullableListFilter<"Book">
    coverPrompt?: StringFilter<"Book"> | string
    pageCount?: IntFilter<"Book"> | number
    coverDedication?: StringNullableFilter<"Book"> | string | null
    pageDedication?: StringNullableFilter<"Book"> | string | null
    templateId?: StringFilter<"Book"> | string
    userId?: StringNullableFilter<"Book"> | string | null
    guestSessionId?: StringNullableFilter<"Book"> | string | null
    orderId?: StringNullableFilter<"Book"> | string | null
    printJobId?: StringNullableFilter<"Book"> | string | null
    printingDeadline?: DateTimeNullableFilter<"Book"> | Date | string | null
    ebookS3Key?: StringNullableFilter<"Book"> | string | null
    ebookFileName?: StringNullableFilter<"Book"> | string | null
    ebookFileType?: StringNullableFilter<"Book"> | string | null
    ebookExpiresAt?: DateTimeNullableFilter<"Book"> | Date | string | null
    createdAt?: DateTimeFilter<"Book"> | Date | string
    updatedAt?: DateTimeFilter<"Book"> | Date | string
  }

  export type OrderUpsertWithWhereUniqueWithoutUserInput = {
    where: OrderWhereUniqueInput
    update: XOR<OrderUpdateWithoutUserInput, OrderUncheckedUpdateWithoutUserInput>
    create: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput>
  }

  export type OrderUpdateWithWhereUniqueWithoutUserInput = {
    where: OrderWhereUniqueInput
    data: XOR<OrderUpdateWithoutUserInput, OrderUncheckedUpdateWithoutUserInput>
  }

  export type OrderUpdateManyWithWhereWithoutUserInput = {
    where: OrderScalarWhereInput
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyWithoutUserInput>
  }

  export type OrderScalarWhereInput = {
    AND?: OrderScalarWhereInput | OrderScalarWhereInput[]
    OR?: OrderScalarWhereInput[]
    NOT?: OrderScalarWhereInput | OrderScalarWhereInput[]
    id?: StringFilter<"Order"> | string
    orderNumber?: StringFilter<"Order"> | string
    productType?: EnumProductTypeFilter<"Order"> | $Enums.ProductType
    totalPrice?: DecimalFilter<"Order"> | Decimal | DecimalJsLike | number | string
    currency?: StringFilter<"Order"> | string
    status?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus
    paymentProvider?: StringFilter<"Order"> | string
    quantity?: IntFilter<"Order"> | number
    paymentId?: StringNullableFilter<"Order"> | string | null
    transactionId?: StringNullableFilter<"Order"> | string | null
    pricePaid?: FloatNullableFilter<"Order"> | number | null
    payerEmail?: StringNullableFilter<"Order"> | string | null
    shippingCost?: DecimalNullableFilter<"Order"> | Decimal | DecimalJsLike | number | string | null
    printingCost?: DecimalNullableFilter<"Order"> | Decimal | DecimalJsLike | number | string | null
    imagesCost?: DecimalNullableFilter<"Order"> | Decimal | DecimalJsLike | number | string | null
    shippingLevel?: EnumShippingLevelNullableFilter<"Order"> | $Enums.ShippingLevel | null
    phoneNumber?: StringNullableFilter<"Order"> | string | null
    name?: StringNullableFilter<"Order"> | string | null
    street1?: StringNullableFilter<"Order"> | string | null
    street2?: StringNullableFilter<"Order"> | string | null
    city?: StringNullableFilter<"Order"> | string | null
    state_code?: StringNullableFilter<"Order"> | string | null
    postcode?: StringNullableFilter<"Order"> | string | null
    country?: StringNullableFilter<"Order"> | string | null
    poProviderOrderId?: StringNullableFilter<"Order"> | string | null
    trackingNumber?: StringNullableFilter<"Order"> | string | null
    customerEmail?: StringFilter<"Order"> | string
    bookId?: StringFilter<"Order"> | string
    userId?: StringNullableFilter<"Order"> | string | null
    printJobId?: StringNullableFilter<"Order"> | string | null
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
    paidAt?: DateTimeNullableFilter<"Order"> | Date | string | null
    fulfilledAt?: DateTimeNullableFilter<"Order"> | Date | string | null
  }

  export type BookCreateWithoutGuestSessionInput = {
    id?: string
    title: string
    status?: $Enums.BookStatus
    characterImageReference?: string | null
    coverImage?: string | null
    coverImageOptions?: BookCreatecoverImageOptionsInput | string[]
    coverPrompt: string
    pageCount: number
    coverDedication?: string | null
    pageDedication?: string | null
    orderId?: string | null
    printJobId?: string | null
    printingDeadline?: Date | string | null
    ebookS3Key?: string | null
    ebookFileName?: string | null
    ebookFileType?: string | null
    ebookExpiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    pages?: PageCreateNestedManyWithoutBookInput
    character?: CharacterCreateNestedOneWithoutBookInput
    template: BookTemplateCreateNestedOneWithoutBooksInput
    user?: UserCreateNestedOneWithoutBooksInput
    imageGenerations?: ImageGenerationCreateNestedManyWithoutBookInput
    order?: OrderCreateNestedOneWithoutBookInput
    printJob?: PrintJobCreateNestedOneWithoutBookInput
  }

  export type BookUncheckedCreateWithoutGuestSessionInput = {
    id?: string
    title: string
    status?: $Enums.BookStatus
    characterImageReference?: string | null
    coverImage?: string | null
    coverImageOptions?: BookCreatecoverImageOptionsInput | string[]
    coverPrompt: string
    pageCount: number
    coverDedication?: string | null
    pageDedication?: string | null
    templateId: string
    userId?: string | null
    orderId?: string | null
    printJobId?: string | null
    printingDeadline?: Date | string | null
    ebookS3Key?: string | null
    ebookFileName?: string | null
    ebookFileType?: string | null
    ebookExpiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    pages?: PageUncheckedCreateNestedManyWithoutBookInput
    character?: CharacterUncheckedCreateNestedOneWithoutBookInput
    imageGenerations?: ImageGenerationUncheckedCreateNestedManyWithoutBookInput
    order?: OrderUncheckedCreateNestedOneWithoutBookInput
    printJob?: PrintJobUncheckedCreateNestedOneWithoutBookInput
  }

  export type BookCreateOrConnectWithoutGuestSessionInput = {
    where: BookWhereUniqueInput
    create: XOR<BookCreateWithoutGuestSessionInput, BookUncheckedCreateWithoutGuestSessionInput>
  }

  export type BookCreateManyGuestSessionInputEnvelope = {
    data: BookCreateManyGuestSessionInput | BookCreateManyGuestSessionInput[]
    skipDuplicates?: boolean
  }

  export type BookUpsertWithWhereUniqueWithoutGuestSessionInput = {
    where: BookWhereUniqueInput
    update: XOR<BookUpdateWithoutGuestSessionInput, BookUncheckedUpdateWithoutGuestSessionInput>
    create: XOR<BookCreateWithoutGuestSessionInput, BookUncheckedCreateWithoutGuestSessionInput>
  }

  export type BookUpdateWithWhereUniqueWithoutGuestSessionInput = {
    where: BookWhereUniqueInput
    data: XOR<BookUpdateWithoutGuestSessionInput, BookUncheckedUpdateWithoutGuestSessionInput>
  }

  export type BookUpdateManyWithWhereWithoutGuestSessionInput = {
    where: BookScalarWhereInput
    data: XOR<BookUpdateManyMutationInput, BookUncheckedUpdateManyWithoutGuestSessionInput>
  }

  export type BookTemplateCreateWithoutGenresInput = {
    id?: string
    title: string
    slug: string
    description: string
    pageCount: number
    published: boolean
    coverImage: string
    coverPrompt: string
    characterGender?: string
    minAge?: number
    maxAge?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    pages?: TemplatePageContentCreateNestedManyWithoutTemplateInput
    books?: BookCreateNestedManyWithoutTemplateInput
  }

  export type BookTemplateUncheckedCreateWithoutGenresInput = {
    id?: string
    title: string
    slug: string
    description: string
    pageCount: number
    published: boolean
    coverImage: string
    coverPrompt: string
    characterGender?: string
    minAge?: number
    maxAge?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    pages?: TemplatePageContentUncheckedCreateNestedManyWithoutTemplateInput
    books?: BookUncheckedCreateNestedManyWithoutTemplateInput
  }

  export type BookTemplateCreateOrConnectWithoutGenresInput = {
    where: BookTemplateWhereUniqueInput
    create: XOR<BookTemplateCreateWithoutGenresInput, BookTemplateUncheckedCreateWithoutGenresInput>
  }

  export type BookTemplateUpsertWithWhereUniqueWithoutGenresInput = {
    where: BookTemplateWhereUniqueInput
    update: XOR<BookTemplateUpdateWithoutGenresInput, BookTemplateUncheckedUpdateWithoutGenresInput>
    create: XOR<BookTemplateCreateWithoutGenresInput, BookTemplateUncheckedCreateWithoutGenresInput>
  }

  export type BookTemplateUpdateWithWhereUniqueWithoutGenresInput = {
    where: BookTemplateWhereUniqueInput
    data: XOR<BookTemplateUpdateWithoutGenresInput, BookTemplateUncheckedUpdateWithoutGenresInput>
  }

  export type BookTemplateUpdateManyWithWhereWithoutGenresInput = {
    where: BookTemplateScalarWhereInput
    data: XOR<BookTemplateUpdateManyMutationInput, BookTemplateUncheckedUpdateManyWithoutGenresInput>
  }

  export type BookTemplateScalarWhereInput = {
    AND?: BookTemplateScalarWhereInput | BookTemplateScalarWhereInput[]
    OR?: BookTemplateScalarWhereInput[]
    NOT?: BookTemplateScalarWhereInput | BookTemplateScalarWhereInput[]
    id?: StringFilter<"BookTemplate"> | string
    title?: StringFilter<"BookTemplate"> | string
    slug?: StringFilter<"BookTemplate"> | string
    description?: StringFilter<"BookTemplate"> | string
    pageCount?: IntFilter<"BookTemplate"> | number
    published?: BoolFilter<"BookTemplate"> | boolean
    coverImage?: StringFilter<"BookTemplate"> | string
    coverPrompt?: StringFilter<"BookTemplate"> | string
    characterGender?: StringFilter<"BookTemplate"> | string
    minAge?: IntFilter<"BookTemplate"> | number
    maxAge?: IntFilter<"BookTemplate"> | number
    createdAt?: DateTimeFilter<"BookTemplate"> | Date | string
    updatedAt?: DateTimeFilter<"BookTemplate"> | Date | string
  }

  export type PageCreateWithoutBookInput = {
    id?: string
    type?: $Enums.PageType
    pageNumber: number
    textContent?: string | null
    imagePrompt?: string | null
    imageUrl?: string | null
    imageOptions?: PageCreateimageOptionsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PageUncheckedCreateWithoutBookInput = {
    id?: string
    type?: $Enums.PageType
    pageNumber: number
    textContent?: string | null
    imagePrompt?: string | null
    imageUrl?: string | null
    imageOptions?: PageCreateimageOptionsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PageCreateOrConnectWithoutBookInput = {
    where: PageWhereUniqueInput
    create: XOR<PageCreateWithoutBookInput, PageUncheckedCreateWithoutBookInput>
  }

  export type PageCreateManyBookInputEnvelope = {
    data: PageCreateManyBookInput | PageCreateManyBookInput[]
    skipDuplicates?: boolean
  }

  export type CharacterCreateWithoutBookInput = {
    id?: string
    name: string
    age: number
    gender: string
    eyeColor?: string | null
    hairColor?: string | null
    hairStyle?: string | null
    skinTone?: string | null
    wearingGlasses?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CharacterUncheckedCreateWithoutBookInput = {
    id?: string
    name: string
    age: number
    gender: string
    eyeColor?: string | null
    hairColor?: string | null
    hairStyle?: string | null
    skinTone?: string | null
    wearingGlasses?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CharacterCreateOrConnectWithoutBookInput = {
    where: CharacterWhereUniqueInput
    create: XOR<CharacterCreateWithoutBookInput, CharacterUncheckedCreateWithoutBookInput>
  }

  export type BookTemplateCreateWithoutBooksInput = {
    id?: string
    title: string
    slug: string
    description: string
    pageCount: number
    published: boolean
    coverImage: string
    coverPrompt: string
    characterGender?: string
    minAge?: number
    maxAge?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    pages?: TemplatePageContentCreateNestedManyWithoutTemplateInput
    genres?: GenreCreateNestedManyWithoutTemplatesInput
  }

  export type BookTemplateUncheckedCreateWithoutBooksInput = {
    id?: string
    title: string
    slug: string
    description: string
    pageCount: number
    published: boolean
    coverImage: string
    coverPrompt: string
    characterGender?: string
    minAge?: number
    maxAge?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    pages?: TemplatePageContentUncheckedCreateNestedManyWithoutTemplateInput
    genres?: GenreUncheckedCreateNestedManyWithoutTemplatesInput
  }

  export type BookTemplateCreateOrConnectWithoutBooksInput = {
    where: BookTemplateWhereUniqueInput
    create: XOR<BookTemplateCreateWithoutBooksInput, BookTemplateUncheckedCreateWithoutBooksInput>
  }

  export type UserCreateWithoutBooksInput = {
    id?: string
    clerkId: string
    email: string
    isAdmin?: boolean
    firstName?: string | null
    lastName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: OrderCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutBooksInput = {
    id?: string
    clerkId: string
    email: string
    isAdmin?: boolean
    firstName?: string | null
    lastName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutBooksInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBooksInput, UserUncheckedCreateWithoutBooksInput>
  }

  export type GuestSessionCreateWithoutBooksInput = {
    id?: string
    sessionId: string
    lastActive?: Date | string
    createdAt?: Date | string
    expiresAt: Date | string
  }

  export type GuestSessionUncheckedCreateWithoutBooksInput = {
    id?: string
    sessionId: string
    lastActive?: Date | string
    createdAt?: Date | string
    expiresAt: Date | string
  }

  export type GuestSessionCreateOrConnectWithoutBooksInput = {
    where: GuestSessionWhereUniqueInput
    create: XOR<GuestSessionCreateWithoutBooksInput, GuestSessionUncheckedCreateWithoutBooksInput>
  }

  export type ImageGenerationCreateWithoutBookInput = {
    id?: string
    generationId: string
    pageId?: string | null
    type: $Enums.ImageType
    prompt: string
    status?: $Enums.GenerationStatus
    errorMessage?: string | null
    apiCreditCost?: number | null
    createdAt?: Date | string
    completedAt?: Date | string | null
  }

  export type ImageGenerationUncheckedCreateWithoutBookInput = {
    id?: string
    generationId: string
    pageId?: string | null
    type: $Enums.ImageType
    prompt: string
    status?: $Enums.GenerationStatus
    errorMessage?: string | null
    apiCreditCost?: number | null
    createdAt?: Date | string
    completedAt?: Date | string | null
  }

  export type ImageGenerationCreateOrConnectWithoutBookInput = {
    where: ImageGenerationWhereUniqueInput
    create: XOR<ImageGenerationCreateWithoutBookInput, ImageGenerationUncheckedCreateWithoutBookInput>
  }

  export type ImageGenerationCreateManyBookInputEnvelope = {
    data: ImageGenerationCreateManyBookInput | ImageGenerationCreateManyBookInput[]
    skipDuplicates?: boolean
  }

  export type OrderCreateWithoutBookInput = {
    id?: string
    orderNumber: string
    productType: $Enums.ProductType
    totalPrice: Decimal | DecimalJsLike | number | string
    currency?: string
    status?: $Enums.OrderStatus
    paymentProvider?: string
    quantity?: number
    paymentId?: string | null
    transactionId?: string | null
    pricePaid?: number | null
    payerEmail?: string | null
    shippingCost?: Decimal | DecimalJsLike | number | string | null
    printingCost?: Decimal | DecimalJsLike | number | string | null
    imagesCost?: Decimal | DecimalJsLike | number | string | null
    shippingLevel?: $Enums.ShippingLevel | null
    phoneNumber?: string | null
    name?: string | null
    street1?: string | null
    street2?: string | null
    city?: string | null
    state_code?: string | null
    postcode?: string | null
    country?: string | null
    poProviderOrderId?: string | null
    trackingNumber?: string | null
    customerEmail: string
    printJobId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    paidAt?: Date | string | null
    fulfilledAt?: Date | string | null
    user?: UserCreateNestedOneWithoutOrdersInput
    printJob?: PrintJobCreateNestedOneWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutBookInput = {
    id?: string
    orderNumber: string
    productType: $Enums.ProductType
    totalPrice: Decimal | DecimalJsLike | number | string
    currency?: string
    status?: $Enums.OrderStatus
    paymentProvider?: string
    quantity?: number
    paymentId?: string | null
    transactionId?: string | null
    pricePaid?: number | null
    payerEmail?: string | null
    shippingCost?: Decimal | DecimalJsLike | number | string | null
    printingCost?: Decimal | DecimalJsLike | number | string | null
    imagesCost?: Decimal | DecimalJsLike | number | string | null
    shippingLevel?: $Enums.ShippingLevel | null
    phoneNumber?: string | null
    name?: string | null
    street1?: string | null
    street2?: string | null
    city?: string | null
    state_code?: string | null
    postcode?: string | null
    country?: string | null
    poProviderOrderId?: string | null
    trackingNumber?: string | null
    customerEmail: string
    userId?: string | null
    printJobId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    paidAt?: Date | string | null
    fulfilledAt?: Date | string | null
    printJob?: PrintJobUncheckedCreateNestedOneWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutBookInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutBookInput, OrderUncheckedCreateWithoutBookInput>
  }

  export type PrintJobCreateWithoutBookInput = {
    id?: string
    luluPrintJobId?: number | null
    paymentId?: number | null
    podPackageId: string
    interiorPdfUrl?: string | null
    coverPdfUrl?: string | null
    interiorS3Key?: string | null
    coverS3Key?: string | null
    pageCount: number
    interiorValidationId?: number | null
    coverValidationId?: number | null
    interiorValidationStatus?: $Enums.FileValidationStatus
    coverValidationStatus?: $Enums.FileValidationStatus
    validationErrors?: PrintJobCreatevalidationErrorsInput | string[]
    status?: $Enums.PrintJobStatus
    statusMessage?: string | null
    currency?: string
    printingCostExclTax?: Decimal | DecimalJsLike | number | string | null
    printingCostInclTax?: Decimal | DecimalJsLike | number | string | null
    shippingCostExclTax?: Decimal | DecimalJsLike | number | string | null
    shippingCostInclTax?: Decimal | DecimalJsLike | number | string | null
    totalCostExclTax?: Decimal | DecimalJsLike | number | string | null
    totalCostInclTax?: Decimal | DecimalJsLike | number | string | null
    totalTax?: Decimal | DecimalJsLike | number | string | null
    trackingNumber?: string | null
    trackingUrls?: PrintJobCreatetrackingUrlsInput | string[]
    shippingCarrier?: string | null
    estimatedShipDate?: Date | string | null
    estimatedDeliveryDate?: Date | string | null
    attempts?: number
    errorMessage?: string | null
    sentByAdminId?: string | null
    adminNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sentToPrinterAt?: Date | string | null
    paidAt?: Date | string | null
    inProductionAt?: Date | string | null
    shippedAt?: Date | string | null
    order: OrderCreateNestedOneWithoutPrintJobInput
  }

  export type PrintJobUncheckedCreateWithoutBookInput = {
    id?: string
    orderId: string
    luluPrintJobId?: number | null
    paymentId?: number | null
    podPackageId: string
    interiorPdfUrl?: string | null
    coverPdfUrl?: string | null
    interiorS3Key?: string | null
    coverS3Key?: string | null
    pageCount: number
    interiorValidationId?: number | null
    coverValidationId?: number | null
    interiorValidationStatus?: $Enums.FileValidationStatus
    coverValidationStatus?: $Enums.FileValidationStatus
    validationErrors?: PrintJobCreatevalidationErrorsInput | string[]
    status?: $Enums.PrintJobStatus
    statusMessage?: string | null
    currency?: string
    printingCostExclTax?: Decimal | DecimalJsLike | number | string | null
    printingCostInclTax?: Decimal | DecimalJsLike | number | string | null
    shippingCostExclTax?: Decimal | DecimalJsLike | number | string | null
    shippingCostInclTax?: Decimal | DecimalJsLike | number | string | null
    totalCostExclTax?: Decimal | DecimalJsLike | number | string | null
    totalCostInclTax?: Decimal | DecimalJsLike | number | string | null
    totalTax?: Decimal | DecimalJsLike | number | string | null
    trackingNumber?: string | null
    trackingUrls?: PrintJobCreatetrackingUrlsInput | string[]
    shippingCarrier?: string | null
    estimatedShipDate?: Date | string | null
    estimatedDeliveryDate?: Date | string | null
    attempts?: number
    errorMessage?: string | null
    sentByAdminId?: string | null
    adminNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sentToPrinterAt?: Date | string | null
    paidAt?: Date | string | null
    inProductionAt?: Date | string | null
    shippedAt?: Date | string | null
  }

  export type PrintJobCreateOrConnectWithoutBookInput = {
    where: PrintJobWhereUniqueInput
    create: XOR<PrintJobCreateWithoutBookInput, PrintJobUncheckedCreateWithoutBookInput>
  }

  export type PageUpsertWithWhereUniqueWithoutBookInput = {
    where: PageWhereUniqueInput
    update: XOR<PageUpdateWithoutBookInput, PageUncheckedUpdateWithoutBookInput>
    create: XOR<PageCreateWithoutBookInput, PageUncheckedCreateWithoutBookInput>
  }

  export type PageUpdateWithWhereUniqueWithoutBookInput = {
    where: PageWhereUniqueInput
    data: XOR<PageUpdateWithoutBookInput, PageUncheckedUpdateWithoutBookInput>
  }

  export type PageUpdateManyWithWhereWithoutBookInput = {
    where: PageScalarWhereInput
    data: XOR<PageUpdateManyMutationInput, PageUncheckedUpdateManyWithoutBookInput>
  }

  export type PageScalarWhereInput = {
    AND?: PageScalarWhereInput | PageScalarWhereInput[]
    OR?: PageScalarWhereInput[]
    NOT?: PageScalarWhereInput | PageScalarWhereInput[]
    id?: StringFilter<"Page"> | string
    type?: EnumPageTypeFilter<"Page"> | $Enums.PageType
    pageNumber?: IntFilter<"Page"> | number
    textContent?: StringNullableFilter<"Page"> | string | null
    imagePrompt?: StringNullableFilter<"Page"> | string | null
    imageUrl?: StringNullableFilter<"Page"> | string | null
    imageOptions?: StringNullableListFilter<"Page">
    bookId?: StringFilter<"Page"> | string
    createdAt?: DateTimeFilter<"Page"> | Date | string
    updatedAt?: DateTimeFilter<"Page"> | Date | string
  }

  export type CharacterUpsertWithoutBookInput = {
    update: XOR<CharacterUpdateWithoutBookInput, CharacterUncheckedUpdateWithoutBookInput>
    create: XOR<CharacterCreateWithoutBookInput, CharacterUncheckedCreateWithoutBookInput>
    where?: CharacterWhereInput
  }

  export type CharacterUpdateToOneWithWhereWithoutBookInput = {
    where?: CharacterWhereInput
    data: XOR<CharacterUpdateWithoutBookInput, CharacterUncheckedUpdateWithoutBookInput>
  }

  export type CharacterUpdateWithoutBookInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    gender?: StringFieldUpdateOperationsInput | string
    eyeColor?: NullableStringFieldUpdateOperationsInput | string | null
    hairColor?: NullableStringFieldUpdateOperationsInput | string | null
    hairStyle?: NullableStringFieldUpdateOperationsInput | string | null
    skinTone?: NullableStringFieldUpdateOperationsInput | string | null
    wearingGlasses?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CharacterUncheckedUpdateWithoutBookInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    gender?: StringFieldUpdateOperationsInput | string
    eyeColor?: NullableStringFieldUpdateOperationsInput | string | null
    hairColor?: NullableStringFieldUpdateOperationsInput | string | null
    hairStyle?: NullableStringFieldUpdateOperationsInput | string | null
    skinTone?: NullableStringFieldUpdateOperationsInput | string | null
    wearingGlasses?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookTemplateUpsertWithoutBooksInput = {
    update: XOR<BookTemplateUpdateWithoutBooksInput, BookTemplateUncheckedUpdateWithoutBooksInput>
    create: XOR<BookTemplateCreateWithoutBooksInput, BookTemplateUncheckedCreateWithoutBooksInput>
    where?: BookTemplateWhereInput
  }

  export type BookTemplateUpdateToOneWithWhereWithoutBooksInput = {
    where?: BookTemplateWhereInput
    data: XOR<BookTemplateUpdateWithoutBooksInput, BookTemplateUncheckedUpdateWithoutBooksInput>
  }

  export type BookTemplateUpdateWithoutBooksInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    pageCount?: IntFieldUpdateOperationsInput | number
    published?: BoolFieldUpdateOperationsInput | boolean
    coverImage?: StringFieldUpdateOperationsInput | string
    coverPrompt?: StringFieldUpdateOperationsInput | string
    characterGender?: StringFieldUpdateOperationsInput | string
    minAge?: IntFieldUpdateOperationsInput | number
    maxAge?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pages?: TemplatePageContentUpdateManyWithoutTemplateNestedInput
    genres?: GenreUpdateManyWithoutTemplatesNestedInput
  }

  export type BookTemplateUncheckedUpdateWithoutBooksInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    pageCount?: IntFieldUpdateOperationsInput | number
    published?: BoolFieldUpdateOperationsInput | boolean
    coverImage?: StringFieldUpdateOperationsInput | string
    coverPrompt?: StringFieldUpdateOperationsInput | string
    characterGender?: StringFieldUpdateOperationsInput | string
    minAge?: IntFieldUpdateOperationsInput | number
    maxAge?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pages?: TemplatePageContentUncheckedUpdateManyWithoutTemplateNestedInput
    genres?: GenreUncheckedUpdateManyWithoutTemplatesNestedInput
  }

  export type UserUpsertWithoutBooksInput = {
    update: XOR<UserUpdateWithoutBooksInput, UserUncheckedUpdateWithoutBooksInput>
    create: XOR<UserCreateWithoutBooksInput, UserUncheckedCreateWithoutBooksInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBooksInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBooksInput, UserUncheckedUpdateWithoutBooksInput>
  }

  export type UserUpdateWithoutBooksInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutBooksInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutUserNestedInput
  }

  export type GuestSessionUpsertWithoutBooksInput = {
    update: XOR<GuestSessionUpdateWithoutBooksInput, GuestSessionUncheckedUpdateWithoutBooksInput>
    create: XOR<GuestSessionCreateWithoutBooksInput, GuestSessionUncheckedCreateWithoutBooksInput>
    where?: GuestSessionWhereInput
  }

  export type GuestSessionUpdateToOneWithWhereWithoutBooksInput = {
    where?: GuestSessionWhereInput
    data: XOR<GuestSessionUpdateWithoutBooksInput, GuestSessionUncheckedUpdateWithoutBooksInput>
  }

  export type GuestSessionUpdateWithoutBooksInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    lastActive?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GuestSessionUncheckedUpdateWithoutBooksInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    lastActive?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ImageGenerationUpsertWithWhereUniqueWithoutBookInput = {
    where: ImageGenerationWhereUniqueInput
    update: XOR<ImageGenerationUpdateWithoutBookInput, ImageGenerationUncheckedUpdateWithoutBookInput>
    create: XOR<ImageGenerationCreateWithoutBookInput, ImageGenerationUncheckedCreateWithoutBookInput>
  }

  export type ImageGenerationUpdateWithWhereUniqueWithoutBookInput = {
    where: ImageGenerationWhereUniqueInput
    data: XOR<ImageGenerationUpdateWithoutBookInput, ImageGenerationUncheckedUpdateWithoutBookInput>
  }

  export type ImageGenerationUpdateManyWithWhereWithoutBookInput = {
    where: ImageGenerationScalarWhereInput
    data: XOR<ImageGenerationUpdateManyMutationInput, ImageGenerationUncheckedUpdateManyWithoutBookInput>
  }

  export type ImageGenerationScalarWhereInput = {
    AND?: ImageGenerationScalarWhereInput | ImageGenerationScalarWhereInput[]
    OR?: ImageGenerationScalarWhereInput[]
    NOT?: ImageGenerationScalarWhereInput | ImageGenerationScalarWhereInput[]
    id?: StringFilter<"ImageGeneration"> | string
    generationId?: StringFilter<"ImageGeneration"> | string
    bookId?: StringFilter<"ImageGeneration"> | string
    pageId?: StringNullableFilter<"ImageGeneration"> | string | null
    type?: EnumImageTypeFilter<"ImageGeneration"> | $Enums.ImageType
    prompt?: StringFilter<"ImageGeneration"> | string
    status?: EnumGenerationStatusFilter<"ImageGeneration"> | $Enums.GenerationStatus
    errorMessage?: StringNullableFilter<"ImageGeneration"> | string | null
    apiCreditCost?: FloatNullableFilter<"ImageGeneration"> | number | null
    createdAt?: DateTimeFilter<"ImageGeneration"> | Date | string
    completedAt?: DateTimeNullableFilter<"ImageGeneration"> | Date | string | null
  }

  export type OrderUpsertWithoutBookInput = {
    update: XOR<OrderUpdateWithoutBookInput, OrderUncheckedUpdateWithoutBookInput>
    create: XOR<OrderCreateWithoutBookInput, OrderUncheckedCreateWithoutBookInput>
    where?: OrderWhereInput
  }

  export type OrderUpdateToOneWithWhereWithoutBookInput = {
    where?: OrderWhereInput
    data: XOR<OrderUpdateWithoutBookInput, OrderUncheckedUpdateWithoutBookInput>
  }

  export type OrderUpdateWithoutBookInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: StringFieldUpdateOperationsInput | string
    productType?: EnumProductTypeFieldUpdateOperationsInput | $Enums.ProductType
    totalPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    paymentProvider?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    pricePaid?: NullableFloatFieldUpdateOperationsInput | number | null
    payerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    shippingCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    printingCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    imagesCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    shippingLevel?: NullableEnumShippingLevelFieldUpdateOperationsInput | $Enums.ShippingLevel | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    street1?: NullableStringFieldUpdateOperationsInput | string | null
    street2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state_code?: NullableStringFieldUpdateOperationsInput | string | null
    postcode?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    poProviderOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    trackingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    customerEmail?: StringFieldUpdateOperationsInput | string
    printJobId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fulfilledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneWithoutOrdersNestedInput
    printJob?: PrintJobUpdateOneWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutBookInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: StringFieldUpdateOperationsInput | string
    productType?: EnumProductTypeFieldUpdateOperationsInput | $Enums.ProductType
    totalPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    paymentProvider?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    pricePaid?: NullableFloatFieldUpdateOperationsInput | number | null
    payerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    shippingCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    printingCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    imagesCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    shippingLevel?: NullableEnumShippingLevelFieldUpdateOperationsInput | $Enums.ShippingLevel | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    street1?: NullableStringFieldUpdateOperationsInput | string | null
    street2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state_code?: NullableStringFieldUpdateOperationsInput | string | null
    postcode?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    poProviderOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    trackingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    customerEmail?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    printJobId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fulfilledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    printJob?: PrintJobUncheckedUpdateOneWithoutOrderNestedInput
  }

  export type PrintJobUpsertWithoutBookInput = {
    update: XOR<PrintJobUpdateWithoutBookInput, PrintJobUncheckedUpdateWithoutBookInput>
    create: XOR<PrintJobCreateWithoutBookInput, PrintJobUncheckedCreateWithoutBookInput>
    where?: PrintJobWhereInput
  }

  export type PrintJobUpdateToOneWithWhereWithoutBookInput = {
    where?: PrintJobWhereInput
    data: XOR<PrintJobUpdateWithoutBookInput, PrintJobUncheckedUpdateWithoutBookInput>
  }

  export type PrintJobUpdateWithoutBookInput = {
    id?: StringFieldUpdateOperationsInput | string
    luluPrintJobId?: NullableIntFieldUpdateOperationsInput | number | null
    paymentId?: NullableIntFieldUpdateOperationsInput | number | null
    podPackageId?: StringFieldUpdateOperationsInput | string
    interiorPdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverPdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    interiorS3Key?: NullableStringFieldUpdateOperationsInput | string | null
    coverS3Key?: NullableStringFieldUpdateOperationsInput | string | null
    pageCount?: IntFieldUpdateOperationsInput | number
    interiorValidationId?: NullableIntFieldUpdateOperationsInput | number | null
    coverValidationId?: NullableIntFieldUpdateOperationsInput | number | null
    interiorValidationStatus?: EnumFileValidationStatusFieldUpdateOperationsInput | $Enums.FileValidationStatus
    coverValidationStatus?: EnumFileValidationStatusFieldUpdateOperationsInput | $Enums.FileValidationStatus
    validationErrors?: PrintJobUpdatevalidationErrorsInput | string[]
    status?: EnumPrintJobStatusFieldUpdateOperationsInput | $Enums.PrintJobStatus
    statusMessage?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    printingCostExclTax?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    printingCostInclTax?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    shippingCostExclTax?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    shippingCostInclTax?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalCostExclTax?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalCostInclTax?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalTax?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    trackingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    trackingUrls?: PrintJobUpdatetrackingUrlsInput | string[]
    shippingCarrier?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedShipDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estimatedDeliveryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    attempts?: IntFieldUpdateOperationsInput | number
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    sentByAdminId?: NullableStringFieldUpdateOperationsInput | string | null
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentToPrinterAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    inProductionAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    shippedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    order?: OrderUpdateOneRequiredWithoutPrintJobNestedInput
  }

  export type PrintJobUncheckedUpdateWithoutBookInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    luluPrintJobId?: NullableIntFieldUpdateOperationsInput | number | null
    paymentId?: NullableIntFieldUpdateOperationsInput | number | null
    podPackageId?: StringFieldUpdateOperationsInput | string
    interiorPdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverPdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    interiorS3Key?: NullableStringFieldUpdateOperationsInput | string | null
    coverS3Key?: NullableStringFieldUpdateOperationsInput | string | null
    pageCount?: IntFieldUpdateOperationsInput | number
    interiorValidationId?: NullableIntFieldUpdateOperationsInput | number | null
    coverValidationId?: NullableIntFieldUpdateOperationsInput | number | null
    interiorValidationStatus?: EnumFileValidationStatusFieldUpdateOperationsInput | $Enums.FileValidationStatus
    coverValidationStatus?: EnumFileValidationStatusFieldUpdateOperationsInput | $Enums.FileValidationStatus
    validationErrors?: PrintJobUpdatevalidationErrorsInput | string[]
    status?: EnumPrintJobStatusFieldUpdateOperationsInput | $Enums.PrintJobStatus
    statusMessage?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    printingCostExclTax?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    printingCostInclTax?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    shippingCostExclTax?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    shippingCostInclTax?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalCostExclTax?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalCostInclTax?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalTax?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    trackingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    trackingUrls?: PrintJobUpdatetrackingUrlsInput | string[]
    shippingCarrier?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedShipDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estimatedDeliveryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    attempts?: IntFieldUpdateOperationsInput | number
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    sentByAdminId?: NullableStringFieldUpdateOperationsInput | string | null
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentToPrinterAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    inProductionAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    shippedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BookCreateWithoutCharacterInput = {
    id?: string
    title: string
    status?: $Enums.BookStatus
    characterImageReference?: string | null
    coverImage?: string | null
    coverImageOptions?: BookCreatecoverImageOptionsInput | string[]
    coverPrompt: string
    pageCount: number
    coverDedication?: string | null
    pageDedication?: string | null
    orderId?: string | null
    printJobId?: string | null
    printingDeadline?: Date | string | null
    ebookS3Key?: string | null
    ebookFileName?: string | null
    ebookFileType?: string | null
    ebookExpiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    pages?: PageCreateNestedManyWithoutBookInput
    template: BookTemplateCreateNestedOneWithoutBooksInput
    user?: UserCreateNestedOneWithoutBooksInput
    guestSession?: GuestSessionCreateNestedOneWithoutBooksInput
    imageGenerations?: ImageGenerationCreateNestedManyWithoutBookInput
    order?: OrderCreateNestedOneWithoutBookInput
    printJob?: PrintJobCreateNestedOneWithoutBookInput
  }

  export type BookUncheckedCreateWithoutCharacterInput = {
    id?: string
    title: string
    status?: $Enums.BookStatus
    characterImageReference?: string | null
    coverImage?: string | null
    coverImageOptions?: BookCreatecoverImageOptionsInput | string[]
    coverPrompt: string
    pageCount: number
    coverDedication?: string | null
    pageDedication?: string | null
    templateId: string
    userId?: string | null
    guestSessionId?: string | null
    orderId?: string | null
    printJobId?: string | null
    printingDeadline?: Date | string | null
    ebookS3Key?: string | null
    ebookFileName?: string | null
    ebookFileType?: string | null
    ebookExpiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    pages?: PageUncheckedCreateNestedManyWithoutBookInput
    imageGenerations?: ImageGenerationUncheckedCreateNestedManyWithoutBookInput
    order?: OrderUncheckedCreateNestedOneWithoutBookInput
    printJob?: PrintJobUncheckedCreateNestedOneWithoutBookInput
  }

  export type BookCreateOrConnectWithoutCharacterInput = {
    where: BookWhereUniqueInput
    create: XOR<BookCreateWithoutCharacterInput, BookUncheckedCreateWithoutCharacterInput>
  }

  export type BookUpsertWithoutCharacterInput = {
    update: XOR<BookUpdateWithoutCharacterInput, BookUncheckedUpdateWithoutCharacterInput>
    create: XOR<BookCreateWithoutCharacterInput, BookUncheckedCreateWithoutCharacterInput>
    where?: BookWhereInput
  }

  export type BookUpdateToOneWithWhereWithoutCharacterInput = {
    where?: BookWhereInput
    data: XOR<BookUpdateWithoutCharacterInput, BookUncheckedUpdateWithoutCharacterInput>
  }

  export type BookUpdateWithoutCharacterInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumBookStatusFieldUpdateOperationsInput | $Enums.BookStatus
    characterImageReference?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageOptions?: BookUpdatecoverImageOptionsInput | string[]
    coverPrompt?: StringFieldUpdateOperationsInput | string
    pageCount?: IntFieldUpdateOperationsInput | number
    coverDedication?: NullableStringFieldUpdateOperationsInput | string | null
    pageDedication?: NullableStringFieldUpdateOperationsInput | string | null
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    printJobId?: NullableStringFieldUpdateOperationsInput | string | null
    printingDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ebookS3Key?: NullableStringFieldUpdateOperationsInput | string | null
    ebookFileName?: NullableStringFieldUpdateOperationsInput | string | null
    ebookFileType?: NullableStringFieldUpdateOperationsInput | string | null
    ebookExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pages?: PageUpdateManyWithoutBookNestedInput
    template?: BookTemplateUpdateOneRequiredWithoutBooksNestedInput
    user?: UserUpdateOneWithoutBooksNestedInput
    guestSession?: GuestSessionUpdateOneWithoutBooksNestedInput
    imageGenerations?: ImageGenerationUpdateManyWithoutBookNestedInput
    order?: OrderUpdateOneWithoutBookNestedInput
    printJob?: PrintJobUpdateOneWithoutBookNestedInput
  }

  export type BookUncheckedUpdateWithoutCharacterInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumBookStatusFieldUpdateOperationsInput | $Enums.BookStatus
    characterImageReference?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageOptions?: BookUpdatecoverImageOptionsInput | string[]
    coverPrompt?: StringFieldUpdateOperationsInput | string
    pageCount?: IntFieldUpdateOperationsInput | number
    coverDedication?: NullableStringFieldUpdateOperationsInput | string | null
    pageDedication?: NullableStringFieldUpdateOperationsInput | string | null
    templateId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    guestSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    printJobId?: NullableStringFieldUpdateOperationsInput | string | null
    printingDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ebookS3Key?: NullableStringFieldUpdateOperationsInput | string | null
    ebookFileName?: NullableStringFieldUpdateOperationsInput | string | null
    ebookFileType?: NullableStringFieldUpdateOperationsInput | string | null
    ebookExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pages?: PageUncheckedUpdateManyWithoutBookNestedInput
    imageGenerations?: ImageGenerationUncheckedUpdateManyWithoutBookNestedInput
    order?: OrderUncheckedUpdateOneWithoutBookNestedInput
    printJob?: PrintJobUncheckedUpdateOneWithoutBookNestedInput
  }

  export type TemplatePageContentCreateWithoutTemplateInput = {
    id?: string
    pageNumber: number
    content: string
    imagePrompt: string
    imageUrl: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TemplatePageContentUncheckedCreateWithoutTemplateInput = {
    id?: string
    pageNumber: number
    content: string
    imagePrompt: string
    imageUrl: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TemplatePageContentCreateOrConnectWithoutTemplateInput = {
    where: TemplatePageContentWhereUniqueInput
    create: XOR<TemplatePageContentCreateWithoutTemplateInput, TemplatePageContentUncheckedCreateWithoutTemplateInput>
  }

  export type TemplatePageContentCreateManyTemplateInputEnvelope = {
    data: TemplatePageContentCreateManyTemplateInput | TemplatePageContentCreateManyTemplateInput[]
    skipDuplicates?: boolean
  }

  export type BookCreateWithoutTemplateInput = {
    id?: string
    title: string
    status?: $Enums.BookStatus
    characterImageReference?: string | null
    coverImage?: string | null
    coverImageOptions?: BookCreatecoverImageOptionsInput | string[]
    coverPrompt: string
    pageCount: number
    coverDedication?: string | null
    pageDedication?: string | null
    orderId?: string | null
    printJobId?: string | null
    printingDeadline?: Date | string | null
    ebookS3Key?: string | null
    ebookFileName?: string | null
    ebookFileType?: string | null
    ebookExpiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    pages?: PageCreateNestedManyWithoutBookInput
    character?: CharacterCreateNestedOneWithoutBookInput
    user?: UserCreateNestedOneWithoutBooksInput
    guestSession?: GuestSessionCreateNestedOneWithoutBooksInput
    imageGenerations?: ImageGenerationCreateNestedManyWithoutBookInput
    order?: OrderCreateNestedOneWithoutBookInput
    printJob?: PrintJobCreateNestedOneWithoutBookInput
  }

  export type BookUncheckedCreateWithoutTemplateInput = {
    id?: string
    title: string
    status?: $Enums.BookStatus
    characterImageReference?: string | null
    coverImage?: string | null
    coverImageOptions?: BookCreatecoverImageOptionsInput | string[]
    coverPrompt: string
    pageCount: number
    coverDedication?: string | null
    pageDedication?: string | null
    userId?: string | null
    guestSessionId?: string | null
    orderId?: string | null
    printJobId?: string | null
    printingDeadline?: Date | string | null
    ebookS3Key?: string | null
    ebookFileName?: string | null
    ebookFileType?: string | null
    ebookExpiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    pages?: PageUncheckedCreateNestedManyWithoutBookInput
    character?: CharacterUncheckedCreateNestedOneWithoutBookInput
    imageGenerations?: ImageGenerationUncheckedCreateNestedManyWithoutBookInput
    order?: OrderUncheckedCreateNestedOneWithoutBookInput
    printJob?: PrintJobUncheckedCreateNestedOneWithoutBookInput
  }

  export type BookCreateOrConnectWithoutTemplateInput = {
    where: BookWhereUniqueInput
    create: XOR<BookCreateWithoutTemplateInput, BookUncheckedCreateWithoutTemplateInput>
  }

  export type BookCreateManyTemplateInputEnvelope = {
    data: BookCreateManyTemplateInput | BookCreateManyTemplateInput[]
    skipDuplicates?: boolean
  }

  export type GenreCreateWithoutTemplatesInput = {
    id?: string
    name: string
  }

  export type GenreUncheckedCreateWithoutTemplatesInput = {
    id?: string
    name: string
  }

  export type GenreCreateOrConnectWithoutTemplatesInput = {
    where: GenreWhereUniqueInput
    create: XOR<GenreCreateWithoutTemplatesInput, GenreUncheckedCreateWithoutTemplatesInput>
  }

  export type TemplatePageContentUpsertWithWhereUniqueWithoutTemplateInput = {
    where: TemplatePageContentWhereUniqueInput
    update: XOR<TemplatePageContentUpdateWithoutTemplateInput, TemplatePageContentUncheckedUpdateWithoutTemplateInput>
    create: XOR<TemplatePageContentCreateWithoutTemplateInput, TemplatePageContentUncheckedCreateWithoutTemplateInput>
  }

  export type TemplatePageContentUpdateWithWhereUniqueWithoutTemplateInput = {
    where: TemplatePageContentWhereUniqueInput
    data: XOR<TemplatePageContentUpdateWithoutTemplateInput, TemplatePageContentUncheckedUpdateWithoutTemplateInput>
  }

  export type TemplatePageContentUpdateManyWithWhereWithoutTemplateInput = {
    where: TemplatePageContentScalarWhereInput
    data: XOR<TemplatePageContentUpdateManyMutationInput, TemplatePageContentUncheckedUpdateManyWithoutTemplateInput>
  }

  export type TemplatePageContentScalarWhereInput = {
    AND?: TemplatePageContentScalarWhereInput | TemplatePageContentScalarWhereInput[]
    OR?: TemplatePageContentScalarWhereInput[]
    NOT?: TemplatePageContentScalarWhereInput | TemplatePageContentScalarWhereInput[]
    id?: StringFilter<"TemplatePageContent"> | string
    pageNumber?: IntFilter<"TemplatePageContent"> | number
    content?: StringFilter<"TemplatePageContent"> | string
    imagePrompt?: StringFilter<"TemplatePageContent"> | string
    imageUrl?: StringFilter<"TemplatePageContent"> | string
    templateId?: StringFilter<"TemplatePageContent"> | string
    createdAt?: DateTimeFilter<"TemplatePageContent"> | Date | string
    updatedAt?: DateTimeFilter<"TemplatePageContent"> | Date | string
  }

  export type BookUpsertWithWhereUniqueWithoutTemplateInput = {
    where: BookWhereUniqueInput
    update: XOR<BookUpdateWithoutTemplateInput, BookUncheckedUpdateWithoutTemplateInput>
    create: XOR<BookCreateWithoutTemplateInput, BookUncheckedCreateWithoutTemplateInput>
  }

  export type BookUpdateWithWhereUniqueWithoutTemplateInput = {
    where: BookWhereUniqueInput
    data: XOR<BookUpdateWithoutTemplateInput, BookUncheckedUpdateWithoutTemplateInput>
  }

  export type BookUpdateManyWithWhereWithoutTemplateInput = {
    where: BookScalarWhereInput
    data: XOR<BookUpdateManyMutationInput, BookUncheckedUpdateManyWithoutTemplateInput>
  }

  export type GenreUpsertWithWhereUniqueWithoutTemplatesInput = {
    where: GenreWhereUniqueInput
    update: XOR<GenreUpdateWithoutTemplatesInput, GenreUncheckedUpdateWithoutTemplatesInput>
    create: XOR<GenreCreateWithoutTemplatesInput, GenreUncheckedCreateWithoutTemplatesInput>
  }

  export type GenreUpdateWithWhereUniqueWithoutTemplatesInput = {
    where: GenreWhereUniqueInput
    data: XOR<GenreUpdateWithoutTemplatesInput, GenreUncheckedUpdateWithoutTemplatesInput>
  }

  export type GenreUpdateManyWithWhereWithoutTemplatesInput = {
    where: GenreScalarWhereInput
    data: XOR<GenreUpdateManyMutationInput, GenreUncheckedUpdateManyWithoutTemplatesInput>
  }

  export type GenreScalarWhereInput = {
    AND?: GenreScalarWhereInput | GenreScalarWhereInput[]
    OR?: GenreScalarWhereInput[]
    NOT?: GenreScalarWhereInput | GenreScalarWhereInput[]
    id?: StringFilter<"Genre"> | string
    name?: StringFilter<"Genre"> | string
  }

  export type BookTemplateCreateWithoutPagesInput = {
    id?: string
    title: string
    slug: string
    description: string
    pageCount: number
    published: boolean
    coverImage: string
    coverPrompt: string
    characterGender?: string
    minAge?: number
    maxAge?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    books?: BookCreateNestedManyWithoutTemplateInput
    genres?: GenreCreateNestedManyWithoutTemplatesInput
  }

  export type BookTemplateUncheckedCreateWithoutPagesInput = {
    id?: string
    title: string
    slug: string
    description: string
    pageCount: number
    published: boolean
    coverImage: string
    coverPrompt: string
    characterGender?: string
    minAge?: number
    maxAge?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    books?: BookUncheckedCreateNestedManyWithoutTemplateInput
    genres?: GenreUncheckedCreateNestedManyWithoutTemplatesInput
  }

  export type BookTemplateCreateOrConnectWithoutPagesInput = {
    where: BookTemplateWhereUniqueInput
    create: XOR<BookTemplateCreateWithoutPagesInput, BookTemplateUncheckedCreateWithoutPagesInput>
  }

  export type BookTemplateUpsertWithoutPagesInput = {
    update: XOR<BookTemplateUpdateWithoutPagesInput, BookTemplateUncheckedUpdateWithoutPagesInput>
    create: XOR<BookTemplateCreateWithoutPagesInput, BookTemplateUncheckedCreateWithoutPagesInput>
    where?: BookTemplateWhereInput
  }

  export type BookTemplateUpdateToOneWithWhereWithoutPagesInput = {
    where?: BookTemplateWhereInput
    data: XOR<BookTemplateUpdateWithoutPagesInput, BookTemplateUncheckedUpdateWithoutPagesInput>
  }

  export type BookTemplateUpdateWithoutPagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    pageCount?: IntFieldUpdateOperationsInput | number
    published?: BoolFieldUpdateOperationsInput | boolean
    coverImage?: StringFieldUpdateOperationsInput | string
    coverPrompt?: StringFieldUpdateOperationsInput | string
    characterGender?: StringFieldUpdateOperationsInput | string
    minAge?: IntFieldUpdateOperationsInput | number
    maxAge?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    books?: BookUpdateManyWithoutTemplateNestedInput
    genres?: GenreUpdateManyWithoutTemplatesNestedInput
  }

  export type BookTemplateUncheckedUpdateWithoutPagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    pageCount?: IntFieldUpdateOperationsInput | number
    published?: BoolFieldUpdateOperationsInput | boolean
    coverImage?: StringFieldUpdateOperationsInput | string
    coverPrompt?: StringFieldUpdateOperationsInput | string
    characterGender?: StringFieldUpdateOperationsInput | string
    minAge?: IntFieldUpdateOperationsInput | number
    maxAge?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    books?: BookUncheckedUpdateManyWithoutTemplateNestedInput
    genres?: GenreUncheckedUpdateManyWithoutTemplatesNestedInput
  }

  export type BookCreateWithoutPagesInput = {
    id?: string
    title: string
    status?: $Enums.BookStatus
    characterImageReference?: string | null
    coverImage?: string | null
    coverImageOptions?: BookCreatecoverImageOptionsInput | string[]
    coverPrompt: string
    pageCount: number
    coverDedication?: string | null
    pageDedication?: string | null
    orderId?: string | null
    printJobId?: string | null
    printingDeadline?: Date | string | null
    ebookS3Key?: string | null
    ebookFileName?: string | null
    ebookFileType?: string | null
    ebookExpiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    character?: CharacterCreateNestedOneWithoutBookInput
    template: BookTemplateCreateNestedOneWithoutBooksInput
    user?: UserCreateNestedOneWithoutBooksInput
    guestSession?: GuestSessionCreateNestedOneWithoutBooksInput
    imageGenerations?: ImageGenerationCreateNestedManyWithoutBookInput
    order?: OrderCreateNestedOneWithoutBookInput
    printJob?: PrintJobCreateNestedOneWithoutBookInput
  }

  export type BookUncheckedCreateWithoutPagesInput = {
    id?: string
    title: string
    status?: $Enums.BookStatus
    characterImageReference?: string | null
    coverImage?: string | null
    coverImageOptions?: BookCreatecoverImageOptionsInput | string[]
    coverPrompt: string
    pageCount: number
    coverDedication?: string | null
    pageDedication?: string | null
    templateId: string
    userId?: string | null
    guestSessionId?: string | null
    orderId?: string | null
    printJobId?: string | null
    printingDeadline?: Date | string | null
    ebookS3Key?: string | null
    ebookFileName?: string | null
    ebookFileType?: string | null
    ebookExpiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    character?: CharacterUncheckedCreateNestedOneWithoutBookInput
    imageGenerations?: ImageGenerationUncheckedCreateNestedManyWithoutBookInput
    order?: OrderUncheckedCreateNestedOneWithoutBookInput
    printJob?: PrintJobUncheckedCreateNestedOneWithoutBookInput
  }

  export type BookCreateOrConnectWithoutPagesInput = {
    where: BookWhereUniqueInput
    create: XOR<BookCreateWithoutPagesInput, BookUncheckedCreateWithoutPagesInput>
  }

  export type BookUpsertWithoutPagesInput = {
    update: XOR<BookUpdateWithoutPagesInput, BookUncheckedUpdateWithoutPagesInput>
    create: XOR<BookCreateWithoutPagesInput, BookUncheckedCreateWithoutPagesInput>
    where?: BookWhereInput
  }

  export type BookUpdateToOneWithWhereWithoutPagesInput = {
    where?: BookWhereInput
    data: XOR<BookUpdateWithoutPagesInput, BookUncheckedUpdateWithoutPagesInput>
  }

  export type BookUpdateWithoutPagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumBookStatusFieldUpdateOperationsInput | $Enums.BookStatus
    characterImageReference?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageOptions?: BookUpdatecoverImageOptionsInput | string[]
    coverPrompt?: StringFieldUpdateOperationsInput | string
    pageCount?: IntFieldUpdateOperationsInput | number
    coverDedication?: NullableStringFieldUpdateOperationsInput | string | null
    pageDedication?: NullableStringFieldUpdateOperationsInput | string | null
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    printJobId?: NullableStringFieldUpdateOperationsInput | string | null
    printingDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ebookS3Key?: NullableStringFieldUpdateOperationsInput | string | null
    ebookFileName?: NullableStringFieldUpdateOperationsInput | string | null
    ebookFileType?: NullableStringFieldUpdateOperationsInput | string | null
    ebookExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    character?: CharacterUpdateOneWithoutBookNestedInput
    template?: BookTemplateUpdateOneRequiredWithoutBooksNestedInput
    user?: UserUpdateOneWithoutBooksNestedInput
    guestSession?: GuestSessionUpdateOneWithoutBooksNestedInput
    imageGenerations?: ImageGenerationUpdateManyWithoutBookNestedInput
    order?: OrderUpdateOneWithoutBookNestedInput
    printJob?: PrintJobUpdateOneWithoutBookNestedInput
  }

  export type BookUncheckedUpdateWithoutPagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumBookStatusFieldUpdateOperationsInput | $Enums.BookStatus
    characterImageReference?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageOptions?: BookUpdatecoverImageOptionsInput | string[]
    coverPrompt?: StringFieldUpdateOperationsInput | string
    pageCount?: IntFieldUpdateOperationsInput | number
    coverDedication?: NullableStringFieldUpdateOperationsInput | string | null
    pageDedication?: NullableStringFieldUpdateOperationsInput | string | null
    templateId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    guestSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    printJobId?: NullableStringFieldUpdateOperationsInput | string | null
    printingDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ebookS3Key?: NullableStringFieldUpdateOperationsInput | string | null
    ebookFileName?: NullableStringFieldUpdateOperationsInput | string | null
    ebookFileType?: NullableStringFieldUpdateOperationsInput | string | null
    ebookExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    character?: CharacterUncheckedUpdateOneWithoutBookNestedInput
    imageGenerations?: ImageGenerationUncheckedUpdateManyWithoutBookNestedInput
    order?: OrderUncheckedUpdateOneWithoutBookNestedInput
    printJob?: PrintJobUncheckedUpdateOneWithoutBookNestedInput
  }

  export type BookCreateWithoutImageGenerationsInput = {
    id?: string
    title: string
    status?: $Enums.BookStatus
    characterImageReference?: string | null
    coverImage?: string | null
    coverImageOptions?: BookCreatecoverImageOptionsInput | string[]
    coverPrompt: string
    pageCount: number
    coverDedication?: string | null
    pageDedication?: string | null
    orderId?: string | null
    printJobId?: string | null
    printingDeadline?: Date | string | null
    ebookS3Key?: string | null
    ebookFileName?: string | null
    ebookFileType?: string | null
    ebookExpiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    pages?: PageCreateNestedManyWithoutBookInput
    character?: CharacterCreateNestedOneWithoutBookInput
    template: BookTemplateCreateNestedOneWithoutBooksInput
    user?: UserCreateNestedOneWithoutBooksInput
    guestSession?: GuestSessionCreateNestedOneWithoutBooksInput
    order?: OrderCreateNestedOneWithoutBookInput
    printJob?: PrintJobCreateNestedOneWithoutBookInput
  }

  export type BookUncheckedCreateWithoutImageGenerationsInput = {
    id?: string
    title: string
    status?: $Enums.BookStatus
    characterImageReference?: string | null
    coverImage?: string | null
    coverImageOptions?: BookCreatecoverImageOptionsInput | string[]
    coverPrompt: string
    pageCount: number
    coverDedication?: string | null
    pageDedication?: string | null
    templateId: string
    userId?: string | null
    guestSessionId?: string | null
    orderId?: string | null
    printJobId?: string | null
    printingDeadline?: Date | string | null
    ebookS3Key?: string | null
    ebookFileName?: string | null
    ebookFileType?: string | null
    ebookExpiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    pages?: PageUncheckedCreateNestedManyWithoutBookInput
    character?: CharacterUncheckedCreateNestedOneWithoutBookInput
    order?: OrderUncheckedCreateNestedOneWithoutBookInput
    printJob?: PrintJobUncheckedCreateNestedOneWithoutBookInput
  }

  export type BookCreateOrConnectWithoutImageGenerationsInput = {
    where: BookWhereUniqueInput
    create: XOR<BookCreateWithoutImageGenerationsInput, BookUncheckedCreateWithoutImageGenerationsInput>
  }

  export type BookUpsertWithoutImageGenerationsInput = {
    update: XOR<BookUpdateWithoutImageGenerationsInput, BookUncheckedUpdateWithoutImageGenerationsInput>
    create: XOR<BookCreateWithoutImageGenerationsInput, BookUncheckedCreateWithoutImageGenerationsInput>
    where?: BookWhereInput
  }

  export type BookUpdateToOneWithWhereWithoutImageGenerationsInput = {
    where?: BookWhereInput
    data: XOR<BookUpdateWithoutImageGenerationsInput, BookUncheckedUpdateWithoutImageGenerationsInput>
  }

  export type BookUpdateWithoutImageGenerationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumBookStatusFieldUpdateOperationsInput | $Enums.BookStatus
    characterImageReference?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageOptions?: BookUpdatecoverImageOptionsInput | string[]
    coverPrompt?: StringFieldUpdateOperationsInput | string
    pageCount?: IntFieldUpdateOperationsInput | number
    coverDedication?: NullableStringFieldUpdateOperationsInput | string | null
    pageDedication?: NullableStringFieldUpdateOperationsInput | string | null
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    printJobId?: NullableStringFieldUpdateOperationsInput | string | null
    printingDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ebookS3Key?: NullableStringFieldUpdateOperationsInput | string | null
    ebookFileName?: NullableStringFieldUpdateOperationsInput | string | null
    ebookFileType?: NullableStringFieldUpdateOperationsInput | string | null
    ebookExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pages?: PageUpdateManyWithoutBookNestedInput
    character?: CharacterUpdateOneWithoutBookNestedInput
    template?: BookTemplateUpdateOneRequiredWithoutBooksNestedInput
    user?: UserUpdateOneWithoutBooksNestedInput
    guestSession?: GuestSessionUpdateOneWithoutBooksNestedInput
    order?: OrderUpdateOneWithoutBookNestedInput
    printJob?: PrintJobUpdateOneWithoutBookNestedInput
  }

  export type BookUncheckedUpdateWithoutImageGenerationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumBookStatusFieldUpdateOperationsInput | $Enums.BookStatus
    characterImageReference?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageOptions?: BookUpdatecoverImageOptionsInput | string[]
    coverPrompt?: StringFieldUpdateOperationsInput | string
    pageCount?: IntFieldUpdateOperationsInput | number
    coverDedication?: NullableStringFieldUpdateOperationsInput | string | null
    pageDedication?: NullableStringFieldUpdateOperationsInput | string | null
    templateId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    guestSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    printJobId?: NullableStringFieldUpdateOperationsInput | string | null
    printingDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ebookS3Key?: NullableStringFieldUpdateOperationsInput | string | null
    ebookFileName?: NullableStringFieldUpdateOperationsInput | string | null
    ebookFileType?: NullableStringFieldUpdateOperationsInput | string | null
    ebookExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pages?: PageUncheckedUpdateManyWithoutBookNestedInput
    character?: CharacterUncheckedUpdateOneWithoutBookNestedInput
    order?: OrderUncheckedUpdateOneWithoutBookNestedInput
    printJob?: PrintJobUncheckedUpdateOneWithoutBookNestedInput
  }

  export type BookCreateWithoutOrderInput = {
    id?: string
    title: string
    status?: $Enums.BookStatus
    characterImageReference?: string | null
    coverImage?: string | null
    coverImageOptions?: BookCreatecoverImageOptionsInput | string[]
    coverPrompt: string
    pageCount: number
    coverDedication?: string | null
    pageDedication?: string | null
    orderId?: string | null
    printJobId?: string | null
    printingDeadline?: Date | string | null
    ebookS3Key?: string | null
    ebookFileName?: string | null
    ebookFileType?: string | null
    ebookExpiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    pages?: PageCreateNestedManyWithoutBookInput
    character?: CharacterCreateNestedOneWithoutBookInput
    template: BookTemplateCreateNestedOneWithoutBooksInput
    user?: UserCreateNestedOneWithoutBooksInput
    guestSession?: GuestSessionCreateNestedOneWithoutBooksInput
    imageGenerations?: ImageGenerationCreateNestedManyWithoutBookInput
    printJob?: PrintJobCreateNestedOneWithoutBookInput
  }

  export type BookUncheckedCreateWithoutOrderInput = {
    id?: string
    title: string
    status?: $Enums.BookStatus
    characterImageReference?: string | null
    coverImage?: string | null
    coverImageOptions?: BookCreatecoverImageOptionsInput | string[]
    coverPrompt: string
    pageCount: number
    coverDedication?: string | null
    pageDedication?: string | null
    templateId: string
    userId?: string | null
    guestSessionId?: string | null
    orderId?: string | null
    printJobId?: string | null
    printingDeadline?: Date | string | null
    ebookS3Key?: string | null
    ebookFileName?: string | null
    ebookFileType?: string | null
    ebookExpiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    pages?: PageUncheckedCreateNestedManyWithoutBookInput
    character?: CharacterUncheckedCreateNestedOneWithoutBookInput
    imageGenerations?: ImageGenerationUncheckedCreateNestedManyWithoutBookInput
    printJob?: PrintJobUncheckedCreateNestedOneWithoutBookInput
  }

  export type BookCreateOrConnectWithoutOrderInput = {
    where: BookWhereUniqueInput
    create: XOR<BookCreateWithoutOrderInput, BookUncheckedCreateWithoutOrderInput>
  }

  export type UserCreateWithoutOrdersInput = {
    id?: string
    clerkId: string
    email: string
    isAdmin?: boolean
    firstName?: string | null
    lastName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    books?: BookCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutOrdersInput = {
    id?: string
    clerkId: string
    email: string
    isAdmin?: boolean
    firstName?: string | null
    lastName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    books?: BookUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutOrdersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOrdersInput, UserUncheckedCreateWithoutOrdersInput>
  }

  export type PrintJobCreateWithoutOrderInput = {
    id?: string
    luluPrintJobId?: number | null
    paymentId?: number | null
    podPackageId: string
    interiorPdfUrl?: string | null
    coverPdfUrl?: string | null
    interiorS3Key?: string | null
    coverS3Key?: string | null
    pageCount: number
    interiorValidationId?: number | null
    coverValidationId?: number | null
    interiorValidationStatus?: $Enums.FileValidationStatus
    coverValidationStatus?: $Enums.FileValidationStatus
    validationErrors?: PrintJobCreatevalidationErrorsInput | string[]
    status?: $Enums.PrintJobStatus
    statusMessage?: string | null
    currency?: string
    printingCostExclTax?: Decimal | DecimalJsLike | number | string | null
    printingCostInclTax?: Decimal | DecimalJsLike | number | string | null
    shippingCostExclTax?: Decimal | DecimalJsLike | number | string | null
    shippingCostInclTax?: Decimal | DecimalJsLike | number | string | null
    totalCostExclTax?: Decimal | DecimalJsLike | number | string | null
    totalCostInclTax?: Decimal | DecimalJsLike | number | string | null
    totalTax?: Decimal | DecimalJsLike | number | string | null
    trackingNumber?: string | null
    trackingUrls?: PrintJobCreatetrackingUrlsInput | string[]
    shippingCarrier?: string | null
    estimatedShipDate?: Date | string | null
    estimatedDeliveryDate?: Date | string | null
    attempts?: number
    errorMessage?: string | null
    sentByAdminId?: string | null
    adminNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sentToPrinterAt?: Date | string | null
    paidAt?: Date | string | null
    inProductionAt?: Date | string | null
    shippedAt?: Date | string | null
    book: BookCreateNestedOneWithoutPrintJobInput
  }

  export type PrintJobUncheckedCreateWithoutOrderInput = {
    id?: string
    bookId: string
    luluPrintJobId?: number | null
    paymentId?: number | null
    podPackageId: string
    interiorPdfUrl?: string | null
    coverPdfUrl?: string | null
    interiorS3Key?: string | null
    coverS3Key?: string | null
    pageCount: number
    interiorValidationId?: number | null
    coverValidationId?: number | null
    interiorValidationStatus?: $Enums.FileValidationStatus
    coverValidationStatus?: $Enums.FileValidationStatus
    validationErrors?: PrintJobCreatevalidationErrorsInput | string[]
    status?: $Enums.PrintJobStatus
    statusMessage?: string | null
    currency?: string
    printingCostExclTax?: Decimal | DecimalJsLike | number | string | null
    printingCostInclTax?: Decimal | DecimalJsLike | number | string | null
    shippingCostExclTax?: Decimal | DecimalJsLike | number | string | null
    shippingCostInclTax?: Decimal | DecimalJsLike | number | string | null
    totalCostExclTax?: Decimal | DecimalJsLike | number | string | null
    totalCostInclTax?: Decimal | DecimalJsLike | number | string | null
    totalTax?: Decimal | DecimalJsLike | number | string | null
    trackingNumber?: string | null
    trackingUrls?: PrintJobCreatetrackingUrlsInput | string[]
    shippingCarrier?: string | null
    estimatedShipDate?: Date | string | null
    estimatedDeliveryDate?: Date | string | null
    attempts?: number
    errorMessage?: string | null
    sentByAdminId?: string | null
    adminNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sentToPrinterAt?: Date | string | null
    paidAt?: Date | string | null
    inProductionAt?: Date | string | null
    shippedAt?: Date | string | null
  }

  export type PrintJobCreateOrConnectWithoutOrderInput = {
    where: PrintJobWhereUniqueInput
    create: XOR<PrintJobCreateWithoutOrderInput, PrintJobUncheckedCreateWithoutOrderInput>
  }

  export type BookUpsertWithoutOrderInput = {
    update: XOR<BookUpdateWithoutOrderInput, BookUncheckedUpdateWithoutOrderInput>
    create: XOR<BookCreateWithoutOrderInput, BookUncheckedCreateWithoutOrderInput>
    where?: BookWhereInput
  }

  export type BookUpdateToOneWithWhereWithoutOrderInput = {
    where?: BookWhereInput
    data: XOR<BookUpdateWithoutOrderInput, BookUncheckedUpdateWithoutOrderInput>
  }

  export type BookUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumBookStatusFieldUpdateOperationsInput | $Enums.BookStatus
    characterImageReference?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageOptions?: BookUpdatecoverImageOptionsInput | string[]
    coverPrompt?: StringFieldUpdateOperationsInput | string
    pageCount?: IntFieldUpdateOperationsInput | number
    coverDedication?: NullableStringFieldUpdateOperationsInput | string | null
    pageDedication?: NullableStringFieldUpdateOperationsInput | string | null
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    printJobId?: NullableStringFieldUpdateOperationsInput | string | null
    printingDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ebookS3Key?: NullableStringFieldUpdateOperationsInput | string | null
    ebookFileName?: NullableStringFieldUpdateOperationsInput | string | null
    ebookFileType?: NullableStringFieldUpdateOperationsInput | string | null
    ebookExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pages?: PageUpdateManyWithoutBookNestedInput
    character?: CharacterUpdateOneWithoutBookNestedInput
    template?: BookTemplateUpdateOneRequiredWithoutBooksNestedInput
    user?: UserUpdateOneWithoutBooksNestedInput
    guestSession?: GuestSessionUpdateOneWithoutBooksNestedInput
    imageGenerations?: ImageGenerationUpdateManyWithoutBookNestedInput
    printJob?: PrintJobUpdateOneWithoutBookNestedInput
  }

  export type BookUncheckedUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumBookStatusFieldUpdateOperationsInput | $Enums.BookStatus
    characterImageReference?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageOptions?: BookUpdatecoverImageOptionsInput | string[]
    coverPrompt?: StringFieldUpdateOperationsInput | string
    pageCount?: IntFieldUpdateOperationsInput | number
    coverDedication?: NullableStringFieldUpdateOperationsInput | string | null
    pageDedication?: NullableStringFieldUpdateOperationsInput | string | null
    templateId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    guestSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    printJobId?: NullableStringFieldUpdateOperationsInput | string | null
    printingDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ebookS3Key?: NullableStringFieldUpdateOperationsInput | string | null
    ebookFileName?: NullableStringFieldUpdateOperationsInput | string | null
    ebookFileType?: NullableStringFieldUpdateOperationsInput | string | null
    ebookExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pages?: PageUncheckedUpdateManyWithoutBookNestedInput
    character?: CharacterUncheckedUpdateOneWithoutBookNestedInput
    imageGenerations?: ImageGenerationUncheckedUpdateManyWithoutBookNestedInput
    printJob?: PrintJobUncheckedUpdateOneWithoutBookNestedInput
  }

  export type UserUpsertWithoutOrdersInput = {
    update: XOR<UserUpdateWithoutOrdersInput, UserUncheckedUpdateWithoutOrdersInput>
    create: XOR<UserCreateWithoutOrdersInput, UserUncheckedCreateWithoutOrdersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOrdersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOrdersInput, UserUncheckedUpdateWithoutOrdersInput>
  }

  export type UserUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    books?: BookUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    books?: BookUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PrintJobUpsertWithoutOrderInput = {
    update: XOR<PrintJobUpdateWithoutOrderInput, PrintJobUncheckedUpdateWithoutOrderInput>
    create: XOR<PrintJobCreateWithoutOrderInput, PrintJobUncheckedCreateWithoutOrderInput>
    where?: PrintJobWhereInput
  }

  export type PrintJobUpdateToOneWithWhereWithoutOrderInput = {
    where?: PrintJobWhereInput
    data: XOR<PrintJobUpdateWithoutOrderInput, PrintJobUncheckedUpdateWithoutOrderInput>
  }

  export type PrintJobUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    luluPrintJobId?: NullableIntFieldUpdateOperationsInput | number | null
    paymentId?: NullableIntFieldUpdateOperationsInput | number | null
    podPackageId?: StringFieldUpdateOperationsInput | string
    interiorPdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverPdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    interiorS3Key?: NullableStringFieldUpdateOperationsInput | string | null
    coverS3Key?: NullableStringFieldUpdateOperationsInput | string | null
    pageCount?: IntFieldUpdateOperationsInput | number
    interiorValidationId?: NullableIntFieldUpdateOperationsInput | number | null
    coverValidationId?: NullableIntFieldUpdateOperationsInput | number | null
    interiorValidationStatus?: EnumFileValidationStatusFieldUpdateOperationsInput | $Enums.FileValidationStatus
    coverValidationStatus?: EnumFileValidationStatusFieldUpdateOperationsInput | $Enums.FileValidationStatus
    validationErrors?: PrintJobUpdatevalidationErrorsInput | string[]
    status?: EnumPrintJobStatusFieldUpdateOperationsInput | $Enums.PrintJobStatus
    statusMessage?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    printingCostExclTax?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    printingCostInclTax?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    shippingCostExclTax?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    shippingCostInclTax?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalCostExclTax?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalCostInclTax?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalTax?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    trackingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    trackingUrls?: PrintJobUpdatetrackingUrlsInput | string[]
    shippingCarrier?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedShipDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estimatedDeliveryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    attempts?: IntFieldUpdateOperationsInput | number
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    sentByAdminId?: NullableStringFieldUpdateOperationsInput | string | null
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentToPrinterAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    inProductionAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    shippedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    book?: BookUpdateOneRequiredWithoutPrintJobNestedInput
  }

  export type PrintJobUncheckedUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookId?: StringFieldUpdateOperationsInput | string
    luluPrintJobId?: NullableIntFieldUpdateOperationsInput | number | null
    paymentId?: NullableIntFieldUpdateOperationsInput | number | null
    podPackageId?: StringFieldUpdateOperationsInput | string
    interiorPdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverPdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    interiorS3Key?: NullableStringFieldUpdateOperationsInput | string | null
    coverS3Key?: NullableStringFieldUpdateOperationsInput | string | null
    pageCount?: IntFieldUpdateOperationsInput | number
    interiorValidationId?: NullableIntFieldUpdateOperationsInput | number | null
    coverValidationId?: NullableIntFieldUpdateOperationsInput | number | null
    interiorValidationStatus?: EnumFileValidationStatusFieldUpdateOperationsInput | $Enums.FileValidationStatus
    coverValidationStatus?: EnumFileValidationStatusFieldUpdateOperationsInput | $Enums.FileValidationStatus
    validationErrors?: PrintJobUpdatevalidationErrorsInput | string[]
    status?: EnumPrintJobStatusFieldUpdateOperationsInput | $Enums.PrintJobStatus
    statusMessage?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    printingCostExclTax?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    printingCostInclTax?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    shippingCostExclTax?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    shippingCostInclTax?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalCostExclTax?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalCostInclTax?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalTax?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    trackingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    trackingUrls?: PrintJobUpdatetrackingUrlsInput | string[]
    shippingCarrier?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedShipDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estimatedDeliveryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    attempts?: IntFieldUpdateOperationsInput | number
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    sentByAdminId?: NullableStringFieldUpdateOperationsInput | string | null
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentToPrinterAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    inProductionAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    shippedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type OrderCreateWithoutPrintJobInput = {
    id?: string
    orderNumber: string
    productType: $Enums.ProductType
    totalPrice: Decimal | DecimalJsLike | number | string
    currency?: string
    status?: $Enums.OrderStatus
    paymentProvider?: string
    quantity?: number
    paymentId?: string | null
    transactionId?: string | null
    pricePaid?: number | null
    payerEmail?: string | null
    shippingCost?: Decimal | DecimalJsLike | number | string | null
    printingCost?: Decimal | DecimalJsLike | number | string | null
    imagesCost?: Decimal | DecimalJsLike | number | string | null
    shippingLevel?: $Enums.ShippingLevel | null
    phoneNumber?: string | null
    name?: string | null
    street1?: string | null
    street2?: string | null
    city?: string | null
    state_code?: string | null
    postcode?: string | null
    country?: string | null
    poProviderOrderId?: string | null
    trackingNumber?: string | null
    customerEmail: string
    printJobId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    paidAt?: Date | string | null
    fulfilledAt?: Date | string | null
    book: BookCreateNestedOneWithoutOrderInput
    user?: UserCreateNestedOneWithoutOrdersInput
  }

  export type OrderUncheckedCreateWithoutPrintJobInput = {
    id?: string
    orderNumber: string
    productType: $Enums.ProductType
    totalPrice: Decimal | DecimalJsLike | number | string
    currency?: string
    status?: $Enums.OrderStatus
    paymentProvider?: string
    quantity?: number
    paymentId?: string | null
    transactionId?: string | null
    pricePaid?: number | null
    payerEmail?: string | null
    shippingCost?: Decimal | DecimalJsLike | number | string | null
    printingCost?: Decimal | DecimalJsLike | number | string | null
    imagesCost?: Decimal | DecimalJsLike | number | string | null
    shippingLevel?: $Enums.ShippingLevel | null
    phoneNumber?: string | null
    name?: string | null
    street1?: string | null
    street2?: string | null
    city?: string | null
    state_code?: string | null
    postcode?: string | null
    country?: string | null
    poProviderOrderId?: string | null
    trackingNumber?: string | null
    customerEmail: string
    bookId: string
    userId?: string | null
    printJobId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    paidAt?: Date | string | null
    fulfilledAt?: Date | string | null
  }

  export type OrderCreateOrConnectWithoutPrintJobInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutPrintJobInput, OrderUncheckedCreateWithoutPrintJobInput>
  }

  export type BookCreateWithoutPrintJobInput = {
    id?: string
    title: string
    status?: $Enums.BookStatus
    characterImageReference?: string | null
    coverImage?: string | null
    coverImageOptions?: BookCreatecoverImageOptionsInput | string[]
    coverPrompt: string
    pageCount: number
    coverDedication?: string | null
    pageDedication?: string | null
    orderId?: string | null
    printJobId?: string | null
    printingDeadline?: Date | string | null
    ebookS3Key?: string | null
    ebookFileName?: string | null
    ebookFileType?: string | null
    ebookExpiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    pages?: PageCreateNestedManyWithoutBookInput
    character?: CharacterCreateNestedOneWithoutBookInput
    template: BookTemplateCreateNestedOneWithoutBooksInput
    user?: UserCreateNestedOneWithoutBooksInput
    guestSession?: GuestSessionCreateNestedOneWithoutBooksInput
    imageGenerations?: ImageGenerationCreateNestedManyWithoutBookInput
    order?: OrderCreateNestedOneWithoutBookInput
  }

  export type BookUncheckedCreateWithoutPrintJobInput = {
    id?: string
    title: string
    status?: $Enums.BookStatus
    characterImageReference?: string | null
    coverImage?: string | null
    coverImageOptions?: BookCreatecoverImageOptionsInput | string[]
    coverPrompt: string
    pageCount: number
    coverDedication?: string | null
    pageDedication?: string | null
    templateId: string
    userId?: string | null
    guestSessionId?: string | null
    orderId?: string | null
    printJobId?: string | null
    printingDeadline?: Date | string | null
    ebookS3Key?: string | null
    ebookFileName?: string | null
    ebookFileType?: string | null
    ebookExpiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    pages?: PageUncheckedCreateNestedManyWithoutBookInput
    character?: CharacterUncheckedCreateNestedOneWithoutBookInput
    imageGenerations?: ImageGenerationUncheckedCreateNestedManyWithoutBookInput
    order?: OrderUncheckedCreateNestedOneWithoutBookInput
  }

  export type BookCreateOrConnectWithoutPrintJobInput = {
    where: BookWhereUniqueInput
    create: XOR<BookCreateWithoutPrintJobInput, BookUncheckedCreateWithoutPrintJobInput>
  }

  export type OrderUpsertWithoutPrintJobInput = {
    update: XOR<OrderUpdateWithoutPrintJobInput, OrderUncheckedUpdateWithoutPrintJobInput>
    create: XOR<OrderCreateWithoutPrintJobInput, OrderUncheckedCreateWithoutPrintJobInput>
    where?: OrderWhereInput
  }

  export type OrderUpdateToOneWithWhereWithoutPrintJobInput = {
    where?: OrderWhereInput
    data: XOR<OrderUpdateWithoutPrintJobInput, OrderUncheckedUpdateWithoutPrintJobInput>
  }

  export type OrderUpdateWithoutPrintJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: StringFieldUpdateOperationsInput | string
    productType?: EnumProductTypeFieldUpdateOperationsInput | $Enums.ProductType
    totalPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    paymentProvider?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    pricePaid?: NullableFloatFieldUpdateOperationsInput | number | null
    payerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    shippingCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    printingCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    imagesCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    shippingLevel?: NullableEnumShippingLevelFieldUpdateOperationsInput | $Enums.ShippingLevel | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    street1?: NullableStringFieldUpdateOperationsInput | string | null
    street2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state_code?: NullableStringFieldUpdateOperationsInput | string | null
    postcode?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    poProviderOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    trackingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    customerEmail?: StringFieldUpdateOperationsInput | string
    printJobId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fulfilledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    book?: BookUpdateOneRequiredWithoutOrderNestedInput
    user?: UserUpdateOneWithoutOrdersNestedInput
  }

  export type OrderUncheckedUpdateWithoutPrintJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: StringFieldUpdateOperationsInput | string
    productType?: EnumProductTypeFieldUpdateOperationsInput | $Enums.ProductType
    totalPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    paymentProvider?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    pricePaid?: NullableFloatFieldUpdateOperationsInput | number | null
    payerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    shippingCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    printingCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    imagesCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    shippingLevel?: NullableEnumShippingLevelFieldUpdateOperationsInput | $Enums.ShippingLevel | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    street1?: NullableStringFieldUpdateOperationsInput | string | null
    street2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state_code?: NullableStringFieldUpdateOperationsInput | string | null
    postcode?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    poProviderOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    trackingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    customerEmail?: StringFieldUpdateOperationsInput | string
    bookId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    printJobId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fulfilledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BookUpsertWithoutPrintJobInput = {
    update: XOR<BookUpdateWithoutPrintJobInput, BookUncheckedUpdateWithoutPrintJobInput>
    create: XOR<BookCreateWithoutPrintJobInput, BookUncheckedCreateWithoutPrintJobInput>
    where?: BookWhereInput
  }

  export type BookUpdateToOneWithWhereWithoutPrintJobInput = {
    where?: BookWhereInput
    data: XOR<BookUpdateWithoutPrintJobInput, BookUncheckedUpdateWithoutPrintJobInput>
  }

  export type BookUpdateWithoutPrintJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumBookStatusFieldUpdateOperationsInput | $Enums.BookStatus
    characterImageReference?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageOptions?: BookUpdatecoverImageOptionsInput | string[]
    coverPrompt?: StringFieldUpdateOperationsInput | string
    pageCount?: IntFieldUpdateOperationsInput | number
    coverDedication?: NullableStringFieldUpdateOperationsInput | string | null
    pageDedication?: NullableStringFieldUpdateOperationsInput | string | null
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    printJobId?: NullableStringFieldUpdateOperationsInput | string | null
    printingDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ebookS3Key?: NullableStringFieldUpdateOperationsInput | string | null
    ebookFileName?: NullableStringFieldUpdateOperationsInput | string | null
    ebookFileType?: NullableStringFieldUpdateOperationsInput | string | null
    ebookExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pages?: PageUpdateManyWithoutBookNestedInput
    character?: CharacterUpdateOneWithoutBookNestedInput
    template?: BookTemplateUpdateOneRequiredWithoutBooksNestedInput
    user?: UserUpdateOneWithoutBooksNestedInput
    guestSession?: GuestSessionUpdateOneWithoutBooksNestedInput
    imageGenerations?: ImageGenerationUpdateManyWithoutBookNestedInput
    order?: OrderUpdateOneWithoutBookNestedInput
  }

  export type BookUncheckedUpdateWithoutPrintJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumBookStatusFieldUpdateOperationsInput | $Enums.BookStatus
    characterImageReference?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageOptions?: BookUpdatecoverImageOptionsInput | string[]
    coverPrompt?: StringFieldUpdateOperationsInput | string
    pageCount?: IntFieldUpdateOperationsInput | number
    coverDedication?: NullableStringFieldUpdateOperationsInput | string | null
    pageDedication?: NullableStringFieldUpdateOperationsInput | string | null
    templateId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    guestSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    printJobId?: NullableStringFieldUpdateOperationsInput | string | null
    printingDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ebookS3Key?: NullableStringFieldUpdateOperationsInput | string | null
    ebookFileName?: NullableStringFieldUpdateOperationsInput | string | null
    ebookFileType?: NullableStringFieldUpdateOperationsInput | string | null
    ebookExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pages?: PageUncheckedUpdateManyWithoutBookNestedInput
    character?: CharacterUncheckedUpdateOneWithoutBookNestedInput
    imageGenerations?: ImageGenerationUncheckedUpdateManyWithoutBookNestedInput
    order?: OrderUncheckedUpdateOneWithoutBookNestedInput
  }

  export type BookCreateManyUserInput = {
    id?: string
    title: string
    status?: $Enums.BookStatus
    characterImageReference?: string | null
    coverImage?: string | null
    coverImageOptions?: BookCreatecoverImageOptionsInput | string[]
    coverPrompt: string
    pageCount: number
    coverDedication?: string | null
    pageDedication?: string | null
    templateId: string
    guestSessionId?: string | null
    orderId?: string | null
    printJobId?: string | null
    printingDeadline?: Date | string | null
    ebookS3Key?: string | null
    ebookFileName?: string | null
    ebookFileType?: string | null
    ebookExpiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderCreateManyUserInput = {
    id?: string
    orderNumber: string
    productType: $Enums.ProductType
    totalPrice: Decimal | DecimalJsLike | number | string
    currency?: string
    status?: $Enums.OrderStatus
    paymentProvider?: string
    quantity?: number
    paymentId?: string | null
    transactionId?: string | null
    pricePaid?: number | null
    payerEmail?: string | null
    shippingCost?: Decimal | DecimalJsLike | number | string | null
    printingCost?: Decimal | DecimalJsLike | number | string | null
    imagesCost?: Decimal | DecimalJsLike | number | string | null
    shippingLevel?: $Enums.ShippingLevel | null
    phoneNumber?: string | null
    name?: string | null
    street1?: string | null
    street2?: string | null
    city?: string | null
    state_code?: string | null
    postcode?: string | null
    country?: string | null
    poProviderOrderId?: string | null
    trackingNumber?: string | null
    customerEmail: string
    bookId: string
    printJobId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    paidAt?: Date | string | null
    fulfilledAt?: Date | string | null
  }

  export type BookUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumBookStatusFieldUpdateOperationsInput | $Enums.BookStatus
    characterImageReference?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageOptions?: BookUpdatecoverImageOptionsInput | string[]
    coverPrompt?: StringFieldUpdateOperationsInput | string
    pageCount?: IntFieldUpdateOperationsInput | number
    coverDedication?: NullableStringFieldUpdateOperationsInput | string | null
    pageDedication?: NullableStringFieldUpdateOperationsInput | string | null
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    printJobId?: NullableStringFieldUpdateOperationsInput | string | null
    printingDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ebookS3Key?: NullableStringFieldUpdateOperationsInput | string | null
    ebookFileName?: NullableStringFieldUpdateOperationsInput | string | null
    ebookFileType?: NullableStringFieldUpdateOperationsInput | string | null
    ebookExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pages?: PageUpdateManyWithoutBookNestedInput
    character?: CharacterUpdateOneWithoutBookNestedInput
    template?: BookTemplateUpdateOneRequiredWithoutBooksNestedInput
    guestSession?: GuestSessionUpdateOneWithoutBooksNestedInput
    imageGenerations?: ImageGenerationUpdateManyWithoutBookNestedInput
    order?: OrderUpdateOneWithoutBookNestedInput
    printJob?: PrintJobUpdateOneWithoutBookNestedInput
  }

  export type BookUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumBookStatusFieldUpdateOperationsInput | $Enums.BookStatus
    characterImageReference?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageOptions?: BookUpdatecoverImageOptionsInput | string[]
    coverPrompt?: StringFieldUpdateOperationsInput | string
    pageCount?: IntFieldUpdateOperationsInput | number
    coverDedication?: NullableStringFieldUpdateOperationsInput | string | null
    pageDedication?: NullableStringFieldUpdateOperationsInput | string | null
    templateId?: StringFieldUpdateOperationsInput | string
    guestSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    printJobId?: NullableStringFieldUpdateOperationsInput | string | null
    printingDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ebookS3Key?: NullableStringFieldUpdateOperationsInput | string | null
    ebookFileName?: NullableStringFieldUpdateOperationsInput | string | null
    ebookFileType?: NullableStringFieldUpdateOperationsInput | string | null
    ebookExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pages?: PageUncheckedUpdateManyWithoutBookNestedInput
    character?: CharacterUncheckedUpdateOneWithoutBookNestedInput
    imageGenerations?: ImageGenerationUncheckedUpdateManyWithoutBookNestedInput
    order?: OrderUncheckedUpdateOneWithoutBookNestedInput
    printJob?: PrintJobUncheckedUpdateOneWithoutBookNestedInput
  }

  export type BookUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumBookStatusFieldUpdateOperationsInput | $Enums.BookStatus
    characterImageReference?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageOptions?: BookUpdatecoverImageOptionsInput | string[]
    coverPrompt?: StringFieldUpdateOperationsInput | string
    pageCount?: IntFieldUpdateOperationsInput | number
    coverDedication?: NullableStringFieldUpdateOperationsInput | string | null
    pageDedication?: NullableStringFieldUpdateOperationsInput | string | null
    templateId?: StringFieldUpdateOperationsInput | string
    guestSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    printJobId?: NullableStringFieldUpdateOperationsInput | string | null
    printingDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ebookS3Key?: NullableStringFieldUpdateOperationsInput | string | null
    ebookFileName?: NullableStringFieldUpdateOperationsInput | string | null
    ebookFileType?: NullableStringFieldUpdateOperationsInput | string | null
    ebookExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: StringFieldUpdateOperationsInput | string
    productType?: EnumProductTypeFieldUpdateOperationsInput | $Enums.ProductType
    totalPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    paymentProvider?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    pricePaid?: NullableFloatFieldUpdateOperationsInput | number | null
    payerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    shippingCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    printingCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    imagesCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    shippingLevel?: NullableEnumShippingLevelFieldUpdateOperationsInput | $Enums.ShippingLevel | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    street1?: NullableStringFieldUpdateOperationsInput | string | null
    street2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state_code?: NullableStringFieldUpdateOperationsInput | string | null
    postcode?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    poProviderOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    trackingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    customerEmail?: StringFieldUpdateOperationsInput | string
    printJobId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fulfilledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    book?: BookUpdateOneRequiredWithoutOrderNestedInput
    printJob?: PrintJobUpdateOneWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: StringFieldUpdateOperationsInput | string
    productType?: EnumProductTypeFieldUpdateOperationsInput | $Enums.ProductType
    totalPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    paymentProvider?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    pricePaid?: NullableFloatFieldUpdateOperationsInput | number | null
    payerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    shippingCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    printingCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    imagesCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    shippingLevel?: NullableEnumShippingLevelFieldUpdateOperationsInput | $Enums.ShippingLevel | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    street1?: NullableStringFieldUpdateOperationsInput | string | null
    street2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state_code?: NullableStringFieldUpdateOperationsInput | string | null
    postcode?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    poProviderOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    trackingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    customerEmail?: StringFieldUpdateOperationsInput | string
    bookId?: StringFieldUpdateOperationsInput | string
    printJobId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fulfilledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    printJob?: PrintJobUncheckedUpdateOneWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: StringFieldUpdateOperationsInput | string
    productType?: EnumProductTypeFieldUpdateOperationsInput | $Enums.ProductType
    totalPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    paymentProvider?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    pricePaid?: NullableFloatFieldUpdateOperationsInput | number | null
    payerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    shippingCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    printingCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    imagesCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    shippingLevel?: NullableEnumShippingLevelFieldUpdateOperationsInput | $Enums.ShippingLevel | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    street1?: NullableStringFieldUpdateOperationsInput | string | null
    street2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state_code?: NullableStringFieldUpdateOperationsInput | string | null
    postcode?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    poProviderOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    trackingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    customerEmail?: StringFieldUpdateOperationsInput | string
    bookId?: StringFieldUpdateOperationsInput | string
    printJobId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fulfilledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BookCreateManyGuestSessionInput = {
    id?: string
    title: string
    status?: $Enums.BookStatus
    characterImageReference?: string | null
    coverImage?: string | null
    coverImageOptions?: BookCreatecoverImageOptionsInput | string[]
    coverPrompt: string
    pageCount: number
    coverDedication?: string | null
    pageDedication?: string | null
    templateId: string
    userId?: string | null
    orderId?: string | null
    printJobId?: string | null
    printingDeadline?: Date | string | null
    ebookS3Key?: string | null
    ebookFileName?: string | null
    ebookFileType?: string | null
    ebookExpiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookUpdateWithoutGuestSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumBookStatusFieldUpdateOperationsInput | $Enums.BookStatus
    characterImageReference?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageOptions?: BookUpdatecoverImageOptionsInput | string[]
    coverPrompt?: StringFieldUpdateOperationsInput | string
    pageCount?: IntFieldUpdateOperationsInput | number
    coverDedication?: NullableStringFieldUpdateOperationsInput | string | null
    pageDedication?: NullableStringFieldUpdateOperationsInput | string | null
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    printJobId?: NullableStringFieldUpdateOperationsInput | string | null
    printingDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ebookS3Key?: NullableStringFieldUpdateOperationsInput | string | null
    ebookFileName?: NullableStringFieldUpdateOperationsInput | string | null
    ebookFileType?: NullableStringFieldUpdateOperationsInput | string | null
    ebookExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pages?: PageUpdateManyWithoutBookNestedInput
    character?: CharacterUpdateOneWithoutBookNestedInput
    template?: BookTemplateUpdateOneRequiredWithoutBooksNestedInput
    user?: UserUpdateOneWithoutBooksNestedInput
    imageGenerations?: ImageGenerationUpdateManyWithoutBookNestedInput
    order?: OrderUpdateOneWithoutBookNestedInput
    printJob?: PrintJobUpdateOneWithoutBookNestedInput
  }

  export type BookUncheckedUpdateWithoutGuestSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumBookStatusFieldUpdateOperationsInput | $Enums.BookStatus
    characterImageReference?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageOptions?: BookUpdatecoverImageOptionsInput | string[]
    coverPrompt?: StringFieldUpdateOperationsInput | string
    pageCount?: IntFieldUpdateOperationsInput | number
    coverDedication?: NullableStringFieldUpdateOperationsInput | string | null
    pageDedication?: NullableStringFieldUpdateOperationsInput | string | null
    templateId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    printJobId?: NullableStringFieldUpdateOperationsInput | string | null
    printingDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ebookS3Key?: NullableStringFieldUpdateOperationsInput | string | null
    ebookFileName?: NullableStringFieldUpdateOperationsInput | string | null
    ebookFileType?: NullableStringFieldUpdateOperationsInput | string | null
    ebookExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pages?: PageUncheckedUpdateManyWithoutBookNestedInput
    character?: CharacterUncheckedUpdateOneWithoutBookNestedInput
    imageGenerations?: ImageGenerationUncheckedUpdateManyWithoutBookNestedInput
    order?: OrderUncheckedUpdateOneWithoutBookNestedInput
    printJob?: PrintJobUncheckedUpdateOneWithoutBookNestedInput
  }

  export type BookUncheckedUpdateManyWithoutGuestSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumBookStatusFieldUpdateOperationsInput | $Enums.BookStatus
    characterImageReference?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageOptions?: BookUpdatecoverImageOptionsInput | string[]
    coverPrompt?: StringFieldUpdateOperationsInput | string
    pageCount?: IntFieldUpdateOperationsInput | number
    coverDedication?: NullableStringFieldUpdateOperationsInput | string | null
    pageDedication?: NullableStringFieldUpdateOperationsInput | string | null
    templateId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    printJobId?: NullableStringFieldUpdateOperationsInput | string | null
    printingDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ebookS3Key?: NullableStringFieldUpdateOperationsInput | string | null
    ebookFileName?: NullableStringFieldUpdateOperationsInput | string | null
    ebookFileType?: NullableStringFieldUpdateOperationsInput | string | null
    ebookExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookTemplateUpdateWithoutGenresInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    pageCount?: IntFieldUpdateOperationsInput | number
    published?: BoolFieldUpdateOperationsInput | boolean
    coverImage?: StringFieldUpdateOperationsInput | string
    coverPrompt?: StringFieldUpdateOperationsInput | string
    characterGender?: StringFieldUpdateOperationsInput | string
    minAge?: IntFieldUpdateOperationsInput | number
    maxAge?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pages?: TemplatePageContentUpdateManyWithoutTemplateNestedInput
    books?: BookUpdateManyWithoutTemplateNestedInput
  }

  export type BookTemplateUncheckedUpdateWithoutGenresInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    pageCount?: IntFieldUpdateOperationsInput | number
    published?: BoolFieldUpdateOperationsInput | boolean
    coverImage?: StringFieldUpdateOperationsInput | string
    coverPrompt?: StringFieldUpdateOperationsInput | string
    characterGender?: StringFieldUpdateOperationsInput | string
    minAge?: IntFieldUpdateOperationsInput | number
    maxAge?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pages?: TemplatePageContentUncheckedUpdateManyWithoutTemplateNestedInput
    books?: BookUncheckedUpdateManyWithoutTemplateNestedInput
  }

  export type BookTemplateUncheckedUpdateManyWithoutGenresInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    pageCount?: IntFieldUpdateOperationsInput | number
    published?: BoolFieldUpdateOperationsInput | boolean
    coverImage?: StringFieldUpdateOperationsInput | string
    coverPrompt?: StringFieldUpdateOperationsInput | string
    characterGender?: StringFieldUpdateOperationsInput | string
    minAge?: IntFieldUpdateOperationsInput | number
    maxAge?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PageCreateManyBookInput = {
    id?: string
    type?: $Enums.PageType
    pageNumber: number
    textContent?: string | null
    imagePrompt?: string | null
    imageUrl?: string | null
    imageOptions?: PageCreateimageOptionsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ImageGenerationCreateManyBookInput = {
    id?: string
    generationId: string
    pageId?: string | null
    type: $Enums.ImageType
    prompt: string
    status?: $Enums.GenerationStatus
    errorMessage?: string | null
    apiCreditCost?: number | null
    createdAt?: Date | string
    completedAt?: Date | string | null
  }

  export type PageUpdateWithoutBookInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumPageTypeFieldUpdateOperationsInput | $Enums.PageType
    pageNumber?: IntFieldUpdateOperationsInput | number
    textContent?: NullableStringFieldUpdateOperationsInput | string | null
    imagePrompt?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageOptions?: PageUpdateimageOptionsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PageUncheckedUpdateWithoutBookInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumPageTypeFieldUpdateOperationsInput | $Enums.PageType
    pageNumber?: IntFieldUpdateOperationsInput | number
    textContent?: NullableStringFieldUpdateOperationsInput | string | null
    imagePrompt?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageOptions?: PageUpdateimageOptionsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PageUncheckedUpdateManyWithoutBookInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumPageTypeFieldUpdateOperationsInput | $Enums.PageType
    pageNumber?: IntFieldUpdateOperationsInput | number
    textContent?: NullableStringFieldUpdateOperationsInput | string | null
    imagePrompt?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageOptions?: PageUpdateimageOptionsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ImageGenerationUpdateWithoutBookInput = {
    id?: StringFieldUpdateOperationsInput | string
    generationId?: StringFieldUpdateOperationsInput | string
    pageId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumImageTypeFieldUpdateOperationsInput | $Enums.ImageType
    prompt?: StringFieldUpdateOperationsInput | string
    status?: EnumGenerationStatusFieldUpdateOperationsInput | $Enums.GenerationStatus
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    apiCreditCost?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ImageGenerationUncheckedUpdateWithoutBookInput = {
    id?: StringFieldUpdateOperationsInput | string
    generationId?: StringFieldUpdateOperationsInput | string
    pageId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumImageTypeFieldUpdateOperationsInput | $Enums.ImageType
    prompt?: StringFieldUpdateOperationsInput | string
    status?: EnumGenerationStatusFieldUpdateOperationsInput | $Enums.GenerationStatus
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    apiCreditCost?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ImageGenerationUncheckedUpdateManyWithoutBookInput = {
    id?: StringFieldUpdateOperationsInput | string
    generationId?: StringFieldUpdateOperationsInput | string
    pageId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumImageTypeFieldUpdateOperationsInput | $Enums.ImageType
    prompt?: StringFieldUpdateOperationsInput | string
    status?: EnumGenerationStatusFieldUpdateOperationsInput | $Enums.GenerationStatus
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    apiCreditCost?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TemplatePageContentCreateManyTemplateInput = {
    id?: string
    pageNumber: number
    content: string
    imagePrompt: string
    imageUrl: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookCreateManyTemplateInput = {
    id?: string
    title: string
    status?: $Enums.BookStatus
    characterImageReference?: string | null
    coverImage?: string | null
    coverImageOptions?: BookCreatecoverImageOptionsInput | string[]
    coverPrompt: string
    pageCount: number
    coverDedication?: string | null
    pageDedication?: string | null
    userId?: string | null
    guestSessionId?: string | null
    orderId?: string | null
    printJobId?: string | null
    printingDeadline?: Date | string | null
    ebookS3Key?: string | null
    ebookFileName?: string | null
    ebookFileType?: string | null
    ebookExpiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TemplatePageContentUpdateWithoutTemplateInput = {
    id?: StringFieldUpdateOperationsInput | string
    pageNumber?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    imagePrompt?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TemplatePageContentUncheckedUpdateWithoutTemplateInput = {
    id?: StringFieldUpdateOperationsInput | string
    pageNumber?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    imagePrompt?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TemplatePageContentUncheckedUpdateManyWithoutTemplateInput = {
    id?: StringFieldUpdateOperationsInput | string
    pageNumber?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    imagePrompt?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookUpdateWithoutTemplateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumBookStatusFieldUpdateOperationsInput | $Enums.BookStatus
    characterImageReference?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageOptions?: BookUpdatecoverImageOptionsInput | string[]
    coverPrompt?: StringFieldUpdateOperationsInput | string
    pageCount?: IntFieldUpdateOperationsInput | number
    coverDedication?: NullableStringFieldUpdateOperationsInput | string | null
    pageDedication?: NullableStringFieldUpdateOperationsInput | string | null
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    printJobId?: NullableStringFieldUpdateOperationsInput | string | null
    printingDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ebookS3Key?: NullableStringFieldUpdateOperationsInput | string | null
    ebookFileName?: NullableStringFieldUpdateOperationsInput | string | null
    ebookFileType?: NullableStringFieldUpdateOperationsInput | string | null
    ebookExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pages?: PageUpdateManyWithoutBookNestedInput
    character?: CharacterUpdateOneWithoutBookNestedInput
    user?: UserUpdateOneWithoutBooksNestedInput
    guestSession?: GuestSessionUpdateOneWithoutBooksNestedInput
    imageGenerations?: ImageGenerationUpdateManyWithoutBookNestedInput
    order?: OrderUpdateOneWithoutBookNestedInput
    printJob?: PrintJobUpdateOneWithoutBookNestedInput
  }

  export type BookUncheckedUpdateWithoutTemplateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumBookStatusFieldUpdateOperationsInput | $Enums.BookStatus
    characterImageReference?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageOptions?: BookUpdatecoverImageOptionsInput | string[]
    coverPrompt?: StringFieldUpdateOperationsInput | string
    pageCount?: IntFieldUpdateOperationsInput | number
    coverDedication?: NullableStringFieldUpdateOperationsInput | string | null
    pageDedication?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    guestSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    printJobId?: NullableStringFieldUpdateOperationsInput | string | null
    printingDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ebookS3Key?: NullableStringFieldUpdateOperationsInput | string | null
    ebookFileName?: NullableStringFieldUpdateOperationsInput | string | null
    ebookFileType?: NullableStringFieldUpdateOperationsInput | string | null
    ebookExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pages?: PageUncheckedUpdateManyWithoutBookNestedInput
    character?: CharacterUncheckedUpdateOneWithoutBookNestedInput
    imageGenerations?: ImageGenerationUncheckedUpdateManyWithoutBookNestedInput
    order?: OrderUncheckedUpdateOneWithoutBookNestedInput
    printJob?: PrintJobUncheckedUpdateOneWithoutBookNestedInput
  }

  export type BookUncheckedUpdateManyWithoutTemplateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumBookStatusFieldUpdateOperationsInput | $Enums.BookStatus
    characterImageReference?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageOptions?: BookUpdatecoverImageOptionsInput | string[]
    coverPrompt?: StringFieldUpdateOperationsInput | string
    pageCount?: IntFieldUpdateOperationsInput | number
    coverDedication?: NullableStringFieldUpdateOperationsInput | string | null
    pageDedication?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    guestSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    printJobId?: NullableStringFieldUpdateOperationsInput | string | null
    printingDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ebookS3Key?: NullableStringFieldUpdateOperationsInput | string | null
    ebookFileName?: NullableStringFieldUpdateOperationsInput | string | null
    ebookFileType?: NullableStringFieldUpdateOperationsInput | string | null
    ebookExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GenreUpdateWithoutTemplatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type GenreUncheckedUpdateWithoutTemplatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type GenreUncheckedUpdateManyWithoutTemplatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}