'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Repository extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Repository.init({
    name: DataTypes.STRING,
    lastName: DataTypes.STRING,
    visibility: DataTypes.BOOLEAN,
    user: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Repository',
  });
  return Repository;
};