import { gql } from "apollo-server-express";

const transcriptionJobTypeDefs = gql`
  type TranscriptionJob {
    id: ID!
    file: File!
    status: String!
    transcriptionText: String
    createdAt: String!
    updatedAt: String!
  }

  type Mutation {
    confirmUpload(fileId: Int!): TranscriptionJob!
  }

  type Query {
    transcriptionJobs: [TranscriptionJob!]!
    transcriptionJob(id: ID!): TranscriptionJob
  }
`;

export default transcriptionJobTypeDefs;
