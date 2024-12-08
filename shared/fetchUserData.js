// middleware/fetchUserData.js
const db = require("../data/db");

async function fetchUserData(req, res, next) {
    if (req.session.user) {
        try {
            // Fetch user details from database
            const [userDetails] = await db.execute(
                "SELECT id, username FROM users WHERE id = ?",
                [req.session.user.id]
            );
            req.user = userDetails[0];
        } catch (err) {
            console.error("Error fetching user data:", err);
        }
    }
    next();
}


module.exports = fetchUserData;