// npm install @apollo/server express graphql cors body-parser
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'

import { resolvers } from './graphql/resolvers'

import {makeExecutableSchema} from "@graphql-tools/schema";
import * as path from "path";

// const typesArray = loadFilesSync('graphql', { extensions: ['graphql'] })
const buildDir = path.join(process.cwd(), 'dist')
console.log(`build directory: ${buildDir}`)

const typesDir = path.join(buildDir, 'graphql', 'types')
console.log(`types directory: ${typesDir}`)

const typesArray = loadFilesSync(typesDir, { extensions: ['graphql'] })
const typeDefs = mergeTypeDefs(typesArray)
const mergedResolvers = mergeResolvers(resolvers)

interface MyContext {
    token?: String;
}
const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers: mergedResolvers,
    plugins: [ ApolloServerPluginDrainHttpServer({ httpServer }) ],
});

await server.start();
app.use(
    '/',
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(server, {
        context: async ({ req }) => ({ token: req.headers.token }),
    }),
);

await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000/`);
