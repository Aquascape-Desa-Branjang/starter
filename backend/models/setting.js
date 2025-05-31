const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Setting = sequelize.define('Setting', {
  key: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: 'format: group_key. e.g. home_title, home_sub-title',
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
