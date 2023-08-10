'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize) => {
  class StackProject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    // }
  }
  StackProject.init(
    {},
    {
      sequelize,
      modelName: 'StackProject',
      tableName: 'stacksProjects',
      underscored: true,
      timestamps: false,
    }
  );
  return StackProject;
};