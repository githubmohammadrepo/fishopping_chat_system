'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class UserGroup extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

            models.UserGroup.belongsToMany(models.UserGroup, { as: "observerGroup", foreignKey: 'observer_group_id', through: 'GroupAccess' });
            models.UserGroup.belongsToMany(models.UserGroup, { as: "watchingGroup", foreignKey: 'watching_group_id', through: 'GroupAccess' });
            


        }
    }
    UserGroup.init({
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'UserGroup',
    });
    return UserGroup;
};