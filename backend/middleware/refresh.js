var express = require("express");
var router = express.Router();
var gettoken = require("../helpers/gettoken");

// Refresh JWT Token if it exists in the token cookie
function refresh(req, res) {
  if (req.UserId) {
    var token = gettoken(req.username, req.isadmin);
    res.cookie("token", token, { httpOnly: true });
  }
}

router.use(function (req, res, next) {
  refresh(req, res);
  next();
});

module.exports = router;
