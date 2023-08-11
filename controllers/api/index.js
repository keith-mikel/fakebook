const express = require("express");
const router = express.Router();

const botRoutes = require("./botRoutes");
const commentsRoutes = require("./commentsRoutes");
const postsRoutes = require("./postsRoutes");
const userRoutes = require("./userRoutes");

// Verify routes below
router.use("/bots", botRoutes);
router.use("/comments", commentsRoutes);
router.use("/posts", postsRoutes);
router.use("/users", userRoutes);

module.exports = router;
