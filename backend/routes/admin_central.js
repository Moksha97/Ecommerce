var express = require("express");
var router = express.Router();
var db = require("../database/conn");
var ash = require("express-async-handler");

// reset user password
router.post(
    "/resetpassword",
    ash(async (req, res) => {
        const { username, password, confirmPassword } = req.body;
        // check if username is valid
        if (username === null || username === undefined || username === "") {
            res.status(400).json({ error: "Username is not valid" });
            return;
        }
        // check if password is valid
        if (password === null || password === undefined || password === "") {
            res.status(400).json({ error: "Password is not valid" });
            return;
        }
        // check if user exists
        const [rows] = await db.query("Select * from user where username = ?", [
            username,
        ]);
        if (rows.length === 0) {
            res.status(400).json({ error: "User does not exist" });
            return;
        }
        await db.query("UPDATE user SET password = ? WHERE username = ?", [
            password,
            username,
        ]);
        res.send("Password updated successfully");
    }
));

module.exports = router;