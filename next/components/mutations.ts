import { gql } from "@apollo/client";

export const ADD_USER_MUTATION = gql`
  mutation AddUser($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      name
      email
      password
    }
  }
`;
