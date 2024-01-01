import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import { resolvers } from "./resolvers";
import { typeDefs } from "./schemas";
import connectDB from "./db/connectDB";
import { config } from "dotenv";
config();
const app = express();
// Define your GraphQL schema (type definitions) and resolvers
// Define your resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
// Call start on the ApolloServer instance before using it with expressMiddleware
async function startServer() {
  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });
}
startServer();
// Set up CORS and express middleware
app.use(cors({ origin: "*" }));
app.use(express.json());
// Set the port
const PORT = 4000;
connectDB();
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/graphql`);
});
