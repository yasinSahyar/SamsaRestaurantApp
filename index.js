//index.js


const express = require('express');
const session = require('express-session');
const path = require('path');
const crypto = require('crypto');
const app = express();
const reservationRouter = require('./routes/reservation');  // Adjust the path as needed


const cartRoutes = require("./routes/cart");
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");


const secret = crypto.randomBytes(64).toString('hex');
console.log('Generated Secret Key:', secret); 

// Middleware to parse form data and JSON data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up view engine (EJS)
app.set('views', path.join(__dirname, 'views')); // Set the 'views' folder for EJS templates
app.set('view engine', 'ejs'); // Specify EJS as the view engine

app.use(express.static(path.join(__dirname, 'public')));


// Session middleware setup
app.use(
    session({
        secret: secret, // Use the dynamically generated secret key here
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }, // Set to true if using HTTPS
    })
);
// Middleware to make user data available in views
app.use((req, res, next) => {
    res.locals.user = req.session.user || null; // Attach user session data to res.locals
    next();
});

// Register routes
app.use(authRoutes);
app.use(userRoutes);
app.use("/cart", cartRoutes);
app.use("/admin", adminRoutes);
app.use('/reservation', reservationRouter);  // This registers the reservation route



// Serve static files
app.use("/libs", express.static("node_modules"));
app.use("/static", express.static("public"));

// Home Route (Optional)
app.get('/', (req, res) => {
    res.redirect('/cart');
});

// Handle 404 errors
app.use((req, res) => {
    res.status(404).send("Page not found");
});

app.listen(3000, function() {
    console.log("listening on port 3000");
});