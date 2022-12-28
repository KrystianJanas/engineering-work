import { Schema, model } from "mongoose";

const ConversationSchema = new Schema({
  announcement: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Announcement",
  },

  person_from: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Person",
  },
  person_to: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Person",
  },

  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Conversation = model("Conversation", ConversationSchema);

export default Conversation;
