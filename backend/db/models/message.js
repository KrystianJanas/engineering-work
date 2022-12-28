import { Schema, model } from "mongoose";

const MessageSchema = new Schema({
  conversation: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Conversation",
  },
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

  content: {
    type: String,
    required: true,
  },

  created_at: { type: Date, default: Date.now },
});

const Message = model("Message", MessageSchema);

export default Message;
