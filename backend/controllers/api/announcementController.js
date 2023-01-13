import Announcement from "../../db/models/announcement.js";

class AnnouncementController {
  async saveAnnouncement(request, response) {
    const data = request.body;

    const datePoland = new Date();
    datePoland.setHours(datePoland.getHours() + 1);

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
        created_at: datePoland,
        updated_at: datePoland,
      });
      await announcement.save();

      response.status(201).json(announcement);
    } catch (error) {
      return response.status(422).json({ message: error.message });
    }
  }

  async getAnnouncements(request, response) {
    let announcements, announcementsPages, meta;
    let requestQuery = request.query;
    try {
      const { page=1, perPage=10 } = request.query;

      if(!requestQuery.personID) {
        return response.status(200).json();
      }

      if (requestQuery.location && requestQuery.rooms) {
        announcementsPages = await Announcement.find({ status: true, location: requestQuery.location, rooms: requestQuery.rooms});
        announcements = await Announcement.find({ status: true, location: requestQuery.location, rooms: requestQuery.rooms})
            .limit(perPage)
            .skip((page-1) * perPage);
      } else if (requestQuery.rooms) {
        announcementsPages = await Announcement.find({ status: true, rooms: requestQuery.rooms});
        announcements = await Announcement.find({ status: true, rooms: requestQuery.rooms})
            .limit(perPage)
            .skip((page-1) * perPage);
      } else if(requestQuery.location) {
        announcementsPages = await Announcement.find({ status: true, location: requestQuery.location});
        announcements = await Announcement.find({ status: true, location: requestQuery.location})
            .limit(perPage)
            .skip((page-1) * perPage);
      } else {
        announcementsPages = await Announcement.find({ status: true});
        announcements = await Announcement.find({ status: true})
            .limit(perPage)
            .skip((page-1) * perPage);
      }



      meta = {
        totalPages: Math.ceil(announcementsPages.length / perPage) || 1,
        actualPage: Number(page)
      }

      response.status(200).json({announcements, meta});


    } catch (error) {
      response.status(500).json({ message: error.message });
    }

  }

  async getAnnouncement(request, response) {
    const id = request.params.id;
    const requestQuery = request.query;

    try{
      if(!requestQuery.personID) {
        return response.status(200).json();
      }

      const announcement = await Announcement.findOne({ _id: id })
          .populate("person", ["_id", "name", "phone_number"]);

      // if edit, check if owner_announcement === personID from query
      if(requestQuery.typeView && requestQuery.typeView === 'edit') {
        if (announcement.person._id.toString() === requestQuery.personID) {
          return response.status(200).json(announcement);
        } else {
          return response.status(403).json("Nie masz uprawnień do przeglądania tego ogłoszenia!");
        }
      } else {
        if(requestQuery.typeView && requestQuery.typeView === 'view') {
            return response.status(200).json(announcement);
        }
      }
      response.status(200).json(announcement);
    } catch (error) {
      response.status(500).json({ message: error.message });

    }
  }

  async getAnnouncementsByPerson(request, response) {
    let announcements;
    const person = request.params.id;
    const status = request.params.status || true;
    try {
      announcements = await Announcement.find({
        person,
        status,
      });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }

    response.status(200).json(announcements || []);
  }

  async updateAnnouncement(request, response) {
    const id = request.params.id;
    const data = request.body;

    const datePoland = new Date();
    datePoland.setHours(datePoland.getHours() + 1);

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

        announcement.updated_at = datePoland;

        await announcement.save();
        response.status(201).json(announcement);
      } else {
        return response.status(422).json({ message: "Ogłoszenie nie zostało znalezione."});
      }
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }

  async deleteAnnouncement(request, response) {
    const id = request.params.id;

    try {
      const announcement = await Announcement.findOne({ _id: id });
      if (announcement) {
        announcement.status = false;
        announcement.updated_at = Date.now();

        await announcement.save();
        response.sendStatus(204);
      } else {
        return response.status(422).json({ message: "Ogłoszenie nie zostało znalezione." });
      }
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }
}

export default new AnnouncementController();
