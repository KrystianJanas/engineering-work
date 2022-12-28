import { Schema, model } from "mongoose";

const EstateInvitationSchema = new Schema({
  estate: { type: Schema.Types.ObjectId, ref: "Estate" },
  person: { type: Schema.Types.ObjectId, ref: "Person" },

  created_at: { type: Date, default: Date.now },
});

const EstateInvitation = model("EstateInvitation", EstateInvitationSchema);

export default EstateInvitation;
