import EstateSettlement from "../../db/models/estateSettlement.js";
import EstateCost from "../../db/models/estateCost.js";
import Estate from "../../db/models/estate.js";

class EstateSettlementController {
    async saveSettlement(request, response) {
        const data = request.body;

        const datePoland = new Date();
        datePoland.setHours(datePoland.getHours() + 1);

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

                    created_at: datePoland,
                });
                await cost.save();
                response.status(200).json(cost);
            }
        } catch (error) {
            return response.status(422).json({ message: error.message });
        }
    }

    async getSettlements(request, response) {
        let settlements, estate;
        const estate_id = request.params.id;
        const requestQuery = request.query;

        try {
            estate = await Estate.findOne({_id: estate_id})
                .populate("person", ["_id", "name", "phone_number"])
                .populate("renter", ["_id", "name", "phone_number"]);

            settlements = await EstateSettlement.find({ estate: estate_id }).sort({data: -1}).
            populate("person", ["_id", "name", "phone_number"]);

            if(requestQuery.typeView && requestQuery.typeView === 'edit') {
                if (estate.person._id.toString() !== requestQuery.personID) {
                    return response.status(403).json("Nie masz uprawnień do przeglądania tej nieruchomości!");
                }
            } else if (requestQuery.typeView && requestQuery.typeView === 'view') {
                if (estate.person._id.toString() === requestQuery.personID || estate.renter.find((person) => person._id.toString() === requestQuery.personID)) {
                } else {
                    return response.status(403).json("Nie masz uprawnień do przeglądania tej nieruchomości!");
                }
            }

        } catch (error) {
            response.status(500).json({ message: error.message });
        }
        return response.status(200).json(settlements || []);
    }

    async getSettlementInThisMonth(request, response) {
        let settlement, estate;
        const estate_id = request.params.id;
        const requestQuery = request.query;

        const dateYearMonth = new Date().toISOString().slice(0, 7);


        try {
            estate = await Estate.findOne({_id: estate_id})
                .populate("person", ["_id", "name", "phone_number"])
                .populate("renter", ["_id", "name", "phone_number"]);

            settlement = await EstateSettlement.findOne({ estate: estate_id, data: dateYearMonth },
                ['estate', 'person', 'created_at', 'data']);


            if(settlement && settlement.estate) {
                if(requestQuery.typeView && requestQuery.typeView === 'edit') {
                    if (estate.person._id.toString() !== requestQuery.personID) {
                        return response.status(403).json("Nie masz uprawnień do przeglądania tej nieruchomości!");
                    }
                } else if (requestQuery.typeView && requestQuery.typeView === 'view') {
                    if (estate.person._id.toString() === requestQuery.personID || estate.renter.find((person) => person._id.toString() === requestQuery.personID)) {
                    } else {
                        return response.status(403).json("Nie masz uprawnień do przeglądania tej nieruchomości!");
                    }
                }
            } else {
                return response.sendStatus(204);
            }
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
        return response.status(200).json(settlement || []);

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
