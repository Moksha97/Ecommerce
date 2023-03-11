var express = require('express');
var router = express.Router();

// Verify JWT Token
router.use(function (req, res, next) {
    if(!req.userName) return res.status(401).send({ auth: false, message: 'No token provided or Invalid token.' });
    next();
});

module.exports = router;