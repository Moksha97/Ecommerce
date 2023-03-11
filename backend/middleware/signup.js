var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var db = require("../database/conn");
var ash = require("express-async-handler");
var login = require("./login");

// add user to database
async function addUser(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  var fname = req.body.fname;
  var lname = req.body.lname;
  var sql =
    "INSERT INTO users (username, password, fname, lname) VALUES (?, ?, ?, ?)";
  var params = [username, password, fname, lname];

  try {
    var [result] = await db.query(sql, params);
    if (result.affectedRows > 0) {
      req.username = username;
      req.isadmin = 0;
    }
  } catch (err) {
    res.status(400).send("Invalid username or password");
  }
}

// signup middleware
router.post(
  "/",
  ash(async function (req, res, next) {
    await addUser(req, res, next);
    var secret = process.env.JWT_SECRET;
    var expirty = process.env.JWT_EXPIRY;
    var token = jwt.sign(
      { username: req.username, isadmin: req.isadmin },
      secret,
      { expiresIn: expirty }
    );
    res.cookie("token", token, { httpOnly: true });
    res.json({ username: req.username, isadmin: req.isadmin });
  })
);

module.exports = router;
