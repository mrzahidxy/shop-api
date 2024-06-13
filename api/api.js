// api.js
const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');

// Importing route handlers
const authRouter = require('./Routes/auth');
const userRouter = require('./Routes/user');
const productRouter = require('./Routes/product');
const cartRouter = require('./Routes/cart');
const orderRouter = require('./Routes/order');
const stripeRouter = require('./Routes/stripe');

dotenv.config();

// Initialize Express app
const app = express();

// Database connection
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routing
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/api/orders', orderRouter);
app.use('/api/checkout', stripeRouter);

module.exports = app;
