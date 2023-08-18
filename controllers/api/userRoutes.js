// Get ALL users by 'id'
// When user is logged in, session is created based on the email and validates the password as valid.

const router = require("express").Router();
const User = require("../../models/user");

// We could do this by 'name' instead of 'id', but that's not a key.
router.get("/", async (req, res) => {
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

// Route for creating a new user
router.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const newUser = await User.create({
      name,
      email,
      password,
    });

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;
      res.redirect('/');
    });

  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'An error occurred while creating user.' });
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
