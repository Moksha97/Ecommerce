var createError = require("http-errors");
var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var auth = require("./middleware/auth");
var admin = require("./middleware/admin");
var refresh = require("./middleware/refresh");
var verify = require("./middleware/verify");
var login = require("./middleware/login");
var logout = require("./middleware/logout");
var signup = require("./middleware/signup");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

var corsOptions = {
  origin: "*",
};

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors(corsOptions));

app.use("/signup", signup);
app.use("/login", login);
app.use("/logout", logout);
app.get("/health", function (req, res) {
  res.send("OK");
});

app.use(verify);
app.use(refresh);

// Un Authenticated Routes
// Product Routes
//app.use('/products', productsRouter);

// Authentication Middleware
app.use(auth);

app.use("/", indexRouter);

// Authenticated Routes
// User Routes
app.use("/users", usersRouter);

// Admin Routes
app.use(admin);
// app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500).send(err);
});

module.exports = app;
