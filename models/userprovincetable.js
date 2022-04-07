'use strict';
const {
    Model,
    INTEGER
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class UserProvinceTable extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    UserProvinceTable.init({
        userTableName: DataTypes.STRING,
        privateToken: DataTypes.STRING,
        province_id: DataTypes.INTEGER,
        province_name: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'UserProvinceTable',
    });
    return UserProvinceTable;
};