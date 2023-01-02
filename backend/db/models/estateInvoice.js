import { Schema, model } from "mongoose";

const InvoiceSchema = new Schema({
    person: { type: Schema.Types.ObjectId, ref: "Person" },
    estate: { type: Schema.Types.ObjectId, ref: "Estate" },

    renters: [{ type: Schema.Types.ObjectId, ref: "Person" }],
    paid_renters: [{ type: Schema.Types.ObjectId, ref: "Person" }],

    invoice_name: { type: String, require: true },
    description: { type: String, require: true },

    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },

    status: { type: Boolean, default: true },
});

const EstateInvoice = model("EstateInvoice", InvoiceSchema);

export default EstateInvoice;
