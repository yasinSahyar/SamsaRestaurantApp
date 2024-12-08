// routes/password.js

const express = require('express');
const db = require('../data/db'); // Adjust this path if necessary
const router = express.Router();

// Render forgot password form
router.get('/forgot-password', (req, res) => {
    res.render('auth/forgot-password', { title: 'Forgot Password' });
});

// Handle forgot password submission
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        // Check if the user exists
        const [users] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);

        // Simulate sending the reset link regardless of whether the email exists
        req.session.resetPasswordMessage = `A reset link has been sent to your email address (${email}).`;

        // Redirect back to the login page with a success message
        res.redirect('/login');
    } catch (err) {
        console.error("Error during forgot password:", err);
        res.status(500).send("An error occurred. Please try again.");
    }
});

// Serve forgot password page
router.get('/forgot-password', (req, res) => {
    res.render('auth/forgot-password', {
        title: 'Forgot Password',
        errorMessage: req.session.errorMessage || null,
    });

    // Clear session messages after rendering
    req.session.errorMessage = null;
});


module.exports = router;