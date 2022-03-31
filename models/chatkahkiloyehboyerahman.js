'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChatKahkiloyehBoyerahman extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ChatKahkiloyehBoyerahman.init({
    message: DataTypes.STRING,
    ip: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    province_table_id: DataTypes.INTEGER,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ChatKahkiloyehBoyerahman',
  });
  return ChatKahkiloyehBoyerahman;
};