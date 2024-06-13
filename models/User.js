const moongose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new moongose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: { type: String, required: [true, "Password is required"] },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.plugin(uniqueValidator, {
  message: "Error, expected {PATH} to be unique.",
});

module.exports = moongose.model("User", userSchema);

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


