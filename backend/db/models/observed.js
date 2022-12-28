import { Schema, model } from "mongoose";

const observedSchema = new Schema({
  announcement: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Announcement",
  },
  person: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Person",
  },

  created_at: { type: Date, default: Date.now },
});

const Observed = model("Observed", observedSchema);

export default Observed;
