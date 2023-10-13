import sequelize from "../utils/db_connection";
import User from "./user.model";
import Notification from "./notification.model";
import Order from "./order.model";
import Payment from "./payment.model";
import Product from "./product.model";

// Define associations between User and other models
User.hasMany(Product, { foreignKey: "userId", as: "products" });
User.hasMany(Order, { foreignKey: "userId", as: "orders" });
User.hasMany(Notification, { foreignKey: "userId", as: "notifications" });
User.hasMany(Payment, { foreignKey: "userId", as: "payments" });

// Define associations between Product and other models
Product.belongsTo(User, { foreignKey: "userId", as: "user" });
Product.hasMany(Order, { foreignKey: "productId", as: "orders" });

// Define associations between Order and other models
Order.belongsTo(User, { foreignKey: "userId", as: "user" });
Order.belongsTo(Product, { foreignKey: "productId", as: "product" });

// Define association with User model
Notification.belongsTo(User, { foreignKey: "userId", as: "user" });

// Define association with User model
Payment.belongsTo(User, { foreignKey: "userId", as: "user" });

export default { User, Product, Order, Notification, Payment };

switch (process.env.NODE_ENV) {
  case "MIGRATION":
    sequelize
      .sync({ force: true })
      .then(() => {})
      .catch((e) => console.log("Sync Error!", e.message))
      .finally(() => console.log("Migration Done"));
    break;
  default:
    sequelize
      .sync({})
      .then(() => {})
      .catch((e) => console.log("Sync Error!", e.message));
}
