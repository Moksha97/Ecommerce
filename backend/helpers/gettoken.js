var jwt = require("jsonwebtoken");

module.exports = function (username, isadmin) {
  var secret = process.env.JWT_SECRET;
  var expiry = process.env.JWT_EXPIRY;
  var token = jwt.sign({ username: username, isadmin: isadmin }, secret, {
    expiresIn: expiry,
  });
  return token;
};
