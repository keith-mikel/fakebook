const express = require("express");
const router = express.Router();

const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes");
const newaccountRoutes = require("./newaccountRoutes");

router.use("/", homeRoutes);
router.use("/newaccount", newaccountRoutes);
router.use("/api", apiRoutes);

module.exports = router;
