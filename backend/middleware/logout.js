var express = require('express');
var router = express.Router();

// logout middleware
router.get("/", function (req, res, next) {
    res.set("Authorization", "");
});

module.exports = router;