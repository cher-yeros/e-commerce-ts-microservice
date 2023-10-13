import { Optional } from "sequelize";
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import Order from "./order.model";
import OrderProduct from "./order_product.model";
import User from "./user.model";

export interface ProductType {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface ProductCreationAttributes extends Optional<ProductType, "id"> {}

@Table({ timestamps: true })
class Product extends Model<ProductType, ProductCreationAttributes> {
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
    type: DataType.FLOAT,
    allowNull: false,
  })
  price!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
  })
  userId!: string;

  @BelongsTo(() => User)
  user!: User;

  @BelongsToMany(() => Order, {
    through: {
      model: () => OrderProduct,
    },
  })
  orders!: Order[];
}

export default Product;
