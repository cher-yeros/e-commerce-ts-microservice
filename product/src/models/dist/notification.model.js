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
var sequelize_1 = require("sequelize");
var sequelize_typescript_1 = require("sequelize-typescript");
var uuid_1 = require("uuid");
var order_model_1 = require("./order.model");
var user_model_1 = require("./user.model");
var Notification = /** @class */ (function (_super) {
    __extends(Notification, _super);
    function Notification() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        sequelize_typescript_1.Column({
            type: sequelize_1.DataTypes.UUID,
            primaryKey: true,
            defaultValue: uuid_1.v4
        })
    ], Notification.prototype, "id");
    __decorate([
        sequelize_typescript_1.Column({
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        })
    ], Notification.prototype, "message");
    __decorate([
        sequelize_typescript_1.Column({
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        })
    ], Notification.prototype, "isRead");
    __decorate([
        sequelize_typescript_1.ForeignKey(function () { return user_model_1["default"]; })
    ], Notification.prototype, "userId");
    __decorate([
        sequelize_typescript_1.ForeignKey(function () { return order_model_1["default"]; })
    ], Notification.prototype, "orderId");
    __decorate([
        sequelize_typescript_1.BelongsTo(function () { return user_model_1["default"]; })
    ], Notification.prototype, "user");
    __decorate([
        sequelize_typescript_1.BelongsTo(function () { return order_model_1["default"]; })
    ], Notification.prototype, "order");
    Notification = __decorate([
        sequelize_typescript_1.Table({
            timestamps: true
        })
    ], Notification);
    return Notification;
}(sequelize_typescript_1.Model));
exports["default"] = Notification;
