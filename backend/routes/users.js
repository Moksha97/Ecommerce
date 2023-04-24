var express = require("express");
var router = express.Router();
var db = require("../database/conn");
var ash = require("express-async-handler");

async function getDetails(username) {
  const [rows] = await db.query(
    "SELECT username,phone,fname,lname,password,isadmin,preferredaddress,preferredaccount FROM user WHERE username = ?",
    [username]
  );
  return rows;
}
/* Get user details like fnmae, lnmae so on*/
router.get(
  "/getUser",
  ash(async (req, res) => {
    const username = req.username;
    const rows = await getDetails(username);
    res.json(rows);
  })
);

// async function updateDetails(username, fieldName, fieldValue) {
//   const [result] = await db.query(`UPDATE user SET ? = ? WHERE username = ?`, [
//     fieldName,
//     fieldValue,
//     username,
//   ]);
//   return result;
// }

/* Update user details */
router.post(
  "/updateUser",
  ash(async (req, res) => {
    const username = req.username;
    const { phone, fname, lname } = req.body;

    await db.query(
      `UPDATE user SET phone = ?, fname = ?, lname = ? WHERE username = ?`,
      [phone, fname, lname, username]
    );

    const [rows] = await getDetails(username);
    res.json(rows);
  })
);

module.exports = router;
