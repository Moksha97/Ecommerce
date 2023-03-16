var express = require("express");
var router = express.Router();

// Verify JWT Token
router.use(function (req, res, next) {
  if (!req.username)
    return res
      .status(401)
      .json({ error: "No token provided or Invalid token." });
  next();
});

module.exports = router;
