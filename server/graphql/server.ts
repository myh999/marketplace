import { typeDefs } from './schema';
import { resolvers } from './resolver';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';

export default class Server {
    public static init() {
        const server = new ApolloServer({ typeDefs, resolvers });
        const app = express();
        server.applyMiddleware({ app });
        return app;
    }
}