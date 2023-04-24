var express = require("express");
var router = express.Router();
var db = require("../database/conn");
var ash = require("express-async-handler");

router.post(
  "/rate",
  ash(async (req, res) => {
    const username = req.username;
    let { pid, rating } = req.body;
    // check if rating is valid
    if (rating === null || rating === undefined || rating === "") {
      res.status(400).json({ error: "Rating is not valid" });
      return;
    }
    // check if product is valid
    if (pid === null || pid === undefined || pid === "") {
      res.status(400).json({ error: "Product is not valid" });
      return;
    }
    rating = Number(rating);
    pid = Number(pid);

    if (rating < 1 || rating > 5) {
      res.status(400).json({ error: "Rating is not valid" });
      return;
    }

    // check if product rating exists
    const productRating = await db.query(
      "Select * from productrating where username = ? and pid = ?",
      [username, pid]
    );

    if (productRating.length > 0) {
      await db.query(
        "Update productrating set rating = ? where username = ? and pid = ?",
        [rating, username, pid]
      );
    } else {
      // rate product
      await db.query(
        "Insert into productrating (username, pid, rating) values (?, ?, ?)",
        [username, pid, rating]
      );
    }

    res.json({ message: "Product rated successfully" });
  })
);

module.exports = router;
