/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context as ctx } from "./../types/context"
import type { FieldAuthorizeResolver } from "nexus/dist/plugins/fieldAuthorizePlugin"
import type { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "Date";
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    datetime<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "DateTime";
    /**
     * A local time string (i.e., with no associated timezone) in 24-hr `HH:mm[:ss[.SSS]]` format, e.g. `14:25` or `14:25:06` or `14:25:06.123`.
     */
    localTime<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "LocalTime";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "Date";
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    datetime<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
    /**
     * A local time string (i.e., with no associated timezone) in 24-hr `HH:mm[:ss[.SSS]]` format, e.g. `14:25` or `14:25:06` or `14:25:06.123`.
     */
    localTime<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "LocalTime";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
  ContentRating: "G" | "NC_17" | "PG" | "PG_13" | "R" | "UNRATED"
  SortOrder: "asc" | "desc"
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  Date: any
  DateTime: any
  LocalTime: any
}

export interface NexusGenObjects {
  Movie: { // root type
    contentRating?: NexusGenEnums['ContentRating'] | null; // ContentRating
    createdAt?: string | null; // String
    createdById?: string | null; // String
    description?: string | null; // String
    id: string; // ID!
    likes?: number | null; // Int
    rating?: number | null; // Float
    releaseDate?: string | null; // String
    title?: string | null; // String
    updatedAt?: string | null; // String
  }
  Query: {};
  User: { // root type
    createdAt?: string | null; // String
    email?: string | null; // String
    id: string; // ID!
    name?: string | null; // String
    updatedAt?: string | null; // String
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  Movie: { // field return type
    contentRating: NexusGenEnums['ContentRating'] | null; // ContentRating
    createdAt: string | null; // String
    createdBy: NexusGenRootTypes['User'] | null; // User
    createdById: string | null; // String
    description: string | null; // String
    id: string; // ID!
    likes: number | null; // Int
    rating: number | null; // Float
    releaseDate: string | null; // String
    title: string | null; // String
    updatedAt: string | null; // String
  }
  Query: { // field return type
    hello: string; // String!
    movie: NexusGenRootTypes['Movie'] | null; // Movie
    movies: Array<NexusGenRootTypes['Movie'] | null> | null; // [Movie]
    user: NexusGenRootTypes['User'] | null; // User
    users: Array<NexusGenRootTypes['User'] | null> | null; // [User]
  }
  User: { // field return type
    createdAt: string | null; // String
    email: string | null; // String
    id: string; // ID!
    movies: Array<NexusGenRootTypes['Movie'] | null> | null; // [Movie]
    name: string | null; // String
    updatedAt: string | null; // String
  }
}

export interface NexusGenFieldTypeNames {
  Movie: { // field return type name
    contentRating: 'ContentRating'
    createdAt: 'String'
    createdBy: 'User'
    createdById: 'String'
    description: 'String'
    id: 'ID'
    likes: 'Int'
    rating: 'Float'
    releaseDate: 'String'
    title: 'String'
    updatedAt: 'String'
  }
  Query: { // field return type name
    hello: 'String'
    movie: 'Movie'
    movies: 'Movie'
    user: 'User'
    users: 'User'
  }
  User: { // field return type name
    createdAt: 'String'
    email: 'String'
    id: 'ID'
    movies: 'Movie'
    name: 'String'
    updatedAt: 'String'
  }
}

export interface NexusGenArgTypes {
  Query: {
    hello: { // args
      name?: string | null; // String
    }
    movie: { // args
      id: string; // ID!
    }
    user: { // args
      id: string; // ID!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: ctx;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
    /**
     * Authorization for an individual field. Returning "true"
     * or "Promise<true>" means the field can be accessed.
     * Returning "false" or "Promise<false>" will respond
     * with a "Not Authorized" error for the field.
     * Returning or throwing an error will also prevent the
     * resolver from executing.
     */
    authorize?: FieldAuthorizeResolver<TypeName, FieldName>
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}