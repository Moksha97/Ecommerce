var express = require("express");
var router = express.Router();
var db = require("../database/conn");
var ash = require("express-async-handler");

async function getaddress(username) {
  const [rows] = await db.query(
    "SELECT aid, line1, line2, city, state, zip FROM address WHERE username = ? AND address_isdeleted = FALSE",
    [username]
  );
  return rows;
}

router.get(
  "/",
  ash(async (req, res) => {
    const username = req.username;
    const rows = await getaddress(username);
    res.json(rows);
  })
);

router.get(
  "/:aid",
  ash(async (req, res) => {
    const username = req.username;
    const aid = req.params.aid;
    const [rows] = await db.query(
      "SELECT aid, line1, line2, city, state, zip FROM address WHERE username = ? AND aid = ? AND address_isdeleted = FALSE",
      [username, aid]
    );

    if (rows.length === 0) {
      res.status(404).json({ error: "Address not found" });
      return;
    }

    res.json(rows[0]);
  })
);

router.post(
  "/",
  ash(async (req, res) => {
    const username = req.username;
    const { line1, line2, city, state, zip } = req.body;
    const [rows] = await db.query(
      "INSERT INTO address (username, line1, line2, city, state, zip) VALUES (?, ?, ?, ?, ?, ?)",
      [username, line1, line2, city, state, zip]
    );

    // check if the address is inserted
    if (rows.affectedRows === 0) {
      res.status(500).json({ error: "Unable to insert address" });
      return;
    }

    const address = await getaddress(username);
    res.json(address);
  })
);

router.delete(
  "/:aid",
  ash(async (req, res) => {
    const username = req.username;
    const aid = req.params.aid;

    // check if the address is preferred
    const [rows1] = await db.query(
      "SELECT preferredaddress FROM user WHERE username = ?",
      [username]
    );
    if (rows1[0].preferredaddress == aid) {
      res.status(400).json({ error: "Unable to delete preferred address" });
      return;
    }

    const [rows] = await db.query(
      "UPDATE address SET address_isdeleted = TRUE WHERE username = ? AND aid = ?",
      [username, aid]
    );

    // check if the address is deleted
    if (rows.affectedRows === 0) {
      res.status(500).json({ error: "Unable to delete address" });
      return;
    }
    const address = await getaddress(username);
    res.json(address);
  })
);

router.put(
  "/:aid",
  ash(async (req, res) => {
    const username = req.username;
    const aid = req.params.aid;
    const { line1, line2, city, state, zip } = req.body;
    const [rows] = await db.query(
      "UPDATE address SET line1 = ?, line2 = ?, city = ?, state = ?, zip = ? WHERE username = ? AND aid = ?",
      [line1, line2, city, state, zip, username, aid]
    );

    // check if the address is updated
    if (rows.affectedRows === 0) {
      res.status(500).json({ error: "Unable to update address" });
      return;
    }
    const address = await getaddress(username);
    res.json(address);
  })
);

router.put(
  "/preferred/:aid",
  ash(async (req, res) => {
    console.log("preferred address");
    const username = req.username;
    const aid = req.params.aid;

    // check if the address is valid
    const [rows1] = await db.query(
      "SELECT aid FROM address WHERE username = ? AND aid = ? AND address_isdeleted = FALSE",
      [username, aid]
    );
    if (rows1.length === 0) {
      res.status(404).json({ error: "Address not found" });
      return;
    }

    const [rows] = await db.query(
      "UPDATE user SET preferredaddress = ? WHERE username = ?",
      [aid, username]
    );

    // check if the address is updated
    if (rows.affectedRows === 0) {
      res.status(500).json({ error: "Unable to update address" });
      return;
    }

    res.json({ message: "Preferred address updated" });
  })
);

module.exports = router;
