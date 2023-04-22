var express = require("express");
var router = express.Router();
var db = require("../database/conn");
var ash = require("express-async-handler");

router.post(
  "/add",
  ash(async (req, res) => {
    let { sid, pid, quantity, price, discount } = req.body;

    // check if sid is valid
    if (sid === null || sid === undefined || sid === "") {
      res.status(400).json({ error: "seller ID is not valid" });
      return;
    }
    // check if pid is valid
    if (pid === null || pid === undefined || pid === "") {
      res.status(400).json({ error: "Product ID is not valid" });
      return;
    }
    // check if quantity is valid
    if (quantity === null || quantity === undefined || quantity === "") {
      res.status(400).json({ error: "Quantity is not valid" });
      return;
    }
    // check if price is valid
    if (price === null || price === undefined || price === "") {
      res.status(400).json({ error: "Price is not valid" });
      return;
    }
    // check if discount is valid
    if (discount === null || discount === undefined || discount === "") {
      res.status(400).json({ error: "Discount is not valid" });
      return;
    }

    sid = Number(sid);
    pid = Number(pid);
    quantity = Number(quantity);
    price = Number(price);
    discount = Number(discount);

    // check if seller exists
    const [rows1] = await db.query("Select * from seller where sid = ?", [sid]);
    if (rows1.length === 0) {
      res.status(400).json({ error: "seller does not exist" });
      return;
    }

    // check if product exists
    const [rows2] = await db.query("Select * from product where pid = ?", [
      pid,
    ]);
    if (rows2.length === 0) {
      res.status(400).json({ error: "Product does not exist" });
      return;
    }

    if (quantity < 0) {
      res.status(400).json({ error: "Quantity is not valid" });
      return;
    }

    if (price < 0) {
      res.status(400).json({ error: "Price is not valid" });
      return;
    }

    if (discount < 0 || discount > 1.0) {
      res.status(400).json({ error: "Discount is not valid" });
      return;
    }

    // check if product is already in inventory
    const [rows] = await db.query(
      "Select * from inventory where sid = ? and pid = ?",
      [sid, pid]
    );

    if (rows.length > 0) {
      res.status(400).json({ error: "Product already in inventory" });
      return;
    }

    // add product to inventory
    await db.query(
      "Insert into inventory (sid, pid, quantity, price, discount) values (?, ?, ?, ?, ?)",
      [sid, pid, quantity, price, discount]
    );
    res.json({ message: "Product added to inventory successfully" });
  })
);

router.post(
  "/update",
  ash(async (req, res) => {
    let { sid, pid, quantity, price, discount } = req.body;

    // check if sid is valid
    if (sid === null || sid === undefined || sid === "") {
      res.status(400).json({ error: "seller ID is not valid" });
      return;
    }
    // check if pid is valid
    if (pid === null || pid === undefined || pid === "") {
      res.status(400).json({ error: "Product ID is not valid" });
      return;
    }
    // check if quantity is valid
    if (quantity === null || quantity === undefined || quantity === "") {
      res.status(400).json({ error: "Quantity is not valid" });
      return;
    }
    // check if price is valid
    if (price === null || price === undefined || price === "") {
      res.status(400).json({ error: "Price is not valid" });
      return;
    }
    // check if discount is valid
    if (discount === null || discount === undefined || discount === "") {
      res.status(400).json({ error: "Discount is not valid" });
      return;
    }

    sid = Number(sid);
    pid = Number(pid);
    quantity = Number(quantity);
    price = Number(price);
    discount = Number(discount);

    // check if seller exists
    const [rows1] = await db.query("Select * from seller where sid = ?", [sid]);
    if (rows1.length === 0) {
      res.status(400).json({ error: "seller does not exist" });
      return;
    }

    // check if product exists
    const [rows2] = await db.query("Select * from product where pid = ?", [
      pid,
    ]);
    if (rows2.length === 0) {
      res.status(400).json({ error: "Product does not exist" });
      return;
    }

    if (quantity < 0) {
      res.status(400).json({ error: "Quantity is not valid" });
      return;
    }

    if (price < 0) {
      res.status(400).json({ error: "Price is not valid" });
      return;
    }

    if (discount < 0 || discount > 1.0) {
      res.status(400).json({ error: "Discount is not valid" });
      return;
    }

    // check if product is already in inventory
    const [rows] = await db.query(
      "Select * from inventory where sid = ? and pid = ?",
      [sid, pid]
    );

    if (rows.length === 0) {
      res.status(400).json({ error: "Product not in inventory" });
      return;
    }

    // update product in inventory
    await db.query(
      "Update inventory set quantity = ?, price = ?, discount = ? where sid = ? and pid = ?",
      [quantity, price, discount, sid, pid]
    );
    res.json({ message: "Product updated in inventory successfully" });
  })
);

module.exports = router;
