const { Model, DataTypes } = require("sequelize");
const sequelize = require('../config/connection');
class Bot extends Model {}

Bot.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    temperment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'bot',
  }
);

module.exports = Bot