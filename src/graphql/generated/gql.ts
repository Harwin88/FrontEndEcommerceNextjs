/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "mutation Login($login: UsersPermissionsLoginInput!) {\n  login(input: $login) {\n    user {\n      role {\n        name\n        id\n        description\n        type\n      }\n      id\n      email\n      confirmed\n      blocked\n    }\n    jwt\n  }\n}": typeof types.LoginDocument,
    "mutation Register($input: UsersPermissionsRegisterInput!) {\n  register(input: $input) {\n    user {\n      username\n      email\n    }\n    jwt\n  }\n}": typeof types.RegisterDocument,
    "query GetCategoriesAll($page: Int) {\n  categories(pagination: {page: $page, pageSize: 100}, sort: \"Name:asc\") {\n    Name\n    slug\n    UrlImagen\n    documentId\n    parent {\n      Name\n      slug\n      documentId\n      UrlImagen\n    }\n  }\n}": typeof types.GetCategoriesAllDocument,
    "query GetProductsByCategory($slug: String!, $page: Int!, $pageSize: Int!) {\n  products(\n    filters: {categories: {slug: {contains: $slug}}}\n    pagination: {page: $page, pageSize: $pageSize}\n  ) {\n    Name\n    Url_imagen {\n      Imagen\n      Name\n    }\n    Description\n    variants {\n      Sku\n      Title\n      price\n      stock\n      attributes {\n        Name\n        value\n      }\n    }\n  }\n}": typeof types.GetProductsByCategoryDocument,
    "query GetAllParentCategories {\n  categories(\n    pagination: {page: 1, pageSize: 200}\n    filters: {parent: {slug: {null: true}}}\n  ) {\n    Name\n    documentId\n    slug\n    createdAt\n    UrlImagen\n    parent {\n      Name\n      slug\n      UrlImagen\n    }\n  }\n}": typeof types.GetAllParentCategoriesDocument,
    "query GeHeroHome {\n  heroHomes(status: PUBLISHED) {\n    documentId\n    tituloprinsipal\n    titulodos\n    Descripcion\n    Url_imagen\n    botonTexto\n    classColorBoton\n    redirectPromocion\n    Descuento\n  }\n}": typeof types.GeHeroHomeDocument,
};
const documents: Documents = {
    "mutation Login($login: UsersPermissionsLoginInput!) {\n  login(input: $login) {\n    user {\n      role {\n        name\n        id\n        description\n        type\n      }\n      id\n      email\n      confirmed\n      blocked\n    }\n    jwt\n  }\n}": types.LoginDocument,
    "mutation Register($input: UsersPermissionsRegisterInput!) {\n  register(input: $input) {\n    user {\n      username\n      email\n    }\n    jwt\n  }\n}": types.RegisterDocument,
    "query GetCategoriesAll($page: Int) {\n  categories(pagination: {page: $page, pageSize: 100}, sort: \"Name:asc\") {\n    Name\n    slug\n    UrlImagen\n    documentId\n    parent {\n      Name\n      slug\n      documentId\n      UrlImagen\n    }\n  }\n}": types.GetCategoriesAllDocument,
    "query GetProductsByCategory($slug: String!, $page: Int!, $pageSize: Int!) {\n  products(\n    filters: {categories: {slug: {contains: $slug}}}\n    pagination: {page: $page, pageSize: $pageSize}\n  ) {\n    Name\n    Url_imagen {\n      Imagen\n      Name\n    }\n    Description\n    variants {\n      Sku\n      Title\n      price\n      stock\n      attributes {\n        Name\n        value\n      }\n    }\n  }\n}": types.GetProductsByCategoryDocument,
    "query GetAllParentCategories {\n  categories(\n    pagination: {page: 1, pageSize: 200}\n    filters: {parent: {slug: {null: true}}}\n  ) {\n    Name\n    documentId\n    slug\n    createdAt\n    UrlImagen\n    parent {\n      Name\n      slug\n      UrlImagen\n    }\n  }\n}": types.GetAllParentCategoriesDocument,
    "query GeHeroHome {\n  heroHomes(status: PUBLISHED) {\n    documentId\n    tituloprinsipal\n    titulodos\n    Descripcion\n    Url_imagen\n    botonTexto\n    classColorBoton\n    redirectPromocion\n    Descuento\n  }\n}": types.GeHeroHomeDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Login($login: UsersPermissionsLoginInput!) {\n  login(input: $login) {\n    user {\n      role {\n        name\n        id\n        description\n        type\n      }\n      id\n      email\n      confirmed\n      blocked\n    }\n    jwt\n  }\n}"): (typeof documents)["mutation Login($login: UsersPermissionsLoginInput!) {\n  login(input: $login) {\n    user {\n      role {\n        name\n        id\n        description\n        type\n      }\n      id\n      email\n      confirmed\n      blocked\n    }\n    jwt\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Register($input: UsersPermissionsRegisterInput!) {\n  register(input: $input) {\n    user {\n      username\n      email\n    }\n    jwt\n  }\n}"): (typeof documents)["mutation Register($input: UsersPermissionsRegisterInput!) {\n  register(input: $input) {\n    user {\n      username\n      email\n    }\n    jwt\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetCategoriesAll($page: Int) {\n  categories(pagination: {page: $page, pageSize: 100}, sort: \"Name:asc\") {\n    Name\n    slug\n    UrlImagen\n    documentId\n    parent {\n      Name\n      slug\n      documentId\n      UrlImagen\n    }\n  }\n}"): (typeof documents)["query GetCategoriesAll($page: Int) {\n  categories(pagination: {page: $page, pageSize: 100}, sort: \"Name:asc\") {\n    Name\n    slug\n    UrlImagen\n    documentId\n    parent {\n      Name\n      slug\n      documentId\n      UrlImagen\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetProductsByCategory($slug: String!, $page: Int!, $pageSize: Int!) {\n  products(\n    filters: {categories: {slug: {contains: $slug}}}\n    pagination: {page: $page, pageSize: $pageSize}\n  ) {\n    Name\n    Url_imagen {\n      Imagen\n      Name\n    }\n    Description\n    variants {\n      Sku\n      Title\n      price\n      stock\n      attributes {\n        Name\n        value\n      }\n    }\n  }\n}"): (typeof documents)["query GetProductsByCategory($slug: String!, $page: Int!, $pageSize: Int!) {\n  products(\n    filters: {categories: {slug: {contains: $slug}}}\n    pagination: {page: $page, pageSize: $pageSize}\n  ) {\n    Name\n    Url_imagen {\n      Imagen\n      Name\n    }\n    Description\n    variants {\n      Sku\n      Title\n      price\n      stock\n      attributes {\n        Name\n        value\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetAllParentCategories {\n  categories(\n    pagination: {page: 1, pageSize: 200}\n    filters: {parent: {slug: {null: true}}}\n  ) {\n    Name\n    documentId\n    slug\n    createdAt\n    UrlImagen\n    parent {\n      Name\n      slug\n      UrlImagen\n    }\n  }\n}"): (typeof documents)["query GetAllParentCategories {\n  categories(\n    pagination: {page: 1, pageSize: 200}\n    filters: {parent: {slug: {null: true}}}\n  ) {\n    Name\n    documentId\n    slug\n    createdAt\n    UrlImagen\n    parent {\n      Name\n      slug\n      UrlImagen\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GeHeroHome {\n  heroHomes(status: PUBLISHED) {\n    documentId\n    tituloprinsipal\n    titulodos\n    Descripcion\n    Url_imagen\n    botonTexto\n    classColorBoton\n    redirectPromocion\n    Descuento\n  }\n}"): (typeof documents)["query GeHeroHome {\n  heroHomes(status: PUBLISHED) {\n    documentId\n    tituloprinsipal\n    titulodos\n    Descripcion\n    Url_imagen\n    botonTexto\n    classColorBoton\n    redirectPromocion\n    Descuento\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;