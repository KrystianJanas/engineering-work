const mongoose = require("mongoose");

const observedSchema = new mongoose.Schema({
  announcement: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Announcement",
  },
  person: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Person",
  },

  created_at: { type: Date, default: Date.now },
});

const Observed = mongoose.model("Observed", observedSchema);

module.exports = Observed;
