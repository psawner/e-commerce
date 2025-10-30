# E-Commerce Mini App
A simple full-stack e-commerce web application built using React (frontend) and Node.js + Express + SQLite (backend).
Users can view products, add them to the cart, remove items, and perform a checkout that records user info and clears the cart.

## Features

View all products
Add product to cart
Remove items from cart
Checkout (with user name & email)
Automatically clears cart after checkout
Persistent total calculation using SQLite


ecommerce-app/
│
├── backend/
│   ├── server.js             # Express server setup
│   ├── routes/
│   │   └── items.js          # API routes for products, cart, and checkout
│   ├── database/
│   │   ├── db.js             # SQLite database connection
│   │   └── items.js          # SQL functions for CRUD operations
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── App.js            # Main React component
│   │   ├── components/       # UI components
│   │   └── App.css           # Styling
│   ├── public/
│   └── package.json
│
└── README.md


## Backend Setup (Node.js + Express + SQLite)
Navigate to backend folder:
cd backend
Install dependencies:
npm install express sqlite sqlite3 cors
Start the server:
node server.js
Server runs on:
http://localhost:3001

## Frontend Setup (React)
Navigate to frontend folder:
cd frontend
Install dependencies:
npm install
Start the React app:
npm start
Frontend runs on:
http://localhost:5173

## API Routes Summary
Products
GET /api/products
Returns all available products.

GET /api/cart
Returns list of cart items + total price.

POST /api/cart
Adds item to cart.

DELETE /api/cart/:product_id
Removes specific item from the cart.

Checkout
POST /api/checkout
Finalizes the purchase, records user info, and clears cart.

## screeshots

### Home Page
![Home Page](./images/home.png)

### Cart
![Cart](././images/cart.png)

### added to cart
![Added to Cart](././images/addcart.png)

### Checkout
![Checkout](./images/checkout.png)