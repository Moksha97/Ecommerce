var express = require("express");
var router = express.Router();
var db = require("../database/conn");
var ash = require("express-async-handler");

const isFloat = function (value) {
  return typeof value === "number" && isFinite(value);
};
async function getProductByPid(pid) {
  return await getProductsByPids([pid]);
}
async function getProductsByPids(pids) {
  // var product_query = "SELECT pid, pname FROM product WHERE pid IN (?)";
  // const [pnames] = await db.query(product_query, [pids]);

  // var ratings_query =
  //   "SELECT pid, CAST(AVG(rating) AS DECIMAL(2, 1)) as rating FROM productrating WHERE pid IN (?) GROUP BY pid";
  // const [pratings] = await db.query(ratings_query, [pids]);

  // var inventory_query =
  //   "SELECT pid, sid, price, discount, quantity FROM inventory WHERE pid IN (?)";
  // const [pinventory] = await db.query(inventory_query, [pids]);

  var product_query =
    "SELECT product.pid, pname, pcategory, pdesc, seller.sid, sname, price, discount, quantity, rating ";
  product_query +=
    "FROM (product LEFT JOIN (SELECT pid, CAST(AVG(rating) AS DECIMAL(2, 1)) as rating FROM productrating GROUP BY pid) as r ON product.pid = r.pid) LEFT JOIN (inventory NATURAL JOIN seller) ON product.pid = inventory.pid ";
  product_query += " WHERE product.pid IN (?)";

  const [all_products] = await db.query(product_query, [pids]);

  var products = [];

  for (let i = 0; i < pids.length; i++) {
    var product = {};
    product.pid = pids[i];
    product.pname = null;
    product.pcategory = null;
    product.rating = null;
    product.pdesc = null;
    product.options = [];

    // for (let j = 0; j < pnames.length; j++) {
    //   if (pnames[j].pid === pids[i]) {
    //     product.pname = pnames[j].pname;
    //     break;
    //   }
    // }

    // for (let j = 0; j < pratings.length; j++) {
    //   if (pratings[j].pid === pids[i]) {
    //     product.rating = pratings[j].rating;
    //     break;
    //   }
    // }

    // for (let j = 0; j < pinventory.length; j++) {
    //   if (pinventory[j].pid === pids[i]) {
    //     var option = {};
    //     option.sid = pinventory[j].sid;
    //     option.price = pinventory[j].price;
    //     option.discount = pinventory[j].discount;
    //     option.quantity = pinventory[j].quantity;
    //     product.options.push(option);
    //   }
    // }

    for (let j = 0; j < all_products.length; j++) {
      if (all_products[j].pid === pids[i]) {
        product.pname = all_products[j].pname;
        product.pcategory = all_products[j].pcategory;
        product.rating = all_products[j].rating;
        product.pdesc = all_products[j].pdesc;

        if (all_products[j].sid === null) {
          continue;
        }
        var option = {};
        option.sid = all_products[j].sid;
        option.sname = all_products[j].sname;
        option.price = all_products[j].price;
        option.discount = all_products[j].discount;
        option.quantity = all_products[j].quantity;
        product.options.push(option);
      }
    }
    if (product.pname === null) {
      continue;
    }
    products.push(product);
  }
  return products;
}

const validCategories = [
  { code: "ELECTRONICS", name: "Electronics" },
  { code: "HEALTH", name: "Health & Beauty" },
  { code: "FASHION", name: "Fashion" },
  { code: "TOYS", name: "Toys & Hobbies" },
  { code: "HOME", name: "Home & Garden" },
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
    var limit = req.body.limit; // can be null (default get all)
    var offset = req.body.offset; // can be null (default 0)
    var order_by = req.body.order_by; // can be null (default price)
    var order = req.body.order; // can be null (default ASC)
    var price = req.body.price; // can be null (default 0 to null)
    var discount = req.body.discount; // can be null (default 0.0 to 1.0)
    var include_out_of_stock = req.body.include_out_of_stock; // can be null (default true)

    var response = {};
    response.total = 0;

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

      if (categories.length === 0) {
        res.status(400).json({ error: "Categories must not be empty" });
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
      limit = null;
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
    } else if (!isFloat(price.min) || !isFloat(price.max)) {
      res.status(400).json({ error: "Price must be an integer" });
    } else if (price.min < 0 || price.max < 0) {
      res.status(400).json({ error: "Price must be greater than 0" });
    }

    // discount check
    if (!discount) {
      discount = {};
      discount.min = 0.0;
      discount.max = 1.0;
    } else if (!isFloat(discount.min) || !isFloat(discount.max)) {
      res.status(400).json({ error: "Discount must be an integer" });
    } else if (discount.min < 0.0 || discount.max < 0.0) {
      res.status(400).json({ error: "Discount must be greater than 0" });
    } else if (discount.min > 1.0 || discount.max > 1.0) {
      res.status(400).json({ error: "Discount must be less than 1" });
    }

    // include_out_of_stock check
    if (!include_out_of_stock) {
      include_out_of_stock = true;
    } else if (typeof include_out_of_stock !== "boolean") {
      res.status(400).json({ error: "Include out of stock must be a boolean" });
      return;
    }

    // query builder
    var filter_query =
      "SELECT best.pid FROM (SELECT pid, min(price) as bestprice, min(discount) as bestdiscount FROM inventory WHERE ";
    if (!include_out_of_stock) {
      filter_query += "quantity > 0 AND ";
    }
    filter_query += "price >= ? AND ";
    if (price.max) {
      filter_query += "price <= ? AND ";
    }
    filter_query += "discount BETWEEN ? AND ? AND ";
    filter_query +=
      "pid IN (SELECT pid FROM product WHERE pcategory IN (?) AND (pname LIKE ? OR pdesc LIKE ?)) ";
    filter_query += "GROUP BY pid ";
    filter_query += "ORDER BY " + order_by + " " + order + " ) as best";
    // filter_query += "LIMIT " + limit + " OFFSET " + offset;
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
    response.total = result.length;

    // get pids with offset and limit
    let pids = [];
    if (limit) {
      pids = result.slice(offset, offset + limit).map((r) => r.pid);
    } else {
      pids = result.slice(offset).map((r) => r.pid);
    }

    if (pids.length === 0) {
      res.json(response);
      return;
    }

    // get products
    response.products = await getProductsByPids(pids);

    res.json(response);
  })
);

router.get(
  "/:pid",
  ash(async (req, res) => {
    const pid = req.params.pid;
    if (!pid) {
      res.status(400).json({ error: "Pid must be provided" });
      return;
    }
    // regex check
    if (!pid.match(/^[0-9]+$/)) {
      res.status(400).json({ error: "Invalid pid: " + pid });
      return;
    }
    const product = await getProductByPid(parseInt(pid));
    if (!product || product.length === 0) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    res.json(product[0]);
  })
);

module.exports = router;
