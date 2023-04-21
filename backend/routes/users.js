var express = require("express");
var router = express.Router();
var db = require("../database/conn");
var ash = require("express-async-handler");

async function getDetails(username) {
  const [rows] = await db.query(
    "SELECT username,fname,lname,password,isadmin,preferredaddress,preferredaccount FROM user WHERE username = ?",
    [username]
  );
  return rows;
}

/* GET users listing. */
router.get("/", function (req, res) {
  return res.json({ message: "List of users" });
});

/* Get user details like fnmae, lnmae so on*/
router.get(
  "/getUser",
  ash(async (req, res) => {
    const username = req.username;
    const rows = await getDetails(username);
    res.json(rows);
  })
);

async function updateDetails(username, fieldName, fieldValue) {
  const [result] = await db.query(`UPDATE user SET ? = ? WHERE username = ?`, [
    fieldName,
    fieldValue,
    username,
  ]);
  return result;
}

/* Update user details */
router.put(
  "/updateUser",
  ash(async (req, res) => {
    const username = req.username;
    const { fieldName, fieldValue } = req.body;
    await updateDetails(username, fieldName, fieldValue);
    res.send("User details updated successfully");
  })
);

module.exports = router;
