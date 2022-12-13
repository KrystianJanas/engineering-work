const Conversation = require("../../db/models/conversation");

class ConversationController {
  async saveConversation(request, response) {
    const data = request.body;

    let conversation;
    try {
      conversation = new Conversation({
        announcement: data.announcement,
        person_from: data.person_from,
        person_to: data.person_to,
      });
      await conversation.save();
    } catch (error) {
      return response.status(422).json({ message: error.message });
    }
    response.status(201).json(conversation);
  }

  async getConversations(request, response) {
    let conversations;

    try {
      conversations = await Conversation.find({});
    } catch (error) {
      response.status(500).json({ message: error.message });
    }

    return response.status(200).json(conversations);
  }

  async getConversationsFrom(request, response) {
    let conversations;
    const id = request.params.id;
    try {
      conversations = await Conversation.find({ person_from: id });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }

    return response.status(200).json(conversations);
  }

  async getConversationsTo(request, response) {
    let conversations;
    const id = request.params.id;
    try {
      conversations = await Conversation.find({ person_to: id });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }

    return response.status(200).json(conversations);
  }

  async deleteConversation(request, response) {
    const id = request.params.id;

    try {
      const conversation = await Conversation.findOne({ _id: id });
      if (conversation) {
        await conversation.deleteOne();
        response.sendStatus(204);
      } else {
        return response.status(422).json({ message: "Conversation not found" });
      }
    } catch (error) {
      return response.status(422).json({ message: error.message });
    }
  }
}

module.exports = new ConversationController();
