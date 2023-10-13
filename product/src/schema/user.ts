export const userSchema = `#graphql
  type User {
    id: ID!
    name: String!
    email: String!
    products: [Product!]!
    orders: [Order!]!
    notifications: [Notification!]!
    payments: [Payment!]!
  }

`;
