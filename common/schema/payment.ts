import Payment from "../models/payment.model";
import { CreatePaymentInput, UpdatePaymentInput } from "../types/schema-input";

import { PubSub } from "graphql-subscriptions";

const pubsub = new PubSub();

export const paymentSchema = `#graphql
  type Payment {
    id: ID!
    user: User!
    amount: Float!
    status: String!
  }

  input CreatePaymentInput {
    userId: ID!
    amount: Float!
    status: String!
  }

  input UpdatePaymentInput {
    id: ID!
    amount: Float
    status: String
  }

  type Query {
    getPayment(id: ID!): Payment
    getPayments: [Payment!]!
  }

  type Mutation {
    createPayment(input: CreatePaymentInput!): Payment
    updatePayment(input: UpdatePaymentInput!): Payment
    deletePayment(id: ID!): Boolean
  }

  type Subscription {
    paymentCreated: Payment
    paymentUpdated: Payment
    paymentDeleted: ID
  }
`;

export const paymentResolvers = {
  Query: {
    getPayment: async (parent: any, { id }: { id: string }) => {
      // Retrieve Payment logic
      const payment = await Payment.findByPk(id);
      return payment;
    },
    getPayments: async () => {
      // Retrieve all Payments logic
      const payments = await Payment.findAll();
      return payments;
    },
  },
  Mutation: {
    createPayment: async (
      parent: any,
      { input }: { input: CreatePaymentInput }
    ) => {
      // Create Payment logic
      const payment = await Payment.create(input);
      return payment;
    },
    updatePayment: async (
      parent: any,
      { input }: { input: UpdatePaymentInput }
    ) => {
      // Update Payment logic
      const payment = await Payment.update(input, {
        where: { id: input.id },
      });

      return payment;
    },
    deletePayment: async (parent: any, { id }: { id: string }) => {
      // Delete Payment logic
      await Payment.destroy({ where: { id } });
      return true;
    },
  },
  Subscription: {
    paymentCreated: {
      // Payment created subscription logic
      subscribe: () => pubsub.asyncIterator("PAYMENT_CREATED"),
    },
    paymentUpdated: {
      // Payment updated subscription logic
      subscribe: () => pubsub.asyncIterator("PAYMENT_UPDATED"),
    },
    paymentDeleted: {
      // Payment deleted subscription logic
      subscribe: () => pubsub.asyncIterator("PAYMENT_DELETED"),
    },
  },
};
