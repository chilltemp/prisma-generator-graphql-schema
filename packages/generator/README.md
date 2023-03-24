Generates a GraphQL Schema file from a Prisma Schema

This is a work in progress, and only implements what I've needed so far.  PR's welcome

Supported:
- ✅ model
- ✅ enum
- ❌ BigInt
- ✅ Boolean
- ❌ Bytes
- ✅ DateTime as String
- ✅ Decimal as Float
- ✅ Float
- ✅ Int
- ❌ Json
- ✅ String

Install
`npm i prisma-generator-graphql-schema`

Usage
```
generator graphqlSchema {
  provider = "prisma-generator-graphql-schema"
  output   = "../src/schema.graphql"    // default: ./src/generated/schema.graphql
  optionalRelationships = "true"        // default: false
  exportedNameSuffix = "Suffix"         // default: ""
  exportedNamePrefix = "Prefix"         // default: ""
}
```