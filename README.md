# Samsa Restaurant - Web Application

## Project Overview

Samsa Restaurant is a web-based application that allows users to manage reservations, place items in a shopping cart, and reset their password if they forget it. The application uses Express.js, EJS for templating, and MySQL for storing user and reservation data.

## Features

- **User Authentication**: 
  - Login and Registration
  - Forgot Password functionality with simulated email reset
- **Reservation Management**:
  - Users can create and view their reservations
- **Shopping Cart**: 
  - Users can add items to their cart, view cart details, and manage orders
- **Admin Dashboard**:
  - Admins can manage users, reservations, and other critical data

## Technologies Used

- **Frontend**: 
  - HTML, CSS, JavaScript (EJS templating)
- **Backend**:
  - Node.js
  - Express.js
  - MySQL
- **Session Management**: 
  - Express-session for managing user sessions

## Installation

Follow the steps below to set up and run the project locally:

### Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/en/) (v14 or higher)
- [MySQL](https://www.mysql.com/) (or any other SQL-based database)

### Steps to Install

1. Clone this repository:

   ```bash
   git clone https://github.com/your-username/samsa-restaurant.git


Navigate to the project directory:

bash

cd samsa-restaurant
Install dependencies:

bash

npm install
Set up your MySQL database:

Create a MySQL database named samsa_restaurant.
Set up the necessary tables (users, reservations, cart_items, etc.) as defined in your database schema.
Update the data/db.js file with your MySQL database credentials.
Start the server:

bash

npm start
Open your browser and visit http://localhost:3000 to see the app in action.

Routes
/forgot-password (GET)
Displays the "Forgot Password" form, allowing users to input their email address for a password reset.

/forgot-password (POST)
Handles the password reset process, simulating sending a reset link to the provided email address.

/login (GET)
Displays the login form where users can authenticate using their email/username and password.

/reset-password (GET)
Allows users to enter a new password after following the reset link sent to their email.

/reservation (GET/POST)
Handles reservation creation, allowing users to book a table at the restaurant.

/cart (GET)
Displays the shopping cart items and allows users to manage their orders.

Project Structure
plaintext


 data
db.js                  # Database connection and queries
public
styles.css             # Custom styles for the app
routes
auth.js                # Authentication routes (login, registration, forgot password)
password.js            # Forgot password logic
 reservation.js         # Routes for handling reservations
cart.js                # Cart-related routes
 admin.js               # Admin routes for managing the system
 user.js                # User routes for viewing user-specific data
views
auth
forgot-password.ejs   # Forgot password page
 partials
 head.ejs              # Head section for all pages
 nav.ejs               # Navigation bar
footer.ejs            # Footer section for all pages
 login.ejs                 # Login page
 reset-password.ejs        # Reset password page
 index.js                    # Main entry point for the server
 package.json                 # Project dependencies and scripts
 README.md                    # Project overview and instructions
Development
Running the App
To run the app locally for development:

Ensure you have Node.js and MySQL installed.

Clone the repository and install dependencies as described above.

Start the server:

bash

npm start
Open the application in your browser at http://localhost:3000.

Testing
To test the app's functionality, use the following URLs in your browser:

Login: http://localhost:3000/login
Forgot Password: http://localhost:3000/forgot-password
Reservations: http://localhost:3000/reservation
Cart: http://localhost:3000/cart
Unit Testing
If you need to implement unit tests for your routes or logic, you can use tools like Mocha, Chai, or Jest for testing Node.js applications.

Contributing
We welcome contributions to this project! If you would like to help improve the application, please follow these steps:

Fork the repository
Create a new branch (git checkout -b feature-name)
Make your changes
Commit your changes (git commit -am 'Add new feature')
Push to the branch (git push origin feature-name)
Create a pull request
License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgments
Express.js for the web framework
EJS for the templating engine
MySQL for the database solution
Bootstrap for styling
