const Categories = require("../models/categories");
const ProductGroups = require("../models/product-groups");
const ProductVariants = require("../models/product-variants");
const Sales = require("../models/sales");
const SaleItems = require("../models/saleItems");
const Users = require("../models/users");
const Roles = require("../models/roles");


Users.belongsTo(Roles, { foreignKey: 'roleId' });
Roles.hasMany(Users, { foreignKey: 'roleId' });

// Category ve ProductGroup arasındaki ilişki
Categories.hasMany(ProductGroups);
ProductGroups.belongsTo(Categories);

// ProductGroup ve ProductVariant arasındaki ilişki
ProductGroups.hasMany(ProductVariants);
ProductVariants.belongsTo(ProductGroups);

// ProductVariant ve SaleItems arasındaki ilişki
ProductVariants.hasMany(SaleItems, { foreignKey: 'productVariantId', as: 'productVariantSaleItems' }); 
SaleItems.belongsTo(ProductVariants, { foreignKey: 'productVariantId', as: 'productVariant' });

// Sale ve SaleItems arasındaki ilişki
Sales.hasMany(SaleItems, { foreignKey: 'saleId', as: 'saleSaleItems' });
SaleItems.belongsTo(Sales, { foreignKey: 'saleId', as: 'sale' });

// Sale ve ProductVariant arasındaki ilişki
ProductVariants.belongsToMany(Sales, { through: SaleItems, as: 'productVariantSales', foreignKey: 'productVariantId' });
Sales.belongsToMany(ProductVariants, { through: SaleItems, as: 'saleProducts', foreignKey: 'saleId' });

module.exports = () => {
  console.log("Veritabanı ilişkileri başarıyla kuruldu.");
};
