const User = require("../models/User");
const router = require("express").Router();
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// Register
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  // Validate username
  if (await User.findOne({ username })) {
    return res.status(400).json({ error: "Username already exists" });
  }

  // Validate email
  if (await User.findOne({ email })) {
    return res.status(400).json({ error: "Email already exists" });
  }

  // Encrypt password
  const encryptPassword = CryptoJS.AES.encrypt(
    password,
    process.env.PASS_SEC
  ).toString();
  const newUser = new User({
    username,
    email,
    password: encryptPassword,
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json("wrong user");

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const orginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (orginalPassword !== password)
      return res.status(401).json("wrong password");

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      {
        expiresIn: "3d",
      }
    );

    const { password: _, ...others } = user._doc;

    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
