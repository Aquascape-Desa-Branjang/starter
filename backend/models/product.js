const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.CHAR(26),
    primaryKey: true,
    allowNull: false,
  },
  product_category_ids: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  images: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT('long'),
    allowNull: false,
  },
  retail_price: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: true,
  },
  wholesale_prices: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  shopee_link: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'products',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = Product;
