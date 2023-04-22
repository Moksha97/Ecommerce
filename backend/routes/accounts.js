var express = require("express");
var router = express.Router();
var db = require("../database/conn");
var ash = require("express-async-handler");

// userbank, bankaccount
async function getpayments(username) {
  const [rows] = await db.query(
    "SELECT accountid, accountnumber, branchcode, bank, routingnumber FROM userbank NATURAL JOIN bankaccount WHERE username = ? AND bankaccount_isdeleted = FALSE",
    [username]
  );
  return rows;
}

router.get(
  "/",
  ash(async (req, res) => {
    const username = req.username;
    const rows = await getpayments(username);
    res.json(rows);
  })
);

router.get(
  "/:accountid",
  ash(async (req, res) => {
    const username = req.username;
    const accountid = req.params.accountid;
    const [rows] = await db.query(
      "SELECT accountid, accountnumber, branchcode, bank, routingnumber FROM userbank NATURAL JOIN bankaccount WHERE username = ? AND accountid = ? AND bankaccount_isdeleted = FALSE",
      [username, accountid]
    );

    if (rows.length === 0) {
      res.status(404).json({ error: "Account not found" });
      return;
    }

    res.json(rows[0]);
  })
);

router.post(
  "/",
  ash(async (req, res) => {
    const username = req.username;
    const { accountnumber, branchcode, bank, routingnumber } = req.body;
    const [rows] = await db.query(
      "INSERT INTO bankaccount (accountnumber, branchcode, bank, routingnumber) VALUES (?, ?, ?, ?)",
      [accountnumber, branchcode, bank, routingnumber]
    );

    // check
    if (rows.affectedRows == 0) {
      res.status(500).json({ error: "Error creating account" });
      return;
    }

    const accountid = rows.insertId;

    const [rows2] = await db.query(
      "INSERT INTO userbank (username, accountid) VALUES (?, ?)",
      [username, accountid]
    );

    if (rows2.affectedRows == 0) {
      res.status(500).json({ error: "Error creating account" });
      return;
    }

    const payments = await getpayments(username);
    res.json(payments);
  })
);

router.put(
  "/:accountid",
  ash(async (req, res) => {
    const username = req.username;
    const accountid = req.params.accountid;
    const { accountnumber, branchcode, bank, routingnumber } = req.body;

    // check if accountid is valid
    const [rows1] = await db.query(
      "SELECT accountid FROM userbank WHERE username = ? AND accountid = ?",
      [username, accountid]
    );

    if (rows1.length === 0) {
      res.status(404).json({ error: "Account not found" });
      return;
    }

    const [rows] = await db.query(
      "UPDATE bankaccount SET accountnumber = ?, branchcode = ?, bank = ?, routingnumber = ? WHERE accountid = ?",
      [accountnumber, branchcode, bank, routingnumber, accountid]
    );

    // check if the address is inserted
    if (rows.affectedRows === 0) {
      res.status(500).json({ error: "Unable to update account" });
      return;
    }

    const payments = await getpayments(username);
    res.json(payments);
  })
);

router.delete(
  "/:accountid",
  ash(async (req, res) => {
    const username = req.username;
    const accountid = parseInt(req.params.accountid);

    // check if accountid is valid
    const [rows1] = await db.query(
      "SELECT accountid FROM userbank WHERE username = ? AND accountid = ?",
      [username, accountid]
    );

    if (rows1.length === 0) {
      res.status(404).json({ error: "Account not found" });
      return;
    }

    // check if accountid is preferred
    const [rows2] = await db.query(
      "SELECT preferredaccount FROM user WHERE username = ?",
      [username]
    );

    if (rows2[0].preferredaccount == accountid) {
      res.status(400).json({ error: "Cannot delete preferred account" });
      return;
    }

    const [rows] = await db.query(
      "UPDATE bankaccount SET bankaccount_isdeleted = TRUE WHERE accountid = ?",
      [accountid]
    );

    // check if the address is deleted
    if (rows.affectedRows === 0) {
      res.status(500).json({ error: "Unable to delete account" });
      return;
    }
    const payments = await getpayments(username);
    res.json(payments);
  })
);

router.put(
  "/preferred/:accountid",
  ash(async (req, res) => {
    const username = req.username;
    const accountid = parseInt(req.params.accountid);

    // check if accountid is valid
    const [rows1] = await db.query(
      "SELECT accountid FROM userbank NATURAL JOIN bankaccount WHERE username = ? AND accountid = ? AND bankaccount_isdeleted = FALSE",
      [username, accountid]
    );

    if (rows1.length === 0) {
      res.status(404).json({ error: "Account not found" });
      return;
    }

    const [rows] = await db.query(
      "UPDATE user SET preferredaccount = ? WHERE username = ?",
      [accountid, username]
    );

    if (rows.affectedRows === 0) {
      res.status(500).json({ error: "Unable to update preferred account" });
      return;
    }

    res.json({ message: "Preferred account updated" });
  })
);

module.exports = router;
