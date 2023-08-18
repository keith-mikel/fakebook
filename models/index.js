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

Post.hasMany(Comment, {
  foreignKey: "post_id",
});

Comment.belongsTo(Bot, {
  foreignKey: "created_by",
});

Comment.belongsTo(Post, {
  foreignKey: "post_id",
});

Bot.hasMany(Comment, {
  foreignKey: "created_by"
})

Response.belongsTo(Bot, {
  foreignKey: "bot_id",
});

Bot.hasMany(Response, {
  foreignKey: 'bot_id',
});


module.exports = { User, Post, Comment, Bot, Response };

