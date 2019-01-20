import express from 'express';
import Server from './graphql/server';

// Construct a schema, using GraphQL schema language

const app = Server.init();

app.listen({ port: 4000 }, () =>
  console.log(`Listening on http://localhost:4000`)
);