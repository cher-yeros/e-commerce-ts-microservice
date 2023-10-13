import Order from "../models/order.model";
import { CreateOrderInput, UpdateOrderInput } from "../types/schema-input";
import { PubSub } from "graphql-subscriptions";

const pubsub = new PubSub();

export const orderSchema = `#graphql
  type Order {
    id: ID!
    user: User!
    product: Product!
    quantity: Int!
  }

  input CreateOrderInput {
    userId: ID!
    productId: ID!
    quantity: Int!
    totalPrice: Float!
  }

  input UpdateOrderInput {
    id: ID!
    quantity: Int
  }

  type Query {
    getOrder(id: ID!): Order
    getOrders: [Order!]!
  }

  type Mutation {
    createOrder(input: CreateOrderInput!): Order
    updateOrder(input: UpdateOrderInput!): Order
    deleteOrder(id: ID!): Boolean
  }

  type Subscription {
    orderCreated: Order
    orderUpdated: Order
    orderDeleted: ID
  }
`;

export const orderResolver = {
  Query: {
    getOrder: async (parent: any, { id }: { id: string }) => {
      // Retrieve Order logic
      const order = await Order.findByPk(id);
      return order;
    },
    getOrders: async () => {
      // Retrieve all Orders logic
      const orders = await Order.findAll();
      return orders;
    },
  },
  Mutation: {
    createOrder: async (
      parent: any,
      { input }: { input: CreateOrderInput }
    ) => {
      // Create Order logic
      const order = await Order.create(input);
      return order;
    },
    updateOrder: async (
      parent: any,
      { input }: { input: UpdateOrderInput }
    ) => {
      // Update Order logic
      const order = await Order.update(input, { where: { id: input.id } });
      return order;
    },
    deleteOrder: async (parent: any, { id }: { id: string }) => {
      // Delete Order logic
      await Order.destroy({ where: { id } });
      return true;
    },
  },
  Subscription: {
    orderCreated: {
      // Order created subscription logic
      subscribe: () => pubsub.asyncIterator("ORDER_CREATED"),
    },
    orderUpdated: {
      // Order updated subscription logic
      subscribe: () => pubsub.asyncIterator("ORDER_UPDATED"),
    },
    orderDeleted: {
      // Order deleted subscription logic
      subscribe: () => pubsub.asyncIterator("ORDER_DELETED"),
    },
  },
};
