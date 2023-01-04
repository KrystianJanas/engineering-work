import Observed from "../../db/models/observed.js";

class ObservedController {
  async saveObserved(request, response) {
    let observed;

    const data = request.body;

    try {
      observed = await Observed.find({
        announcement: data.announcement,
        person: data.person,
      });
      if (observed && observed.length > 0) {
        return response
          .status(422)
          .json({ message: "Ogłoszenie jest juz dodane do ulubionych." });
      } else {
        observed = new Observed({
          announcement: data.announcement,
          person: data.person,
        });
        await observed.save();
        response.status(201).json(observed);
      }
    } catch (error) {
      return response.status(422).json({ message: "Wystąpił błąd." });
    }
  }

  async getObservedAnnouncements(request, response) {
    let announcements, announcementsPages, meta;
    let id = request.params.id;

    try {
      const { page=1, perPage=10 } = request.query;

      announcementsPages = await Observed.find({ person: id })
          .populate("announcement");

      announcements = await Observed.find({ person: id })
          .populate("announcement")
          .limit(perPage)
          .skip((page-1) * perPage);

      meta = {
        totalPages: Math.ceil(announcementsPages.length / perPage) || 1,
        actualPage: Number(page)
      }

      response.status(200).json({announcements, meta});

    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  }

  async deleteObserved(request, response) {
    const id = request.params.id;

    try {
      const observed = await Observed.findOne({ _id: id });
      if (observed) {
        await observed.deleteOne();
        response.sendStatus(204);
      } else {
        response.status(422).json({ message: "Nie znaleziono obserwowanego ogłoszenia." });
      }
    } catch (error) {
      return response.status(422).json({ message: error.message });
    }
  }
}

export default new ObservedController();
