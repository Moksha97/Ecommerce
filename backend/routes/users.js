var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res) {
  return res.json({ message: "List of users" });
});

module.exports = router;
