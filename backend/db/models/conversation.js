const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema({
  announcement: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Announcement",
  },

  person_from: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Person",
  },
  person_to: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Person",
  },

  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Conversation = mongoose.model("Conversation", ConversationSchema);

module.exports = Conversation;
