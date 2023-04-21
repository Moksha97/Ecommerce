var express = require("express");
var router = express.Router();
var db = require("../database/conn");
var ash = require("express-async-handler");
var { getCart } = require("./cart");


// place order
router.post("/placeorder", 
    ash(async (req, res) => {
        const username = req.username;
        let { aid, accountid } = req.body;
        // check if address is valid
        if( aid === null || aid === undefined || aid === "" ) {
            res.status(400).json({ error: "Address is not valid" });
            return;
        }
        // check if account is valid
        if( accountid === null || accountid === undefined || accountid === "" ) {
            res.status(400).json({ error: "Account is not valid" });
            return;
        }
        aid = Number(aid);
        accountid = Number(accountid);

        // check if address is valid with user
        const [address_rows] = await db.query(
            "select * from address where username = ? and aid = ?", [username, aid]);
        if (address_rows.length === 0) {
            res.status(400).json({ error: "Address is not valid" });
            return;
        }

        // check if account is valid with user
        const [account_rows] = await db.query(
            "select * from userbank where username = ? and accountid = ?", [username, accountid]);
        if (account_rows.length === 0) {
            res.status(400).json({ error: "Account is not valid" });
            return;
        }

        // get cart items
        const cart_rows = await getCart(username);
        if (cart_rows.length === 0) {
            res.status(400).json({ error: "Cart is empty" });
            return;
        }

        // check if the product qunatity is available
        const [check_cart] = await db.query(
            "select c.pid  from cart c, inventory i where c.pid = i.pid and c.sid = i.sid and c.username = ? and c.quantity > i.quantity",
            [username]);
        if (check_cart.length > 0) {
            res.status(400).json({ error: "Insufficient quantity in the inventory" });
            return;
        }
        // insert payment
        const [payment_rows] = await db.query(
            "Insert into payment (paymentstatus, accountid) values (?, ?)",
            ["SUCCESS", accountid]);
        const payid = payment_rows.insertId;


        // place order
        const [order_rows] = await db.query(
            "Insert into `order` (status, timestamp, aid, username, payid) values (?, ?, ?,?,?)",
            ["PLACED", new Date(), aid, username, payid]);
        console.log(order_rows)
        const orderid = order_rows.insertId;

        // insert order into items
        for (let i = 0; i < cart_rows.length; i++) {
            const [orderitem_rows] = await db.query(
                "Insert into items ( pid, oid, sid, price, quantity) values (?, ?, ?, ?,?)",
                [cart_rows[i].pid, orderid, cart_rows[i].sid, cart_rows[i].totalprice, cart_rows[i].quantity]);
        }

        // delete cart
        const [delete_cart] = await db.query(
            "delete from cart where username = ?",
            [username]);
                
        // update inventory
        for (let i = 0; i < cart_rows.length; i++) {
            const [update_inventory] = await db.query(
                "update inventory set quantity = quantity - ? where pid = ? and sid = ?",
                [cart_rows[i].quantity, cart_rows[i].pid, cart_rows[i].sid]);
        }

        res.json({ message: "Order placed successfully" });
    })
);

// get orders
router.get("/getorders",
    ash(async (req, res) => {
        const username = req.username;
        const [order_rows] = await db.query(
            "select * from `order` natural join address natural join payment natural join bankaccount where username = ? order by timestamp desc",
            [username]);
        res.json(order_rows);

    })
);

// get order details by order id
router.get("/getorderdetails/:orderid",
    ash(async (req, res) => {
        const username = req.username;
        const orderid = req.params.orderid;
        const [order_rows] = await db.query(
            "select * from `order` natural join address natural join payment natural join bankaccount where username = ? and oid = ?",
            [username, orderid]);
        if (order_rows.length === 0) {
            res.status(400).json({ error: "Order is not valid" });
            return;
        }
        const [orderitem_rows] = await db.query(
            "select * from items natural join product where oid = ?", 
            [orderid]);
        res.json({ order: order_rows[0], orderitems: orderitem_rows });
    })
);







module.exports = router;
