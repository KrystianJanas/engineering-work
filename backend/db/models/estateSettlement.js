import { Schema, model } from "mongoose";

const EstateSettlementSchema = new Schema({
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

    data: { type: String, default: 0, required: true}, // year, month

    current_use: { type: String, default: 0, required: true},
    gas_use: { type: String, default: 0, required: true},
    water_use: { type: String, default: 0, required: true},

    current_cost_one: { type: String, default: 0, required: true},
    gas_cost_one: { type: String, default: 0, required: true},
    water_cost_one: { type: String, default: 0, required: true},

    current_fixed_costs: { type: String, default: 0, required: true},
    gas_fixed_costs: { type: String, default: 0, required: true},
    water_fixed_costs: { type: String, default: 0, required: true},

    created_at: { type: Date, default: Date.now },
});

const EstateSettlement = model("EstateSettlement", EstateSettlementSchema);

export default EstateSettlement;
