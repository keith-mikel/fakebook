const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      order: [['created_on', 'DESC']],
      include: [{ model: Comment, as: 'Comments' }], // Include associated comments
    });

    const posts = postData.map((post) => {
      const postObj = post.get({ plain: true });
      return postObj;
    });

    res.render('homepage', {
      posts,
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Incorrect DATA, please try again' });
  }
});


router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    // res.redirect("/");
    // return;
  }

  res.render("login");
});

module.exports = router;
