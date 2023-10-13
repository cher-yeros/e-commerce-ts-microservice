import User from "../models/user.model";
import { CreateUserInput, UpdateUserInput } from "../types/schema-input";
import { PubSub } from "graphql-subscriptions";

const pubsub = new PubSub();

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

  input CreateUserInput {
    name: String!
    email: String!
    password: String!
  }

  input UpdateUserInput {
    id: ID!
    name: String
    email: String
  }

  type Query {
    getUser(id: ID!): User
    getUsers: [User!]!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User
    updateUser(input: UpdateUserInput!): User
    deleteUser(id: ID!): Boolean
  }

  type Subscription {
    userCreated: User
    userUpdated: User
    userDeleted: ID
  }
`;

export const userResolvers = {
  Query: {
    getUser: async (parent: any, { id }: { id: string }) => {
      // Retrieve User logic
      const user = await User.findByPk(id);
      return user;
    },
    getUsers: async () => {
      // Retrieve all Users logic
      const users = await User.findAll();
      return users;
    },
  },
  Mutation: {
    createUser: async (parent: any, { input }: { input: CreateUserInput }) => {
      // Create User logic
      const user = await User.create(input);
      return user;
    },
    updateUser: async (parent: any, { input }: { input: UpdateUserInput }) => {
      const user = await User.update(
        { name: input.name },
        { where: { id: input.id } }
      );
      return user;
    },
    deleteUser: async (parent: any, { id }: { id: string }) => {
      // Delete User logic
      await User.destroy({ where: { id } });
      return true;
    },
  },
  Subscription: {
    userCreated: {
      // User created subscription logic
      subscribe: () => pubsub.asyncIterator("USER_CREATED"),
    },
    userUpdated: {
      // User updated subscription logic
      subscribe: () => pubsub.asyncIterator("USER_UPDATED"),
    },
    userDeleted: {
      // User deleted subscription logic
      subscribe: () => pubsub.asyncIterator("USER_DELETED"),
    },
  },
};
