import { ApolloServer } from 'apollo-server';

import resolvers from './resolvers';
import typeDefs from './typedefs';

new ApolloServer({ typeDefs, resolvers })
    .listen()
    .then(() => console.log('Server started on port 4000! 🚀'));
