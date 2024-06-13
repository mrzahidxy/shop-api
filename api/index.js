const express = require('express');
const connectDB = require('./config/db')
const dotenv = require('dotenv')
const authRouter = require('./Routes/auth');
const userRouter = require('./Routes/user');
const productRouter = require('./Routes/product')
const stripeRouter = require('./Routes/stripe')
const cors = require('cors')

dotenv.config();

// Initialize Express app
const app = express();


// Database connected
connectDB()

// Middleware
app.use(express.json())
app.use(cors())


// Routing
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/checkout', stripeRouter)

app.listen(process.env.PORT || 8080, () => {
    console.log('Backend is running');
})

module.exports = app