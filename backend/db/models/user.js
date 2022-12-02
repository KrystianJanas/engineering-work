const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (login) => login.length > 4,
      message: "Login must be longer than 4 characters",
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: (login) => login.length > 4,
      message: "Login must be longer than 4 characters",
    },
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
