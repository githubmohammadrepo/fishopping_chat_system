'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        verifyPassword(password) {
            return password == this.password;
        }

        static associate(models) {
            // define association here
        }
    }
    User.init({
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        province_table_id: DataTypes.INTEGER,
        province_user_id: DataTypes.INTEGER,
        openId: DataTypes.STRING,
        group_id: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};