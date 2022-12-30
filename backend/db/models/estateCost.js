import { Schema, model } from "mongoose";

const EstateCostSchema = new Schema({
    estate: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Estate",
    },

    // prąd
    current_fixedCosts: { type: String, default: 0, required: true},
    current_costPerOne: { type: String, default: 0, required: true},

    // gaz
    gas_fixedCosts: { type: String, default: 0, required: true},
    gas_costPerOne: { type: String, default: 0, required: true},

    //woda
    water_fixedCosts: { type: String, default: 0, required: true},
    water_costPerOne: { type: String, default: 0, required: true},

    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

const EstateCost = model("EstateCost", EstateCostSchema);

export default EstateCost;
