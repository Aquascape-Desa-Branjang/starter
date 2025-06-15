const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ProductCategory = sequelize.define('ProductCategory', {
  id: {
    type: DataTypes.CHAR(26),
    primaryKey: true,
    allowNull: false,
  },
  order: {
    type: DataTypes.TINYINT,
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
}, {
  tableName: 'product_categories',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = ProductCategory;
