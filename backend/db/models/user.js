import { Schema, model } from "mongoose";

const UserSchema = new Schema({
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
  role: {
    type: Number,
    default: 0,
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

const User = model("User", UserSchema);

export default User;
