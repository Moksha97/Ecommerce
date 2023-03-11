var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var db = require('../database/conn');
var ash = require("express-async-handler");

// verify user credentials
async function verifyUser(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var sql = "SELECT * FROM users WHERE username = ? AND password = ?";
    var params = [username, password];
    const [result] = await db.query(sql, params);
    if (result.length > 0) {
        req.userId = result[0].id;
        req.isAdmin = result[0].isAdmin;
    }
    else {
        res.status(401).send("Invalid username or password");
    }
}

// login middleware
router.post("/", ash(async function (req, res, next) {
    await verifyUser(req, res, next);
    var secret = process.env.JWT_SECRET;
    var expirty = process.env.JWT_EXPIRY;
    var timestamp = Math.floor(Date.now() / 1000);
    var token = jwt.sign({ id: req.userId, isAdmin: req.isAdmin, timestamp: timestamp }, secret, {
        expiresIn: expirty
    });
    res.set('Authorization', token)
    res.json({ token: token });
}
));

module.exports = router;