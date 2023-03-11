var express = require("express");
var router = express.Router();

// logout middleware
router.get("/", function (req, res, next) {
  res.cookie("token", "", { httpOnly: true });
  res.status(200).send({ auth: false, message: "Logged out." });
});

module.exports = router;
