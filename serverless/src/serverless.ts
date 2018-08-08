import { makeExecutableSchema } from 'apollo-server';
const graphql = require('graphql');

import resolvers from './resolvers';
import typeDefs from './typedefs';

const schema = makeExecutableSchema({ typeDefs, resolvers });

function executeGraphQL(gql: string, variables: Object, context: any) {
    return graphql.graphql(schema, gql, null, context, variables);
}

function handler(event: any, context: any, callback: any) {
    console.log('handler', event, context);

    const body = JSON.parse(event.body);
    return executeGraphQL(body.query, body.variables, event)
        .then((data: any) => {
            const response = {
                statusCode: 200,
                headers: {
                    'Content-type': 'application/json; charset=utf-8',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(data)
            };
            callback(null, response);
        })
        .catch((error: Error) => {
            console.error('ERROR', error);
            const response = {
                statusCode: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(error)
            };
            callback(error, response);
        });
}

module.exports = handler;
