const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const Sentiment = require("sentiment");

class Post extends Model {}

// TODO - Instructor said to include in model...
// const postsData = await Post.findAll({
//   include: [
//     {
//       model: Comment
//     }
//   ]
// });

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

// Function to calculate sentiment score
const calculateSentimentScore = (text) => {
  const sentiment = new Sentiment();
  const result = sentiment.analyze(text);
  return result.score;
};

// Hook to update sentimentScore before creating a post
Post.beforeCreate(async (post, options) => {
  post.sentimentScore = calculateSentimentScore(post.body);
});


module.exports = Post;