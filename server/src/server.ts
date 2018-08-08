import { ApolloServer, gql } from 'apollo-server';
import { GraphQLResolveInfo } from 'graphql/type/definition';

const vision = require('@google-cloud/vision');
const base64Img = require('base64-img');
const uuidv1 = require('uuid/v1');

const client = new vision.ImageAnnotatorClient({
    keyFilename: __dirname + '/../keyfile.json'
});

const typeDefs = gql`
type Query {
    hello: String
    decodeImage(dataUrl: String!): [String]
}
`;

const resolvers = {
    Query: {
        hello: () => 'world',
        decodeImage: (source: any, args: { dataUrl: string }, ctx: any, info: GraphQLResolveInfo) => {
            return new Promise((resolve, reject) => {
                const path = base64Img.imgSync(args.dataUrl, '/tmp/', uuidv1());
                client
                    .textDetection(path)
                    .then((results: any) => {
                        resolve(results[0].textAnnotations.map((result: any) => result.description));
                    })
                    .catch((error: Error) => {
                        reject(error);
                    });
            });
        }
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen()
    .then(() => console.log('Server started on port 4000! 🚀'));
