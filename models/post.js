const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const Sentiment = require("sentiment");

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_on: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    created_by: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    sentimentScore: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "post",
  }
);

// Hook to calculate sentiment analysis and update fields before saving
Post.beforeCreate(async (post, options) => {
  const sentiment = new Sentiment();
  const result = sentiment.analyze(post.body);

  post.sentimentScore = result.score;
  post.sentiment = result;
});

module.exports = Post; 
