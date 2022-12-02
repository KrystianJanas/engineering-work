const mongoose = require("mongoose");

const PersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  zip_code: {
    type: String,
    required: false,
  },
  phone_number: {
    type: String,
    required: false,
  },
  avatar_url: {
    type: String,
    required: false,
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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const Person = mongoose.model("Person", PersonSchema);

module.exports = Person;
