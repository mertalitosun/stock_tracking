const sequelize = require("../data/dbConnection");
const { DataTypes } = require("sequelize");

const ProductGroups = sequelize.define("productGroups", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  model: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = ProductGroups;
