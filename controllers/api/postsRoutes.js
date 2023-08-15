// const express = require("express");
const router = require("express").Router(); //do we need this here?
const Posts = require("../../models/post"); // Make sure your model file path is correct

router.get("/", async (req, res) => {
  try {
    const postData = await Posts.findAll();

    const posts = postData.map((id) => {
      return id.get({ plain: true });
    });

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
