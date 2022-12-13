const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  conversation: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Conversation",
  },
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

  content: {
    type: String,
    required: true,
  },

  created_at: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;
