import Message from "../../db/models/message.js";

class MessageController {
  async saveMessage(request, response) {
    const data = request.body;

    const datePoland = new Date();
    datePoland.setHours(datePoland.getHours() + 1);

    let message;
    try {
      message = new Message({
        conversation: data.conversation,
        announcement: data.announcement,
        person: data.person,
        content: data.content,
        created_at: datePoland,
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
    const requestQuery = request.query;

    try {

      if(!requestQuery.personID) {
        return response.status(200).json();
      }

      messages = await Message.find({ conversation: id })
        .populate("person", ["_id", "name"])
        .populate("announcement", ["title"])
          .sort({created_at: -1});

      const messagesFind = messages.find((message) => message.person._id.toString() === requestQuery.personID );

      if(messagesFind) {
        console.log('mam wiadomosci')
      } else {
        console.log('nie mam wiadomosci')
      }
    } catch (error) {
      response.status(500).json({ message: error.message });
    }

    return response.status(200).json(messages);
  }
}

export default new MessageController();
