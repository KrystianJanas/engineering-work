import Conversation from "../../db/models/conversation.js";

class ConversationController {
  async saveConversation(request, response) {
    const data = request.body;

    const datePoland = new Date();
    datePoland.setHours(datePoland.getHours() + 1);

    let conversation;
    try {
      conversation = new Conversation({
        announcement: data.announcement,
        person_from: data.person_from,
        person_to: data.person_to,
        created_at: datePoland,
        updated_at: datePoland,
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

  async getConversationsCheckExistFrom(request, response) {
    let conversations;
    const body = request.params;
    try {
      conversations = await Conversation.find({
        announcement: body.announcement_id,
        person_from: body.person_from,
      });
      if (conversations.length === 0) {
        return response
          .status(422)
          .json({ message: "Nie znaleziono rozpoczętej konwersacji." });
      }
    } catch (error) {
      response.status(500).json({ message: error.message });
    }

    return response.status(200).json(conversations);
  }

  async getConversationsFrom(request, response) {
    let conversationsPages, conversations;
    const id = request.params.id;
    try {
      const { page=1, perPage=10 } = request.query;

      conversationsPages = await Conversation.find({ person_from: id })
          .populate("person_from", ["name"])
          .populate("person_to", ["name"])
          .populate("announcement", ["title", "images"]);

      conversations = await Conversation.find({ person_from: id })
          .limit(perPage)
          .skip((page-1) * perPage)
          .populate("person_from", ["name"])
          .populate("person_to", ["name"])
          .populate("announcement", ["title", "images"]);

      const meta = {
        totalPages: Math.ceil(conversationsPages.length / perPage) || 1,
        actualPage: Number(page)
      }

      return response.status(200).json({conversations, meta});

    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  }

  async getConversationsTo(request, response) {
    let conversationsPages, conversations;
    const id = request.params.id;
    try {
      const { page=1, perPage=10 } = request.query;

      conversationsPages = await Conversation.find({ person_from: id })
          .populate("person_from", ["name"])
          .populate("person_to", ["name"])
          .populate("announcement", ["title", "images"]);

      conversations = await Conversation.find({ person_to: id })
          .limit(perPage)
          .skip((page-1) * perPage)
          .populate("person_from", ["name"])
        .populate("person_to", ["name"])
        .populate("announcement", ["title", "images"]);

      const meta = {
        totalPages: Math.ceil(conversationsPages.length / perPage) || 1,
        actualPage: Number(page)
      }

      return response.status(200).json({conversations, meta});

    } catch (error) {
      response.status(500).json({ message: error.message });
    }

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

export default new ConversationController();
