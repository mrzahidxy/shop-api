const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("DB is connected");
    } catch (error) {
        console.error("DB connection failed:", error.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
