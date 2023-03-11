var express = require('express');
var router = express.Router();


// Verify whether the user is an admin or not
router.use(function (req, res, next) {
    if (!req.isAdmin) return res.status(401).send({ auth: false, message: 'You are not an admin.' });
});

module.exports = router;