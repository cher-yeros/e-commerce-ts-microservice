import { Optional } from "sequelize";
import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
} from "sequelize-typescript";
import User from "./user.model";
import { v4 as uuidv4 } from "uuid";

export interface PaymentType {
  id: string;
  amount: number;
  status: string;
}

interface PaymentCreationAttributes extends Optional<PaymentType, "id"> {}

@Table({ timestamps: true })
class Payment extends Model<PaymentType, PaymentCreationAttributes> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: uuidv4,
  })
  id!: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  amount!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  status!: string;

  @ForeignKey(() => User)
  userId!: string;
}

export default Payment;
