const User = require("./user");
const Bot = require("./bot");
const Post = require("./post");
const Comment = require("./comment");

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

Comment.belongsTo(User, {
  foreignKey: "created_by",
});

Comment.belongsTo(Post, {
  foreignKey: "post_id",
});

module.exports = { User, Post, Comment, Bot };
