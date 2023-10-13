// orderProduct.model.ts
import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import Order from "./order.model";
import Product from "./product.model";

@Table
export class OrderProduct extends Model<OrderProduct> {
  @ForeignKey(() => Order)
  @Column
  orderId!: string;

  @ForeignKey(() => Product)
  @Column
  productId!: string;
}

export default OrderProduct;
