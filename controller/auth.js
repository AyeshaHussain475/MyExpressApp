const User = require("../models/user");

exports.signup = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email }).exec();

    if (existingUser) {
      return res.status(400).json({
        message: "User already registered",
      });
    }

    const { firstName, lastName, email, password } = req.body;

    const newUser = new User({
      firstName,
      lastName,
      email,
      virtualPassword: password,
    });
    const savedUser = await newUser.save();

    if (savedUser) {
      return res.status(201).json({
        message: "User created successfully",
      });
    } else {
      return res.status(400).json({
        message: "Something went wrong while creating the user",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};
