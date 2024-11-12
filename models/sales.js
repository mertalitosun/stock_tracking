const sequelize = require("../data/dbConnection");
const { DataTypes } = require("sequelize");

const Sales = sequelize.define("sales", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  saleDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  totalAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

module.exports = Sales;
