const router = require("express").Router();
const { User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ["password"] },
      order: [["name", "ASC"]],
    });

    const users = userData.map((project) => project.get({ plain: true }));

    res.render("homepage", {
      users,
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Incorrect DATA, please try again" });
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
