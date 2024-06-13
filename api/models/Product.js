const moongose = require("mongoose");

const productSchema = new moongose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      unique: true,
    },
    desc: { type: String, required: [true, "Description is required"] },
    img: { type: String, required: [true, "Image is required"] },
    categories: { type: Array },
    size: { type: Array },
    color: { type: Array },
    price: { type: Number, required: [true, "Price is required"] },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = moongose.model("Product", productSchema);
