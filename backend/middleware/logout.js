var express = require("express");
var router = express.Router();

// logout middleware
router.get("/", function (req, res) {
  res.cookie("token", "", { httpOnly: true });
  res.status(200).json({ message: "Logged out successfully" });
});

module.exports = router;
