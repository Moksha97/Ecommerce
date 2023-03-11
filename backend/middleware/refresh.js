var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');


// Refresh JWT Token if it exists in the token cookie
function refresh(req) {
    if(req.UserId) {
        var secret = process.env.JWT_SECRET;
        var expirty = process.env.JWT_EXPIRY;
        var token = jwt.sign({ userName: req.userName, isAdmin: req.isAdmin}, secret, {expiresIn: expirty});
        res.cookie('token', token, { httpOnly: true });
    }
}

router.use(function (req, res, next) {
    refresh(req);
    next();
});

module.exports = router;
