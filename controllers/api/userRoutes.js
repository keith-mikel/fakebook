// Get ALL users by 'id'
// When user is logged in, session is created based on the email and validates the password as valid.

const router = require("express").Router();
const { User } = require("../../models");

// Get All users by '/user'.'id' *We may not need 8 - 19, depends if we need to get all users during login...*
// We could do this by 'name' instead of 'id', but that's not a key.
router.get("/users", async (req, res) => {
  try {
    const userData = await User.findAll();

    const users = userData.map((id) => {
      return id.get({ plain: true });
    });

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// If we don't want to keep email, we can update this to use 'name' (name: req.body.name)
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res.status(400).json({ message: "Incorrect email, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
