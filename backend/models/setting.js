// models/setting.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Setting = sequelize.define('Setting', {
  key: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  value: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'settings',
  timestamps: true,
});

module.exports = Setting;
