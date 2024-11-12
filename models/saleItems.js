const sequelize = require("../data/dbConnection");
const { DataTypes } = require("sequelize");

const SaleItems = sequelize.define("saleItems", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  quantitySold: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  salePrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

module.exports = SaleItems;
