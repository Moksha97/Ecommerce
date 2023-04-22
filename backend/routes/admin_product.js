var express = require("express");
var router = express.Router();
var db = require("../database/conn");
var ash = require("express-async-handler");

// add
router.post(
    "/add",
    ash(async (req, res) => {
        let {pname, pdesc, pcategory} = req.body;
        // check if category is valid
        valid_categories = ["ELECTRONICS", "FASHION", "HOME", "HEALTH", "TOYS"];
        // pcategory to 
        if (!valid_categories.includes(pcategory)) {
            res.status(400).json({ error: "category is not valid" });
            return;
        }
        // insert product
        const [product_rows] = await db.query(
            "Insert into product (pname, pdesc, pcategory) values (?, ?, ?)",
            [pname, pdesc, pcategory]);
        if (product_rows.affectedRows === 0) {
            res.status(500).json({ error: "product could not be added" });
            return;
        }   
        const pid = product_rows.insertId;
        res.json({ pid: pid , "message": "product added successfully"});
    })
);

// update
router.post(
    "/update",
    ash(async (req, res) => {
        let {pid, pname, pdesc, pcategory} = req.body;
        //  check if pcategory is valid
        valid_categories = ["ELECTRONICS", "FASHION", "HOME", "HEALTH", "TOYS"];
        if (!valid_categories.includes(pcategory)) {
            res.status(400).json({ error: "category is not valid" });
            return;
        }
        // check if that product exists
        const [product_rows] = await db.query(
            "Select * from product where pid = ?",
            [pid]);
        if (product_rows.length === 0) {
            res.status(400).json({ error: "product does not exist" });
            return;
        }
        // update product
        await db.query(
            "Update product set pname = ?, pdesc = ?, pcategory = ? where pid = ?", 
            [pname, pdesc, pcategory, pid]);
        res.json({ "message": "product updated successfully"});
    })
);

// list all products
router.get(
    "/list",
    ash(async (req, res) => {
        const [product_rows] = await db.query(
            "Select * from product");
        res.json(product_rows);
    }
));

// delete
// router.post(
//     "/delete",
//     ash(async (req, res) => {
//         let {pid} = req.body;
//         // check if that product exists
//         const [product_rows] = await db.query(
//             "Select * from product where pid = ?",
//             [pid]);
//         if (product_rows.length === 0) {
//             res.status(400).json({ error: "product does not exist" });
//             return;
//         }
//         // delete product
//         await db.query(
//             "Delete from product where pid = ?", 
//             [pid]);
//         res.json({ "message": "product deleted successfully"});
//     }
// ));

module.exports = router;
