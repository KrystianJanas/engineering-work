const mongoose = require("mongoose");

const EstateInvitationSchema = new mongoose.Schema({
  estate: { type: mongoose.Schema.Types.ObjectId, ref: "Estate" },
  person: { type: mongoose.Schema.Types.ObjectId, ref: "Person" },

  created_at: { type: Date, default: Date.now },
});

const EstateInvitation = mongoose.model(
  "EstateInvitation",
  EstateInvitationSchema
);

module.exports = EstateInvitation;
