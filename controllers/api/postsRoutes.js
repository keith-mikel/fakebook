const express = require('express');
const router = express.Router();
const { Post } = require('../../models');
const createCommentsFromResponses = require('../../public/js/generate-comments');


// Other route handlers go here


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

router.post('/', async (req, res) => {
  try {
    const newPost = await Post.create({
      body: req.body.body,
      created_by: req.session.user_id,
    });

    await createCommentsFromResponses(newPost.id);

    // Respond with a success message
    res.redirect('/');
  } catch (error) {
    console.error('Error creating post and comments:', error);
    res.status(500).json({ error: 'An error occurred while creating post and comments.' });
  }
});

module.exports = router;
