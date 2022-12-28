import { Schema, model } from "mongoose";

const EstateSchema = new Schema({
  person: { type: Schema.Types.ObjectId, ref: "Person" },

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

  renter: [{ type: Schema.Types.ObjectId, ref: "Person" }],

  status: { type: Boolean, default: true },
});

const Estate = model("Estate", EstateSchema);

export default Estate;
