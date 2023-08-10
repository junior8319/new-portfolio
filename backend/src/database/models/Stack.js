'use strict';
const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Stack extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Stack.belongsToMany(models.Project, { through: models.StackProject });
    }
  }
  Stack.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    imageUrl: {
      type: DataTypes.TEXT,
      defaultValue: '',
    },
    description: {
      type: DataTypes.TEXT,
      defaultValue: '',
      allowNull: false,
    },
    stackDocsUrl: {
      type: DataTypes.STRING,
    },
    stackUrl: {
      type: DataTypes.STRING,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  }, {
    sequelize,
    modelName: 'Stack',
    tableName: 'stacks',
    underscored: true,
  });
  return Stack;
};