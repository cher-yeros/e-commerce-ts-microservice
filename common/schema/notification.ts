import Notification from "../models/notification.model";
import Payment from "../models/payment.model";
import {
  CreateNotificationInput,
  CreatePaymentInput,
  UpdateNotificationInput,
} from "../types/schema-input";

export const notificationSchema = `#graphql
  type Notification {
    id: ID!
    user: User!
    message: String!
    isRead: Boolean!
  }

  input CreateNotificationInput {
    userId: ID!
    message: String!
    isRead: Boolean!
  }

  input UpdateNotificationInput {
    id: ID!
    message: String
    isRead: Boolean
  }

  type Query {
    getNotification(id: ID!): Notification
    getNotifications: [Notification!]!
  }

  type Mutation {
    createNotification(input: CreateNotificationInput!): Notification
    updateNotification(input: UpdateNotificationInput!): Notification
    deleteNotification(id: ID!): Boolean
  }

  type Subscription {
    notificationCreated: Notification
    notificationUpdated: Notification
    notificationDeleted: ID
  }
`;

export const notificationResolvers = {
  Query: {
    getNotification: async (parent: any, { id }: { id: string }) => {
      // Retrieve Notification logic
      const notification = await Notification.findByPk(id);
      return notification;
    },
    getNotifications: async () => {
      // Retrieve all Notifications logic
      const notifications = await Notification.findAll();
      return notifications;
    },
  },
  Mutation: {
    // createNotification: async (parent: any, { input }: { input: CreateNotificationInput }) => {
    //   // Create Notification logic
    //   const notification = await Notification.create();
    //   return notification;
    // },
    // updateNotification: async (parent: any, { input }: { input: UpdateNotificationInput }) => {
    //   // Update Notification logic
    //   const notification = await Notification.update(input.id, input, { new: true });
    //   return notification;
    // },
    // deleteNotification: async (parent: any, { id }: { id: string }) => {
    //   // Delete Notification logic
    //   await Notification.findByIdAndDelete(id);
    //   return true;
    // },
  },
  Subscription: {
    // notificationCreated: {
    //   // Notification created subscription logic
    //   subscribe: () => pubsub.asyncIterator("NOTIFICATION_CREATED"),
    // },
    // notificationUpdated: {
    //   // Notification updated subscription logic
    //   subscribe: () => pubsub.asyncIterator("NOTIFICATION_UPDATED"),
    // },
    // notificationDeleted: {},
  },
};
