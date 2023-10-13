import { DataTypes, Optional } from "sequelize";
import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import Order from "./order.model";
import User from "./user.model";

export interface NotificationType {
  id: string;
  userId: string;
  message: string;
  isRead: boolean;
}

interface NotificationCreationAttributes
  extends Optional<NotificationType, "id"> {}

@Table({
  timestamps: true,
})
class Notification extends Model<
  NotificationType,
  NotificationCreationAttributes
> {
  @Column({
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: uuidv4,
  })
  id!: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  message!: string;

  @Column({
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isRead!: boolean;

  @ForeignKey(() => User)
  userId!: string;

  @ForeignKey(() => Order)
  orderId!: string;

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Order)
  order!: Order;
}

export default Notification;
