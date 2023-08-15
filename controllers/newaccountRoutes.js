// TODO - create new api endpoint with information we want saved and rendered or what happens when user clicks create.
const router = require("express").Router();
// const { User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", (req, res) => {
  res.render("newaccount");
});
module.exports = router;
