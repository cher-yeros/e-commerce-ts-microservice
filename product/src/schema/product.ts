import Product from "../models/product.model";
import { PubSub } from "graphql-subscriptions";
import { CreateProductInput, UpdateProductInput } from "../types/schema-input";
const pubsub = new PubSub();

export const productSchema = `#graphql
  type Product {
    id: ID!
    name: String!
    price: Float!
    user: User!
    orders: [Order!]!
  }

  input CreateProductInput {
    name: String!
    price: Float!
    userId: ID!
    quantity: Int!
  }

  input UpdateProductInput {
    id: ID!
    name: String
    price: Float
  }

  type Query {
    getProduct(id: ID!): Product
    getProducts: [Product!]!
  }

  type Mutation {
    createProduct(input: CreateProductInput!): Product
    updateProduct(input: UpdateProductInput!): Product
    deleteProduct(id: ID!): Boolean
  }

  type Subscription {
    productCreated: Product
    productUpdated: Product
    productDeleted: ID
  }
`;

export const productResolvers = {
  Query: {
    getProduct: async (parent: any, { id }: { id: string }) => {
      // Retrieve Product logic
      const product = await Product.findByPk(id);
      return product;
    },
    getProducts: async () => {
      // Retrieve all Products logic
      const products = await Product.findAll();
      return products;
    },
  },
  Mutation: {
    createProduct: async (
      parent: any,
      { input }: { input: CreateProductInput }
    ) => {
      // Create Product logic
      const product = await Product.create(input);
      return product;
    },
    updateProduct: async (
      parent: any,
      { input }: { input: UpdateProductInput }
    ) => {
      // Update Product logic
      const product = await Product.update(input, { where: { id: input.id } });
      return product;
    },
    deleteProduct: async (parent: any, { id }: { id: string }) => {
      // Delete Product logic
      await Product.destroy({ where: { id } });
      return true;
    },
  },
  Subscription: {
    productCreated: {
      // Product created subscription logic
      subscribe: () => pubsub.asyncIterator("PRODUCT_CREATED"),
    },
    productUpdated: {
      // Product updated subscription logic
      subscribe: () => pubsub.asyncIterator("PRODUCT_UPDATED"),
    },
    productDeleted: {
      // Product deleted subscription logic
      subscribe: () => pubsub.asyncIterator("PRODUCT_DELETED"),
    },
  },
};
