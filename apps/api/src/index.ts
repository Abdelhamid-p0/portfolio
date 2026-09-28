import "dotenv/config";

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { resolvers } from "./graphql/resolvers.js";
import { typeDefs } from "./graphql/typeDefs.js";

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const port = Number(process.env.PORT ?? 4000);
  const { url } = await startStandaloneServer(server, {
    listen: { port },
  });

  console.log(`🚀 GraphQL API ready at ${url}`);
}

startServer().catch((error) => {
  console.error("Failed to start GraphQL server:", error);
  process.exit(1);
});
