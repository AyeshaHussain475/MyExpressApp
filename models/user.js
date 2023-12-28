const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true, //remove the whiteSpace A Y = AY
      required: true,
      min: 3,
      max: 20,
    },
    lastName: {
      type: String,
      trim: true, //remove the whiteSpace A Y = AY
      required: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.virtual("virtualPassword").set(function (password) {
  this.password = bcrypt.hashSync(password, 10);
});

// Load hash from your password DB
userSchema.methods = {
  authenticate: function (password) {
    return bcrypt.compareSync(password, this.password);
  },
};

module.exports = mongoose.model("User", userSchema);
