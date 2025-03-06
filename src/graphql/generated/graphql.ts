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
  DireccionEnvioZonadinamicaDynamicZoneInput: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  Long: { input: any; output: any; }
  /** A time string with format HH:mm:ss.SSS */
  Time: { input: any; output: any; }
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
  variante?: Maybe<Variante>;
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
  variante?: InputMaybe<VarianteFiltersInput>;
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
  variante?: InputMaybe<Scalars['ID']['input']>;
};

export type CalificacionRelationResponseCollection = {
  __typename?: 'CalificacionRelationResponseCollection';
  nodes: Array<Calificacion>;
};

export type Categoria = {
  __typename?: 'Categoria';
  Nombre?: Maybe<Scalars['String']['output']>;
  categoria: Array<Maybe<Categoria>>;
  categoria_connection?: Maybe<CategoriaRelationResponseCollection>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<Categoria>>;
  localizations_connection?: Maybe<CategoriaRelationResponseCollection>;
  padre?: Maybe<Categoria>;
  productos: Array<Maybe<Producto>>;
  productos_connection?: Maybe<ProductoRelationResponseCollection>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  url_imagen?: Maybe<Scalars['String']['output']>;
};


export type CategoriaCategoriaArgs = {
  filters?: InputMaybe<CategoriaFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type CategoriaCategoria_ConnectionArgs = {
  filters?: InputMaybe<CategoriaFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type CategoriaLocalizationsArgs = {
  filters?: InputMaybe<CategoriaFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type CategoriaLocalizations_ConnectionArgs = {
  filters?: InputMaybe<CategoriaFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type CategoriaProductosArgs = {
  filters?: InputMaybe<ProductoFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type CategoriaProductos_ConnectionArgs = {
  filters?: InputMaybe<ProductoFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type CategoriaEntityResponseCollection = {
  __typename?: 'CategoriaEntityResponseCollection';
  nodes: Array<Categoria>;
  pageInfo: Pagination;
};

export type CategoriaFiltersInput = {
  Nombre?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<CategoriaFiltersInput>>>;
  categoria?: InputMaybe<CategoriaFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<CategoriaFiltersInput>;
  not?: InputMaybe<CategoriaFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<CategoriaFiltersInput>>>;
  padre?: InputMaybe<CategoriaFiltersInput>;
  productos?: InputMaybe<ProductoFiltersInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  slug?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  url_imagen?: InputMaybe<StringFilterInput>;
};

export type CategoriaInput = {
  Nombre?: InputMaybe<Scalars['String']['input']>;
  categoria?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  locale?: InputMaybe<Scalars['String']['input']>;
  padre?: InputMaybe<Scalars['ID']['input']>;
  productos?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  url_imagen?: InputMaybe<Scalars['String']['input']>;
};

export type CategoriaRelationResponseCollection = {
  __typename?: 'CategoriaRelationResponseCollection';
  nodes: Array<Categoria>;
};

export type Cliente = {
  __typename?: 'Cliente';
  Apellido?: Maybe<Scalars['String']['output']>;
  Nombre?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  direccion_envios: Array<Maybe<DireccionEnvio>>;
  direccion_envios_connection?: Maybe<DireccionEnvioRelationResponseCollection>;
  documentId: Scalars['ID']['output'];
  empresas: Array<Maybe<Comerce>>;
  empresas_connection?: Maybe<ComerceRelationResponseCollection>;
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<Cliente>>;
  localizations_connection?: Maybe<ClienteRelationResponseCollection>;
  orders: Array<Maybe<Order>>;
  orders_connection?: Maybe<OrderRelationResponseCollection>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  reserva?: Maybe<Reserva>;
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


export type ClienteEmpresasArgs = {
  filters?: InputMaybe<ComerceFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ClienteEmpresas_ConnectionArgs = {
  filters?: InputMaybe<ComerceFiltersInput>;
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
  Apellido?: InputMaybe<StringFilterInput>;
  Nombre?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<ClienteFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  direccion_envios?: InputMaybe<DireccionEnvioFiltersInput>;
  documentId?: InputMaybe<IdFilterInput>;
  empresas?: InputMaybe<ComerceFiltersInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<ClienteFiltersInput>;
  not?: InputMaybe<ClienteFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ClienteFiltersInput>>>;
  orders?: InputMaybe<OrderFiltersInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  reserva?: InputMaybe<ReservaFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ClienteInput = {
  Apellido?: InputMaybe<Scalars['String']['input']>;
  Nombre?: InputMaybe<Scalars['String']['input']>;
  direccion_envios?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  empresas?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  locale?: InputMaybe<Scalars['String']['input']>;
  orders?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  reserva?: InputMaybe<Scalars['ID']['input']>;
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
  clientes: Array<Maybe<Cliente>>;
  clientes_connection?: Maybe<ClienteRelationResponseCollection>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<Comerce>>;
  localizations_connection?: Maybe<ComerceRelationResponseCollection>;
  productos: Array<Maybe<Producto>>;
  productos_connection?: Maybe<ProductoRelationResponseCollection>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  telefono: Scalars['Long']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type ComerceClientesArgs = {
  filters?: InputMaybe<ClienteFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ComerceClientes_ConnectionArgs = {
  filters?: InputMaybe<ClienteFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
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


export type ComerceProductosArgs = {
  filters?: InputMaybe<ProductoFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ComerceProductos_ConnectionArgs = {
  filters?: InputMaybe<ProductoFiltersInput>;
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
  clientes?: InputMaybe<ClienteFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<ComerceFiltersInput>;
  not?: InputMaybe<ComerceFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComerceFiltersInput>>>;
  productos?: InputMaybe<ProductoFiltersInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  telefono?: InputMaybe<LongFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ComerceInput = {
  Actividad?: InputMaybe<Enum_Comerce_Actividad>;
  CorreoElectronico?: InputMaybe<Scalars['String']['input']>;
  Descripcion?: InputMaybe<Scalars['String']['input']>;
  Estado?: InputMaybe<Scalars['Boolean']['input']>;
  Logo?: InputMaybe<Scalars['ID']['input']>;
  Nombre?: InputMaybe<Scalars['String']['input']>;
  clientes?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  locale?: InputMaybe<Scalars['String']['input']>;
  productos?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  telefono?: InputMaybe<Scalars['Long']['input']>;
};

export type ComerceRelationResponseCollection = {
  __typename?: 'ComerceRelationResponseCollection';
  nodes: Array<Comerce>;
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

export type ComponentOrderDicreccionFiltersInput = {
  Email?: InputMaybe<StringFilterInput>;
  Nombre_completo?: InputMaybe<StringFilterInput>;
  Telefono_de_contacto?: InputMaybe<LongFilterInput>;
  and?: InputMaybe<Array<InputMaybe<ComponentOrderDicreccionFiltersInput>>>;
  barrio?: InputMaybe<StringFilterInput>;
  ciudad_municipio?: InputMaybe<StringFilterInput>;
  codigo_postal?: InputMaybe<IntFilterInput>;
  complemento?: InputMaybe<StringFilterInput>;
  departamento?: InputMaybe<StringFilterInput>;
  direccion_principal?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentOrderDicreccionFiltersInput>;
  numero_de_documento?: InputMaybe<LongFilterInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentOrderDicreccionFiltersInput>>>;
  punto_de_referencia?: InputMaybe<StringFilterInput>;
  tipo_de_documento?: InputMaybe<StringFilterInput>;
};

export type ComponentOrderDicreccionInput = {
  Email?: InputMaybe<Scalars['String']['input']>;
  Nombre_completo?: InputMaybe<Scalars['String']['input']>;
  Telefono_de_contacto?: InputMaybe<Scalars['Long']['input']>;
  barrio?: InputMaybe<Scalars['String']['input']>;
  ciudad_municipio?: InputMaybe<Scalars['String']['input']>;
  codigo_postal?: InputMaybe<Scalars['Int']['input']>;
  complemento?: InputMaybe<Scalars['String']['input']>;
  departamento?: InputMaybe<Scalars['String']['input']>;
  direccion_principal?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  numero_de_documento?: InputMaybe<Scalars['Long']['input']>;
  punto_de_referencia?: InputMaybe<Scalars['String']['input']>;
  tipo_de_documento?: InputMaybe<Enum_Componentorderdicreccion_Tipo_De_Documento>;
};

export type ComponentProducAttributos = {
  __typename?: 'ComponentProducAttributos';
  Nombre?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
};

export type ComponentProducAttributosFiltersInput = {
  Nombre?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<ComponentProducAttributosFiltersInput>>>;
  not?: InputMaybe<ComponentProducAttributosFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentProducAttributosFiltersInput>>>;
};

export type ComponentProducAttributosInput = {
  Nombre?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type ComponentProducBodegas = {
  __typename?: 'ComponentProducBodegas';
  Direccion?: Maybe<Scalars['String']['output']>;
  Inventario?: Maybe<Scalars['Int']['output']>;
  Ubicacion?: Maybe<Enum_Componentproducbodegas_Ubicacion>;
  id: Scalars['ID']['output'];
};

export type ComponentProducBodegasFiltersInput = {
  Direccion?: InputMaybe<StringFilterInput>;
  Inventario?: InputMaybe<IntFilterInput>;
  Ubicacion?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<ComponentProducBodegasFiltersInput>>>;
  not?: InputMaybe<ComponentProducBodegasFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentProducBodegasFiltersInput>>>;
};

export type ComponentProducBodegasInput = {
  Direccion?: InputMaybe<Scalars['String']['input']>;
  Inventario?: InputMaybe<Scalars['Int']['input']>;
  Ubicacion?: InputMaybe<Enum_Componentproducbodegas_Ubicacion>;
  id?: InputMaybe<Scalars['ID']['input']>;
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
  Attributos?: Maybe<ComponentProducAttributos>;
  Descripcion?: Maybe<Scalars['String']['output']>;
  Nombre?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
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

export type Descuemto = {
  __typename?: 'Descuemto';
  Descripcion?: Maybe<Scalars['String']['output']>;
  Titulo?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<Descuemto>>;
  localizations_connection?: Maybe<DescuemtoRelationResponseCollection>;
  porsentaje?: Maybe<Scalars['Int']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  variante?: Maybe<Variante>;
};


export type DescuemtoLocalizationsArgs = {
  filters?: InputMaybe<DescuemtoFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type DescuemtoLocalizations_ConnectionArgs = {
  filters?: InputMaybe<DescuemtoFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type DescuemtoEntityResponseCollection = {
  __typename?: 'DescuemtoEntityResponseCollection';
  nodes: Array<Descuemto>;
  pageInfo: Pagination;
};

export type DescuemtoFiltersInput = {
  Descripcion?: InputMaybe<StringFilterInput>;
  Titulo?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<DescuemtoFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<DescuemtoFiltersInput>;
  not?: InputMaybe<DescuemtoFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<DescuemtoFiltersInput>>>;
  porsentaje?: InputMaybe<IntFilterInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  variante?: InputMaybe<VarianteFiltersInput>;
};

export type DescuemtoInput = {
  Descripcion?: InputMaybe<Scalars['String']['input']>;
  Titulo?: InputMaybe<Scalars['String']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  porsentaje?: InputMaybe<Scalars['Int']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  variante?: InputMaybe<Scalars['ID']['input']>;
};

export type DescuemtoRelationResponseCollection = {
  __typename?: 'DescuemtoRelationResponseCollection';
  nodes: Array<Descuemto>;
};

export type DireccionEnvio = {
  __typename?: 'DireccionEnvio';
  Apellido?: Maybe<Scalars['String']['output']>;
  Departamento?: Maybe<Enum_Direccionenvio_Departamento>;
  Direccion?: Maybe<Scalars['String']['output']>;
  Nombre?: Maybe<Scalars['String']['output']>;
  cliente?: Maybe<Cliente>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  email?: Maybe<Scalars['String']['output']>;
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<DireccionEnvio>>;
  localizations_connection?: Maybe<DireccionEnvioRelationResponseCollection>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  zonadinamica?: Maybe<Array<Maybe<DireccionEnvioZonadinamicaDynamicZone>>>;
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

export type DireccionEnvioEntityResponseCollection = {
  __typename?: 'DireccionEnvioEntityResponseCollection';
  nodes: Array<DireccionEnvio>;
  pageInfo: Pagination;
};

export type DireccionEnvioFiltersInput = {
  Apellido?: InputMaybe<StringFilterInput>;
  Departamento?: InputMaybe<StringFilterInput>;
  Direccion?: InputMaybe<StringFilterInput>;
  Nombre?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<DireccionEnvioFiltersInput>>>;
  cliente?: InputMaybe<ClienteFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  email?: InputMaybe<StringFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<DireccionEnvioFiltersInput>;
  not?: InputMaybe<DireccionEnvioFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<DireccionEnvioFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type DireccionEnvioInput = {
  Apellido?: InputMaybe<Scalars['String']['input']>;
  Departamento?: InputMaybe<Enum_Direccionenvio_Departamento>;
  Direccion?: InputMaybe<Scalars['String']['input']>;
  Nombre?: InputMaybe<Scalars['String']['input']>;
  cliente?: InputMaybe<Scalars['ID']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  zonadinamica?: InputMaybe<Array<Scalars['DireccionEnvioZonadinamicaDynamicZoneInput']['input']>>;
};

export type DireccionEnvioRelationResponseCollection = {
  __typename?: 'DireccionEnvioRelationResponseCollection';
  nodes: Array<DireccionEnvio>;
};

export type DireccionEnvioZonadinamicaDynamicZone = ComponentProducGoogleMap | Error;

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

export enum Enum_Direccionenvio_Departamento {
  Antioquia = 'Antioquia',
  Caldas = 'Caldas',
  Cesar = 'cesar'
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

export type GenericMorph = Banner | BannerPromocional | Calificacion | Categoria | Cliente | Comerce | ComponentOrderDicreccion | ComponentProducAttributos | ComponentProducBodegas | ComponentProducGoogleMap | ComponentProducSubcategorias | ComponentProducTipoDeProductos | Descuemto | DireccionEnvio | GrupoAttributo | HomePagen | I18NLocale | Lugar | Order | Page404 | Producto | Reserva | ReviewWorkflowsWorkflow | ReviewWorkflowsWorkflowStage | Servicio | TipoDeProducto | UploadFile | UsersPermissionsPermission | UsersPermissionsRole | UsersPermissionsUser | Variante;

export type GrupoAttributo = {
  __typename?: 'GrupoAttributo';
  Attributos?: Maybe<Array<Maybe<ComponentProducAttributos>>>;
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


export type GrupoAttributoAttributosArgs = {
  filters?: InputMaybe<ComponentProducAttributosFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
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
  Attributos?: InputMaybe<ComponentProducAttributosFiltersInput>;
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
  Attributos?: InputMaybe<Array<InputMaybe<ComponentProducAttributosInput>>>;
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
  createBanner?: Maybe<Banner>;
  createCalificacion?: Maybe<Calificacion>;
  createCategoria?: Maybe<Categoria>;
  createCliente?: Maybe<Cliente>;
  createComerce?: Maybe<Comerce>;
  createDescuemto?: Maybe<Descuemto>;
  createDireccionEnvio?: Maybe<DireccionEnvio>;
  createGrupoAttributo?: Maybe<GrupoAttributo>;
  createLugar?: Maybe<Lugar>;
  createOrder?: Maybe<Order>;
  createProducto?: Maybe<Producto>;
  createReserva?: Maybe<Reserva>;
  createReviewWorkflowsWorkflow?: Maybe<ReviewWorkflowsWorkflow>;
  createReviewWorkflowsWorkflowStage?: Maybe<ReviewWorkflowsWorkflowStage>;
  createServicio?: Maybe<Servicio>;
  createTipoDeProducto?: Maybe<TipoDeProducto>;
  /** Create a new role */
  createUsersPermissionsRole?: Maybe<UsersPermissionsCreateRolePayload>;
  /** Create a new user */
  createUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  createVariante?: Maybe<Variante>;
  deleteBanner?: Maybe<DeleteMutationResponse>;
  deleteBannerPromocional?: Maybe<DeleteMutationResponse>;
  deleteCalificacion?: Maybe<DeleteMutationResponse>;
  deleteCategoria?: Maybe<DeleteMutationResponse>;
  deleteCliente?: Maybe<DeleteMutationResponse>;
  deleteComerce?: Maybe<DeleteMutationResponse>;
  deleteDescuemto?: Maybe<DeleteMutationResponse>;
  deleteDireccionEnvio?: Maybe<DeleteMutationResponse>;
  deleteGrupoAttributo?: Maybe<DeleteMutationResponse>;
  deleteHomePagen?: Maybe<DeleteMutationResponse>;
  deleteLugar?: Maybe<DeleteMutationResponse>;
  deleteOrder?: Maybe<DeleteMutationResponse>;
  deletePage404?: Maybe<DeleteMutationResponse>;
  deleteProducto?: Maybe<DeleteMutationResponse>;
  deleteReserva?: Maybe<DeleteMutationResponse>;
  deleteReviewWorkflowsWorkflow?: Maybe<DeleteMutationResponse>;
  deleteReviewWorkflowsWorkflowStage?: Maybe<DeleteMutationResponse>;
  deleteServicio?: Maybe<DeleteMutationResponse>;
  deleteTipoDeProducto?: Maybe<DeleteMutationResponse>;
  deleteUploadFile?: Maybe<UploadFile>;
  /** Delete an existing role */
  deleteUsersPermissionsRole?: Maybe<UsersPermissionsDeleteRolePayload>;
  /** Delete an existing user */
  deleteUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  deleteVariante?: Maybe<DeleteMutationResponse>;
  /** Confirm an email users email address */
  emailConfirmation?: Maybe<UsersPermissionsLoginPayload>;
  /** Request a reset password token */
  forgotPassword?: Maybe<UsersPermissionsPasswordPayload>;
  login: UsersPermissionsLoginPayload;
  /** Register a user */
  register: UsersPermissionsLoginPayload;
  /** Reset user password. Confirm with a code (resetToken from forgotPassword) */
  resetPassword?: Maybe<UsersPermissionsLoginPayload>;
  updateBanner?: Maybe<Banner>;
  updateBannerPromocional?: Maybe<BannerPromocional>;
  updateCalificacion?: Maybe<Calificacion>;
  updateCategoria?: Maybe<Categoria>;
  updateCliente?: Maybe<Cliente>;
  updateComerce?: Maybe<Comerce>;
  updateDescuemto?: Maybe<Descuemto>;
  updateDireccionEnvio?: Maybe<DireccionEnvio>;
  updateGrupoAttributo?: Maybe<GrupoAttributo>;
  updateHomePagen?: Maybe<HomePagen>;
  updateLugar?: Maybe<Lugar>;
  updateOrder?: Maybe<Order>;
  updatePage404?: Maybe<Page404>;
  updateProducto?: Maybe<Producto>;
  updateReserva?: Maybe<Reserva>;
  updateReviewWorkflowsWorkflow?: Maybe<ReviewWorkflowsWorkflow>;
  updateReviewWorkflowsWorkflowStage?: Maybe<ReviewWorkflowsWorkflowStage>;
  updateServicio?: Maybe<Servicio>;
  updateTipoDeProducto?: Maybe<TipoDeProducto>;
  updateUploadFile: UploadFile;
  /** Update an existing role */
  updateUsersPermissionsRole?: Maybe<UsersPermissionsUpdateRolePayload>;
  /** Update an existing user */
  updateUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  updateVariante?: Maybe<Variante>;
};


export type MutationChangePasswordArgs = {
  currentPassword: Scalars['String']['input'];
  password: Scalars['String']['input'];
  passwordConfirmation: Scalars['String']['input'];
};


export type MutationCreateBannerArgs = {
  data: BannerInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateCalificacionArgs = {
  data: CalificacionInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateCategoriaArgs = {
  data: CategoriaInput;
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


export type MutationCreateDescuemtoArgs = {
  data: DescuemtoInput;
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


export type MutationCreateLugarArgs = {
  data: LugarInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateOrderArgs = {
  data: OrderInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateProductoArgs = {
  data: ProductoInput;
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


export type MutationCreateVarianteArgs = {
  data: VarianteInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationDeleteBannerArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeleteCalificacionArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeleteCategoriaArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeleteClienteArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeleteComerceArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeleteDescuemtoArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeleteDireccionEnvioArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeleteGrupoAttributoArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeleteLugarArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeleteOrderArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeleteProductoArgs = {
  documentId: Scalars['ID']['input'];
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


export type MutationDeleteVarianteArgs = {
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


export type MutationUpdateCategoriaArgs = {
  data: CategoriaInput;
  documentId: Scalars['ID']['input'];
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


export type MutationUpdateDescuemtoArgs = {
  data: DescuemtoInput;
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


export type MutationUpdatePage404Args = {
  data: Page404Input;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateProductoArgs = {
  data: ProductoInput;
  documentId: Scalars['ID']['input'];
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


export type MutationUpdateVarianteArgs = {
  data: VarianteInput;
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};

export type Order = {
  __typename?: 'Order';
  PrecioTotal?: Maybe<Scalars['Long']['output']>;
  cantidadTotal?: Maybe<Scalars['Long']['output']>;
  cliente?: Maybe<Cliente>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  direccion_de_envio?: Maybe<Array<Maybe<ComponentOrderDicreccion>>>;
  documentId: Scalars['ID']['output'];
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<Order>>;
  localizations_connection?: Maybe<OrderRelationResponseCollection>;
  orderNumber?: Maybe<Scalars['Long']['output']>;
  productos: Array<Maybe<Producto>>;
  productos_connection?: Maybe<ProductoRelationResponseCollection>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type OrderDireccion_De_EnvioArgs = {
  filters?: InputMaybe<ComponentOrderDicreccionFiltersInput>;
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


export type OrderProductosArgs = {
  filters?: InputMaybe<ProductoFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type OrderProductos_ConnectionArgs = {
  filters?: InputMaybe<ProductoFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type OrderEntityResponseCollection = {
  __typename?: 'OrderEntityResponseCollection';
  nodes: Array<Order>;
  pageInfo: Pagination;
};

export type OrderFiltersInput = {
  PrecioTotal?: InputMaybe<LongFilterInput>;
  and?: InputMaybe<Array<InputMaybe<OrderFiltersInput>>>;
  cantidadTotal?: InputMaybe<LongFilterInput>;
  cliente?: InputMaybe<ClienteFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  direccion_de_envio?: InputMaybe<ComponentOrderDicreccionFiltersInput>;
  documentId?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<OrderFiltersInput>;
  not?: InputMaybe<OrderFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<OrderFiltersInput>>>;
  orderNumber?: InputMaybe<LongFilterInput>;
  productos?: InputMaybe<ProductoFiltersInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type OrderInput = {
  PrecioTotal?: InputMaybe<Scalars['Long']['input']>;
  cantidadTotal?: InputMaybe<Scalars['Long']['input']>;
  cliente?: InputMaybe<Scalars['ID']['input']>;
  direccion_de_envio?: InputMaybe<Array<InputMaybe<ComponentOrderDicreccionInput>>>;
  locale?: InputMaybe<Scalars['String']['input']>;
  orderNumber?: InputMaybe<Scalars['Long']['input']>;
  productos?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
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

export type Producto = {
  __typename?: 'Producto';
  Attributo?: Maybe<Array<Maybe<ComponentProducAttributos>>>;
  Descripcion?: Maybe<Scalars['String']['output']>;
  DescripcionCorta?: Maybe<Scalars['String']['output']>;
  Id_product?: Maybe<Scalars['String']['output']>;
  Marca?: Maybe<Scalars['String']['output']>;
  Titulo?: Maybe<Scalars['String']['output']>;
  categoria?: Maybe<Categoria>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  empresa?: Maybe<Comerce>;
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<Producto>>;
  localizations_connection?: Maybe<ProductoRelationResponseCollection>;
  modelo?: Maybe<Scalars['String']['output']>;
  orders: Array<Maybe<Order>>;
  orders_connection?: Maybe<OrderRelationResponseCollection>;
  precio?: Maybe<Scalars['Float']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  tipo_de_producto?: Maybe<TipoDeProducto>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  variantes: Array<Maybe<Variante>>;
  variantes_connection?: Maybe<VarianteRelationResponseCollection>;
};


export type ProductoAttributoArgs = {
  filters?: InputMaybe<ComponentProducAttributosFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ProductoLocalizationsArgs = {
  filters?: InputMaybe<ProductoFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ProductoLocalizations_ConnectionArgs = {
  filters?: InputMaybe<ProductoFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ProductoOrdersArgs = {
  filters?: InputMaybe<OrderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ProductoOrders_ConnectionArgs = {
  filters?: InputMaybe<OrderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ProductoVariantesArgs = {
  filters?: InputMaybe<VarianteFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ProductoVariantes_ConnectionArgs = {
  filters?: InputMaybe<VarianteFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ProductoEntityResponseCollection = {
  __typename?: 'ProductoEntityResponseCollection';
  nodes: Array<Producto>;
  pageInfo: Pagination;
};

export type ProductoFiltersInput = {
  Attributo?: InputMaybe<ComponentProducAttributosFiltersInput>;
  Descripcion?: InputMaybe<StringFilterInput>;
  DescripcionCorta?: InputMaybe<StringFilterInput>;
  Id_product?: InputMaybe<StringFilterInput>;
  Marca?: InputMaybe<StringFilterInput>;
  Titulo?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<ProductoFiltersInput>>>;
  categoria?: InputMaybe<CategoriaFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  empresa?: InputMaybe<ComerceFiltersInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<ProductoFiltersInput>;
  modelo?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ProductoFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ProductoFiltersInput>>>;
  orders?: InputMaybe<OrderFiltersInput>;
  precio?: InputMaybe<FloatFilterInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  tipo_de_producto?: InputMaybe<TipoDeProductoFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  variantes?: InputMaybe<VarianteFiltersInput>;
};

export type ProductoInput = {
  Attributo?: InputMaybe<Array<InputMaybe<ComponentProducAttributosInput>>>;
  Descripcion?: InputMaybe<Scalars['String']['input']>;
  DescripcionCorta?: InputMaybe<Scalars['String']['input']>;
  Id_product?: InputMaybe<Scalars['String']['input']>;
  Marca?: InputMaybe<Scalars['String']['input']>;
  Titulo?: InputMaybe<Scalars['String']['input']>;
  categoria?: InputMaybe<Scalars['ID']['input']>;
  empresa?: InputMaybe<Scalars['ID']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  modelo?: InputMaybe<Scalars['String']['input']>;
  orders?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  precio?: InputMaybe<Scalars['Float']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  tipo_de_producto?: InputMaybe<Scalars['ID']['input']>;
  variantes?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

export type ProductoRelationResponseCollection = {
  __typename?: 'ProductoRelationResponseCollection';
  nodes: Array<Producto>;
};

export enum PublicationStatus {
  Draft = 'DRAFT',
  Published = 'PUBLISHED'
}

export type Query = {
  __typename?: 'Query';
  banner?: Maybe<Banner>;
  bannerPromocional?: Maybe<BannerPromocional>;
  banners: Array<Maybe<Banner>>;
  banners_connection?: Maybe<BannerEntityResponseCollection>;
  calificacion?: Maybe<Calificacion>;
  calificacions: Array<Maybe<Calificacion>>;
  calificacions_connection?: Maybe<CalificacionEntityResponseCollection>;
  categoria?: Maybe<Categoria>;
  categorias: Array<Maybe<Categoria>>;
  categorias_connection?: Maybe<CategoriaEntityResponseCollection>;
  cliente?: Maybe<Cliente>;
  clientes: Array<Maybe<Cliente>>;
  clientes_connection?: Maybe<ClienteEntityResponseCollection>;
  comerce?: Maybe<Comerce>;
  comerces: Array<Maybe<Comerce>>;
  comerces_connection?: Maybe<ComerceEntityResponseCollection>;
  descuemto?: Maybe<Descuemto>;
  descuemtos: Array<Maybe<Descuemto>>;
  descuemtos_connection?: Maybe<DescuemtoEntityResponseCollection>;
  direccionEnvio?: Maybe<DireccionEnvio>;
  direccionEnvios: Array<Maybe<DireccionEnvio>>;
  direccionEnvios_connection?: Maybe<DireccionEnvioEntityResponseCollection>;
  grupoAttributo?: Maybe<GrupoAttributo>;
  grupoAttributos: Array<Maybe<GrupoAttributo>>;
  grupoAttributos_connection?: Maybe<GrupoAttributoEntityResponseCollection>;
  homePagen?: Maybe<HomePagen>;
  i18NLocale?: Maybe<I18NLocale>;
  i18NLocales: Array<Maybe<I18NLocale>>;
  i18NLocales_connection?: Maybe<I18NLocaleEntityResponseCollection>;
  lugar?: Maybe<Lugar>;
  lugars: Array<Maybe<Lugar>>;
  lugars_connection?: Maybe<LugarEntityResponseCollection>;
  me?: Maybe<UsersPermissionsMe>;
  order?: Maybe<Order>;
  orders: Array<Maybe<Order>>;
  orders_connection?: Maybe<OrderEntityResponseCollection>;
  page404?: Maybe<Page404>;
  producto?: Maybe<Producto>;
  productos: Array<Maybe<Producto>>;
  productos_connection?: Maybe<ProductoEntityResponseCollection>;
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
  variante?: Maybe<Variante>;
  variantes: Array<Maybe<Variante>>;
  variantes_connection?: Maybe<VarianteEntityResponseCollection>;
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


export type QueryCategoriaArgs = {
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type QueryCategoriasArgs = {
  filters?: InputMaybe<CategoriaFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryCategorias_ConnectionArgs = {
  filters?: InputMaybe<CategoriaFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
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


export type QueryDescuemtoArgs = {
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type QueryDescuemtosArgs = {
  filters?: InputMaybe<DescuemtoFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryDescuemtos_ConnectionArgs = {
  filters?: InputMaybe<DescuemtoFiltersInput>;
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


export type QueryProductoArgs = {
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type QueryProductosArgs = {
  filters?: InputMaybe<ProductoFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryProductos_ConnectionArgs = {
  filters?: InputMaybe<ProductoFiltersInput>;
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


export type QueryVarianteArgs = {
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type QueryVariantesArgs = {
  filters?: InputMaybe<VarianteFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryVariantes_ConnectionArgs = {
  filters?: InputMaybe<VarianteFiltersInput>;
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
  productos: Array<Maybe<Producto>>;
  productos_connection?: Maybe<ProductoRelationResponseCollection>;
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


export type TipoDeProductoProductosArgs = {
  filters?: InputMaybe<ProductoFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type TipoDeProductoProductos_ConnectionArgs = {
  filters?: InputMaybe<ProductoFiltersInput>;
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
  productos?: InputMaybe<ProductoFiltersInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type TipoDeProductoInput = {
  Descripcion?: InputMaybe<Scalars['String']['input']>;
  Nombre?: InputMaybe<Scalars['String']['input']>;
  grupo_attributo?: InputMaybe<Scalars['ID']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  productos?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
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

export type Variante = {
  __typename?: 'Variante';
  Atributos?: Maybe<Array<Maybe<ComponentProducAttributos>>>;
  Bodega?: Maybe<Array<Maybe<ComponentProducBodegas>>>;
  Descripcion?: Maybe<Scalars['JSON']['output']>;
  Nombre?: Maybe<Scalars['String']['output']>;
  VarianteImagen: Array<Maybe<UploadFile>>;
  VarianteImagen_connection?: Maybe<UploadFileRelationResponseCollection>;
  calificacions: Array<Maybe<Calificacion>>;
  calificacions_connection?: Maybe<CalificacionRelationResponseCollection>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  descuemtos: Array<Maybe<Descuemto>>;
  descuemtos_connection?: Maybe<DescuemtoRelationResponseCollection>;
  documentId: Scalars['ID']['output'];
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<Variante>>;
  localizations_connection?: Maybe<VarianteRelationResponseCollection>;
  precio?: Maybe<Scalars['Float']['output']>;
  producto?: Maybe<Producto>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type VarianteAtributosArgs = {
  filters?: InputMaybe<ComponentProducAttributosFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type VarianteBodegaArgs = {
  filters?: InputMaybe<ComponentProducBodegasFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type VarianteVarianteImagenArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type VarianteVarianteImagen_ConnectionArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type VarianteCalificacionsArgs = {
  filters?: InputMaybe<CalificacionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type VarianteCalificacions_ConnectionArgs = {
  filters?: InputMaybe<CalificacionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type VarianteDescuemtosArgs = {
  filters?: InputMaybe<DescuemtoFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type VarianteDescuemtos_ConnectionArgs = {
  filters?: InputMaybe<DescuemtoFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type VarianteLocalizationsArgs = {
  filters?: InputMaybe<VarianteFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type VarianteLocalizations_ConnectionArgs = {
  filters?: InputMaybe<VarianteFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type VarianteEntityResponseCollection = {
  __typename?: 'VarianteEntityResponseCollection';
  nodes: Array<Variante>;
  pageInfo: Pagination;
};

export type VarianteFiltersInput = {
  Atributos?: InputMaybe<ComponentProducAttributosFiltersInput>;
  Bodega?: InputMaybe<ComponentProducBodegasFiltersInput>;
  Descripcion?: InputMaybe<JsonFilterInput>;
  Nombre?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<VarianteFiltersInput>>>;
  calificacions?: InputMaybe<CalificacionFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  descuemtos?: InputMaybe<DescuemtoFiltersInput>;
  documentId?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<VarianteFiltersInput>;
  not?: InputMaybe<VarianteFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<VarianteFiltersInput>>>;
  precio?: InputMaybe<FloatFilterInput>;
  producto?: InputMaybe<ProductoFiltersInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type VarianteInput = {
  Atributos?: InputMaybe<Array<InputMaybe<ComponentProducAttributosInput>>>;
  Bodega?: InputMaybe<Array<InputMaybe<ComponentProducBodegasInput>>>;
  Descripcion?: InputMaybe<Scalars['JSON']['input']>;
  Nombre?: InputMaybe<Scalars['String']['input']>;
  VarianteImagen?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  calificacions?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  descuemtos?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  locale?: InputMaybe<Scalars['String']['input']>;
  precio?: InputMaybe<Scalars['Float']['input']>;
  producto?: InputMaybe<Scalars['ID']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type VarianteRelationResponseCollection = {
  __typename?: 'VarianteRelationResponseCollection';
  nodes: Array<Variante>;
};

export type GetCategoriesAllQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesAllQuery = { __typename?: 'Query', categorias: Array<{ __typename?: 'Categoria', Nombre?: string | null, slug?: string | null, padre?: { __typename?: 'Categoria', Nombre?: string | null, slug?: string | null } | null } | null> };

export type GetAllParentCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllParentCategoriesQuery = { __typename?: 'Query', categorias: Array<{ __typename?: 'Categoria', Nombre?: string | null, slug?: string | null, createdAt?: any | null, url_imagen?: string | null, padre?: { __typename?: 'Categoria', Nombre?: string | null, slug?: string | null } | null } | null> };


export const GetCategoriesAllDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCategoriesAll"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categorias"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"page"},"value":{"kind":"IntValue","value":"1"}},{"kind":"ObjectField","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"IntValue","value":"100"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Nombre"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"padre"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Nombre"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}}]} as unknown as DocumentNode<GetCategoriesAllQuery, GetCategoriesAllQueryVariables>;
export const GetAllParentCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllParentCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categorias"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"page"},"value":{"kind":"IntValue","value":"1"}},{"kind":"ObjectField","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"IntValue","value":"200"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"padre"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"slug"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"null"},"value":{"kind":"BooleanValue","value":true}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Nombre"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"url_imagen"}},{"kind":"Field","name":{"kind":"Name","value":"padre"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Nombre"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllParentCategoriesQuery, GetAllParentCategoriesQueryVariables>;