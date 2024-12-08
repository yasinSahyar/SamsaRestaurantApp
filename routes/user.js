//user.js
const express = require("express");
const router = express.Router();

const db = require("../data/db");

const { addToCart, getCart } = require("../shared/cart");// Use shared cart


// Fetch products by menu ID
router.use("/products/menu/:menuid", async function(req, res) {
    const id = req.params.menuid;
    const successMessage = req.session.successMessage || null; // Handle success message
    req.session.successMessage = null; // Clear the message after using it

    try {
        const [products] = await db.execute("SELECT * FROM product WHERE menuid = ?", [id]);
        const [menus] = await db.execute("SELECT * FROM menu");

        res.render("users/products", {
            title: "Menu",
            products: products,
            menus: menus,
            selectedMenu: id,
            successMessage, // Pass successMessage to the template
        });
    } catch (err) {
        console.error("Error fetching menu products:", err);
        res.status(500).send("Internal server error");
    }
});


// Fetch product details by product ID
router.use("/products/:productid", async function (req, res) {
    const id = req.params.productid;
    try {
        const [products, ] = await db.execute("select * from product where productid=?", [id]);

        const product = products[0];

        if(product){
            return res.render("users/product-details" , {
                title: product.productname,
                product: product
            });
        }
        res.redirect("/"); //aradigi urun yoksa der anasayfaya don

    }
    catch (err){
        console.log(err);
        res.status(500).send("Internal server error");
    }
});


// Fetch all products
router.use("/products", async function (req, res) {
    const successMessage = req.session.successMessage || null; // Retrieve message
    req.session.successMessage = null; // Clear message after use

    try {
        const [products, ] = await db.execute("SELECT * FROM product WHERE approval=1");
        const [menus, ] = await db.execute("SELECT * FROM menu");
       
        res.render("users/products", {
            title: "All Menus",
            products: products,
            menus: menus,
            selectedMenu: null,
            successMessage, // Pass message to template
        });
    } 
    catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
    }
});



// Home route - renders the home page
router.get("/", async (req, res) => {
    try {
        const [products] = await db.execute("SELECT * FROM product WHERE approval=1 AND homepage=1");
        const [menus] = await db.execute("SELECT * FROM menu");

        res.render("users/index", {
            title: "Popular Menus",
            products,
            menus,
            selectedMenu: null,
        });
    } catch (err) {
        console.error(err);
    }
});


// Add item to cart
router.post("/cart/add", async (req, res) => {
    const { productId } = req.body;

    if (!productId) return res.status(400).send("Product ID is required");

    try {
        const [products] = await db.execute("SELECT * FROM product WHERE productid = ?", [productId]);
        const product = products[0];

        if (!product) return res.status(404).send("Product not found");

        // For logged-in users
        if (req.session.user) {
            const userId = req.session.user.id;

            // Add to cart_items table
            await db.execute(
                `INSERT INTO cart_items (user_id, product_id, product_name, quantity, total_price)
                 VALUES (?, ?, ?, ?, ?)
                 ON DUPLICATE KEY UPDATE 
                    quantity = quantity + VALUES(quantity),
                    total_price = total_price + VALUES(total_price)`,
                [
                    userId,
                    productId,
                    product.productname,
                    1, // Increment by 1
                    parseFloat(product.price),
                ]
            );

        } else {
            // For guest users (session-based cart)
            if (!req.session.cart) {
                req.session.cart = [];
            }

            const existingItem = req.session.cart.find((item) => item.id === productId);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                req.session.cart.push({
                    id: productId,
                    name: product.productname,
                    price: parseFloat(product.price), // Ensure price is a number
                    quantity: 1,
                });
            }
        }

        res.redirect("/cart");
    } catch (err) {
        console.error("Error adding product to cart:", err);
        res.status(500).send("Internal server error");
    }
});


module.exports = router