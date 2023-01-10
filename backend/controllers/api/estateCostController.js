import EstateCost from "../../db/models/estateCost.js";
import Estate from "../../db/models/estate.js";

class EstateCostController {
    async saveCosts(request, response) {
        const data = request.body;

        const datePoland = new Date();
        datePoland.setHours(datePoland.getHours() + 1);

        let costFind;
        let cost;
        try {
            costFind = await EstateCost.findOne({ estate: data.estate_id });

            if(costFind && costFind._id) {
                costFind.current_fixedCosts = data.current_fixedCosts || costFind.current_fixedCosts;
                costFind.current_costPerOne = data.current_costPerOne || costFind.current_costPerOne;

                costFind.gas_fixedCosts = data.gas_fixedCosts || costFind.gas_fixedCosts;
                costFind.gas_costPerOne = data.gas_costPerOne || costFind.gas_costPerOne;

                costFind.water_fixedCosts = data.water_fixedCosts || costFind.water_fixedCosts;
                costFind.water_costPerOne = data.water_costPerOne || costFind.water_costPerOne;

                costFind.updated_at = datePoland;

                await costFind.save();
                response.status(200).json(costFind);

            } else {
                cost = new EstateCost({
                    estate: data.estate_id,

                    current_fixedCosts: data.current_fixedCosts,
                    current_costPerOne: data.current_costPerOne,

                    gas_fixedCosts: data.gas_fixedCosts,
                    gas_costPerOne: data.gas_costPerOne,

                    water_fixedCosts: data.water_fixedCosts,
                    water_costPerOne: data.water_costPerOne,

                    created_at: datePoland,
                    updated_at: datePoland,
                });
                await cost.save();
                response.status(200).json(cost);
            }
        } catch (error) {
            return response.status(422).json({ message: error.message });
        }
    }

    async getCosts(request, response) {
        let costs, estate;
        const estate_id = request.params.id;
        const requestQuery = request.query;

        try {
            estate = await Estate.findOne({_id: estate_id})
                .populate("person", ["_id", "name", "phone_number"])
                .populate("renter", ["_id", "name", "phone_number"]);

            costs = await EstateCost.findOne({ estate: estate_id });

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

        return response.status(200).json(costs || []);
    }
}

export default new EstateCostController();
