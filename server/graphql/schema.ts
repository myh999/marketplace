import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type Product {
    title: String
    price: Float
    inventory_count: Int
  }

  type Query {
    product(title: String): Product
    allProducts(allowEmpty: Boolean = true): [Product]
  }

  type Mutation {
    purchaseProduct(title: String): Product
  }
`;
