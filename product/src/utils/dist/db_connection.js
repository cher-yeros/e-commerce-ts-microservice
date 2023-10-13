"use strict";
exports.__esModule = true;
var dotenv_1 = require("dotenv");
var path_1 = require("path");
var sequelize_typescript_1 = require("sequelize-typescript");
dotenv_1.configDotenv();
var sequelize = new sequelize_typescript_1.Sequelize({
    database: process.env.DB_DATABASE,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "3306"),
    dialect: "mysql",
    models: [path_1["default"].join(__dirname, "../models/**/*.model.ts")],
    logging: false
});
sequelize
    .authenticate()
    .then(function () {
    console.log("📂  Connection has been established successfully.\n");
})["catch"](function (error) {
    console.error("Unable to connect to the database:", error);
});
// sequelize
//   .sync({ force: true })
//   .then(() => {
//     console.log("Models synchronized with the database");
//   })
//   .catch((error) => {
//     console.error("Error synchronizing models:", error);
//   });
exports["default"] = sequelize;
