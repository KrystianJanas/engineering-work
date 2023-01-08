import EstateMessage from "../../db/models/estateMessage.js";
import Estate from "../../db/models/estate.js";

class EstateMessageController {
    async saveMessage(request, response) {
        const data = request.body;

        let message;
        try {
            message = new EstateMessage({
                estate: data.estate,
                person: data.person,
                content: data.content,
            });
            await message.save();
        } catch (error) {
            return response.status(422).json({ message: error.message });
        }
        response.status(201).json(message);
    }

    async getMessages(request, response) {
        let messages, estate;
        const estate_id = request.params.id;
        const requestQuery = request.query;

        try {
            estate = await Estate.findOne({_id: estate_id})
                .populate("person", ["_id", "name", "phone_number"])
                .populate("renter", ["_id", "name", "phone_number"]);

            messages = await EstateMessage.find({ estate: estate_id })
                .populate("person", ["_id", "name"]).sort({created_at: -1})

            if(requestQuery.typeView && requestQuery.typeView === 'edit') {
                if (estate.person._id.toString() === requestQuery.personID) {
                    return response.status(200).json(messages);
                } else {
                    return response.status(403).json("Nie masz uprawnień do przeglądania tej nieruchomości!");
                }
            } else if (requestQuery.typeView && requestQuery.typeView === 'view') {
                if (estate.person._id.toString() === requestQuery.personID || estate.renter.find((person) => person._id.toString() === requestQuery.personID)) {
                    return response.status(200).json(messages);
                } else {
                    return response.status(403).json("Nie masz uprawnień do przeglądania tej nieruchomości!");
                }
            }
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    }
}

export default new EstateMessageController();
