var express = require("express");
var router = express.Router();
var db = require("../database/conn");
var ash = require("express-async-handler");

const isFloat = function (value) {
  return typeof value === "number" && isFinite(value);
};

const validCategories = [
  { code: "ELECTRONICS", name: "Electronics" },
  { code: "HEALTH", name: "Health" },
  { code: "FASHION", name: "Fashion" },
  { code: "TOYS", name: "Toys" },
  { code: "HOME", name: "Home" },
];

router.get(
  "/category",
  ash(async function (req, res) {
    res.json(validCategories);
  })
);

router.post(
  "/",
  ash(async function (req, res) {
    var search = req.body.search; // can be null (default "")
    var categories = req.body.categories; // can be null (default all)
    var limit = req.body.limit; // required
    var offset = req.body.offset; // can be null (default 0)
    var order_by = req.body.order_by; // can be null (default price)
    var order = req.body.order; // can be null (default ASC)
    var price = req.body.price; // can be null (default 0 to null)
    var discount = req.body.discount; // required

    // search check
    if (!search) {
      search = "";
    } else if (typeof search !== "string") {
      res.status(400).json({ error: "Search must be a string" });
      return;
    } // alpha numeric check and spaces
    else if (!/^[a-zA-Z0-9 ]*$/.test(search)) {
      res.status(400).json({ error: "Search must be alpha numeric" });
      return;
    }
    search = "%" + search + "%";

    // categories check
    if (!categories) {
      categories = validCategories.map((c) => c.code);
    } else if (categories) {
      if (!Array.isArray(categories)) {
        res.status(400).json({ error: "Categories must be an array" });
        return;
      }

      // check if all categories are valid
      for (let i = 0; i < categories.length; i++) {
        if (!validCategories.find((c) => c.code === categories[i])) {
          res.status(400).json({ error: "Invalid category: " + categories[i] });
          return;
        }
      }
    }

    // limit check
    if (!limit) {
      res.status(400).json({ error: "Limit is required" });
    } else if (!Number.isInteger(limit)) {
      res.status(400).json({ error: "Limit must be an integer" });
    } else if (limit < 0) {
      res.status(400).json({ error: "Limit must be greater than 0" });
    }

    // offset check
    if (!offset) {
      offset = 0;
    } else if (!Number.isInteger(offset)) {
      res.status(400).json({ error: "Offset must be an integer" });
    } else if (offset < 0) {
      res.status(400).json({ error: "Offset must be greater than 0" });
    }

    // order_by check
    if (!order_by) {
      order_by = "price";
    } else if (order_by !== "price" && order_by !== "discount") {
      res.status(400).json({ error: "Invalid order_by: " + order_by });
      return;
    }
    order_by = "best" + order_by;

    // order check
    if (!order) {
      order = "ASC";
    } else if (order !== "ASC" && order !== "DESC") {
      res.status(400).json({ error: "Invalid order: " + order });
      return;
    }

    // price check
    if (!price) {
      price = {};
      price.min = 0;
      price.max = null;
    } else if (!isFloat(price.min) && !isFloat(price.max)) {
      res.status(400).json({ error: "Price must be an integer" });
    } else if (price.min < 0 && price.max < 0) {
      res.status(400).json({ error: "Price must be greater than 0" });
    }

    // discount check
    if (!discount) {
      discount = {};
      discount.min = 0.0;
      discount.max = 1.0;
    } else if (!isFloat(discount.min) && !isFloat(discount.max)) {
      res.status(400).json({ error: "Discount must be an integer" });
    } else if (discount.min < 0.0 && discount.max < 0.0) {
      res.status(400).json({ error: "Discount must be greater than 0" });
    } else if (discount.min > 1.0 && discount.max > 1.0) {
      res.status(400).json({ error: "Discount must be less than 1" });
    }

    // query builder
    var filter_query =
      "SELECT pid, min(price) as bestprice, min(discount) as bestdiscount FROM inventory WHERE ";
    filter_query += "quantity > 0 AND ";
    filter_query += "price >= ? AND ";
    if (price.max) {
      filter_query += "price <= ? AND ";
    }
    filter_query += "discount BETWEEN ? AND ? AND ";
    filter_query +=
      "pid IN (SELECT pid FROM product WHERE pcategory IN (?) AND (pname LIKE ? OR pdesc LIKE ?)) ";
    filter_query += "GROUP BY pid ";
    filter_query += "ORDER BY " + order_by + " " + order + " ";
    filter_query += "LIMIT " + limit + " OFFSET " + offset;
    const queryparams = [price.min];
    if (price.max) {
      queryparams.push(price.max);
    }
    queryparams.push(discount.min);
    queryparams.push(discount.max);
    queryparams.push(categories);
    queryparams.push(search);
    queryparams.push(search);
    const [result] = await db.query(filter_query, queryparams);
    if (result.length === 0) {
      res.json([]);
      return;
    }

    const pids = result.map((r) => r.pid);

    var product_query =
      "SELECT inv.pid, pname, pcategory, sid, sname, price, discount, quantity, rating ";
    product_query +=
      "FROM inventory as inv NATURAL JOIN product as prod NATURAL JOIN seller as s LEFT JOIN (SELECT pid, AVG(rating) as rating FROM productrating as prodrat GROUP BY prodrat.pid) as r ON inv.pid = r.pid ";
    product_query += "WHERE inv.pid IN (?)";

    const [all_products] = await db.query(product_query, [pids]);

    var products = [];

    for (let i = 0; i < pids.length; i++) {
      var product = {};
      product.pid = pids[i];
      product.options = [];

      for (let j = 0; j < all_products.length; j++) {
        if (all_products[j].pid === pids[i]) {
          product.pname = all_products[i].pname;
          product.pcategory = all_products[i].pcategory;
          product.rating = all_products[i].rating;

          var option = {};
          option.sid = all_products[j].sid;
          option.sname = all_products[j].sname;
          option.price = all_products[j].price;
          option.discount = all_products[j].discount;
          option.quantity = all_products[j].quantity;
          product.options.push(option);
        }
      }
      products.push(product);
    }

    res.json(products);
  })
);

module.exports = router;
