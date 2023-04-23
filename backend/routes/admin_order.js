var express = require("express");
var router = express.Router();
var db = require("../database/conn");
var ash = require("express-async-handler");

// get all orders with pending status
router.get(
  "/getpending",
  ash(async (req, res) => {
    const [rows] = await db.query(
      "SELECT * FROM `order` WHERE status <> 'DELIVERED' AND status <> 'CANCELED'"
    );
    res.send(rows);
  })
);

// change the order status for pending orders
router.post(
  "/updatestatus",
  ash(async (req, res) => {
    const { orderId, status } = req.body;
    // check if orderId is valid
    if (orderId === null || orderId === undefined || orderId === "") {
      res.status(400).json({ error: "Order ID is not valid" });
      return;
    }
    // check if status is valid
    if (status === null || status === undefined || status === "") {
      res.status(400).json({ error: "Status is not valid" });
      return;
    }
    // check if order exists
    const [rows] = await db.query("Select * from `order` where oid = ?", [
      orderId,
    ]);
    if (rows.length === 0) {
      res.status(400).json({ error: "Order does not exist" });
      return;
    }
    // check if status is valid
    const valid_status = [
      "PLACED",
      "PACKED",
      "INTRANSIT",
      "DELIVERED",
      "CANCELED",
    ];
    if (!valid_status.includes(status)) {
      res.status(400).json({ error: "Status is not valid" });
      return;
    }

    await db.query("UPDATE `order` SET status = ? WHERE oid = ?", [
      status,
      orderId,
    ]);
    res.send("Order status updated successfully");
  })
);

module.exports = router;
