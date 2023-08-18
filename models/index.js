const User = require("./user");
const Bot = require("./bot");
const Post = require("./post");
const Comment = require("./comment");
const Response = require("./response"); // Import the Response model

User.hasMany(Post, {
  foreignKey: "created_by",
  onDelete: "CASCADE",
});

Post.belongsTo(User, {
  foreignKey: "created_by",
});

User.hasMany(Comment, {
  foreignKey: "created_by",
  onDelete: "CASCADE",
});

Post.hasMany(Comment, {
  foreignKey: "post_id",
});

Comment.belongsTo(User, {
  foreignKey: "created_by",
});

Comment.belongsTo(Post, {
  foreignKey: "post_id",
});

Response.belongsTo(Bot, {
  foreignKey: "bot_id",
});

Bot.hasMany(Response, {
  foreignKey: 'bot_id',
});


module.exports = { User, Post, Comment, Bot, Response };

