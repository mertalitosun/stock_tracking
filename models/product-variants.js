const sequelize = require("../data/dbConnection");
const { DataTypes } = require("sequelize");

const ProductVariants = sequelize.define("productVariants", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  barcode: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  memory: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  purchasePrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  stockQuantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

module.exports = ProductVariants;
