const mongoose = require("mongoose");

const EstateSchema = new mongoose.Schema({
  person: { type: mongoose.Schema.Types.ObjectId, ref: "Person" },

  title: { type: String, require: true },
  info: { type: String, require: true },
  location: { type: String, require: true },
  state: { type: String, require: true },
  size: { type: Number, require: true },
  rooms: { type: Number, require: true },

  fee: { type: Number, require: true },
  caution: { type: Number, require: true },
  rent: { type: Number, require: true },

  images: [{ type: String }],

  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  views: { type: Number, default: 0 },

  renter: [{ type: mongoose.Schema.Types.ObjectId, ref: "Person" }],

  status: { type: Boolean, default: true },
});

const Estate = mongoose.model("Estate", EstateSchema);

module.exports = Estate;
