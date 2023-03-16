var express = require("express");
var router = express.Router();

// Verify whether the user is an admin or not
router.use(function (req, res, next) {
  if (!req.isadmin)
    return res
      .status(401)
      .json({ error: "No token provided or Invalid token." });
  next();
});

module.exports = router;
