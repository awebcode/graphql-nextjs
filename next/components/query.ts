import { gql } from "@apollo/client";

export const getTodo = gql`
  query GetTODO {
    getTodo {
      userId
      id
      title
      completed
    }
  }
`;

export const getSingleTodo = gql`
  query GetSingleTodo($id: Int!) {
    getSingleTodo(id: $id) {
      userId
      id
      title
      completed
    }
  }
`;




