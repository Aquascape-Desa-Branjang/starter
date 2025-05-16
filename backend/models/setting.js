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

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['active', 'non-active']],
      },
    },

    photo: {
      type: DataTypes.TEXT,  // TEXT is better for Base64 than STRING
      allowNull: true,
      defaultValue: null,
    },
  }, {
    tableName: 'settings',
    timestamps: true
  });

  return Setting;
};
