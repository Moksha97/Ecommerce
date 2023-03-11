var express = require("express");
var router = express.Router();
var pool = require("../database/conn");
var ash = require("express-async-handler");

// query db
router.get(
  "/",
  ash(async function (req, res, next) {
    const [result] = await pool.query("select ?+? as sum", [2, 3]);
    res.json(result);
  })
);

module.exports = router;
