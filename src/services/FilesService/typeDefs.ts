import { gql } from "apollo-server-express";

const fileTypeDefs = gql`
type File {
  id: ID!
  originalName: String!
  url: String!
  mimetype: String!
  s3Key: String!
  eTag: String!
  bytes: Int
  search: String
  createdAt: String!
}

input UploadFileInput {
  originalName: String!
  mimetype: String!
  bytes: Int
}

type CreateUploadUrlResponse {
  url: String!
  file: File!
}

type Mutation {
  createUploadUrl(input: UploadFileInput!): CreateUploadUrlResponse!
}

type Query {
  files: [File!]!
  file(id: ID!): File
}

`;

export default fileTypeDefs;