const Message = require("../../db/models/message");

class MessageController {
  async saveMessage(request, response) {
    const data = request.body;

    let message;
    try {
      message = new Message({
        conversation: data.conversation,
        announcement: data.announcement,
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
    const id = request.params.id;

    try {
      messages = await Message.find({ conversation: id })
        .populate("person", ["name"])
        .populate("announcement", ["title"]);
    } catch (error) {
      response.status(500).json({ message: error.message });
    }

    return response.status(200).json(messages);
  }
}

module.exports = new MessageController();
