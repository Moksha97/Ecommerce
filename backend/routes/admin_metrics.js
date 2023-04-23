var express = require("express");
var router = express.Router();
var db = require("../database/conn");
var ash = require("express-async-handler");

router.get(
  "/",
  ash(async (req, res) => {
    const [rows] = await db.query(
      "SELECT oid, status, sum(price) as totalprice FROM seller NATURAL JOIN items NATURAL JOIN `order` GROUP BY oid"
    );

    var result = {};
    result.not_shipped = 0;
    result.shipped = 0;
    result.delivered = 0;
    result.cancelled = 0;
    result.revenue = 0;

    for (let i = 0; i < rows.length; i++) {
      if (rows[i].status == "PLACED") {
        result.not_shipped += 1;
      } else if (rows[i].status == "PACKED" || rows[i].status == "INTRANSIT") {
        result.shipped += 1;
      } else if (rows[i].status == "DELIVERED") {
        result.delivered += 1;
      } else if (rows[i].status == "CANCELED") {
        result.cancelled += 1;
        result.revenue -= Number(rows[i].totalprice);
      }
      result.revenue += Number(rows[i].totalprice);
    }

    const [rows2] = await db.query("SELECT pid, quantity FROM inventory");

    result.active_listings = rows2.length;
    result.out_of_stock = 0;
    for (let i = 0; i < rows2.length; i++) {
      if (rows2[i].quantity == 0) {
        result.out_of_stock += 1;
      }
    }

    res.send(result);
  })
);

router.get(
  "/product",
  ash(async (req, res) => {
    const [rows] = await db.query(
      "SELECT pid, sum(quantity) as totalquantity, sum(price) as revenue, pname, pdesc, pcategory FROM items NATURAL JOIN product GROUP BY pid"
    );

    // var result = {};
    // for (let i = 0; i < rows.length; i++) {
    //   result[rows[i].pid] = {};
    //   result[rows[i].pid].quantity = rows[i].quantity;
    //   result[rows[i].pid].price = rows[i].price;
    // }

    res.send(rows);
  })
);

router.get(
  "/seller/:sid",
  ash(async (req, res) => {
    const sid = req.params.sid;
    const [rows] = await db.query(
      "SELECT oid, status, sum(price) as totalprice FROM seller NATURAL JOIN items NATURAL JOIN `order` WHERE sid = ? GROUP BY oid",
      [sid]
    );

    var result = {};
    result.not_shipped = 0;
    result.shipped = 0;
    result.delivered = 0;
    result.cancelled = 0;
    result.revenue = 0;

    for (let i = 0; i < rows.length; i++) {
      if (rows[i].status == "PLACED") {
        result.not_shipped += 1;
      } else if (rows[i].status == "PACKED" || rows[i].status == "INTRANSIT") {
        result.shipped += 1;
      } else if (rows[i].status == "DELIVERED") {
        result.delivered += 1;
      } else if (rows[i].status == "CANCELED") {
        result.cancelled += 1;
        result.revenue -= Number(rows[i].totalprice);
      }
      result.revenue += Number(rows[i].totalprice);
    }

    const [rows2] = await db.query(
      "SELECT pid, quantity FROM inventory WHERE sid = ?",
      [sid]
    );

    result.active_listings = rows2.length;
    result.out_of_stock = 0;
    for (let i = 0; i < rows2.length; i++) {
      if (rows2[i].quantity == 0) {
        result.out_of_stock += 1;
      }
    }

    res.send(result);
  })
);

router.get(
  "/orders_by_date",
  ash(async (req, res) => {
    const [rows] = await db.query(
      "SELECT CAST(timestamp AS DATE) as `date`, COUNT(*) as totalorders FROM `order` GROUP BY CAST(timestamp AS DATE)"
    );

    res.send(rows);
  })
);

module.exports = router;
