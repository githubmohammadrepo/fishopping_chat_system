'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GroupAccess extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  GroupAccess.init({
    user_group_id: DataTypes.INTEGER,
    user_group_access: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'GroupAccess',
  });
  return GroupAccess;
};