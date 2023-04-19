var express = require("express");
var router = express.Router();
var db = require("../database/conn");
var ash = require ("express-async-handler");


// common get cart function to reuse
async function getCart(username) {
    const [rows] = await db.query(
        "select c.pid, p.pname, c.sid, c.username, c.quantity, c.quantity * i.price * (1-i.discount) as totalprice from cart c, product p, inventory i where c.pid = p.pid and c.pid = i.pid and c.sid = i.sid and c.username = ?",
        [username]);
    return rows;
}

// add a new item to the cart
router.post("/addtocart",
    ash(async (req, res) => {
        const username = req.username;
        const { pid, sid, quantity } = req.body;
        // check if the product qunatity is available
        const [inventory_rows] = await db.query(
            "SELECT quantity FROM inventory WHERE pid = ? AND sid = ?",
            [pid, sid]);
        if (inventory_rows.length === 0) {
            res.status(404).json({ error: "Product not found" });
            return;
        }
        if (inventory_rows[0].quantity < quantity) {
            res.status(400).json({ error: "Insufficient quantity in the inventory" });
            return;
        }
        try{
            const [rows] = await db.query(
                "INSERT INTO cart (username, pid, sid, quantity) VALUES (?, ?, ?, ?)",
                [username, pid, sid, quantity]);

             if (rows.affectedRows === 0) {
                res.status(500).json({ error: "Unable to insert item into cart" });
                return;
             }
        }
        catch(err) {
            if(err.code === "ER_DUP_ENTRY"){
                res.status(400).json({ error: "Item already present in the cart" });
                return;
            }
            res.status(500).json({ error: "Unable to insert item into cart" });
            return;
        }
        res.json({ message: "Item added to cart succesfully" });
    })
);

// get all items in the cart for a user
router.get("/getcart", 
    ash(async (req, res) => {
        const username = req.username;
        // select productname, price and discount as well
        const rows = await getCart(username);
        if(rows.length === 0) {
            res.json([]);
        }
        res.json(rows);
    })
);

// Modify the quantity of an item in the cart
router.post("/modifycart",
    ash(async (req, res) => {
        const username = req.username;
        const { pid, sid, quantity } = req.body;
        // check if the product quantity is available in the inventory
        const [inventory_rows] = await db.query(
            "SELECT quantity FROM inventory WHERE pid = ? AND sid = ?",
            [pid, sid]);
        if (inventory_rows.length === 0) {
            res.status(404).json({ error: "Product not found" });
            return;
        }
        if (inventory_rows[0].quantity < quantity) {
            res.status(400).json({ error: "Insufficient quantity in the inventory" });
            return;
        }
        // get the current quantity of the item in the cart
        const [cart_rows] = await db.query(
            "SELECT quantity FROM cart WHERE username = ? AND pid = ? AND sid = ?",
            [username, pid, sid]);
        if (cart_rows.length === 0) {
            res.status(404).json({ error: "Item not found in the cart" });
            return;
        }
        // update the quantity of the item in the cart
        // if the quantity is 0, delete the item from the cart
        if (quantity === 0) {
            const [rows] = await db.query(
                "DELETE FROM cart WHERE username = ? AND pid = ? AND sid = ?",
                [username, pid, sid]);
            if (rows.affectedRows === 0) {
                res.status(500).json({ error: "Unable to delete item from cart" });
                return;
            }
            else{
                res.json({ message: "Item deleted from cart" });
                return;
            }
        } else {
            const [rows] = await db.query(
                "UPDATE cart SET quantity = ? WHERE username = ? AND pid = ? AND sid = ?",
                [quantity, username, pid, sid]);
            if (rows.affectedRows === 0) {
                res.status(500).json({ error: "Unable to update item in cart" });
                return;
            }
        }
        // get the updated cart
        const updated_cart_row = await getCart(username);
        res.json(updated_cart_row);
    })
);



module.exports = router;