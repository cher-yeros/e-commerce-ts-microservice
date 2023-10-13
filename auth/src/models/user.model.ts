import { Optional } from "sequelize";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import Notification, { NotificationType } from "./notification.model";
import Order, { OrderType } from "./order.model";
import Payment, { PaymentType } from "./payment.model";
import Product, { ProductType } from "./product.model";

export interface UserType {
  id: string;
  name: string;
  email: string;
  password: string;
  products?: ProductType[];
  orders?: OrderType[];
  notifications?: NotificationType[];
  payments?: PaymentType[];
}

interface UserCreationAttributes extends Optional<UserType, "id"> {}

@Table({ timestamps: true })
class User extends Model<UserType, UserCreationAttributes> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: uuidv4,
  })
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @HasMany(() => Product)
  products!: Product[];

  @HasMany(() => Order)
  orders!: Order[];

  @HasMany(() => Notification)
  notifications!: Notification[];

  @HasMany(() => Payment)
  payments!: Payment[];
}

export default User;
