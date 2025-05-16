const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Setting = sequelize.define('Setting', {
    key: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    value: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, 
  {
    tableName: 'settings',
    timestamps: true
  });

  return Setting;
};
