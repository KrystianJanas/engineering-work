import EstateSettlement from "../../db/models/estateSettlement.js";
import EstateCost from "../../db/models/estateCost.js";
import Observed from "../../db/models/observed.js";

class EstateSettlementController {
    async saveSettlement(request, response) {
        const data = request.body;

        let cost, costFind;
        try {
            costFind = await EstateCost.findOne({ estate: data.estate_id });

            if(costFind && costFind._id) {
                const dateYearMonth = new Date().toISOString().slice(0, 7);

                cost = new EstateSettlement({
                    estate: data.estate_id,
                    person: data.person_id,

                    data: dateYearMonth, // YYYY-MM (year-month)

                    // zuzycie w kwh/m3
                    current_use: data.current_use,
                    gas_use: data.gas_use,
                    water_use: data.water_use,

                    // ceny stałe i jednego kwh/m3 na dzien podania odczytu
                    current_cost_one: costFind.current_costPerOne,
                    gas_cost_one: costFind.gas_costPerOne,
                    water_cost_one: costFind.water_costPerOne,

                    current_fixed_costs: costFind.current_fixedCosts,
                    gas_fixed_costs: costFind.gas_fixedCosts,
                    water_fixed_costs: costFind.water_fixedCosts,

                });
                await cost.save();
                response.status(200).json(cost);
            }
        } catch (error) {
            return response.status(422).json({ message: error.message });
        }
    }

    async getSettlements(request, response) {
        let settlements;
        const estate_id = request.params.id;

        try {
            settlements = await EstateSettlement.find({ estate: estate_id }).sort({data: -1}).
            populate("person", ["_id", "name", "phone_number"]);
        } catch (error) {
            response.status(500).json({ message: error.message });
        }

        return response.status(200).json(settlements);
    }

    async getSettlementInThisMonth(request, response) {
        let settlement;
        const estate_id = request.params.id;
        const dateYearMonth = new Date().toISOString().slice(0, 7);

        try {
            settlement = await EstateSettlement.findOne({ estate: estate_id, data: dateYearMonth },
                ['estate', 'person', 'created_at', 'data']);
            if(settlement && settlement.estate) {
                return response.status(200).json(settlement);

            } else {
                return response.sendStatus(204);

            }
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    }

    async deleteSettlement(request, response) {
        const id = request.params.id;

        try {
            const settlement = await EstateSettlement.findOne({ _id: id });
            if (settlement) {
                await settlement.deleteOne();
                response.sendStatus(204);
            } else {
                return response
                    .status(422)
                    .json({ message: "Nie znaleziono rozliczenia." });
            }
        } catch (error) {
            return response.status(422).json({ message: error.message });
        }
    }
}

export default new EstateSettlementController();
