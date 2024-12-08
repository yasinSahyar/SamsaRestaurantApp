//routes/reservation.js

const express = require("express");
const db = require("../data/db");
const router = express.Router();

// Handle GET request to display the reservation form
router.get("/", async (req, res) => {
    let reservations = [];

    if (req.session.user) {
        try {
            const userId = req.session.user.id;

            // Fetch the last 5 reservations for the logged-in user
            const [dbReservations] = await db.execute(
                `SELECT 
                    fullname, 
                    email, 
                    num_adults, 
                    IFNULL(num_children, 0) AS num_children, 
                    DATE_FORMAT(reservation_time, '%Y-%m-%d %H:%i') AS reservation_time 
                 FROM reservations 
                 WHERE user_id = ? 
                 ORDER BY reservation_time DESC 
                 LIMIT 5`,
                [userId]
            );

            reservations = dbReservations.map((reservation) => ({
                fullname: reservation.fullname,
                email: reservation.email,
                num_adults: reservation.num_adults,
                num_children: reservation.num_children,
                reservation_time: reservation.reservation_time,
            }));
        } catch (err) {
            console.error("Error fetching reservations:", err);
        }
    }

    res.render("reservation/reservation", {
        user: req.session.user || null,
        title: "Reservation",
        reservations, // Pass the reservations to the template
    });
});


// Handle reservation submission
router.post("/", async (req, res) => {
    const { fullname, email, num_adults, num_children, date, time, comment } = req.body;

    try {
        const userId = req.session.user ? req.session.user.id : null;
        const reservationTime = `${date} ${time}`;

        const adultsCount = parseInt(num_adults, 10);
        const childrenCount = num_children ? parseInt(num_children, 10) : null;

        if (isNaN(adultsCount)) {
            return res.status(400).send("Number of adults is required and must be a valid number.");
        }

        // Insert reservation into database
        await db.execute(
            `INSERT INTO reservations (user_id, fullname, email, num_adults, num_children, reservation_time, comment)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [userId, fullname, email, adultsCount, childrenCount, reservationTime, comment || null]
        );

        // Create confirmation message
        req.session.reservationSuccess = `Dear ${fullname}, your reservation is confirmed for ${date} at ${time}. A summary of your reservation has been sent to ${email}.`;

        // Redirect to success page
        res.redirect("/reservation/success");
    } catch (error) {
        console.error("Error during reservation:", error);
        res.status(500).send("An error occurred. Please try again.");
    }
});

// Render reservation success page
router.get("/success", (req, res) => {
    const message = req.session.reservationSuccess || "Reservation completed.";
    req.session.reservationSuccess = null;
    res.render("reservation/success", { message, user: req.session.user || null });
});

module.exports = router;