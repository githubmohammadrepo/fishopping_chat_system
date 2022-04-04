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
      models.GroupAccess.belongsTo(models.UserAccess, { foreignKey: 'user_group_access'});
      
      
      models.GroupAccess.belongsTo(models.UserGroup, { foreignKey: 'user_group_access'});
      models.GroupAccess.belongsTo(models.UserGroup, { as: "observerGroupInfo", foreignKey: 'observer_group_id' });
      models.GroupAccess.belongsTo(models.UserGroup, { as: "watchingGroupInfo", foreignKey: 'watching_group_id'});
      

    }
  }
  GroupAccess.init({
    observer_group_id: DataTypes.INTEGER,
    watching_group_id: DataTypes.INTEGER,
    user_group_access: DataTypes.INTEGER

  }, {
    sequelize,
    modelName: 'GroupAccess',
  });
  return GroupAccess;
};