import EstateMessage from "../../db/models/estateMessage.js";

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
        let messages;
        const estate_id = request.params.id;

        try {
            messages = await EstateMessage.find({ estate: estate_id })
                .populate("person", ["_id", "name"]).sort({created_at: -1})
        } catch (error) {
            response.status(500).json({ message: error.message });
        }

        return response.status(200).json(messages);
    }
}

export default new EstateMessageController();
