/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: { input: any; output: any; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any; }
  DireccionEnvioCoordinatesDynamicZoneInput: { input: any; output: any; }
  /** A string used to identify an i18n locale */
  I18NLocaleCode: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  Long: { input: any; output: any; }
  /** A time string with format HH:mm:ss.SSS */
  Time: { input: any; output: any; }
};

export type Attributo = {
  __typename?: 'Attributo';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<Attributo>>;
  localizations_connection?: Maybe<AttributoRelationResponseCollection>;
  name?: Maybe<Scalars['String']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};


export type AttributoLocalizationsArgs = {
  filters?: InputMaybe<AttributoFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type AttributoLocalizations_ConnectionArgs = {
  filters?: InputMaybe<AttributoFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type AttributoEntityResponseCollection = {
  __typename?: 'AttributoEntityResponseCollection';
  nodes: Array<Attributo>;
  pageInfo: Pagination;
};

export type AttributoFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<AttributoFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<AttributoFiltersInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<AttributoFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<AttributoFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  value?: InputMaybe<StringFilterInput>;
};

export type AttributoInput = {
  locale?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type AttributoRelationResponseCollection = {
  __typename?: 'AttributoRelationResponseCollection';
  nodes: Array<Attributo>;
};

export type Banner = {
  __typename?: 'Banner';
  Cuerpo_de_banner?: Maybe<Scalars['String']['output']>;
  Nombre_Banner?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  fondo?: Maybe<UploadFile>;
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<Banner>>;
  localizations_connection?: Maybe<BannerRelationResponseCollection>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};


export type BannerLocalizationsArgs = {
  filters?: InputMaybe<BannerFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type BannerLocalizations_ConnectionArgs = {
  filters?: InputMaybe<BannerFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type BannerEntityResponseCollection = {
  __typename?: 'BannerEntityResponseCollection';
  nodes: Array<Banner>;
  pageInfo: Pagination;
};

export type BannerFiltersInput = {
  Cuerpo_de_banner?: InputMaybe<StringFilterInput>;
  Nombre_Banner?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<BannerFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<BannerFiltersInput>;
  not?: InputMaybe<BannerFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<BannerFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  url?: InputMaybe<StringFilterInput>;
};

export type BannerInput = {
  Cuerpo_de_banner?: InputMaybe<Scalars['String']['input']>;
  Nombre_Banner?: InputMaybe<Scalars['String']['input']>;
  fondo?: InputMaybe<Scalars['ID']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type BannerPromocional = {
  __typename?: 'BannerPromocional';
  Nombre?: Maybe<Scalars['String']['output']>;
  body_de_la_promocion: Scalars['JSON']['output'];
  class_css?: Maybe<Scalars['JSON']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  enlace?: Maybe<Scalars['String']['output']>;
  estado: Scalars['Boolean']['output'];
  fondo?: Maybe<UploadFile>;
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<BannerPromocional>>;
  localizations_connection?: Maybe<BannerPromocionalRelationResponseCollection>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type BannerPromocionalInput = {
  Nombre?: InputMaybe<Scalars['String']['input']>;
  body_de_la_promocion?: InputMaybe<Scalars['JSON']['input']>;
  class_css?: InputMaybe<Scalars['JSON']['input']>;
  enlace?: InputMaybe<Scalars['String']['input']>;
  estado?: InputMaybe<Scalars['Boolean']['input']>;
  fondo?: InputMaybe<Scalars['ID']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type BannerPromocionalRelationResponseCollection = {
  __typename?: 'BannerPromocionalRelationResponseCollection';
  nodes: Array<BannerPromocional>;
};

export type BannerRelationResponseCollection = {
  __typename?: 'BannerRelationResponseCollection';
  nodes: Array<Banner>;
};

export type BooleanFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  contains?: InputMaybe<Scalars['Boolean']['input']>;
  containsi?: InputMaybe<Scalars['Boolean']['input']>;
  endsWith?: InputMaybe<Scalars['Boolean']['input']>;
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  eqi?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['Boolean']['input']>;
  gte?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  lt?: InputMaybe<Scalars['Boolean']['input']>;
  lte?: InputMaybe<Scalars['Boolean']['input']>;
  ne?: InputMaybe<Scalars['Boolean']['input']>;
  nei?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<BooleanFilterInput>;
  notContains?: InputMaybe<Scalars['Boolean']['input']>;
  notContainsi?: InputMaybe<Scalars['Boolean']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  startsWith?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Calificacion = {
  __typename?: 'Calificacion';
  Email?: Maybe<Scalars['String']['output']>;
  comentario?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  evidencia: Array<Maybe<UploadFile>>;
  evidencia_connection?: Maybe<UploadFileRelationResponseCollection>;
  extrellas?: Maybe<Scalars['Int']['output']>;
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<Calificacion>>;
  localizations_connection?: Maybe<CalificacionRelationResponseCollection>;
  nombre?: Maybe<Scalars['String']['output']>;
  personas?: Maybe<Scalars['Int']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type CalificacionEvidenciaArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type CalificacionEvidencia_ConnectionArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type CalificacionLocalizationsArgs = {
  filters?: InputMaybe<CalificacionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type CalificacionLocalizations_ConnectionArgs = {
  filters?: InputMaybe<CalificacionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type CalificacionEntityResponseCollection = {
  __typename?: 'CalificacionEntityResponseCollection';
  nodes: Array<Calificacion>;
  pageInfo: Pagination;
};

export type CalificacionFiltersInput = {
  Email?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<CalificacionFiltersInput>>>;
  comentario?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  extrellas?: InputMaybe<IntFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<CalificacionFiltersInput>;
  nombre?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<CalificacionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<CalificacionFiltersInput>>>;
  personas?: InputMaybe<IntFilterInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type CalificacionInput = {
  Email?: InputMaybe<Scalars['String']['input']>;
  comentario?: InputMaybe<Scalars['String']['input']>;
  evidencia?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  extrellas?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  nombre?: InputMaybe<Scalars['String']['input']>;
  personas?: InputMaybe<Scalars['Int']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CalificacionRelationResponseCollection = {
  __typename?: 'CalificacionRelationResponseCollection';
  nodes: Array<Calificacion>;
};

export type Category = {
  __typename?: 'Category';
  Name?: Maybe<Scalars['String']['output']>;
  UrlImagen?: Maybe<Scalars['String']['output']>;
  children: Array<Maybe<Category>>;
  children_connection?: Maybe<CategoryRelationResponseCollection>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<Category>>;
  localizations_connection?: Maybe<CategoryRelationResponseCollection>;
  parent?: Maybe<Category>;
  products: Array<Maybe<Product>>;
  products_connection?: Maybe<ProductRelationResponseCollection>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type CategoryChildrenArgs = {
  filters?: InputMaybe<CategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type CategoryChildren_ConnectionArgs = {
  filters?: InputMaybe<CategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type CategoryLocalizationsArgs = {
  filters?: InputMaybe<CategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type CategoryLocalizations_ConnectionArgs = {
  filters?: InputMaybe<CategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type CategoryProductsArgs = {
  filters?: InputMaybe<ProductFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type CategoryProducts_ConnectionArgs = {
  filters?: InputMaybe<ProductFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type CategoryEntityResponseCollection = {
  __typename?: 'CategoryEntityResponseCollection';
  nodes: Array<Category>;
  pageInfo: Pagination;
};

export type CategoryFiltersInput = {
  Name?: InputMaybe<StringFilterInput>;
  UrlImagen?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<CategoryFiltersInput>>>;
  children?: InputMaybe<CategoryFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<CategoryFiltersInput>;
  not?: InputMaybe<CategoryFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<CategoryFiltersInput>>>;
  parent?: InputMaybe<CategoryFiltersInput>;
  products?: InputMaybe<ProductFiltersInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  slug?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type CategoryInput = {
  Name?: InputMaybe<Scalars['String']['input']>;
  UrlImagen?: InputMaybe<Scalars['String']['input']>;
  children?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  parent?: InputMaybe<Scalars['ID']['input']>;
  products?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type CategoryRelationResponseCollection = {
  __typename?: 'CategoryRelationResponseCollection';
  nodes: Array<Category>;
};

export type Cliente = {
  __typename?: 'Cliente';
  birthDate?: Maybe<Scalars['Date']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  customerType?: Maybe<Enum_Cliente_Customertype>;
  direccion_envios: Array<Maybe<DireccionEnvio>>;
  direccion_envios_connection?: Maybe<DireccionEnvioRelationResponseCollection>;
  documentId: Scalars['ID']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  gender?: Maybe<Enum_Cliente_Gender>;
  isActive?: Maybe<Scalars['Boolean']['output']>;
  lastLoginDate?: Maybe<Scalars['DateTime']['output']>;
  lastName: Scalars['String']['output'];
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<Cliente>>;
  localizations_connection?: Maybe<ClienteRelationResponseCollection>;
  notes?: Maybe<Scalars['String']['output']>;
  orders: Array<Maybe<Order>>;
  orders_connection?: Maybe<OrderRelationResponseCollection>;
  phone?: Maybe<Scalars['String']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  registrationDate?: Maybe<Scalars['DateTime']['output']>;
  reserva?: Maybe<Reserva>;
  totalOrders?: Maybe<Scalars['Int']['output']>;
  totalSpent?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type ClienteDireccion_EnviosArgs = {
  filters?: InputMaybe<DireccionEnvioFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ClienteDireccion_Envios_ConnectionArgs = {
  filters?: InputMaybe<DireccionEnvioFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ClienteLocalizationsArgs = {
  filters?: InputMaybe<ClienteFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ClienteLocalizations_ConnectionArgs = {
  filters?: InputMaybe<ClienteFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ClienteOrdersArgs = {
  filters?: InputMaybe<OrderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ClienteOrders_ConnectionArgs = {
  filters?: InputMaybe<OrderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ClienteEntityResponseCollection = {
  __typename?: 'ClienteEntityResponseCollection';
  nodes: Array<Cliente>;
  pageInfo: Pagination;
};

export type ClienteFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ClienteFiltersInput>>>;
  birthDate?: InputMaybe<DateFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  customerType?: InputMaybe<StringFilterInput>;
  direccion_envios?: InputMaybe<DireccionEnvioFiltersInput>;
  documentId?: InputMaybe<IdFilterInput>;
  email?: InputMaybe<StringFilterInput>;
  firstName?: InputMaybe<StringFilterInput>;
  gender?: InputMaybe<StringFilterInput>;
  isActive?: InputMaybe<BooleanFilterInput>;
  lastLoginDate?: InputMaybe<DateTimeFilterInput>;
  lastName?: InputMaybe<StringFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<ClienteFiltersInput>;
  not?: InputMaybe<ClienteFiltersInput>;
  notes?: InputMaybe<StringFilterInput>;
  or?: InputMaybe<Array<InputMaybe<ClienteFiltersInput>>>;
  orders?: InputMaybe<OrderFiltersInput>;
  phone?: InputMaybe<StringFilterInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  registrationDate?: InputMaybe<DateTimeFilterInput>;
  reserva?: InputMaybe<ReservaFiltersInput>;
  totalOrders?: InputMaybe<IntFilterInput>;
  totalSpent?: InputMaybe<FloatFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ClienteInput = {
  birthDate?: InputMaybe<Scalars['Date']['input']>;
  customerType?: InputMaybe<Enum_Cliente_Customertype>;
  direccion_envios?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Enum_Cliente_Gender>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  lastLoginDate?: InputMaybe<Scalars['DateTime']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  orders?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  phone?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  registrationDate?: InputMaybe<Scalars['DateTime']['input']>;
  reserva?: InputMaybe<Scalars['ID']['input']>;
  totalOrders?: InputMaybe<Scalars['Int']['input']>;
  totalSpent?: InputMaybe<Scalars['Float']['input']>;
};

export type ClienteRelationResponseCollection = {
  __typename?: 'ClienteRelationResponseCollection';
  nodes: Array<Cliente>;
};

export type Comerce = {
  __typename?: 'Comerce';
  Actividad?: Maybe<Enum_Comerce_Actividad>;
  CorreoElectronico?: Maybe<Scalars['String']['output']>;
  Descripcion?: Maybe<Scalars['String']['output']>;
  Estado?: Maybe<Scalars['Boolean']['output']>;
  Logo?: Maybe<UploadFile>;
  Nombre?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<Comerce>>;
  localizations_connection?: Maybe<ComerceRelationResponseCollection>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  telefono: Scalars['Long']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  variants: Array<Maybe<Variant>>;
  variants_connection?: Maybe<VariantRelationResponseCollection>;
};


export type ComerceLocalizationsArgs = {
  filters?: InputMaybe<ComerceFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ComerceLocalizations_ConnectionArgs = {
  filters?: InputMaybe<ComerceFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ComerceVariantsArgs = {
  filters?: InputMaybe<VariantFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ComerceVariants_ConnectionArgs = {
  filters?: InputMaybe<VariantFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ComerceEntityResponseCollection = {
  __typename?: 'ComerceEntityResponseCollection';
  nodes: Array<Comerce>;
  pageInfo: Pagination;
};

export type ComerceFiltersInput = {
  Actividad?: InputMaybe<StringFilterInput>;
  CorreoElectronico?: InputMaybe<StringFilterInput>;
  Descripcion?: InputMaybe<StringFilterInput>;
  Estado?: InputMaybe<BooleanFilterInput>;
  Nombre?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<ComerceFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<ComerceFiltersInput>;
  not?: InputMaybe<ComerceFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComerceFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  telefono?: InputMaybe<LongFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  variants?: InputMaybe<VariantFiltersInput>;
};

export type ComerceInput = {
  Actividad?: InputMaybe<Enum_Comerce_Actividad>;
  CorreoElectronico?: InputMaybe<Scalars['String']['input']>;
  Descripcion?: InputMaybe<Scalars['String']['input']>;
  Estado?: InputMaybe<Scalars['Boolean']['input']>;
  Logo?: InputMaybe<Scalars['ID']['input']>;
  Nombre?: InputMaybe<Scalars['String']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  telefono?: InputMaybe<Scalars['Long']['input']>;
  variants?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

export type ComerceRelationResponseCollection = {
  __typename?: 'ComerceRelationResponseCollection';
  nodes: Array<Comerce>;
};

export type ComponentAttributesVariantAttributes = {
  __typename?: 'ComponentAttributesVariantAttributes';
  Name?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  value?: Maybe<Scalars['String']['output']>;
};

export type ComponentAttributesVariantAttributesFiltersInput = {
  Name?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<ComponentAttributesVariantAttributesFiltersInput>>>;
  not?: InputMaybe<ComponentAttributesVariantAttributesFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentAttributesVariantAttributesFiltersInput>>>;
  value?: InputMaybe<StringFilterInput>;
};

export type ComponentAttributesVariantAttributesInput = {
  Name?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentAttributesVariantTtributesOfProduct = {
  __typename?: 'ComponentAttributesVariantTtributesOfProduct';
  Name?: Maybe<Scalars['String']['output']>;
  Values?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
};

export type ComponentAttributesVariantTtributesOfProductFiltersInput = {
  Name?: InputMaybe<StringFilterInput>;
  Values?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<ComponentAttributesVariantTtributesOfProductFiltersInput>>>;
  not?: InputMaybe<ComponentAttributesVariantTtributesOfProductFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentAttributesVariantTtributesOfProductFiltersInput>>>;
};

export type ComponentAttributesVariantTtributesOfProductInput = {
  Name?: InputMaybe<Scalars['String']['input']>;
  Values?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type ComponentImageUrlImagen = {
  __typename?: 'ComponentImageUrlImagen';
  Imagen?: Maybe<Scalars['String']['output']>;
  Name?: Maybe<Scalars['String']['output']>;
  Statu?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
};

export type ComponentImageUrlImagenFiltersInput = {
  Imagen?: InputMaybe<StringFilterInput>;
  Name?: InputMaybe<StringFilterInput>;
  Statu?: InputMaybe<BooleanFilterInput>;
  and?: InputMaybe<Array<InputMaybe<ComponentImageUrlImagenFiltersInput>>>;
  not?: InputMaybe<ComponentImageUrlImagenFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentImageUrlImagenFiltersInput>>>;
};

export type ComponentImageUrlImagenInput = {
  Imagen?: InputMaybe<Scalars['String']['input']>;
  Name?: InputMaybe<Scalars['String']['input']>;
  Statu?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type ComponentOrderDicreccion = {
  __typename?: 'ComponentOrderDicreccion';
  Email?: Maybe<Scalars['String']['output']>;
  Nombre_completo?: Maybe<Scalars['String']['output']>;
  Telefono_de_contacto?: Maybe<Scalars['Long']['output']>;
  barrio?: Maybe<Scalars['String']['output']>;
  ciudad_municipio?: Maybe<Scalars['String']['output']>;
  codigo_postal?: Maybe<Scalars['Int']['output']>;
  complemento?: Maybe<Scalars['String']['output']>;
  departamento?: Maybe<Scalars['String']['output']>;
  direccion_principal?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  numero_de_documento?: Maybe<Scalars['Long']['output']>;
  punto_de_referencia?: Maybe<Scalars['String']['output']>;
  tipo_de_documento?: Maybe<Enum_Componentorderdicreccion_Tipo_De_Documento>;
};

export type ComponentOrderShippingAddress = {
  __typename?: 'ComponentOrderShippingAddress';
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  department: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  street_name: Scalars['String']['output'];
  street_number?: Maybe<Scalars['Int']['output']>;
  zip_code: Scalars['String']['output'];
};

export type ComponentProducBodegas = {
  __typename?: 'ComponentProducBodegas';
  Direccion?: Maybe<Scalars['String']['output']>;
  Inventario?: Maybe<Scalars['Int']['output']>;
  Ubicacion?: Maybe<Enum_Componentproducbodegas_Ubicacion>;
  id: Scalars['ID']['output'];
};

export type ComponentProducGoogleMap = {
  __typename?: 'ComponentProducGoogleMap';
  id: Scalars['ID']['output'];
};

export type ComponentProducSubcategorias = {
  __typename?: 'ComponentProducSubcategorias';
  Descripcion: Scalars['String']['output'];
  ImagenCategorya: Array<Maybe<UploadFile>>;
  ImagenCategorya_connection?: Maybe<UploadFileRelationResponseCollection>;
  Nombre: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};


export type ComponentProducSubcategoriasImagenCategoryaArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ComponentProducSubcategoriasImagenCategorya_ConnectionArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ComponentProducTipoDeProductos = {
  __typename?: 'ComponentProducTipoDeProductos';
  Descripcion?: Maybe<Scalars['String']['output']>;
  Nombre?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
};

export type Coupon = {
  __typename?: 'Coupon';
  applicableToCategories: Array<Maybe<Category>>;
  applicableToCategories_connection?: Maybe<CategoryRelationResponseCollection>;
  applicableToProducts: Array<Maybe<Product>>;
  applicableToProducts_connection?: Maybe<ProductRelationResponseCollection>;
  code: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  documentId: Scalars['ID']['output'];
  endDate: Scalars['DateTime']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<Coupon>>;
  localizations_connection?: Maybe<CouponRelationResponseCollection>;
  maximumDiscountAmount?: Maybe<Scalars['Float']['output']>;
  minimumOrderAmount?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  orders: Array<Maybe<Order>>;
  orders_connection?: Maybe<OrderRelationResponseCollection>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  startDate: Scalars['DateTime']['output'];
  type: Enum_Coupon_Type;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  usageLimit?: Maybe<Scalars['Int']['output']>;
  usageLimitPerCustomer?: Maybe<Scalars['Int']['output']>;
  usedCount?: Maybe<Scalars['Int']['output']>;
  value: Scalars['Float']['output'];
};


export type CouponApplicableToCategoriesArgs = {
  filters?: InputMaybe<CategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type CouponApplicableToCategories_ConnectionArgs = {
  filters?: InputMaybe<CategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type CouponApplicableToProductsArgs = {
  filters?: InputMaybe<ProductFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type CouponApplicableToProducts_ConnectionArgs = {
  filters?: InputMaybe<ProductFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type CouponLocalizationsArgs = {
  filters?: InputMaybe<CouponFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type CouponLocalizations_ConnectionArgs = {
  filters?: InputMaybe<CouponFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type CouponOrdersArgs = {
  filters?: InputMaybe<OrderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type CouponOrders_ConnectionArgs = {
  filters?: InputMaybe<OrderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type CouponEntityResponseCollection = {
  __typename?: 'CouponEntityResponseCollection';
  nodes: Array<Coupon>;
  pageInfo: Pagination;
};

export type CouponFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<CouponFiltersInput>>>;
  applicableToCategories?: InputMaybe<CategoryFiltersInput>;
  applicableToProducts?: InputMaybe<ProductFiltersInput>;
  code?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  endDate?: InputMaybe<DateTimeFilterInput>;
  isActive?: InputMaybe<BooleanFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<CouponFiltersInput>;
  maximumDiscountAmount?: InputMaybe<FloatFilterInput>;
  minimumOrderAmount?: InputMaybe<FloatFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<CouponFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<CouponFiltersInput>>>;
  orders?: InputMaybe<OrderFiltersInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  startDate?: InputMaybe<DateTimeFilterInput>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  usageLimit?: InputMaybe<IntFilterInput>;
  usageLimitPerCustomer?: InputMaybe<IntFilterInput>;
  usedCount?: InputMaybe<IntFilterInput>;
  value?: InputMaybe<FloatFilterInput>;
};

export type CouponInput = {
  applicableToCategories?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  applicableToProducts?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  code?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  maximumDiscountAmount?: InputMaybe<Scalars['Float']['input']>;
  minimumOrderAmount?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  orders?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  type?: InputMaybe<Enum_Coupon_Type>;
  usageLimit?: InputMaybe<Scalars['Int']['input']>;
  usageLimitPerCustomer?: InputMaybe<Scalars['Int']['input']>;
  usedCount?: InputMaybe<Scalars['Int']['input']>;
  value?: InputMaybe<Scalars['Float']['input']>;
};

export type CouponRelationResponseCollection = {
  __typename?: 'CouponRelationResponseCollection';
  nodes: Array<Coupon>;
};

export type DateFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Date']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Date']['input']>>>;
  contains?: InputMaybe<Scalars['Date']['input']>;
  containsi?: InputMaybe<Scalars['Date']['input']>;
  endsWith?: InputMaybe<Scalars['Date']['input']>;
  eq?: InputMaybe<Scalars['Date']['input']>;
  eqi?: InputMaybe<Scalars['Date']['input']>;
  gt?: InputMaybe<Scalars['Date']['input']>;
  gte?: InputMaybe<Scalars['Date']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Date']['input']>>>;
  lt?: InputMaybe<Scalars['Date']['input']>;
  lte?: InputMaybe<Scalars['Date']['input']>;
  ne?: InputMaybe<Scalars['Date']['input']>;
  nei?: InputMaybe<Scalars['Date']['input']>;
  not?: InputMaybe<DateFilterInput>;
  notContains?: InputMaybe<Scalars['Date']['input']>;
  notContainsi?: InputMaybe<Scalars['Date']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Date']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Date']['input']>>>;
  startsWith?: InputMaybe<Scalars['Date']['input']>;
};

export type DateTimeFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  contains?: InputMaybe<Scalars['DateTime']['input']>;
  containsi?: InputMaybe<Scalars['DateTime']['input']>;
  endsWith?: InputMaybe<Scalars['DateTime']['input']>;
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  eqi?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  ne?: InputMaybe<Scalars['DateTime']['input']>;
  nei?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<DateTimeFilterInput>;
  notContains?: InputMaybe<Scalars['DateTime']['input']>;
  notContainsi?: InputMaybe<Scalars['DateTime']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  startsWith?: InputMaybe<Scalars['DateTime']['input']>;
};

export type DeleteMutationResponse = {
  __typename?: 'DeleteMutationResponse';
  documentId: Scalars['ID']['output'];
};

export type Descuento = {
  __typename?: 'Descuento';
  applicableToCategories: Array<Maybe<Category>>;
  applicableToCategories_connection?: Maybe<CategoryRelationResponseCollection>;
  applicableToProducts: Array<Maybe<Product>>;
  applicableToProducts_connection?: Maybe<ProductRelationResponseCollection>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  documentId: Scalars['ID']['output'];
  endDate?: Maybe<Scalars['DateTime']['output']>;
  isActive?: Maybe<Scalars['Boolean']['output']>;
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<Descuento>>;
  localizations_connection?: Maybe<DescuentoRelationResponseCollection>;
  maximumDiscountAmount?: Maybe<Scalars['Float']['output']>;
  minimumQuantity?: Maybe<Scalars['Int']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  startDate?: Maybe<Scalars['DateTime']['output']>;
  title: Scalars['String']['output'];
  type: Enum_Descuento_Type;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  value: Scalars['Float']['output'];
};


export type DescuentoApplicableToCategoriesArgs = {
  filters?: InputMaybe<CategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type DescuentoApplicableToCategories_ConnectionArgs = {
  filters?: InputMaybe<CategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type DescuentoApplicableToProductsArgs = {
  filters?: InputMaybe<ProductFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type DescuentoApplicableToProducts_ConnectionArgs = {
  filters?: InputMaybe<ProductFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type DescuentoLocalizationsArgs = {
  filters?: InputMaybe<DescuentoFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type DescuentoLocalizations_ConnectionArgs = {
  filters?: InputMaybe<DescuentoFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type DescuentoEntityResponseCollection = {
  __typename?: 'DescuentoEntityResponseCollection';
  nodes: Array<Descuento>;
  pageInfo: Pagination;
};

export type DescuentoFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<DescuentoFiltersInput>>>;
  applicableToCategories?: InputMaybe<CategoryFiltersInput>;
  applicableToProducts?: InputMaybe<ProductFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  endDate?: InputMaybe<DateTimeFilterInput>;
  isActive?: InputMaybe<BooleanFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<DescuentoFiltersInput>;
  maximumDiscountAmount?: InputMaybe<FloatFilterInput>;
  minimumQuantity?: InputMaybe<IntFilterInput>;
  not?: InputMaybe<DescuentoFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<DescuentoFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  startDate?: InputMaybe<DateTimeFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  value?: InputMaybe<FloatFilterInput>;
};

export type DescuentoInput = {
  applicableToCategories?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  applicableToProducts?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  description?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  maximumDiscountAmount?: InputMaybe<Scalars['Float']['input']>;
  minimumQuantity?: InputMaybe<Scalars['Int']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Enum_Descuento_Type>;
  value?: InputMaybe<Scalars['Float']['input']>;
};

export type DescuentoRelationResponseCollection = {
  __typename?: 'DescuentoRelationResponseCollection';
  nodes: Array<Descuento>;
};

export type DireccionEnvio = {
  __typename?: 'DireccionEnvio';
  addressLine1: Scalars['String']['output'];
  addressLine2?: Maybe<Scalars['String']['output']>;
  addressType?: Maybe<Enum_Direccionenvio_Addresstype>;
  billingOrders: Array<Maybe<Order>>;
  billingOrders_connection?: Maybe<OrderRelationResponseCollection>;
  city: Scalars['String']['output'];
  cliente?: Maybe<Cliente>;
  company?: Maybe<Scalars['String']['output']>;
  coordinates?: Maybe<Array<Maybe<DireccionEnvioCoordinatesDynamicZone>>>;
  country?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deliveryInstructions?: Maybe<Scalars['String']['output']>;
  documentId: Scalars['ID']['output'];
  email?: Maybe<Scalars['String']['output']>;
  firstName: Scalars['String']['output'];
  isDefault?: Maybe<Scalars['Boolean']['output']>;
  lastName: Scalars['String']['output'];
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<DireccionEnvio>>;
  localizations_connection?: Maybe<DireccionEnvioRelationResponseCollection>;
  phone?: Maybe<Scalars['String']['output']>;
  postalCode?: Maybe<Scalars['String']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  shippingOrders: Array<Maybe<Order>>;
  shippingOrders_connection?: Maybe<OrderRelationResponseCollection>;
  state: Enum_Direccionenvio_State;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type DireccionEnvioBillingOrdersArgs = {
  filters?: InputMaybe<OrderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type DireccionEnvioBillingOrders_ConnectionArgs = {
  filters?: InputMaybe<OrderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type DireccionEnvioLocalizationsArgs = {
  filters?: InputMaybe<DireccionEnvioFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type DireccionEnvioLocalizations_ConnectionArgs = {
  filters?: InputMaybe<DireccionEnvioFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type DireccionEnvioShippingOrdersArgs = {
  filters?: InputMaybe<OrderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type DireccionEnvioShippingOrders_ConnectionArgs = {
  filters?: InputMaybe<OrderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type DireccionEnvioCoordinatesDynamicZone = ComponentProducGoogleMap | Error;

export type DireccionEnvioEntityResponseCollection = {
  __typename?: 'DireccionEnvioEntityResponseCollection';
  nodes: Array<DireccionEnvio>;
  pageInfo: Pagination;
};

export type DireccionEnvioFiltersInput = {
  addressLine1?: InputMaybe<StringFilterInput>;
  addressLine2?: InputMaybe<StringFilterInput>;
  addressType?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<DireccionEnvioFiltersInput>>>;
  billingOrders?: InputMaybe<OrderFiltersInput>;
  city?: InputMaybe<StringFilterInput>;
  cliente?: InputMaybe<ClienteFiltersInput>;
  company?: InputMaybe<StringFilterInput>;
  country?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  deliveryInstructions?: InputMaybe<StringFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  email?: InputMaybe<StringFilterInput>;
  firstName?: InputMaybe<StringFilterInput>;
  isDefault?: InputMaybe<BooleanFilterInput>;
  lastName?: InputMaybe<StringFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<DireccionEnvioFiltersInput>;
  not?: InputMaybe<DireccionEnvioFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<DireccionEnvioFiltersInput>>>;
  phone?: InputMaybe<StringFilterInput>;
  postalCode?: InputMaybe<StringFilterInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  shippingOrders?: InputMaybe<OrderFiltersInput>;
  state?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type DireccionEnvioInput = {
  addressLine1?: InputMaybe<Scalars['String']['input']>;
  addressLine2?: InputMaybe<Scalars['String']['input']>;
  addressType?: InputMaybe<Enum_Direccionenvio_Addresstype>;
  billingOrders?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  city?: InputMaybe<Scalars['String']['input']>;
  cliente?: InputMaybe<Scalars['ID']['input']>;
  company?: InputMaybe<Scalars['String']['input']>;
  coordinates?: InputMaybe<Array<Scalars['DireccionEnvioCoordinatesDynamicZoneInput']['input']>>;
  country?: InputMaybe<Scalars['String']['input']>;
  deliveryInstructions?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  isDefault?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  shippingOrders?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  state?: InputMaybe<Enum_Direccionenvio_State>;
};

export type DireccionEnvioRelationResponseCollection = {
  __typename?: 'DireccionEnvioRelationResponseCollection';
  nodes: Array<DireccionEnvio>;
};

export enum Enum_Cliente_Customertype {
  Regular = 'regular',
  Vip = 'vip',
  Wholesale = 'wholesale'
}

export enum Enum_Cliente_Gender {
  Female = 'female',
  Male = 'male',
  Other = 'other',
  PreferNotToSay = 'prefer_not_to_say'
}

export enum Enum_Comerce_Actividad {
  Ferrecteria = 'Ferrecteria',
  Electrodomesticos = 'electrodomesticos',
  Electronicos = 'electronicos',
  Repuestos = 'repuestos'
}

export enum Enum_Componentorderdicreccion_Tipo_De_Documento {
  CedulaDeCiudadania = 'Cedula_de_Ciudadania',
  CedulaDeExtranjeria = 'Cedula_de_Extranjeria',
  Nit = 'NIT',
  Pasaporte = 'Pasaporte'
}

export enum Enum_Componentproducbodegas_Ubicacion {
  Barranquilla = 'Barranquilla',
  Bogota = 'Bogota',
  Cartagena = 'Cartagena',
  Manizales = 'Manizales',
  Medellin = 'Medellin',
  Pereira = 'Pereira',
  Cali = 'cali'
}

export enum Enum_Coupon_Type {
  BuyXGetY = 'buy_x_get_y',
  FixedAmount = 'fixed_amount',
  FreeShipping = 'free_shipping',
  Percentage = 'percentage'
}

export enum Enum_Descuento_Type {
  FixedAmount = 'fixed_amount',
  Percentage = 'percentage'
}

export enum Enum_Direccionenvio_Addresstype {
  Home = 'home',
  Other = 'other',
  Work = 'work'
}

export enum Enum_Direccionenvio_State {
  Amazonas = 'Amazonas',
  Antioquia = 'Antioquia',
  Arauca = 'Arauca',
  Atlantico = 'Atlantico',
  Bolivar = 'Bolivar',
  Boyaca = 'Boyaca',
  Caldas = 'Caldas',
  Caqueta = 'Caqueta',
  Casanare = 'Casanare',
  Cauca = 'Cauca',
  Cesar = 'Cesar',
  Choco = 'Choco',
  Cordoba = 'Cordoba',
  Cundinamarca = 'Cundinamarca',
  Guainia = 'Guainia',
  Guaviare = 'Guaviare',
  Huila = 'Huila',
  LaGuajira = 'La_Guajira',
  Magdalena = 'Magdalena',
  Meta = 'Meta',
  Narino = 'Narino',
  NorteDeSantander = 'Norte_de_Santander',
  Putumayo = 'Putumayo',
  Quindio = 'Quindio',
  Risaralda = 'Risaralda',
  SanAndresYProvidencia = 'San_Andres_y_Providencia',
  Santander = 'Santander',
  Sucre = 'Sucre',
  Tolima = 'Tolima',
  ValleDelCauca = 'Valle_del_Cauca',
  Vaupes = 'Vaupes',
  Vichada = 'Vichada'
}

export enum Enum_Orderhistory_Previousstatus {
  Cancelled = 'cancelled',
  Confirmed = 'confirmed',
  Delivered = 'delivered',
  Pending = 'pending',
  Processing = 'processing',
  Refunded = 'refunded',
  Shipped = 'shipped'
}

export enum Enum_Orderhistory_Status {
  Cancelled = 'cancelled',
  Confirmed = 'confirmed',
  Delivered = 'delivered',
  Pending = 'pending',
  Processing = 'processing',
  Refunded = 'refunded',
  Shipped = 'shipped'
}

export enum Enum_Order_Status {
  Cancelled = 'cancelled',
  Confirmed = 'confirmed',
  Delivered = 'delivered',
  Pending = 'pending',
  Processing = 'processing',
  Refunded = 'refunded',
  Shipped = 'shipped'
}

export enum Enum_Paymentmethod_Processingfeetype {
  Fixed = 'fixed',
  Percentage = 'percentage'
}

export enum Enum_Paymentmethod_Type {
  BankTransfer = 'bank_transfer',
  CashOnDelivery = 'cash_on_delivery',
  CreditCard = 'credit_card',
  Cryptocurrency = 'cryptocurrency',
  DebitCard = 'debit_card',
  DigitalWallet = 'digital_wallet',
  Installments = 'installments'
}

export enum Enum_Product_Statu {
  Archived = 'archived',
  Draft = 'draft',
  Ex = 'ex',
  Published = 'published'
}

export enum Enum_Reserva_Estado_De_La_Reserva {
  Cancelada = 'Cancelada',
  Completada = 'Completada',
  Confirmada = 'Confirmada',
  Pendiente = 'Pendiente'
}

export enum Enum_Reserva_Tipo_De_Reserva {
  Corporativa = 'Corporativa',
  Grupal = 'Grupal',
  Individual = 'Individual'
}

export enum Enum_Servicio_Tipo_De_Servicio {
  Mixto = 'Mixto',
  Online = 'Online',
  Presencial = 'Presencial'
}

export enum Enum_Shippingmethod_Type {
  Express = 'express',
  Free = 'free',
  Overnight = 'overnight',
  Pickup = 'pickup',
  Standard = 'standard'
}

export enum Enum_Tax_Type {
  Ica = 'ICA',
  Iva = 'IVA',
  Other = 'other',
  Retencion = 'retencion'
}

export type Error = {
  __typename?: 'Error';
  code: Scalars['String']['output'];
  message?: Maybe<Scalars['String']['output']>;
};

export type FileInfoInput = {
  alternativeText?: InputMaybe<Scalars['String']['input']>;
  caption?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type FloatFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  contains?: InputMaybe<Scalars['Float']['input']>;
  containsi?: InputMaybe<Scalars['Float']['input']>;
  endsWith?: InputMaybe<Scalars['Float']['input']>;
  eq?: InputMaybe<Scalars['Float']['input']>;
  eqi?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  ne?: InputMaybe<Scalars['Float']['input']>;
  nei?: InputMaybe<Scalars['Float']['input']>;
  not?: InputMaybe<FloatFilterInput>;
  notContains?: InputMaybe<Scalars['Float']['input']>;
  notContainsi?: InputMaybe<Scalars['Float']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  startsWith?: InputMaybe<Scalars['Float']['input']>;
};

export type GenericMorph = Attributo | Banner | BannerPromocional | Calificacion | Category | Cliente | Comerce | ComponentAttributesVariantAttributes | ComponentAttributesVariantTtributesOfProduct | ComponentImageUrlImagen | ComponentOrderDicreccion | ComponentOrderShippingAddress | ComponentProducBodegas | ComponentProducGoogleMap | ComponentProducSubcategorias | ComponentProducTipoDeProductos | Coupon | Descuento | DireccionEnvio | GrupoAttributo | Hero | HeroHome | HomePagen | I18NLocale | Lugar | Order | OrderHistory | OrderItem | Page404 | PaymentMethod | Product | Reserva | ReviewWorkflowsWorkflow | ReviewWorkflowsWorkflowStage | Servicio | ShippingMethod | Tax | TipoDeProducto | UploadFile | UsersPermissionsPermission | UsersPermissionsRole | UsersPermissionsUser | Variant;

export type GrupoAttributo = {
  __typename?: 'GrupoAttributo';
  Descripcion?: Maybe<Scalars['String']['output']>;
  Nombre?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<GrupoAttributo>>;
  localizations_connection?: Maybe<GrupoAttributoRelationResponseCollection>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  tipo_de_productos: Array<Maybe<TipoDeProducto>>;
  tipo_de_productos_connection?: Maybe<TipoDeProductoRelationResponseCollection>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type GrupoAttributoLocalizationsArgs = {
  filters?: InputMaybe<GrupoAttributoFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type GrupoAttributoLocalizations_ConnectionArgs = {
  filters?: InputMaybe<GrupoAttributoFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type GrupoAttributoTipo_De_ProductosArgs = {
  filters?: InputMaybe<TipoDeProductoFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type GrupoAttributoTipo_De_Productos_ConnectionArgs = {
  filters?: InputMaybe<TipoDeProductoFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type GrupoAttributoEntityResponseCollection = {
  __typename?: 'GrupoAttributoEntityResponseCollection';
  nodes: Array<GrupoAttributo>;
  pageInfo: Pagination;
};

export type GrupoAttributoFiltersInput = {
  Descripcion?: InputMaybe<StringFilterInput>;
  Nombre?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<GrupoAttributoFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<GrupoAttributoFiltersInput>;
  not?: InputMaybe<GrupoAttributoFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<GrupoAttributoFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  tipo_de_productos?: InputMaybe<TipoDeProductoFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type GrupoAttributoInput = {
  Descripcion?: InputMaybe<Scalars['String']['input']>;
  Nombre?: InputMaybe<Scalars['String']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  tipo_de_productos?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

export type GrupoAttributoRelationResponseCollection = {
  __typename?: 'GrupoAttributoRelationResponseCollection';
  nodes: Array<GrupoAttributo>;
};

export type Hero = {
  __typename?: 'Hero';
  Descripcion?: Maybe<Scalars['JSON']['output']>;
  Descuento?: Maybe<Scalars['Int']['output']>;
  Url_imagen?: Maybe<Scalars['String']['output']>;
  botonTexto?: Maybe<Scalars['String']['output']>;
  classColorBoton?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<Hero>>;
  localizations_connection?: Maybe<HeroRelationResponseCollection>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  redirectPromocion?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  titleH2?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type HeroHome = {
  __typename?: 'HeroHome';
  Descripcion?: Maybe<Scalars['String']['output']>;
  Descuento?: Maybe<Scalars['Int']['output']>;
  Url_imagen?: Maybe<Scalars['String']['output']>;
  botonTexto?: Maybe<Scalars['String']['output']>;
  classColorBoton?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  estado?: Maybe<Scalars['Boolean']['output']>;
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<HeroHome>>;
  localizations_connection?: Maybe<HeroHomeRelationResponseCollection>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  redirectPromocion?: Maybe<Scalars['String']['output']>;
  titulodos?: Maybe<Scalars['String']['output']>;
  tituloprinsipal?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type HeroHomeLocalizationsArgs = {
  filters?: InputMaybe<HeroHomeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type HeroHomeLocalizations_ConnectionArgs = {
  filters?: InputMaybe<HeroHomeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type HeroHomeEntityResponseCollection = {
  __typename?: 'HeroHomeEntityResponseCollection';
  nodes: Array<HeroHome>;
  pageInfo: Pagination;
};

export type HeroHomeFiltersInput = {
  Descripcion?: InputMaybe<StringFilterInput>;
  Descuento?: InputMaybe<IntFilterInput>;
  Url_imagen?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<HeroHomeFiltersInput>>>;
  botonTexto?: InputMaybe<StringFilterInput>;
  classColorBoton?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  estado?: InputMaybe<BooleanFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<HeroHomeFiltersInput>;
  not?: InputMaybe<HeroHomeFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<HeroHomeFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  redirectPromocion?: InputMaybe<StringFilterInput>;
  titulodos?: InputMaybe<StringFilterInput>;
  tituloprinsipal?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type HeroHomeInput = {
  Descripcion?: InputMaybe<Scalars['String']['input']>;
  Descuento?: InputMaybe<Scalars['Int']['input']>;
  Url_imagen?: InputMaybe<Scalars['String']['input']>;
  botonTexto?: InputMaybe<Scalars['String']['input']>;
  classColorBoton?: InputMaybe<Scalars['String']['input']>;
  estado?: InputMaybe<Scalars['Boolean']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  redirectPromocion?: InputMaybe<Scalars['String']['input']>;
  titulodos?: InputMaybe<Scalars['String']['input']>;
  tituloprinsipal?: InputMaybe<Scalars['String']['input']>;
};

export type HeroHomeRelationResponseCollection = {
  __typename?: 'HeroHomeRelationResponseCollection';
  nodes: Array<HeroHome>;
};

export type HeroInput = {
  Descripcion?: InputMaybe<Scalars['JSON']['input']>;
  Descuento?: InputMaybe<Scalars['Int']['input']>;
  Url_imagen?: InputMaybe<Scalars['String']['input']>;
  botonTexto?: InputMaybe<Scalars['String']['input']>;
  classColorBoton?: InputMaybe<Scalars['String']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  redirectPromocion?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  titleH2?: InputMaybe<Scalars['String']['input']>;
};

export type HeroRelationResponseCollection = {
  __typename?: 'HeroRelationResponseCollection';
  nodes: Array<Hero>;
};

export type HomePagen = {
  __typename?: 'HomePagen';
  Body?: Maybe<Scalars['JSON']['output']>;
  Logo: UploadFile;
  Titulo?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  empresa?: Maybe<Comerce>;
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<HomePagen>>;
  localizations_connection?: Maybe<HomePagenRelationResponseCollection>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  slider: Array<Maybe<UploadFile>>;
  slider_connection?: Maybe<UploadFileRelationResponseCollection>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type HomePagenSliderArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type HomePagenSlider_ConnectionArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type HomePagenInput = {
  Body?: InputMaybe<Scalars['JSON']['input']>;
  Logo?: InputMaybe<Scalars['ID']['input']>;
  Titulo?: InputMaybe<Scalars['String']['input']>;
  empresa?: InputMaybe<Scalars['ID']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  slider?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

export type HomePagenRelationResponseCollection = {
  __typename?: 'HomePagenRelationResponseCollection';
  nodes: Array<HomePagen>;
};

export type I18NLocale = {
  __typename?: 'I18NLocale';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<I18NLocale>>;
  localizations_connection?: Maybe<I18NLocaleRelationResponseCollection>;
  name?: Maybe<Scalars['String']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type I18NLocaleLocalizationsArgs = {
  filters?: InputMaybe<I18NLocaleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type I18NLocaleLocalizations_ConnectionArgs = {
  filters?: InputMaybe<I18NLocaleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type I18NLocaleEntityResponseCollection = {
  __typename?: 'I18NLocaleEntityResponseCollection';
  nodes: Array<I18NLocale>;
  pageInfo: Pagination;
};

export type I18NLocaleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  code?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<I18NLocaleFiltersInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<I18NLocaleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type I18NLocaleRelationResponseCollection = {
  __typename?: 'I18NLocaleRelationResponseCollection';
  nodes: Array<I18NLocale>;
};

export type IdFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  contains?: InputMaybe<Scalars['ID']['input']>;
  containsi?: InputMaybe<Scalars['ID']['input']>;
  endsWith?: InputMaybe<Scalars['ID']['input']>;
  eq?: InputMaybe<Scalars['ID']['input']>;
  eqi?: InputMaybe<Scalars['ID']['input']>;
  gt?: InputMaybe<Scalars['ID']['input']>;
  gte?: InputMaybe<Scalars['ID']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  lt?: InputMaybe<Scalars['ID']['input']>;
  lte?: InputMaybe<Scalars['ID']['input']>;
  ne?: InputMaybe<Scalars['ID']['input']>;
  nei?: InputMaybe<Scalars['ID']['input']>;
  not?: InputMaybe<IdFilterInput>;
  notContains?: InputMaybe<Scalars['ID']['input']>;
  notContainsi?: InputMaybe<Scalars['ID']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  startsWith?: InputMaybe<Scalars['ID']['input']>;
};

export type IntFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  contains?: InputMaybe<Scalars['Int']['input']>;
  containsi?: InputMaybe<Scalars['Int']['input']>;
  endsWith?: InputMaybe<Scalars['Int']['input']>;
  eq?: InputMaybe<Scalars['Int']['input']>;
  eqi?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Int']['input']>;
  nei?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<IntFilterInput>;
  notContains?: InputMaybe<Scalars['Int']['input']>;
  notContainsi?: InputMaybe<Scalars['Int']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  startsWith?: InputMaybe<Scalars['Int']['input']>;
};

export type JsonFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  contains?: InputMaybe<Scalars['JSON']['input']>;
  containsi?: InputMaybe<Scalars['JSON']['input']>;
  endsWith?: InputMaybe<Scalars['JSON']['input']>;
  eq?: InputMaybe<Scalars['JSON']['input']>;
  eqi?: InputMaybe<Scalars['JSON']['input']>;
  gt?: InputMaybe<Scalars['JSON']['input']>;
  gte?: InputMaybe<Scalars['JSON']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  lt?: InputMaybe<Scalars['JSON']['input']>;
  lte?: InputMaybe<Scalars['JSON']['input']>;
  ne?: InputMaybe<Scalars['JSON']['input']>;
  nei?: InputMaybe<Scalars['JSON']['input']>;
  not?: InputMaybe<JsonFilterInput>;
  notContains?: InputMaybe<Scalars['JSON']['input']>;
  notContainsi?: InputMaybe<Scalars['JSON']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  startsWith?: InputMaybe<Scalars['JSON']['input']>;
};

export type LongFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Long']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Long']['input']>>>;
  contains?: InputMaybe<Scalars['Long']['input']>;
  containsi?: InputMaybe<Scalars['Long']['input']>;
  endsWith?: InputMaybe<Scalars['Long']['input']>;
  eq?: InputMaybe<Scalars['Long']['input']>;
  eqi?: InputMaybe<Scalars['Long']['input']>;
  gt?: InputMaybe<Scalars['Long']['input']>;
  gte?: InputMaybe<Scalars['Long']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Long']['input']>>>;
  lt?: InputMaybe<Scalars['Long']['input']>;
  lte?: InputMaybe<Scalars['Long']['input']>;
  ne?: InputMaybe<Scalars['Long']['input']>;
  nei?: InputMaybe<Scalars['Long']['input']>;
  not?: InputMaybe<LongFilterInput>;
  notContains?: InputMaybe<Scalars['Long']['input']>;
  notContainsi?: InputMaybe<Scalars['Long']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Long']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Long']['input']>>>;
  startsWith?: InputMaybe<Scalars['Long']['input']>;
};

export type Lugar = {
  __typename?: 'Lugar';
  capacidad_maxima?: Maybe<Scalars['Int']['output']>;
  ciudad?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  descripcion?: Maybe<Scalars['JSON']['output']>;
  direccion?: Maybe<Scalars['String']['output']>;
  documentId: Scalars['ID']['output'];
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<Lugar>>;
  localizations_connection?: Maybe<LugarRelationResponseCollection>;
  nombre_del_lugar?: Maybe<Scalars['String']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type LugarLocalizationsArgs = {
  filters?: InputMaybe<LugarFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type LugarLocalizations_ConnectionArgs = {
  filters?: InputMaybe<LugarFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type LugarEntityResponseCollection = {
  __typename?: 'LugarEntityResponseCollection';
  nodes: Array<Lugar>;
  pageInfo: Pagination;
};

export type LugarFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<LugarFiltersInput>>>;
  capacidad_maxima?: InputMaybe<IntFilterInput>;
  ciudad?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  descripcion?: InputMaybe<JsonFilterInput>;
  direccion?: InputMaybe<StringFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<LugarFiltersInput>;
  nombre_del_lugar?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<LugarFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<LugarFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type LugarInput = {
  capacidad_maxima?: InputMaybe<Scalars['Int']['input']>;
  ciudad?: InputMaybe<Scalars['String']['input']>;
  descripcion?: InputMaybe<Scalars['JSON']['input']>;
  direccion?: InputMaybe<Scalars['String']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  nombre_del_lugar?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type LugarRelationResponseCollection = {
  __typename?: 'LugarRelationResponseCollection';
  nodes: Array<Lugar>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Change user password. Confirm with the current password. */
  changePassword?: Maybe<UsersPermissionsLoginPayload>;
  createAttributo?: Maybe<Attributo>;
  createBanner?: Maybe<Banner>;
  createCalificacion?: Maybe<Calificacion>;
  createCategory?: Maybe<Category>;
  createCliente?: Maybe<Cliente>;
  createComerce?: Maybe<Comerce>;
  createCoupon?: Maybe<Coupon>;
  createDescuento?: Maybe<Descuento>;
  createDireccionEnvio?: Maybe<DireccionEnvio>;
  createGrupoAttributo?: Maybe<GrupoAttributo>;
  createHeroHome?: Maybe<HeroHome>;
  createLugar?: Maybe<Lugar>;
  createOrder?: Maybe<Order>;
  createOrderHistory?: Maybe<OrderHistory>;
  createOrderItem?: Maybe<OrderItem>;
  createPaymentMethod?: Maybe<PaymentMethod>;
  createProduct?: Maybe<Product>;
  createReserva?: Maybe<Reserva>;
  createReviewWorkflowsWorkflow?: Maybe<ReviewWorkflowsWorkflow>;
  createReviewWorkflowsWorkflowStage?: Maybe<ReviewWorkflowsWorkflowStage>;
  createServicio?: Maybe<Servicio>;
  createShippingMethod?: Maybe<ShippingMethod>;
  createTax?: Maybe<Tax>;
  createTipoDeProducto?: Maybe<TipoDeProducto>;
  /** Create a new role */
  createUsersPermissionsRole?: Maybe<UsersPermissionsCreateRolePayload>;
  /** Create a new user */
  createUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  createVariant?: Maybe<Variant>;
  deleteAttributo?: Maybe<DeleteMutationResponse>;
  deleteBanner?: Maybe<DeleteMutationResponse>;
  deleteBannerPromocional?: Maybe<DeleteMutationResponse>;
  deleteCalificacion?: Maybe<DeleteMutationResponse>;
  deleteCategory?: Maybe<DeleteMutationResponse>;
  deleteCliente?: Maybe<DeleteMutationResponse>;
  deleteComerce?: Maybe<DeleteMutationResponse>;
  deleteCoupon?: Maybe<DeleteMutationResponse>;
  deleteDescuento?: Maybe<DeleteMutationResponse>;
  deleteDireccionEnvio?: Maybe<DeleteMutationResponse>;
  deleteGrupoAttributo?: Maybe<DeleteMutationResponse>;
  deleteHero?: Maybe<DeleteMutationResponse>;
  deleteHeroHome?: Maybe<DeleteMutationResponse>;
  deleteHomePagen?: Maybe<DeleteMutationResponse>;
  deleteLugar?: Maybe<DeleteMutationResponse>;
  deleteOrder?: Maybe<DeleteMutationResponse>;
  deleteOrderHistory?: Maybe<DeleteMutationResponse>;
  deleteOrderItem?: Maybe<DeleteMutationResponse>;
  deletePage404?: Maybe<DeleteMutationResponse>;
  deletePaymentMethod?: Maybe<DeleteMutationResponse>;
  deleteProduct?: Maybe<DeleteMutationResponse>;
  deleteReserva?: Maybe<DeleteMutationResponse>;
  deleteReviewWorkflowsWorkflow?: Maybe<DeleteMutationResponse>;
  deleteReviewWorkflowsWorkflowStage?: Maybe<DeleteMutationResponse>;
  deleteServicio?: Maybe<DeleteMutationResponse>;
  deleteShippingMethod?: Maybe<DeleteMutationResponse>;
  deleteTax?: Maybe<DeleteMutationResponse>;
  deleteTipoDeProducto?: Maybe<DeleteMutationResponse>;
  deleteUploadFile?: Maybe<UploadFile>;
  /** Delete an existing role */
  deleteUsersPermissionsRole?: Maybe<UsersPermissionsDeleteRolePayload>;
  /** Delete an existing user */
  deleteUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  deleteVariant?: Maybe<DeleteMutationResponse>;
  /** Confirm an email users email address */
  emailConfirmation?: Maybe<UsersPermissionsLoginPayload>;
  /** Request a reset password token */
  forgotPassword?: Maybe<UsersPermissionsPasswordPayload>;
  login: UsersPermissionsLoginPayload;
  /** Register a user */
  register: UsersPermissionsLoginPayload;
  /** Reset user password. Confirm with a code (resetToken from forgotPassword) */
  resetPassword?: Maybe<UsersPermissionsLoginPayload>;
  updateAttributo?: Maybe<Attributo>;
  updateBanner?: Maybe<Banner>;
  updateBannerPromocional?: Maybe<BannerPromocional>;
  updateCalificacion?: Maybe<Calificacion>;
  updateCategory?: Maybe<Category>;
  updateCliente?: Maybe<Cliente>;
  updateComerce?: Maybe<Comerce>;
  updateCoupon?: Maybe<Coupon>;
  updateDescuento?: Maybe<Descuento>;
  updateDireccionEnvio?: Maybe<DireccionEnvio>;
  updateGrupoAttributo?: Maybe<GrupoAttributo>;
  updateHero?: Maybe<Hero>;
  updateHeroHome?: Maybe<HeroHome>;
  updateHomePagen?: Maybe<HomePagen>;
  updateLugar?: Maybe<Lugar>;
  updateOrder?: Maybe<Order>;
  updateOrderHistory?: Maybe<OrderHistory>;
  updateOrderItem?: Maybe<OrderItem>;
  updatePage404?: Maybe<Page404>;
  updatePaymentMethod?: Maybe<PaymentMethod>;
  updateProduct?: Maybe<Product>;
  updateReserva?: Maybe<Reserva>;
  updateReviewWorkflowsWorkflow?: Maybe<ReviewWorkflowsWorkflow>;
  updateReviewWorkflowsWorkflowStage?: Maybe<ReviewWorkflowsWorkflowStage>;
  updateServicio?: Maybe<Servicio>;
  updateShippingMethod?: Maybe<ShippingMethod>;
  updateTax?: Maybe<Tax>;
  updateTipoDeProducto?: Maybe<TipoDeProducto>;
  updateUploadFile: UploadFile;
  /** Update an existing role */
  updateUsersPermissionsRole?: Maybe<UsersPermissionsUpdateRolePayload>;
  /** Update an existing user */
  updateUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  updateVariant?: Maybe<Variant>;
};


export type MutationChangePasswordArgs = {
  currentPassword: Scalars['String']['input'];
  password: Scalars['String']['input'];
  passwordConfirmation: Scalars['String']['input'];
};


export type MutationCreateAttributoArgs = {
  data: AttributoInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateBannerArgs = {
  data: BannerInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateCalificacionArgs = {
  data: CalificacionInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateCategoryArgs = {
  data: CategoryInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateClienteArgs = {
  data: ClienteInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateComerceArgs = {
  data: ComerceInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateCouponArgs = {
  data: CouponInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateDescuentoArgs = {
  data: DescuentoInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateDireccionEnvioArgs = {
  data: DireccionEnvioInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateGrupoAttributoArgs = {
  data: GrupoAttributoInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateHeroHomeArgs = {
  data: HeroHomeInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateLugarArgs = {
  data: LugarInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateOrderArgs = {
  data: OrderInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateOrderHistoryArgs = {
  data: OrderHistoryInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateOrderItemArgs = {
  data: OrderItemInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreatePaymentMethodArgs = {
  data: PaymentMethodInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateProductArgs = {
  data: ProductInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateReservaArgs = {
  data: ReservaInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateReviewWorkflowsWorkflowArgs = {
  data: ReviewWorkflowsWorkflowInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateReviewWorkflowsWorkflowStageArgs = {
  data: ReviewWorkflowsWorkflowStageInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateServicioArgs = {
  data: ServicioInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateShippingMethodArgs = {
  data: ShippingMethodInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateTaxArgs = {
  data: TaxInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateTipoDeProductoArgs = {
  data: TipoDeProductoInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
};


export type MutationCreateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
};


export type MutationCreateVariantArgs = {
  data: VariantInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationDeleteAttributoArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeleteBannerArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeleteCalificacionArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeleteCategoryArgs = {
  documentId: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationDeleteClienteArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeleteComerceArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeleteCouponArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeleteDescuentoArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeleteDireccionEnvioArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeleteGrupoAttributoArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeleteHeroHomeArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeleteLugarArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeleteOrderArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeleteOrderHistoryArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeleteOrderItemArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeletePaymentMethodArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeleteProductArgs = {
  documentId: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationDeleteReservaArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeleteReviewWorkflowsWorkflowArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeleteReviewWorkflowsWorkflowStageArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeleteServicioArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeleteShippingMethodArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeleteTaxArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeleteTipoDeProductoArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeleteUploadFileArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUsersPermissionsRoleArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUsersPermissionsUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteVariantArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationEmailConfirmationArgs = {
  confirmation: Scalars['String']['input'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  input: UsersPermissionsLoginInput;
};


export type MutationRegisterArgs = {
  input: UsersPermissionsRegisterInput;
};


export type MutationResetPasswordArgs = {
  code: Scalars['String']['input'];
  password: Scalars['String']['input'];
  passwordConfirmation: Scalars['String']['input'];
};


export type MutationUpdateAttributoArgs = {
  data: AttributoInput;
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateBannerArgs = {
  data: BannerInput;
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateBannerPromocionalArgs = {
  data: BannerPromocionalInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateCalificacionArgs = {
  data: CalificacionInput;
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateCategoryArgs = {
  data: CategoryInput;
  documentId: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateClienteArgs = {
  data: ClienteInput;
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateComerceArgs = {
  data: ComerceInput;
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateCouponArgs = {
  data: CouponInput;
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateDescuentoArgs = {
  data: DescuentoInput;
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateDireccionEnvioArgs = {
  data: DireccionEnvioInput;
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateGrupoAttributoArgs = {
  data: GrupoAttributoInput;
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateHeroArgs = {
  data: HeroInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateHeroHomeArgs = {
  data: HeroHomeInput;
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateHomePagenArgs = {
  data: HomePagenInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateLugarArgs = {
  data: LugarInput;
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateOrderArgs = {
  data: OrderInput;
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateOrderHistoryArgs = {
  data: OrderHistoryInput;
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateOrderItemArgs = {
  data: OrderItemInput;
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdatePage404Args = {
  data: Page404Input;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdatePaymentMethodArgs = {
  data: PaymentMethodInput;
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateProductArgs = {
  data: ProductInput;
  documentId: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateReservaArgs = {
  data: ReservaInput;
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateReviewWorkflowsWorkflowArgs = {
  data: ReviewWorkflowsWorkflowInput;
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateReviewWorkflowsWorkflowStageArgs = {
  data: ReviewWorkflowsWorkflowStageInput;
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateServicioArgs = {
  data: ServicioInput;
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateShippingMethodArgs = {
  data: ShippingMethodInput;
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateTaxArgs = {
  data: TaxInput;
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateTipoDeProductoArgs = {
  data: TipoDeProductoInput;
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateUploadFileArgs = {
  id: Scalars['ID']['input'];
  info?: InputMaybe<FileInfoInput>;
};


export type MutationUpdateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateVariantArgs = {
  data: VariantInput;
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};

export type Order = {
  __typename?: 'Order';
  actualDeliveryDate?: Maybe<Scalars['DateTime']['output']>;
  appliedCoupons: Array<Maybe<Coupon>>;
  appliedCoupons_connection?: Maybe<CouponRelationResponseCollection>;
  billingAddress?: Maybe<DireccionEnvio>;
  cliente: Cliente;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  discountAmount?: Maybe<Scalars['Float']['output']>;
  documentId: Scalars['ID']['output'];
  estimatedDeliveryDate?: Maybe<Scalars['Date']['output']>;
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<Order>>;
  localizations_connection?: Maybe<OrderRelationResponseCollection>;
  notes?: Maybe<Scalars['String']['output']>;
  orderDate: Scalars['DateTime']['output'];
  orderHistory: Array<Maybe<OrderHistory>>;
  orderHistory_connection?: Maybe<OrderHistoryRelationResponseCollection>;
  orderItems: Array<Maybe<OrderItem>>;
  orderItems_connection?: Maybe<OrderItemRelationResponseCollection>;
  orderNumber: Scalars['String']['output'];
  paymentMethod?: Maybe<PaymentMethod>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  shippingAddress?: Maybe<DireccionEnvio>;
  shippingCost?: Maybe<Scalars['Float']['output']>;
  shippingMethod?: Maybe<ShippingMethod>;
  status: Enum_Order_Status;
  subtotal: Scalars['Float']['output'];
  taxAmount?: Maybe<Scalars['Float']['output']>;
  totalAmount: Scalars['Float']['output'];
  trackingNumber?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type OrderAppliedCouponsArgs = {
  filters?: InputMaybe<CouponFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type OrderAppliedCoupons_ConnectionArgs = {
  filters?: InputMaybe<CouponFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type OrderLocalizationsArgs = {
  filters?: InputMaybe<OrderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type OrderLocalizations_ConnectionArgs = {
  filters?: InputMaybe<OrderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type OrderOrderHistoryArgs = {
  filters?: InputMaybe<OrderHistoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type OrderOrderHistory_ConnectionArgs = {
  filters?: InputMaybe<OrderHistoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type OrderOrderItemsArgs = {
  filters?: InputMaybe<OrderItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type OrderOrderItems_ConnectionArgs = {
  filters?: InputMaybe<OrderItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type OrderEntityResponseCollection = {
  __typename?: 'OrderEntityResponseCollection';
  nodes: Array<Order>;
  pageInfo: Pagination;
};

export type OrderFiltersInput = {
  actualDeliveryDate?: InputMaybe<DateTimeFilterInput>;
  and?: InputMaybe<Array<InputMaybe<OrderFiltersInput>>>;
  appliedCoupons?: InputMaybe<CouponFiltersInput>;
  billingAddress?: InputMaybe<DireccionEnvioFiltersInput>;
  cliente?: InputMaybe<ClienteFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  currency?: InputMaybe<StringFilterInput>;
  discountAmount?: InputMaybe<FloatFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  estimatedDeliveryDate?: InputMaybe<DateFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<OrderFiltersInput>;
  not?: InputMaybe<OrderFiltersInput>;
  notes?: InputMaybe<StringFilterInput>;
  or?: InputMaybe<Array<InputMaybe<OrderFiltersInput>>>;
  orderDate?: InputMaybe<DateTimeFilterInput>;
  orderHistory?: InputMaybe<OrderHistoryFiltersInput>;
  orderItems?: InputMaybe<OrderItemFiltersInput>;
  orderNumber?: InputMaybe<StringFilterInput>;
  paymentMethod?: InputMaybe<PaymentMethodFiltersInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  shippingAddress?: InputMaybe<DireccionEnvioFiltersInput>;
  shippingCost?: InputMaybe<FloatFilterInput>;
  shippingMethod?: InputMaybe<ShippingMethodFiltersInput>;
  status?: InputMaybe<StringFilterInput>;
  subtotal?: InputMaybe<FloatFilterInput>;
  taxAmount?: InputMaybe<FloatFilterInput>;
  totalAmount?: InputMaybe<FloatFilterInput>;
  trackingNumber?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type OrderHistory = {
  __typename?: 'OrderHistory';
  automaticChange?: Maybe<Scalars['Boolean']['output']>;
  changeDate: Scalars['DateTime']['output'];
  changedBy?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<OrderHistory>>;
  localizations_connection?: Maybe<OrderHistoryRelationResponseCollection>;
  notes?: Maybe<Scalars['String']['output']>;
  notificationSent?: Maybe<Scalars['Boolean']['output']>;
  order: Order;
  previousStatus?: Maybe<Enum_Orderhistory_Previousstatus>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  status: Enum_Orderhistory_Status;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type OrderHistoryLocalizationsArgs = {
  filters?: InputMaybe<OrderHistoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type OrderHistoryLocalizations_ConnectionArgs = {
  filters?: InputMaybe<OrderHistoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type OrderHistoryEntityResponseCollection = {
  __typename?: 'OrderHistoryEntityResponseCollection';
  nodes: Array<OrderHistory>;
  pageInfo: Pagination;
};

export type OrderHistoryFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<OrderHistoryFiltersInput>>>;
  automaticChange?: InputMaybe<BooleanFilterInput>;
  changeDate?: InputMaybe<DateTimeFilterInput>;
  changedBy?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<OrderHistoryFiltersInput>;
  not?: InputMaybe<OrderHistoryFiltersInput>;
  notes?: InputMaybe<StringFilterInput>;
  notificationSent?: InputMaybe<BooleanFilterInput>;
  or?: InputMaybe<Array<InputMaybe<OrderHistoryFiltersInput>>>;
  order?: InputMaybe<OrderFiltersInput>;
  previousStatus?: InputMaybe<StringFilterInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  status?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type OrderHistoryInput = {
  automaticChange?: InputMaybe<Scalars['Boolean']['input']>;
  changeDate?: InputMaybe<Scalars['DateTime']['input']>;
  changedBy?: InputMaybe<Scalars['String']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  notificationSent?: InputMaybe<Scalars['Boolean']['input']>;
  order?: InputMaybe<Scalars['ID']['input']>;
  previousStatus?: InputMaybe<Enum_Orderhistory_Previousstatus>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  status?: InputMaybe<Enum_Orderhistory_Status>;
};

export type OrderHistoryRelationResponseCollection = {
  __typename?: 'OrderHistoryRelationResponseCollection';
  nodes: Array<OrderHistory>;
};

export type OrderInput = {
  actualDeliveryDate?: InputMaybe<Scalars['DateTime']['input']>;
  appliedCoupons?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  billingAddress?: InputMaybe<Scalars['ID']['input']>;
  cliente?: InputMaybe<Scalars['ID']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  discountAmount?: InputMaybe<Scalars['Float']['input']>;
  estimatedDeliveryDate?: InputMaybe<Scalars['Date']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  orderDate?: InputMaybe<Scalars['DateTime']['input']>;
  orderHistory?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  orderItems?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  orderNumber?: InputMaybe<Scalars['String']['input']>;
  paymentMethod?: InputMaybe<Scalars['ID']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  shippingAddress?: InputMaybe<Scalars['ID']['input']>;
  shippingCost?: InputMaybe<Scalars['Float']['input']>;
  shippingMethod?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<Enum_Order_Status>;
  subtotal?: InputMaybe<Scalars['Float']['input']>;
  taxAmount?: InputMaybe<Scalars['Float']['input']>;
  totalAmount?: InputMaybe<Scalars['Float']['input']>;
  trackingNumber?: InputMaybe<Scalars['String']['input']>;
};

export type OrderItem = {
  __typename?: 'OrderItem';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  discountAmount?: Maybe<Scalars['Float']['output']>;
  documentId: Scalars['ID']['output'];
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<OrderItem>>;
  localizations_connection?: Maybe<OrderItemRelationResponseCollection>;
  order: Order;
  originalPrice: Scalars['Float']['output'];
  product: Product;
  productImage?: Maybe<Scalars['String']['output']>;
  productName: Scalars['String']['output'];
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  quantity: Scalars['Int']['output'];
  sku?: Maybe<Scalars['String']['output']>;
  subtotal: Scalars['Float']['output'];
  unitPrice: Scalars['Float']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  variant?: Maybe<Variant>;
  variantTitle?: Maybe<Scalars['String']['output']>;
};


export type OrderItemLocalizationsArgs = {
  filters?: InputMaybe<OrderItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type OrderItemLocalizations_ConnectionArgs = {
  filters?: InputMaybe<OrderItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type OrderItemEntityResponseCollection = {
  __typename?: 'OrderItemEntityResponseCollection';
  nodes: Array<OrderItem>;
  pageInfo: Pagination;
};

export type OrderItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<OrderItemFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  discountAmount?: InputMaybe<FloatFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<OrderItemFiltersInput>;
  not?: InputMaybe<OrderItemFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<OrderItemFiltersInput>>>;
  order?: InputMaybe<OrderFiltersInput>;
  originalPrice?: InputMaybe<FloatFilterInput>;
  product?: InputMaybe<ProductFiltersInput>;
  productImage?: InputMaybe<StringFilterInput>;
  productName?: InputMaybe<StringFilterInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  quantity?: InputMaybe<IntFilterInput>;
  sku?: InputMaybe<StringFilterInput>;
  subtotal?: InputMaybe<FloatFilterInput>;
  unitPrice?: InputMaybe<FloatFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  variant?: InputMaybe<VariantFiltersInput>;
  variantTitle?: InputMaybe<StringFilterInput>;
};

export type OrderItemInput = {
  discountAmount?: InputMaybe<Scalars['Float']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['ID']['input']>;
  originalPrice?: InputMaybe<Scalars['Float']['input']>;
  product?: InputMaybe<Scalars['ID']['input']>;
  productImage?: InputMaybe<Scalars['String']['input']>;
  productName?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  sku?: InputMaybe<Scalars['String']['input']>;
  subtotal?: InputMaybe<Scalars['Float']['input']>;
  unitPrice?: InputMaybe<Scalars['Float']['input']>;
  variant?: InputMaybe<Scalars['ID']['input']>;
  variantTitle?: InputMaybe<Scalars['String']['input']>;
};

export type OrderItemRelationResponseCollection = {
  __typename?: 'OrderItemRelationResponseCollection';
  nodes: Array<OrderItem>;
};

export type OrderRelationResponseCollection = {
  __typename?: 'OrderRelationResponseCollection';
  nodes: Array<Order>;
};

export type Page404 = {
  __typename?: 'Page404';
  Body?: Maybe<Scalars['JSON']['output']>;
  Titulo?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<Page404>>;
  localizations_connection?: Maybe<Page404RelationResponseCollection>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type Page404Input = {
  Body?: InputMaybe<Scalars['JSON']['input']>;
  Titulo?: InputMaybe<Scalars['String']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Page404RelationResponseCollection = {
  __typename?: 'Page404RelationResponseCollection';
  nodes: Array<Page404>;
};

export type Pagination = {
  __typename?: 'Pagination';
  page: Scalars['Int']['output'];
  pageCount: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type PaginationArg = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  start?: InputMaybe<Scalars['Int']['input']>;
};

export type PaymentMethod = {
  __typename?: 'PaymentMethod';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  documentId: Scalars['ID']['output'];
  icon?: Maybe<UploadFile>;
  isActive?: Maybe<Scalars['Boolean']['output']>;
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<PaymentMethod>>;
  localizations_connection?: Maybe<PaymentMethodRelationResponseCollection>;
  maxAmount?: Maybe<Scalars['Float']['output']>;
  minAmount?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  orders: Array<Maybe<Order>>;
  orders_connection?: Maybe<OrderRelationResponseCollection>;
  processingFee?: Maybe<Scalars['Float']['output']>;
  processingFeeType?: Maybe<Enum_Paymentmethod_Processingfeetype>;
  provider?: Maybe<Scalars['String']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  type: Enum_Paymentmethod_Type;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type PaymentMethodLocalizationsArgs = {
  filters?: InputMaybe<PaymentMethodFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type PaymentMethodLocalizations_ConnectionArgs = {
  filters?: InputMaybe<PaymentMethodFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type PaymentMethodOrdersArgs = {
  filters?: InputMaybe<OrderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type PaymentMethodOrders_ConnectionArgs = {
  filters?: InputMaybe<OrderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type PaymentMethodEntityResponseCollection = {
  __typename?: 'PaymentMethodEntityResponseCollection';
  nodes: Array<PaymentMethod>;
  pageInfo: Pagination;
};

export type PaymentMethodFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<PaymentMethodFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  isActive?: InputMaybe<BooleanFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<PaymentMethodFiltersInput>;
  maxAmount?: InputMaybe<FloatFilterInput>;
  minAmount?: InputMaybe<FloatFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<PaymentMethodFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<PaymentMethodFiltersInput>>>;
  orders?: InputMaybe<OrderFiltersInput>;
  processingFee?: InputMaybe<FloatFilterInput>;
  processingFeeType?: InputMaybe<StringFilterInput>;
  provider?: InputMaybe<StringFilterInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type PaymentMethodInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['ID']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  maxAmount?: InputMaybe<Scalars['Float']['input']>;
  minAmount?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  orders?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  processingFee?: InputMaybe<Scalars['Float']['input']>;
  processingFeeType?: InputMaybe<Enum_Paymentmethod_Processingfeetype>;
  provider?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  type?: InputMaybe<Enum_Paymentmethod_Type>;
};

export type PaymentMethodRelationResponseCollection = {
  __typename?: 'PaymentMethodRelationResponseCollection';
  nodes: Array<PaymentMethod>;
};

export type Product = {
  __typename?: 'Product';
  Attribute_of_products?: Maybe<Array<Maybe<ComponentAttributesVariantTtributesOfProduct>>>;
  Description?: Maybe<Scalars['JSON']['output']>;
  Imagenes: Array<Maybe<UploadFile>>;
  Imagenes_connection?: Maybe<UploadFileRelationResponseCollection>;
  Name?: Maybe<Scalars['String']['output']>;
  Statu?: Maybe<Enum_Product_Statu>;
  Url_imagen?: Maybe<Array<Maybe<ComponentImageUrlImagen>>>;
  categories: Array<Maybe<Category>>;
  categories_connection?: Maybe<CategoryRelationResponseCollection>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<Product>>;
  localizations_connection?: Maybe<ProductRelationResponseCollection>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  variants: Array<Maybe<Variant>>;
  variants_connection?: Maybe<VariantRelationResponseCollection>;
};


export type ProductAttribute_Of_ProductsArgs = {
  filters?: InputMaybe<ComponentAttributesVariantTtributesOfProductFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ProductImagenesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ProductImagenes_ConnectionArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ProductUrl_ImagenArgs = {
  filters?: InputMaybe<ComponentImageUrlImagenFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ProductCategoriesArgs = {
  filters?: InputMaybe<CategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ProductCategories_ConnectionArgs = {
  filters?: InputMaybe<CategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ProductLocalizationsArgs = {
  filters?: InputMaybe<ProductFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ProductLocalizations_ConnectionArgs = {
  filters?: InputMaybe<ProductFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ProductVariantsArgs = {
  filters?: InputMaybe<VariantFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ProductVariants_ConnectionArgs = {
  filters?: InputMaybe<VariantFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ProductEntityResponseCollection = {
  __typename?: 'ProductEntityResponseCollection';
  nodes: Array<Product>;
  pageInfo: Pagination;
};

export type ProductFiltersInput = {
  Attribute_of_products?: InputMaybe<ComponentAttributesVariantTtributesOfProductFiltersInput>;
  Description?: InputMaybe<JsonFilterInput>;
  Name?: InputMaybe<StringFilterInput>;
  Statu?: InputMaybe<StringFilterInput>;
  Url_imagen?: InputMaybe<ComponentImageUrlImagenFiltersInput>;
  and?: InputMaybe<Array<InputMaybe<ProductFiltersInput>>>;
  categories?: InputMaybe<CategoryFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<ProductFiltersInput>;
  not?: InputMaybe<ProductFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ProductFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  slug?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  variants?: InputMaybe<VariantFiltersInput>;
};

export type ProductInput = {
  Attribute_of_products?: InputMaybe<Array<InputMaybe<ComponentAttributesVariantTtributesOfProductInput>>>;
  Description?: InputMaybe<Scalars['JSON']['input']>;
  Imagenes?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  Name?: InputMaybe<Scalars['String']['input']>;
  Statu?: InputMaybe<Enum_Product_Statu>;
  Url_imagen?: InputMaybe<Array<InputMaybe<ComponentImageUrlImagenInput>>>;
  categories?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  variants?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

export type ProductRelationResponseCollection = {
  __typename?: 'ProductRelationResponseCollection';
  nodes: Array<Product>;
};

export enum PublicationStatus {
  Draft = 'DRAFT',
  Published = 'PUBLISHED'
}

export type Query = {
  __typename?: 'Query';
  attributo?: Maybe<Attributo>;
  attributos: Array<Maybe<Attributo>>;
  attributos_connection?: Maybe<AttributoEntityResponseCollection>;
  banner?: Maybe<Banner>;
  bannerPromocional?: Maybe<BannerPromocional>;
  banners: Array<Maybe<Banner>>;
  banners_connection?: Maybe<BannerEntityResponseCollection>;
  calificacion?: Maybe<Calificacion>;
  calificacions: Array<Maybe<Calificacion>>;
  calificacions_connection?: Maybe<CalificacionEntityResponseCollection>;
  categories: Array<Maybe<Category>>;
  categories_connection?: Maybe<CategoryEntityResponseCollection>;
  category?: Maybe<Category>;
  cliente?: Maybe<Cliente>;
  clientes: Array<Maybe<Cliente>>;
  clientes_connection?: Maybe<ClienteEntityResponseCollection>;
  comerce?: Maybe<Comerce>;
  comerces: Array<Maybe<Comerce>>;
  comerces_connection?: Maybe<ComerceEntityResponseCollection>;
  coupon?: Maybe<Coupon>;
  coupons: Array<Maybe<Coupon>>;
  coupons_connection?: Maybe<CouponEntityResponseCollection>;
  descuento?: Maybe<Descuento>;
  descuentos: Array<Maybe<Descuento>>;
  descuentos_connection?: Maybe<DescuentoEntityResponseCollection>;
  direccionEnvio?: Maybe<DireccionEnvio>;
  direccionEnvios: Array<Maybe<DireccionEnvio>>;
  direccionEnvios_connection?: Maybe<DireccionEnvioEntityResponseCollection>;
  grupoAttributo?: Maybe<GrupoAttributo>;
  grupoAttributos: Array<Maybe<GrupoAttributo>>;
  grupoAttributos_connection?: Maybe<GrupoAttributoEntityResponseCollection>;
  hero?: Maybe<Hero>;
  heroHome?: Maybe<HeroHome>;
  heroHomes: Array<Maybe<HeroHome>>;
  heroHomes_connection?: Maybe<HeroHomeEntityResponseCollection>;
  homePagen?: Maybe<HomePagen>;
  i18NLocale?: Maybe<I18NLocale>;
  i18NLocales: Array<Maybe<I18NLocale>>;
  i18NLocales_connection?: Maybe<I18NLocaleEntityResponseCollection>;
  lugar?: Maybe<Lugar>;
  lugars: Array<Maybe<Lugar>>;
  lugars_connection?: Maybe<LugarEntityResponseCollection>;
  me?: Maybe<UsersPermissionsMe>;
  order?: Maybe<Order>;
  orderHistories: Array<Maybe<OrderHistory>>;
  orderHistories_connection?: Maybe<OrderHistoryEntityResponseCollection>;
  orderHistory?: Maybe<OrderHistory>;
  orderItem?: Maybe<OrderItem>;
  orderItems: Array<Maybe<OrderItem>>;
  orderItems_connection?: Maybe<OrderItemEntityResponseCollection>;
  orders: Array<Maybe<Order>>;
  orders_connection?: Maybe<OrderEntityResponseCollection>;
  page404?: Maybe<Page404>;
  paymentMethod?: Maybe<PaymentMethod>;
  paymentMethods: Array<Maybe<PaymentMethod>>;
  paymentMethods_connection?: Maybe<PaymentMethodEntityResponseCollection>;
  product?: Maybe<Product>;
  products: Array<Maybe<Product>>;
  products_connection?: Maybe<ProductEntityResponseCollection>;
  reserva?: Maybe<Reserva>;
  reservas: Array<Maybe<Reserva>>;
  reservas_connection?: Maybe<ReservaEntityResponseCollection>;
  reviewWorkflowsWorkflow?: Maybe<ReviewWorkflowsWorkflow>;
  reviewWorkflowsWorkflowStage?: Maybe<ReviewWorkflowsWorkflowStage>;
  reviewWorkflowsWorkflowStages: Array<Maybe<ReviewWorkflowsWorkflowStage>>;
  reviewWorkflowsWorkflowStages_connection?: Maybe<ReviewWorkflowsWorkflowStageEntityResponseCollection>;
  reviewWorkflowsWorkflows: Array<Maybe<ReviewWorkflowsWorkflow>>;
  reviewWorkflowsWorkflows_connection?: Maybe<ReviewWorkflowsWorkflowEntityResponseCollection>;
  servicio?: Maybe<Servicio>;
  servicios: Array<Maybe<Servicio>>;
  servicios_connection?: Maybe<ServicioEntityResponseCollection>;
  shippingMethod?: Maybe<ShippingMethod>;
  shippingMethods: Array<Maybe<ShippingMethod>>;
  shippingMethods_connection?: Maybe<ShippingMethodEntityResponseCollection>;
  tax?: Maybe<Tax>;
  taxes: Array<Maybe<Tax>>;
  taxes_connection?: Maybe<TaxEntityResponseCollection>;
  tipoDeProducto?: Maybe<TipoDeProducto>;
  tipoDeProductos: Array<Maybe<TipoDeProducto>>;
  tipoDeProductos_connection?: Maybe<TipoDeProductoEntityResponseCollection>;
  uploadFile?: Maybe<UploadFile>;
  uploadFiles: Array<Maybe<UploadFile>>;
  uploadFiles_connection?: Maybe<UploadFileEntityResponseCollection>;
  usersPermissionsRole?: Maybe<UsersPermissionsRole>;
  usersPermissionsRoles: Array<Maybe<UsersPermissionsRole>>;
  usersPermissionsRoles_connection?: Maybe<UsersPermissionsRoleEntityResponseCollection>;
  usersPermissionsUser?: Maybe<UsersPermissionsUser>;
  usersPermissionsUsers: Array<Maybe<UsersPermissionsUser>>;
  usersPermissionsUsers_connection?: Maybe<UsersPermissionsUserEntityResponseCollection>;
  variant?: Maybe<Variant>;
  variants: Array<Maybe<Variant>>;
  variants_connection?: Maybe<VariantEntityResponseCollection>;
};


export type QueryAttributoArgs = {
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type QueryAttributosArgs = {
  filters?: InputMaybe<AttributoFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryAttributos_ConnectionArgs = {
  filters?: InputMaybe<AttributoFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryBannerArgs = {
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type QueryBannerPromocionalArgs = {
  status?: InputMaybe<PublicationStatus>;
};


export type QueryBannersArgs = {
  filters?: InputMaybe<BannerFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryBanners_ConnectionArgs = {
  filters?: InputMaybe<BannerFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryCalificacionArgs = {
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type QueryCalificacionsArgs = {
  filters?: InputMaybe<CalificacionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryCalificacions_ConnectionArgs = {
  filters?: InputMaybe<CalificacionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryCategoriesArgs = {
  filters?: InputMaybe<CategoryFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryCategories_ConnectionArgs = {
  filters?: InputMaybe<CategoryFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryCategoryArgs = {
  documentId: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryClienteArgs = {
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type QueryClientesArgs = {
  filters?: InputMaybe<ClienteFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryClientes_ConnectionArgs = {
  filters?: InputMaybe<ClienteFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryComerceArgs = {
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type QueryComercesArgs = {
  filters?: InputMaybe<ComerceFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryComerces_ConnectionArgs = {
  filters?: InputMaybe<ComerceFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryCouponArgs = {
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type QueryCouponsArgs = {
  filters?: InputMaybe<CouponFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryCoupons_ConnectionArgs = {
  filters?: InputMaybe<CouponFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryDescuentoArgs = {
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type QueryDescuentosArgs = {
  filters?: InputMaybe<DescuentoFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryDescuentos_ConnectionArgs = {
  filters?: InputMaybe<DescuentoFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryDireccionEnvioArgs = {
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type QueryDireccionEnviosArgs = {
  filters?: InputMaybe<DireccionEnvioFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryDireccionEnvios_ConnectionArgs = {
  filters?: InputMaybe<DireccionEnvioFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryGrupoAttributoArgs = {
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type QueryGrupoAttributosArgs = {
  filters?: InputMaybe<GrupoAttributoFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryGrupoAttributos_ConnectionArgs = {
  filters?: InputMaybe<GrupoAttributoFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryHeroArgs = {
  status?: InputMaybe<PublicationStatus>;
};


export type QueryHeroHomeArgs = {
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type QueryHeroHomesArgs = {
  filters?: InputMaybe<HeroHomeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryHeroHomes_ConnectionArgs = {
  filters?: InputMaybe<HeroHomeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryHomePagenArgs = {
  status?: InputMaybe<PublicationStatus>;
};


export type QueryI18NLocaleArgs = {
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type QueryI18NLocalesArgs = {
  filters?: InputMaybe<I18NLocaleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryI18NLocales_ConnectionArgs = {
  filters?: InputMaybe<I18NLocaleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryLugarArgs = {
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type QueryLugarsArgs = {
  filters?: InputMaybe<LugarFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryLugars_ConnectionArgs = {
  filters?: InputMaybe<LugarFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryOrderArgs = {
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type QueryOrderHistoriesArgs = {
  filters?: InputMaybe<OrderHistoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryOrderHistories_ConnectionArgs = {
  filters?: InputMaybe<OrderHistoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryOrderHistoryArgs = {
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type QueryOrderItemArgs = {
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type QueryOrderItemsArgs = {
  filters?: InputMaybe<OrderItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryOrderItems_ConnectionArgs = {
  filters?: InputMaybe<OrderItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryOrdersArgs = {
  filters?: InputMaybe<OrderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryOrders_ConnectionArgs = {
  filters?: InputMaybe<OrderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryPage404Args = {
  status?: InputMaybe<PublicationStatus>;
};


export type QueryPaymentMethodArgs = {
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type QueryPaymentMethodsArgs = {
  filters?: InputMaybe<PaymentMethodFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryPaymentMethods_ConnectionArgs = {
  filters?: InputMaybe<PaymentMethodFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryProductArgs = {
  documentId: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryProductsArgs = {
  filters?: InputMaybe<ProductFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryProducts_ConnectionArgs = {
  filters?: InputMaybe<ProductFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryReservaArgs = {
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type QueryReservasArgs = {
  filters?: InputMaybe<ReservaFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryReservas_ConnectionArgs = {
  filters?: InputMaybe<ReservaFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryReviewWorkflowsWorkflowArgs = {
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type QueryReviewWorkflowsWorkflowStageArgs = {
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type QueryReviewWorkflowsWorkflowStagesArgs = {
  filters?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryReviewWorkflowsWorkflowStages_ConnectionArgs = {
  filters?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryReviewWorkflowsWorkflowsArgs = {
  filters?: InputMaybe<ReviewWorkflowsWorkflowFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryReviewWorkflowsWorkflows_ConnectionArgs = {
  filters?: InputMaybe<ReviewWorkflowsWorkflowFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryServicioArgs = {
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type QueryServiciosArgs = {
  filters?: InputMaybe<ServicioFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryServicios_ConnectionArgs = {
  filters?: InputMaybe<ServicioFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryShippingMethodArgs = {
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type QueryShippingMethodsArgs = {
  filters?: InputMaybe<ShippingMethodFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryShippingMethods_ConnectionArgs = {
  filters?: InputMaybe<ShippingMethodFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryTaxArgs = {
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type QueryTaxesArgs = {
  filters?: InputMaybe<TaxFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryTaxes_ConnectionArgs = {
  filters?: InputMaybe<TaxFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryTipoDeProductoArgs = {
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type QueryTipoDeProductosArgs = {
  filters?: InputMaybe<TipoDeProductoFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryTipoDeProductos_ConnectionArgs = {
  filters?: InputMaybe<TipoDeProductoFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryUploadFileArgs = {
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type QueryUploadFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryUploadFiles_ConnectionArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryUsersPermissionsRoleArgs = {
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type QueryUsersPermissionsRolesArgs = {
  filters?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryUsersPermissionsRoles_ConnectionArgs = {
  filters?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryUsersPermissionsUserArgs = {
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type QueryUsersPermissionsUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryUsersPermissionsUsers_ConnectionArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryVariantArgs = {
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type QueryVariantsArgs = {
  filters?: InputMaybe<VariantFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryVariants_ConnectionArgs = {
  filters?: InputMaybe<VariantFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};

export type Reserva = {
  __typename?: 'Reserva';
  Tipo_de_reserva?: Maybe<Enum_Reserva_Tipo_De_Reserva>;
  cantidad_de_personas?: Maybe<Scalars['Int']['output']>;
  cliente?: Maybe<Cliente>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  detalles_adicionales?: Maybe<Scalars['String']['output']>;
  documentId: Scalars['ID']['output'];
  duracion?: Maybe<Scalars['Int']['output']>;
  estado_de_la_reserva?: Maybe<Enum_Reserva_Estado_De_La_Reserva>;
  fecha_de_finalizacion?: Maybe<Scalars['Date']['output']>;
  fecha_de_reserva?: Maybe<Scalars['Date']['output']>;
  hora_de_finalizacion?: Maybe<Scalars['Time']['output']>;
  hora_de_inicio?: Maybe<Scalars['Time']['output']>;
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<Reserva>>;
  localizations_connection?: Maybe<ReservaRelationResponseCollection>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type ReservaLocalizationsArgs = {
  filters?: InputMaybe<ReservaFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ReservaLocalizations_ConnectionArgs = {
  filters?: InputMaybe<ReservaFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ReservaEntityResponseCollection = {
  __typename?: 'ReservaEntityResponseCollection';
  nodes: Array<Reserva>;
  pageInfo: Pagination;
};

export type ReservaFiltersInput = {
  Tipo_de_reserva?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<ReservaFiltersInput>>>;
  cantidad_de_personas?: InputMaybe<IntFilterInput>;
  cliente?: InputMaybe<ClienteFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  detalles_adicionales?: InputMaybe<StringFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  duracion?: InputMaybe<IntFilterInput>;
  estado_de_la_reserva?: InputMaybe<StringFilterInput>;
  fecha_de_finalizacion?: InputMaybe<DateFilterInput>;
  fecha_de_reserva?: InputMaybe<DateFilterInput>;
  hora_de_finalizacion?: InputMaybe<TimeFilterInput>;
  hora_de_inicio?: InputMaybe<TimeFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<ReservaFiltersInput>;
  not?: InputMaybe<ReservaFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ReservaFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ReservaInput = {
  Tipo_de_reserva?: InputMaybe<Enum_Reserva_Tipo_De_Reserva>;
  cantidad_de_personas?: InputMaybe<Scalars['Int']['input']>;
  cliente?: InputMaybe<Scalars['ID']['input']>;
  detalles_adicionales?: InputMaybe<Scalars['String']['input']>;
  duracion?: InputMaybe<Scalars['Int']['input']>;
  estado_de_la_reserva?: InputMaybe<Enum_Reserva_Estado_De_La_Reserva>;
  fecha_de_finalizacion?: InputMaybe<Scalars['Date']['input']>;
  fecha_de_reserva?: InputMaybe<Scalars['Date']['input']>;
  hora_de_finalizacion?: InputMaybe<Scalars['Time']['input']>;
  hora_de_inicio?: InputMaybe<Scalars['Time']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ReservaRelationResponseCollection = {
  __typename?: 'ReservaRelationResponseCollection';
  nodes: Array<Reserva>;
};

export type ReviewWorkflowsWorkflow = {
  __typename?: 'ReviewWorkflowsWorkflow';
  contentTypes: Scalars['JSON']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<ReviewWorkflowsWorkflow>>;
  localizations_connection?: Maybe<ReviewWorkflowsWorkflowRelationResponseCollection>;
  name: Scalars['String']['output'];
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  stages: Array<Maybe<ReviewWorkflowsWorkflowStage>>;
  stages_connection?: Maybe<ReviewWorkflowsWorkflowStageRelationResponseCollection>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type ReviewWorkflowsWorkflowLocalizationsArgs = {
  filters?: InputMaybe<ReviewWorkflowsWorkflowFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ReviewWorkflowsWorkflowLocalizations_ConnectionArgs = {
  filters?: InputMaybe<ReviewWorkflowsWorkflowFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ReviewWorkflowsWorkflowStagesArgs = {
  filters?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ReviewWorkflowsWorkflowStages_ConnectionArgs = {
  filters?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ReviewWorkflowsWorkflowEntityResponseCollection = {
  __typename?: 'ReviewWorkflowsWorkflowEntityResponseCollection';
  nodes: Array<ReviewWorkflowsWorkflow>;
  pageInfo: Pagination;
};

export type ReviewWorkflowsWorkflowFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ReviewWorkflowsWorkflowFiltersInput>>>;
  contentTypes?: InputMaybe<JsonFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<ReviewWorkflowsWorkflowFiltersInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ReviewWorkflowsWorkflowFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ReviewWorkflowsWorkflowFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  stages?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ReviewWorkflowsWorkflowInput = {
  contentTypes?: InputMaybe<Scalars['JSON']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  stages?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

export type ReviewWorkflowsWorkflowRelationResponseCollection = {
  __typename?: 'ReviewWorkflowsWorkflowRelationResponseCollection';
  nodes: Array<ReviewWorkflowsWorkflow>;
};

export type ReviewWorkflowsWorkflowStage = {
  __typename?: 'ReviewWorkflowsWorkflowStage';
  color?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<ReviewWorkflowsWorkflowStage>>;
  localizations_connection?: Maybe<ReviewWorkflowsWorkflowStageRelationResponseCollection>;
  name?: Maybe<Scalars['String']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  workflow?: Maybe<ReviewWorkflowsWorkflow>;
};


export type ReviewWorkflowsWorkflowStageLocalizationsArgs = {
  filters?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ReviewWorkflowsWorkflowStageLocalizations_ConnectionArgs = {
  filters?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ReviewWorkflowsWorkflowStageEntityResponseCollection = {
  __typename?: 'ReviewWorkflowsWorkflowStageEntityResponseCollection';
  nodes: Array<ReviewWorkflowsWorkflowStage>;
  pageInfo: Pagination;
};

export type ReviewWorkflowsWorkflowStageFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>>>;
  color?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  workflow?: InputMaybe<ReviewWorkflowsWorkflowFiltersInput>;
};

export type ReviewWorkflowsWorkflowStageInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  workflow?: InputMaybe<Scalars['ID']['input']>;
};

export type ReviewWorkflowsWorkflowStageRelationResponseCollection = {
  __typename?: 'ReviewWorkflowsWorkflowStageRelationResponseCollection';
  nodes: Array<ReviewWorkflowsWorkflowStage>;
};

export type Servicio = {
  __typename?: 'Servicio';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  descripcion?: Maybe<Scalars['JSON']['output']>;
  documentId: Scalars['ID']['output'];
  duracion_predeterminada?: Maybe<Scalars['Int']['output']>;
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<Servicio>>;
  localizations_connection?: Maybe<ServicioRelationResponseCollection>;
  nombre_del_servicio?: Maybe<Scalars['String']['output']>;
  precio?: Maybe<Scalars['Float']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  tipo_de_servicio?: Maybe<Enum_Servicio_Tipo_De_Servicio>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type ServicioLocalizationsArgs = {
  filters?: InputMaybe<ServicioFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ServicioLocalizations_ConnectionArgs = {
  filters?: InputMaybe<ServicioFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ServicioEntityResponseCollection = {
  __typename?: 'ServicioEntityResponseCollection';
  nodes: Array<Servicio>;
  pageInfo: Pagination;
};

export type ServicioFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ServicioFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  descripcion?: InputMaybe<JsonFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  duracion_predeterminada?: InputMaybe<IntFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<ServicioFiltersInput>;
  nombre_del_servicio?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ServicioFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ServicioFiltersInput>>>;
  precio?: InputMaybe<FloatFilterInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  tipo_de_servicio?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ServicioInput = {
  descripcion?: InputMaybe<Scalars['JSON']['input']>;
  duracion_predeterminada?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  nombre_del_servicio?: InputMaybe<Scalars['String']['input']>;
  precio?: InputMaybe<Scalars['Float']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  tipo_de_servicio?: InputMaybe<Enum_Servicio_Tipo_De_Servicio>;
};

export type ServicioRelationResponseCollection = {
  __typename?: 'ServicioRelationResponseCollection';
  nodes: Array<Servicio>;
};

export type ShippingMethod = {
  __typename?: 'ShippingMethod';
  availableStates?: Maybe<Scalars['JSON']['output']>;
  baseCost: Scalars['Float']['output'];
  carrier?: Maybe<Scalars['String']['output']>;
  costPerKg?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  documentId: Scalars['ID']['output'];
  estimatedDays: Scalars['Int']['output'];
  freeShippingThreshold?: Maybe<Scalars['Float']['output']>;
  icon?: Maybe<UploadFile>;
  isActive?: Maybe<Scalars['Boolean']['output']>;
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<ShippingMethod>>;
  localizations_connection?: Maybe<ShippingMethodRelationResponseCollection>;
  maxWeight?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  type: Enum_Shippingmethod_Type;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type ShippingMethodLocalizationsArgs = {
  filters?: InputMaybe<ShippingMethodFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ShippingMethodLocalizations_ConnectionArgs = {
  filters?: InputMaybe<ShippingMethodFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ShippingMethodEntityResponseCollection = {
  __typename?: 'ShippingMethodEntityResponseCollection';
  nodes: Array<ShippingMethod>;
  pageInfo: Pagination;
};

export type ShippingMethodFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ShippingMethodFiltersInput>>>;
  availableStates?: InputMaybe<JsonFilterInput>;
  baseCost?: InputMaybe<FloatFilterInput>;
  carrier?: InputMaybe<StringFilterInput>;
  costPerKg?: InputMaybe<FloatFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  estimatedDays?: InputMaybe<IntFilterInput>;
  freeShippingThreshold?: InputMaybe<FloatFilterInput>;
  isActive?: InputMaybe<BooleanFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<ShippingMethodFiltersInput>;
  maxWeight?: InputMaybe<FloatFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ShippingMethodFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ShippingMethodFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ShippingMethodInput = {
  availableStates?: InputMaybe<Scalars['JSON']['input']>;
  baseCost?: InputMaybe<Scalars['Float']['input']>;
  carrier?: InputMaybe<Scalars['String']['input']>;
  costPerKg?: InputMaybe<Scalars['Float']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  estimatedDays?: InputMaybe<Scalars['Int']['input']>;
  freeShippingThreshold?: InputMaybe<Scalars['Float']['input']>;
  icon?: InputMaybe<Scalars['ID']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  maxWeight?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  type?: InputMaybe<Enum_Shippingmethod_Type>;
};

export type ShippingMethodRelationResponseCollection = {
  __typename?: 'ShippingMethodRelationResponseCollection';
  nodes: Array<ShippingMethod>;
};

export type StringFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  containsi?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  eqi?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  nei?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<StringFilterInput>;
  notContains?: InputMaybe<Scalars['String']['input']>;
  notContainsi?: InputMaybe<Scalars['String']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type Tax = {
  __typename?: 'Tax';
  applicableToCategories: Array<Maybe<Category>>;
  applicableToCategories_connection?: Maybe<CategoryRelationResponseCollection>;
  applicableToProducts: Array<Maybe<Product>>;
  applicableToProducts_connection?: Maybe<ProductRelationResponseCollection>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  documentId: Scalars['ID']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<Tax>>;
  localizations_connection?: Maybe<TaxRelationResponseCollection>;
  name: Scalars['String']['output'];
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  rate: Scalars['Float']['output'];
  type: Enum_Tax_Type;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type TaxApplicableToCategoriesArgs = {
  filters?: InputMaybe<CategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type TaxApplicableToCategories_ConnectionArgs = {
  filters?: InputMaybe<CategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type TaxApplicableToProductsArgs = {
  filters?: InputMaybe<ProductFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type TaxApplicableToProducts_ConnectionArgs = {
  filters?: InputMaybe<ProductFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type TaxLocalizationsArgs = {
  filters?: InputMaybe<TaxFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type TaxLocalizations_ConnectionArgs = {
  filters?: InputMaybe<TaxFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type TaxEntityResponseCollection = {
  __typename?: 'TaxEntityResponseCollection';
  nodes: Array<Tax>;
  pageInfo: Pagination;
};

export type TaxFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<TaxFiltersInput>>>;
  applicableToCategories?: InputMaybe<CategoryFiltersInput>;
  applicableToProducts?: InputMaybe<ProductFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  isActive?: InputMaybe<BooleanFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<TaxFiltersInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<TaxFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<TaxFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  rate?: InputMaybe<FloatFilterInput>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type TaxInput = {
  applicableToCategories?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  applicableToProducts?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rate?: InputMaybe<Scalars['Float']['input']>;
  type?: InputMaybe<Enum_Tax_Type>;
};

export type TaxRelationResponseCollection = {
  __typename?: 'TaxRelationResponseCollection';
  nodes: Array<Tax>;
};

export type TimeFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Time']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Time']['input']>>>;
  contains?: InputMaybe<Scalars['Time']['input']>;
  containsi?: InputMaybe<Scalars['Time']['input']>;
  endsWith?: InputMaybe<Scalars['Time']['input']>;
  eq?: InputMaybe<Scalars['Time']['input']>;
  eqi?: InputMaybe<Scalars['Time']['input']>;
  gt?: InputMaybe<Scalars['Time']['input']>;
  gte?: InputMaybe<Scalars['Time']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Time']['input']>>>;
  lt?: InputMaybe<Scalars['Time']['input']>;
  lte?: InputMaybe<Scalars['Time']['input']>;
  ne?: InputMaybe<Scalars['Time']['input']>;
  nei?: InputMaybe<Scalars['Time']['input']>;
  not?: InputMaybe<TimeFilterInput>;
  notContains?: InputMaybe<Scalars['Time']['input']>;
  notContainsi?: InputMaybe<Scalars['Time']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Time']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Time']['input']>>>;
  startsWith?: InputMaybe<Scalars['Time']['input']>;
};

export type TipoDeProducto = {
  __typename?: 'TipoDeProducto';
  Descripcion?: Maybe<Scalars['String']['output']>;
  Nombre?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  grupo_attributo?: Maybe<GrupoAttributo>;
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<TipoDeProducto>>;
  localizations_connection?: Maybe<TipoDeProductoRelationResponseCollection>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type TipoDeProductoLocalizationsArgs = {
  filters?: InputMaybe<TipoDeProductoFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type TipoDeProductoLocalizations_ConnectionArgs = {
  filters?: InputMaybe<TipoDeProductoFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type TipoDeProductoEntityResponseCollection = {
  __typename?: 'TipoDeProductoEntityResponseCollection';
  nodes: Array<TipoDeProducto>;
  pageInfo: Pagination;
};

export type TipoDeProductoFiltersInput = {
  Descripcion?: InputMaybe<StringFilterInput>;
  Nombre?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<TipoDeProductoFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  grupo_attributo?: InputMaybe<GrupoAttributoFiltersInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<TipoDeProductoFiltersInput>;
  not?: InputMaybe<TipoDeProductoFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<TipoDeProductoFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type TipoDeProductoInput = {
  Descripcion?: InputMaybe<Scalars['String']['input']>;
  Nombre?: InputMaybe<Scalars['String']['input']>;
  grupo_attributo?: InputMaybe<Scalars['ID']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type TipoDeProductoRelationResponseCollection = {
  __typename?: 'TipoDeProductoRelationResponseCollection';
  nodes: Array<TipoDeProducto>;
};

export type UploadFile = {
  __typename?: 'UploadFile';
  alternativeText?: Maybe<Scalars['String']['output']>;
  caption?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  ext?: Maybe<Scalars['String']['output']>;
  formats?: Maybe<Scalars['JSON']['output']>;
  hash: Scalars['String']['output'];
  height?: Maybe<Scalars['Int']['output']>;
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<UploadFile>>;
  localizations_connection?: Maybe<UploadFileRelationResponseCollection>;
  mime: Scalars['String']['output'];
  name: Scalars['String']['output'];
  previewUrl?: Maybe<Scalars['String']['output']>;
  provider: Scalars['String']['output'];
  provider_metadata?: Maybe<Scalars['JSON']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  related?: Maybe<Array<Maybe<GenericMorph>>>;
  size: Scalars['Float']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  url: Scalars['String']['output'];
  width?: Maybe<Scalars['Int']['output']>;
};


export type UploadFileLocalizationsArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type UploadFileLocalizations_ConnectionArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type UploadFileEntityResponseCollection = {
  __typename?: 'UploadFileEntityResponseCollection';
  nodes: Array<UploadFile>;
  pageInfo: Pagination;
};

export type UploadFileFiltersInput = {
  alternativeText?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  caption?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  ext?: InputMaybe<StringFilterInput>;
  formats?: InputMaybe<JsonFilterInput>;
  hash?: InputMaybe<StringFilterInput>;
  height?: InputMaybe<IntFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<UploadFileFiltersInput>;
  mime?: InputMaybe<StringFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UploadFileFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  previewUrl?: InputMaybe<StringFilterInput>;
  provider?: InputMaybe<StringFilterInput>;
  provider_metadata?: InputMaybe<JsonFilterInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  size?: InputMaybe<FloatFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  url?: InputMaybe<StringFilterInput>;
  width?: InputMaybe<IntFilterInput>;
};

export type UploadFileRelationResponseCollection = {
  __typename?: 'UploadFileRelationResponseCollection';
  nodes: Array<UploadFile>;
};

export type UsersPermissionsCreateRolePayload = {
  __typename?: 'UsersPermissionsCreateRolePayload';
  ok: Scalars['Boolean']['output'];
};

export type UsersPermissionsDeleteRolePayload = {
  __typename?: 'UsersPermissionsDeleteRolePayload';
  ok: Scalars['Boolean']['output'];
};

export type UsersPermissionsLoginInput = {
  identifier: Scalars['String']['input'];
  password: Scalars['String']['input'];
  provider?: Scalars['String']['input'];
};

export type UsersPermissionsLoginPayload = {
  __typename?: 'UsersPermissionsLoginPayload';
  jwt?: Maybe<Scalars['String']['output']>;
  user: UsersPermissionsMe;
};

export type UsersPermissionsMe = {
  __typename?: 'UsersPermissionsMe';
  blocked?: Maybe<Scalars['Boolean']['output']>;
  confirmed?: Maybe<Scalars['Boolean']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  role?: Maybe<UsersPermissionsMeRole>;
  username: Scalars['String']['output'];
};

export type UsersPermissionsMeRole = {
  __typename?: 'UsersPermissionsMeRole';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  type?: Maybe<Scalars['String']['output']>;
};

export type UsersPermissionsPasswordPayload = {
  __typename?: 'UsersPermissionsPasswordPayload';
  ok: Scalars['Boolean']['output'];
};

export type UsersPermissionsPermission = {
  __typename?: 'UsersPermissionsPermission';
  action: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<UsersPermissionsPermission>>;
  localizations_connection?: Maybe<UsersPermissionsPermissionRelationResponseCollection>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  role?: Maybe<UsersPermissionsRole>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type UsersPermissionsPermissionLocalizationsArgs = {
  filters?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type UsersPermissionsPermissionLocalizations_ConnectionArgs = {
  filters?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type UsersPermissionsPermissionFiltersInput = {
  action?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  not?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type UsersPermissionsPermissionRelationResponseCollection = {
  __typename?: 'UsersPermissionsPermissionRelationResponseCollection';
  nodes: Array<UsersPermissionsPermission>;
};

export type UsersPermissionsRegisterInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type UsersPermissionsRole = {
  __typename?: 'UsersPermissionsRole';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  documentId: Scalars['ID']['output'];
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<UsersPermissionsRole>>;
  localizations_connection?: Maybe<UsersPermissionsRoleRelationResponseCollection>;
  name: Scalars['String']['output'];
  permissions: Array<Maybe<UsersPermissionsPermission>>;
  permissions_connection?: Maybe<UsersPermissionsPermissionRelationResponseCollection>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  users: Array<Maybe<UsersPermissionsUser>>;
  users_connection?: Maybe<UsersPermissionsUserRelationResponseCollection>;
};


export type UsersPermissionsRoleLocalizationsArgs = {
  filters?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type UsersPermissionsRoleLocalizations_ConnectionArgs = {
  filters?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type UsersPermissionsRolePermissionsArgs = {
  filters?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type UsersPermissionsRolePermissions_ConnectionArgs = {
  filters?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type UsersPermissionsRoleUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type UsersPermissionsRoleUsers_ConnectionArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type UsersPermissionsRoleEntityResponseCollection = {
  __typename?: 'UsersPermissionsRoleEntityResponseCollection';
  nodes: Array<UsersPermissionsRole>;
  pageInfo: Pagination;
};

export type UsersPermissionsRoleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  permissions?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  users?: InputMaybe<UsersPermissionsUserFiltersInput>;
};

export type UsersPermissionsRoleInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  permissions?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  users?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

export type UsersPermissionsRoleRelationResponseCollection = {
  __typename?: 'UsersPermissionsRoleRelationResponseCollection';
  nodes: Array<UsersPermissionsRole>;
};

export type UsersPermissionsUpdateRolePayload = {
  __typename?: 'UsersPermissionsUpdateRolePayload';
  ok: Scalars['Boolean']['output'];
};

export type UsersPermissionsUser = {
  __typename?: 'UsersPermissionsUser';
  blocked?: Maybe<Scalars['Boolean']['output']>;
  confirmed?: Maybe<Scalars['Boolean']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  email: Scalars['String']['output'];
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<UsersPermissionsUser>>;
  localizations_connection?: Maybe<UsersPermissionsUserRelationResponseCollection>;
  provider?: Maybe<Scalars['String']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  role?: Maybe<UsersPermissionsRole>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  username: Scalars['String']['output'];
};


export type UsersPermissionsUserLocalizationsArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type UsersPermissionsUserLocalizations_ConnectionArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type UsersPermissionsUserEntityResponse = {
  __typename?: 'UsersPermissionsUserEntityResponse';
  data?: Maybe<UsersPermissionsUser>;
};

export type UsersPermissionsUserEntityResponseCollection = {
  __typename?: 'UsersPermissionsUserEntityResponseCollection';
  nodes: Array<UsersPermissionsUser>;
  pageInfo: Pagination;
};

export type UsersPermissionsUserFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  blocked?: InputMaybe<BooleanFilterInput>;
  confirmed?: InputMaybe<BooleanFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  email?: InputMaybe<StringFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<UsersPermissionsUserFiltersInput>;
  not?: InputMaybe<UsersPermissionsUserFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  provider?: InputMaybe<StringFilterInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  username?: InputMaybe<StringFilterInput>;
};

export type UsersPermissionsUserInput = {
  blocked?: InputMaybe<Scalars['Boolean']['input']>;
  confirmed?: InputMaybe<Scalars['Boolean']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  provider?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  role?: InputMaybe<Scalars['ID']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UsersPermissionsUserRelationResponseCollection = {
  __typename?: 'UsersPermissionsUserRelationResponseCollection';
  nodes: Array<UsersPermissionsUser>;
};

export type Variant = {
  __typename?: 'Variant';
  Sku?: Maybe<Scalars['String']['output']>;
  Title?: Maybe<Scalars['String']['output']>;
  attributes: Array<Maybe<ComponentAttributesVariantAttributes>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  empresa?: Maybe<Comerce>;
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<Variant>>;
  localizations_connection?: Maybe<VariantRelationResponseCollection>;
  price?: Maybe<Scalars['Long']['output']>;
  product_parent?: Maybe<Product>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  stock?: Maybe<Scalars['Long']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type VariantAttributesArgs = {
  filters?: InputMaybe<ComponentAttributesVariantAttributesFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type VariantLocalizationsArgs = {
  filters?: InputMaybe<VariantFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type VariantLocalizations_ConnectionArgs = {
  filters?: InputMaybe<VariantFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type VariantEntityResponseCollection = {
  __typename?: 'VariantEntityResponseCollection';
  nodes: Array<Variant>;
  pageInfo: Pagination;
};

export type VariantFiltersInput = {
  Sku?: InputMaybe<StringFilterInput>;
  Title?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<VariantFiltersInput>>>;
  attributes?: InputMaybe<ComponentAttributesVariantAttributesFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  empresa?: InputMaybe<ComerceFiltersInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<VariantFiltersInput>;
  not?: InputMaybe<VariantFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<VariantFiltersInput>>>;
  price?: InputMaybe<LongFilterInput>;
  product_parent?: InputMaybe<ProductFiltersInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  stock?: InputMaybe<LongFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type VariantInput = {
  Sku?: InputMaybe<Scalars['String']['input']>;
  Title?: InputMaybe<Scalars['String']['input']>;
  attributes?: InputMaybe<Array<InputMaybe<ComponentAttributesVariantAttributesInput>>>;
  empresa?: InputMaybe<Scalars['ID']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Long']['input']>;
  product_parent?: InputMaybe<Scalars['ID']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  stock?: InputMaybe<Scalars['Long']['input']>;
};

export type VariantRelationResponseCollection = {
  __typename?: 'VariantRelationResponseCollection';
  nodes: Array<Variant>;
};

export type LoginMutationVariables = Exact<{
  login: UsersPermissionsLoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UsersPermissionsLoginPayload', jwt?: string | null, user: { __typename?: 'UsersPermissionsMe', id: string, email?: string | null, confirmed?: boolean | null, blocked?: boolean | null, role?: { __typename?: 'UsersPermissionsMeRole', name: string, id: string, description?: string | null, type?: string | null } | null } } };

export type CreateOrderMutationVariables = Exact<{
  data: OrderInput;
}>;


export type CreateOrderMutation = { __typename?: 'Mutation', createOrder?: { __typename?: 'Order', documentId: string, orderNumber: string, status: Enum_Order_Status, subtotal: number, totalAmount: number, orderDate: any, createdAt?: any | null, updatedAt?: any | null, cliente: { __typename?: 'Cliente', documentId: string, firstName: string, lastName: string, email: string } } | null };

export type UpdateOrderMutationVariables = Exact<{
  documentId: Scalars['ID']['input'];
  data: OrderInput;
}>;


export type UpdateOrderMutation = { __typename?: 'Mutation', updateOrder?: { __typename?: 'Order', documentId: string, orderNumber: string, status: Enum_Order_Status, subtotal: number, totalAmount: number, taxAmount?: number | null, shippingCost?: number | null, discountAmount?: number | null, updatedAt?: any | null } | null };

export type CreateClienteMutationVariables = Exact<{
  data: ClienteInput;
}>;


export type CreateClienteMutation = { __typename?: 'Mutation', createCliente?: { __typename?: 'Cliente', documentId: string, firstName: string, lastName: string, email: string, phone?: string | null, isActive?: boolean | null, createdAt?: any | null, updatedAt?: any | null } | null };

export type UpdateClienteMutationVariables = Exact<{
  documentId: Scalars['ID']['input'];
  data: ClienteInput;
}>;


export type UpdateClienteMutation = { __typename?: 'Mutation', updateCliente?: { __typename?: 'Cliente', documentId: string, firstName: string, lastName: string, email: string, phone?: string | null, isActive?: boolean | null, updatedAt?: any | null } | null };

export type CreateDireccionEnvioMutationVariables = Exact<{
  data: DireccionEnvioInput;
}>;


export type CreateDireccionEnvioMutation = { __typename?: 'Mutation', createDireccionEnvio?: { __typename?: 'DireccionEnvio', documentId: string, firstName: string, lastName: string, addressLine1: string, addressLine2?: string | null, city: string, state: Enum_Direccionenvio_State, postalCode?: string | null, country?: string | null, phone?: string | null, email?: string | null, isDefault?: boolean | null, cliente?: { __typename?: 'Cliente', documentId: string, firstName: string, lastName: string } | null } | null };

export type UpdateDireccionEnvioMutationVariables = Exact<{
  documentId: Scalars['ID']['input'];
  data: DireccionEnvioInput;
}>;


export type UpdateDireccionEnvioMutation = { __typename?: 'Mutation', updateDireccionEnvio?: { __typename?: 'DireccionEnvio', documentId: string, firstName: string, lastName: string, addressLine1: string, addressLine2?: string | null, city: string, state: Enum_Direccionenvio_State, postalCode?: string | null, country?: string | null, phone?: string | null, email?: string | null, isDefault?: boolean | null } | null };

export type CreateOrderItemMutationVariables = Exact<{
  data: OrderItemInput;
}>;


export type CreateOrderItemMutation = { __typename?: 'Mutation', createOrderItem?: { __typename?: 'OrderItem', documentId: string, quantity: number, unitPrice: number, subtotal: number, product: { __typename?: 'Product', documentId: string, Name?: string | null }, order: { __typename?: 'Order', documentId: string, orderNumber: string } } | null };

export type UpdateOrderItemMutationVariables = Exact<{
  documentId: Scalars['ID']['input'];
  data: OrderItemInput;
}>;


export type UpdateOrderItemMutation = { __typename?: 'Mutation', updateOrderItem?: { __typename?: 'OrderItem', documentId: string, quantity: number, unitPrice: number, subtotal: number } | null };

export type DeleteOrderItemMutationVariables = Exact<{
  documentId: Scalars['ID']['input'];
}>;


export type DeleteOrderItemMutation = { __typename?: 'Mutation', deleteOrderItem?: { __typename?: 'DeleteMutationResponse', documentId: string } | null };

export type RegisterMutationVariables = Exact<{
  input: UsersPermissionsRegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UsersPermissionsLoginPayload', jwt?: string | null, user: { __typename?: 'UsersPermissionsMe', username: string, email?: string | null } } };

export type GetCategoriesAllQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetCategoriesAllQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', Name?: string | null, slug?: string | null, UrlImagen?: string | null, documentId: string, parent?: { __typename?: 'Category', Name?: string | null, slug?: string | null, documentId: string, UrlImagen?: string | null } | null } | null> };

export type GetProductsByCategoryQueryVariables = Exact<{
  slug: Scalars['String']['input'];
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
}>;


export type GetProductsByCategoryQuery = { __typename?: 'Query', products: Array<{ __typename?: 'Product', Name?: string | null, Description?: any | null, Url_imagen?: Array<{ __typename?: 'ComponentImageUrlImagen', Imagen?: string | null, Name?: string | null } | null> | null, variants: Array<{ __typename?: 'Variant', Sku?: string | null, Title?: string | null, price?: any | null, stock?: any | null, attributes: Array<{ __typename?: 'ComponentAttributesVariantAttributes', Name?: string | null, value?: string | null } | null> } | null> } | null> };

export type GetAllParentCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllParentCategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', Name?: string | null, documentId: string, slug?: string | null, createdAt?: any | null, UrlImagen?: string | null, parent?: { __typename?: 'Category', Name?: string | null, slug?: string | null, UrlImagen?: string | null } | null } | null> };

export type GeHeroHomeQueryVariables = Exact<{ [key: string]: never; }>;


export type GeHeroHomeQuery = { __typename?: 'Query', heroHomes: Array<{ __typename?: 'HeroHome', documentId: string, tituloprinsipal?: string | null, titulodos?: string | null, Descripcion?: string | null, Url_imagen?: string | null, botonTexto?: string | null, classColorBoton?: string | null, redirectPromocion?: string | null, Descuento?: number | null } | null> };

export type GetOrdersQueryVariables = Exact<{
  filters?: InputMaybe<OrderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
}>;


export type GetOrdersQuery = { __typename?: 'Query', orders: Array<{ __typename?: 'Order', documentId: string, orderNumber: string, status: Enum_Order_Status, subtotal: number, totalAmount: number, orderDate: any, createdAt?: any | null, updatedAt?: any | null, cliente: { __typename?: 'Cliente', documentId: string, firstName: string, lastName: string, email: string } } | null> };

export type GetOrderByIdQueryVariables = Exact<{
  documentId: Scalars['ID']['input'];
}>;


export type GetOrderByIdQuery = { __typename?: 'Query', order?: { __typename?: 'Order', documentId: string, orderNumber: string, status: Enum_Order_Status, subtotal: number, totalAmount: number, taxAmount?: number | null, shippingCost?: number | null, discountAmount?: number | null, orderDate: any, estimatedDeliveryDate?: any | null, notes?: string | null, trackingNumber?: string | null, createdAt?: any | null, updatedAt?: any | null, cliente: { __typename?: 'Cliente', documentId: string, firstName: string, lastName: string, email: string, phone?: string | null }, shippingAddress?: { __typename?: 'DireccionEnvio', documentId: string, firstName: string, lastName: string, addressLine1: string, addressLine2?: string | null, city: string, state: Enum_Direccionenvio_State, postalCode?: string | null, country?: string | null, phone?: string | null, email?: string | null } | null } | null };

export type GetClientesQueryVariables = Exact<{
  filters?: InputMaybe<ClienteFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
}>;


export type GetClientesQuery = { __typename?: 'Query', clientes: Array<{ __typename?: 'Cliente', documentId: string, firstName: string, lastName: string, email: string, phone?: string | null, isActive?: boolean | null, totalOrders?: number | null, totalSpent?: number | null, createdAt?: any | null, updatedAt?: any | null } | null> };

export type GetClienteByIdQueryVariables = Exact<{
  documentId: Scalars['ID']['input'];
}>;


export type GetClienteByIdQuery = { __typename?: 'Query', cliente?: { __typename?: 'Cliente', documentId: string, firstName: string, lastName: string, email: string, phone?: string | null, birthDate?: any | null, customerType?: Enum_Cliente_Customertype | null, isActive?: boolean | null, totalOrders?: number | null, totalSpent?: number | null, createdAt?: any | null, updatedAt?: any | null, direccion_envios: Array<{ __typename?: 'DireccionEnvio', documentId: string, firstName: string, lastName: string, addressLine1: string, addressLine2?: string | null, city: string, state: Enum_Direccionenvio_State, postalCode?: string | null, country?: string | null, phone?: string | null, email?: string | null, isDefault?: boolean | null } | null> } | null };

export type SearchOrdersQueryVariables = Exact<{
  search: Scalars['String']['input'];
  pagination?: InputMaybe<PaginationArg>;
}>;


export type SearchOrdersQuery = { __typename?: 'Query', orders: Array<{ __typename?: 'Order', documentId: string, orderNumber: string, status: Enum_Order_Status, subtotal: number, totalAmount: number, orderDate: any, createdAt?: any | null, cliente: { __typename?: 'Cliente', documentId: string, firstName: string, lastName: string, email: string } } | null> };


export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"login"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UsersPermissionsLoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"login"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"confirmed"}},{"kind":"Field","name":{"kind":"Name","value":"blocked"}}]}},{"kind":"Field","name":{"kind":"Name","value":"jwt"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const CreateOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"orderNumber"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"subtotal"}},{"kind":"Field","name":{"kind":"Name","value":"totalAmount"}},{"kind":"Field","name":{"kind":"Name","value":"orderDate"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"cliente"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<CreateOrderMutation, CreateOrderMutationVariables>;
export const UpdateOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"documentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"documentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"documentId"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"orderNumber"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"subtotal"}},{"kind":"Field","name":{"kind":"Name","value":"totalAmount"}},{"kind":"Field","name":{"kind":"Name","value":"taxAmount"}},{"kind":"Field","name":{"kind":"Name","value":"shippingCost"}},{"kind":"Field","name":{"kind":"Name","value":"discountAmount"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateOrderMutation, UpdateOrderMutationVariables>;
export const CreateClienteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCliente"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ClienteInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCliente"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateClienteMutation, CreateClienteMutationVariables>;
export const UpdateClienteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCliente"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"documentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ClienteInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCliente"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"documentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"documentId"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateClienteMutation, UpdateClienteMutationVariables>;
export const CreateDireccionEnvioDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateDireccionEnvio"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DireccionEnvioInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createDireccionEnvio"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"addressLine1"}},{"kind":"Field","name":{"kind":"Name","value":"addressLine2"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"isDefault"}},{"kind":"Field","name":{"kind":"Name","value":"cliente"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]} as unknown as DocumentNode<CreateDireccionEnvioMutation, CreateDireccionEnvioMutationVariables>;
export const UpdateDireccionEnvioDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateDireccionEnvio"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"documentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DireccionEnvioInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateDireccionEnvio"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"documentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"documentId"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"addressLine1"}},{"kind":"Field","name":{"kind":"Name","value":"addressLine2"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"isDefault"}}]}}]}}]} as unknown as DocumentNode<UpdateDireccionEnvioMutation, UpdateDireccionEnvioMutationVariables>;
export const CreateOrderItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOrderItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderItemInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOrderItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"unitPrice"}},{"kind":"Field","name":{"kind":"Name","value":"subtotal"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"Name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"order"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"orderNumber"}}]}}]}}]}}]} as unknown as DocumentNode<CreateOrderItemMutation, CreateOrderItemMutationVariables>;
export const UpdateOrderItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOrderItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"documentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderItemInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOrderItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"documentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"documentId"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"unitPrice"}},{"kind":"Field","name":{"kind":"Name","value":"subtotal"}}]}}]}}]} as unknown as DocumentNode<UpdateOrderItemMutation, UpdateOrderItemMutationVariables>;
export const DeleteOrderItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteOrderItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"documentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteOrderItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"documentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"documentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}}]}}]}}]} as unknown as DocumentNode<DeleteOrderItemMutation, DeleteOrderItemMutationVariables>;
export const RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UsersPermissionsRegisterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"jwt"}}]}}]}}]} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const GetCategoriesAllDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCategoriesAll"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"IntValue","value":"100"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"StringValue","value":"Name:asc","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"UrlImagen"}},{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"UrlImagen"}}]}}]}}]}}]} as unknown as DocumentNode<GetCategoriesAllQuery, GetCategoriesAllQueryVariables>;
export const GetProductsByCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProductsByCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"products"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"categories"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"slug"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"contains"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}]}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Name"}},{"kind":"Field","name":{"kind":"Name","value":"Url_imagen"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Imagen"}},{"kind":"Field","name":{"kind":"Name","value":"Name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"Description"}},{"kind":"Field","name":{"kind":"Name","value":"variants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Sku"}},{"kind":"Field","name":{"kind":"Name","value":"Title"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"stock"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetProductsByCategoryQuery, GetProductsByCategoryQueryVariables>;
export const GetAllParentCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllParentCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"page"},"value":{"kind":"IntValue","value":"1"}},{"kind":"ObjectField","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"IntValue","value":"200"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"parent"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"slug"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"null"},"value":{"kind":"BooleanValue","value":true}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Name"}},{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"UrlImagen"}},{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"UrlImagen"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllParentCategoriesQuery, GetAllParentCategoriesQueryVariables>;
export const GeHeroHomeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GeHeroHome"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"heroHomes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"EnumValue","value":"PUBLISHED"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"tituloprinsipal"}},{"kind":"Field","name":{"kind":"Name","value":"titulodos"}},{"kind":"Field","name":{"kind":"Name","value":"Descripcion"}},{"kind":"Field","name":{"kind":"Name","value":"Url_imagen"}},{"kind":"Field","name":{"kind":"Name","value":"botonTexto"}},{"kind":"Field","name":{"kind":"Name","value":"classColorBoton"}},{"kind":"Field","name":{"kind":"Name","value":"redirectPromocion"}},{"kind":"Field","name":{"kind":"Name","value":"Descuento"}}]}}]}}]} as unknown as DocumentNode<GeHeroHomeQuery, GeHeroHomeQueryVariables>;
export const GetOrdersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOrders"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderFiltersInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationArg"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orders"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"orderNumber"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"subtotal"}},{"kind":"Field","name":{"kind":"Name","value":"totalAmount"}},{"kind":"Field","name":{"kind":"Name","value":"orderDate"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"cliente"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<GetOrdersQuery, GetOrdersQueryVariables>;
export const GetOrderByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOrderById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"documentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"order"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"documentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"documentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"orderNumber"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"subtotal"}},{"kind":"Field","name":{"kind":"Name","value":"totalAmount"}},{"kind":"Field","name":{"kind":"Name","value":"taxAmount"}},{"kind":"Field","name":{"kind":"Name","value":"shippingCost"}},{"kind":"Field","name":{"kind":"Name","value":"discountAmount"}},{"kind":"Field","name":{"kind":"Name","value":"orderDate"}},{"kind":"Field","name":{"kind":"Name","value":"estimatedDeliveryDate"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"trackingNumber"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"cliente"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shippingAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"addressLine1"}},{"kind":"Field","name":{"kind":"Name","value":"addressLine2"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<GetOrderByIdQuery, GetOrderByIdQueryVariables>;
export const GetClientesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetClientes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ClienteFiltersInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationArg"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clientes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"totalOrders"}},{"kind":"Field","name":{"kind":"Name","value":"totalSpent"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetClientesQuery, GetClientesQueryVariables>;
export const GetClienteByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetClienteById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"documentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cliente"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"documentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"documentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"birthDate"}},{"kind":"Field","name":{"kind":"Name","value":"customerType"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"totalOrders"}},{"kind":"Field","name":{"kind":"Name","value":"totalSpent"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"direccion_envios"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"addressLine1"}},{"kind":"Field","name":{"kind":"Name","value":"addressLine2"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"isDefault"}}]}}]}}]}}]} as unknown as DocumentNode<GetClienteByIdQuery, GetClienteByIdQueryVariables>;
export const SearchOrdersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchOrders"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationArg"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orders"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"or"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"orderNumber"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"containsi"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"cliente"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"firstName"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"containsi"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}}]}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"cliente"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"lastName"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"containsi"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}}]}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"cliente"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"containsi"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}}]}}]}}]}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"ListValue","values":[{"kind":"StringValue","value":"createdAt:desc","block":false}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"orderNumber"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"subtotal"}},{"kind":"Field","name":{"kind":"Name","value":"totalAmount"}},{"kind":"Field","name":{"kind":"Name","value":"orderDate"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"cliente"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<SearchOrdersQuery, SearchOrdersQueryVariables>;