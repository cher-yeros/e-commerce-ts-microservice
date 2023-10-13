import { DataTypes, Optional } from "sequelize";
import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";

export interface TransactionType {
  id: string;
  userId: string;
  message: string;
  isRead: boolean;
}

interface TransactionCreationAttributes
  extends Optional<TransactionType, "id"> {}

@Table({
  timestamps: true,
})
class Transaction extends Model<
  TransactionType,
  TransactionCreationAttributes
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
}

export default Transaction;
