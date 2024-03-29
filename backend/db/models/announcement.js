import { Schema, model } from "mongoose";

const AnnouncementSchema = new Schema({
  person: { type: Schema.Types.ObjectId, ref: "Person" },

  title: { type: String, require: true },
  description: { type: String, require: true },
  location: { type: String, require: true },
  state: { type: String, require: true },
  size: { type: Number, require: true },
  rooms: { type: Number, require: true },

  fee: { type: Number, require: true },
  rent: { type: Number, require: true },

  images: [{ type: String }],

  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  views: { type: Number, default: 0 },

  status: { type: Boolean, default: true },
});

const Announcement = model("Announcement", AnnouncementSchema);

export default Announcement;
