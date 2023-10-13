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
var Transaction = /** @class */ (function (_super) {
    __extends(Transaction, _super);
    function Transaction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        sequelize_typescript_1.Column({
            type: sequelize_1.DataTypes.UUID,
            primaryKey: true,
            defaultValue: uuid_1.v4
        })
    ], Transaction.prototype, "id");
    __decorate([
        sequelize_typescript_1.Column({
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        })
    ], Transaction.prototype, "message");
    __decorate([
        sequelize_typescript_1.Column({
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        })
    ], Transaction.prototype, "isRead");
    Transaction = __decorate([
        sequelize_typescript_1.Table({
            timestamps: true
        })
    ], Transaction);
    return Transaction;
}(sequelize_typescript_1.Model));
exports["default"] = Transaction;
