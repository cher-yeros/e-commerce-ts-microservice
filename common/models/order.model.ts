import { Optional } from "sequelize";
import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
} from "sequelize-typescript";
import User, { UserType } from "./user.model";
import Product, { ProductType } from "./product.model";
import OrderProduct from "./order_product.model";
import { v4 as uuidv4 } from "uuid";

export interface OrderType {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  totalPrice: number;
  user?: UserType;
  products?: ProductType[];
}

interface OrderCreationAttributes extends Optional<OrderType, "id"> {}

@Table({ timestamps: true })
class Order extends Model<OrderType, OrderCreationAttributes> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: uuidv4,
  })
  id!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity!: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  totalPrice!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
  })
  userId!: string;

  @BelongsTo(() => User)
  user!: User;

  @BelongsToMany(() => Product, { through: { model: () => OrderProduct } })
  products!: Product[];
}

export default Order;
