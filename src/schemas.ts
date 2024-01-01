import { gql } from "apollo-server-express";

// Define your GraphQL type definitions
export const typeDefs = gql`
  type TODO {
    userId: Int
    id: Int
    title: String
    completed: Boolean
  }
  type USER {
    _id: String
    name: String
    email: String
    password: String
  }
  type PRODUCT {
    _id: String!
    title: String
    description: String
    category: String
    inStock: Boolean
    price: Int
    user: USER! # Include a nested User type in Product
    userId: String!
  }

  type ProductResponse {
    products: [PRODUCT]
    totalCount: Int
    totalPages: Int
    currentPage: Int
    inPageProducts: Int
  }
  type Query {
    hello: String
    hi(name: String): String
    getTodo: [TODO]
    getSingleTodo(id: Int!): TODO
    getProducts(
      title: String
      description: String
      sortField: String
      sortType: String
      minPrice: Int
      maxPrice: Int
      category: String
      inStock: Boolean
      page: Int
      limit: Int
    ): ProductResponse
  }
  type Mutation {
    addUser(name: String!, email: String!, password: String!): USER
  }

  type Mutation {
    addProduct(
      title: String!
      description: String!
      category: String!
      inStock: Boolean!
      price: Int!
      user: String!
      userId: String!
    ): PRODUCT
  }
`;
