const { Model, DataTypes } = require('sequelize');
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
    temperment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // TODO verify whether we need to implement a unique key (guid) for each comment
    comment_id: {
        type:DataTypes.INTEGER,
        references:{
            model:'comment',
            key:'id',
        },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'Comment',
  }
);

module.exports = Comment;