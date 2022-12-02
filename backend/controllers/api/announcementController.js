const Announcement = require("../../db/models/announcement");

class AnnouncementController {
  async saveAnnouncement(request, response) {
    const data = request.body;

    let announcement;
    try {
      announcement = new Announcement({
        person: data.person,
        title: data.title,
        description: data.description,
        location: data.location,
        state: data.state,
        size: data.size,
        rooms: data.rooms,
        fee: data.fee,
        rent: data.rent,
        images: data.images,
      });
      await announcement.save();
    } catch (error) {
      return response.status(422).json({ message: error.message });
    }
    response.status(201).json(announcement);
  }

  async getAnnouncements(request, response) {
    let announcements;
    try {
      announcements = await Announcement.find({});
    } catch (error) {
      response.status(500).json({ message: error.message });
    }

    response.status(200).json(announcements);
  }

  async getAnnouncement(request, response) {
    const id = request.params.id;
    const announcement = await Announcement.findOne({ _id: id }).populate(
      "person",
      ["_id", "name"]
    );

    response.status(200).json(announcement);
  }

  async updateAnnouncement(request, response) {
    const id = request.params.id;
    const data = request.body;

    try {
      const announcement = await Announcement.findOne({ _id: id });
      if (announcement) {
        announcement.title = data.title || announcement.title;
        announcement.description = data.description || announcement.description;
        announcement.location = data.location || announcement.location;
        announcement.state = data.state || announcement.state;
        announcement.size = data.size || announcement.size;
        announcement.rooms = data.rooms || announcement.rooms;
        announcement.fee = data.fee || announcement.fee;
        announcement.rent = data.rent || announcement.rent;
        announcement.images = data.images || announcement.images;

        announcement.updated_at = Date.now();

        await announcement.save();
        response.status(200).json(announcement);
      } else {
        return response.status(422).json({ message: "Announcement not found" });
      }
    } catch (error) {
      return response.status(422).json({ message: error.message });
    }
  }

  async deleteAnnouncement(request, response) {
    const id = request.params.id;

    await Announcement.deleteOne({ _id: id });

    response.sendStatus(204);
  }
}

module.exports = new AnnouncementController();
