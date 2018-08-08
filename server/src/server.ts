import { ApolloServer, gql } from 'apollo-server';
import { GraphQLResolveInfo } from 'graphql/type/definition';

const vision = require('@google-cloud/vision');
const {google} = require('googleapis');
const base64Img = require('base64-img');
const uuidv1 = require('uuid/v1');
require('dotenv').config(__dirname + '/../.env');

const visionClient = new vision.ImageAnnotatorClient({
    keyFilename: __dirname + '/../keyfile.json'
});
const searchClient = google.customsearch('v1');
const searchOptions = {
    cx: process.env.GOOGLE_CSE_ID,
    auth: process.env.GOOGLE_API_KEY
};

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

const resolvers = {
    Query: {
        decodeImage: async (source: any, args: { dataUrl: string }, ctx: any, info: GraphQLResolveInfo) => {
            const path = base64Img.imgSync(args.dataUrl, '/tmp/', uuidv1());
            const results = await visionClient.textDetection(path);
            return results[0].textAnnotations.map((result: any) => result.description);
        },
        searchImages: async (source: any, args: { keyword: string }, ctx: any, info: GraphQLResolveInfo) => {
            const response = await searchClient.cse.list(Object.assign(searchOptions, {
                q: args.keyword
            }));
            return response.data.items
                .filter((item: any) =>
                    item.pagemap &&
                    item.pagemap.cse_image && item.pagemap.cse_image.length > 0 &&
                    item.pagemap.cse_thumbnail && item.pagemap.cse_thumbnail.length > 0
                )
                .map((item: any) => ({
                    title: item.title,
                    link: item.link,
                    imageLink: item.pagemap.cse_image[0].src,
                    thumbnailImageLink: item.pagemap.cse_thumbnail[0].src
                }));
        },
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen()
    .then(() => console.log('Server started on port 4000! 🚀'));
