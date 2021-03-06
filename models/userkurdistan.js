'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class UserKurdistan extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    UserKurdistan.init({
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        group_id: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'UserKurdistan',
    });
    return UserKurdistan;
};