import { gql } from 'apollo-server';

const typeDefs = gql`
type SearchResult {
    title: String!
    link: String!
    imageLink: String!
    thumbnailImageLink: String!
}

type Query {
    hello: String
    decodeImage(dataUrl: String!): [String]
    searchImages(keyword: String!): [SearchResult]
}
`;

export default typeDefs;
