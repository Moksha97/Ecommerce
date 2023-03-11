var express = require("express");
var jwt = require("jsonwebtoken");
var router = express.Router();

// Verify JWT Token from cookie

function verifyToken(req) {
  var token = req.cookies.token;
  if (!token) return false;
  try {
    var secret = process.env.JWT_SECRET;
    var decoded = jwt.verify(token, secret);
    req.username = decoded.username;
    req.isadmin = decoded.isadmin;
    return true;
  } catch (err) {
    return false;
  }
}

router.use(function (req, res, next) {
  verifyToken(req);
  next();
});

module.exports = router;
