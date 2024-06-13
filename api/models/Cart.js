const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        // _id: 0,
        products: [
            {
                productId: { type: String },
                // productId: { type: mongoose.Schema.ObjectId, ref: "Product" },
                quantity: { type: Number, default: 1 },
                // _id: 0,
            }
        ],
    }, { timestamps: true }
);


module.exports = mongoose.model("Cart", cartSchema);