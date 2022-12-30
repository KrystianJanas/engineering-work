import { Schema, model } from "mongoose";

const EstateMessageSchema = new Schema({
    estate: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Estate",
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

const EstateMessage = model("EstateMessage", EstateMessageSchema);

export default EstateMessage;
