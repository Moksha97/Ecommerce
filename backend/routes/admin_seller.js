var express = require("express");
var router = express.Router();
var db = require("../database/conn");
var ash = require("express-async-handler");

router.post(
  "/add",
  ash(async (req, res) => {
    let { sname, accountnumber, branchcode, bank, routingnumber } = req.body;

    // check if sname is valid
    if (sname === null || sname === undefined || sname === "") {
      res.status(400).json({ error: "seller name is not valid" });
      return;
    }
    // check if accountnumber is valid
    if (
      accountnumber === null ||
      accountnumber === undefined ||
      accountnumber === ""
    ) {
      res.status(400).json({ error: "Account number is not valid" });
      return;
    }
    // check if branchcode is valid
    if (branchcode === null || branchcode === undefined || branchcode === "") {
      res.status(400).json({ error: "Branch code is not valid" });
      return;
    }
    // check if bank is valid
    if (bank === null || bank === undefined || bank === "") {
      res.status(400).json({ error: "Bank is not valid" });
      return;
    }
    // check if routingnumber is valid
    if (
      routingnumber === null ||
      routingnumber === undefined ||
      routingnumber === ""
    ) {
      res.status(400).json({ error: "Routing number is not valid" });
      return;
    }

    const [rows] = await db.query(
      "Insert into bankaccount (accountnumber, branchcode, bank, routingnumber) values (?, ?, ?, ?)",
      [accountnumber, branchcode, bank, routingnumber]
    );

    if (rows.affectedRows === 0) {
      res.status(500).json({ error: "seller could not be added" });
      return;
    }

    const accountid = rows.insertId;

    const [rows2] = await db.query(
      "Insert into seller (sname, accountid) values (?, ?)",
      [sname, accountid]
    );

    if (rows2.affectedRows === 0) {
      res.status(500).json({ error: "seller could not be added" });
      return;
    }

    res.json({ message: "seller added successfully" });
  })
);

router.post(
  "/update",
  ash(async (req, res) => {
    let { sid, sname, accountnumber, branchcode, bank, routingnumber } =
      req.body;

    // check if sid is valid
    if (sid === null || sid === undefined || sid === "") {
      res.status(400).json({ error: "seller id is not valid" });
      return;
    }

    // check if sname is valid
    if (sname === null || sname === undefined || sname === "") {
      res.status(400).json({ error: "seller name is not valid" });
      return;
    }

    // check if accountnumber is valid
    if (
      accountnumber === null ||
      accountnumber === undefined ||
      accountnumber === ""
    ) {
      res.status(400).json({ error: "Account number is not valid" });
      return;
    }

    // check if branchcode is valid
    if (branchcode === null || branchcode === undefined || branchcode === "") {
      res.status(400).json({ error: "Branch code is not valid" });
      return;
    }

    // check if bank is valid
    if (bank === null || bank === undefined || bank === "") {
      res.status(400).json({ error: "Bank is not valid" });
      return;
    }

    // check if routingnumber is valid
    if (
      routingnumber === null ||
      routingnumber === undefined ||
      routingnumber === ""
    ) {
      res.status(400).json({ error: "Routing number is not valid" });
      return;
    }

    // check if seller exists
    const [rows] = await db.query("Select * from seller where sid = ?", [sid]);
    if (rows.length === 0) {
      res.status(400).json({ error: "seller does not exist" });
      return;
    }

    // update seller
    const [rows2] = await db.query(
      "Update seller set sname = ? where sid = ?",
      [sname, sid]
    );
    if (rows2.affectedRows === 0) {
      res.status(500).json({ error: "seller could not be updated" });
      return;
    }

    // update bank account
    const [rows3] = await db.query(
      "Update bankaccount set accountnumber = ?, branchcode = ?, bank = ?, routingnumber = ? where accountid = ?",
      [accountnumber, branchcode, bank, routingnumber, rows[0].accountid]
    );
    if (rows3.affectedRows === 0) {
      res.status(500).json({ error: "seller could not be updated" });
      return;
    }

    res.json({ message: "seller updated successfully" });
  })
);

router.get(
  "/",
  ash(async (req, res) => {
    const [rows] = await db.query(
      "Select * from seller natural join bankaccount"
    );
    res.json(rows);
  })
);

module.exports = router;
