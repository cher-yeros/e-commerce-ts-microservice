"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var sequelize_typescript_1 = require("sequelize-typescript");
var uuid_1 = require("uuid");
var order_model_1 = require("./order.model");
var order_product_model_1 = require("./order_product.model");
var user_model_1 = require("./user.model");
var Product = /** @class */ (function (_super) {
    __extends(Product, _super);
    function Product() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        sequelize_typescript_1.Column({
            type: sequelize_typescript_1.DataType.UUID,
            primaryKey: true,
            defaultValue: uuid_1.v4
        })
    ], Product.prototype, "id");
    __decorate([
        sequelize_typescript_1.Column({
            type: sequelize_typescript_1.DataType.STRING,
            allowNull: false
        })
    ], Product.prototype, "serialNo");
    __decorate([
        sequelize_typescript_1.Column({
            type: sequelize_typescript_1.DataType.STRING,
            allowNull: false
        })
    ], Product.prototype, "name");
    __decorate([
        sequelize_typescript_1.Column({
            type: sequelize_typescript_1.DataType.FLOAT,
            allowNull: false
        })
    ], Product.prototype, "price");
    __decorate([
        sequelize_typescript_1.Column({
            type: sequelize_typescript_1.DataType.INTEGER,
            allowNull: false
        })
    ], Product.prototype, "quantity");
    __decorate([
        sequelize_typescript_1.ForeignKey(function () { return user_model_1["default"]; }),
        sequelize_typescript_1.Column({
            type: sequelize_typescript_1.DataType.UUID
        })
    ], Product.prototype, "userId");
    __decorate([
        sequelize_typescript_1.BelongsTo(function () { return user_model_1["default"]; })
    ], Product.prototype, "user");
    __decorate([
        sequelize_typescript_1.BelongsToMany(function () { return order_model_1["default"]; }, {
            through: {
                model: function () { return order_product_model_1["default"]; }
            }
        })
    ], Product.prototype, "orders");
    Product = __decorate([
        sequelize_typescript_1.Table({ timestamps: true })
    ], Product);
    return Product;
}(sequelize_typescript_1.Model));
exports["default"] = Product;
