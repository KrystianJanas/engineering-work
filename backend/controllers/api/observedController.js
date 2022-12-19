const Observed = require("../../db/models/observed");

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

  async getObserved(request, response) {
    let observed;
    let id = request.params.id;

    try {
      if (id) {
        observed = await Observed.find({ person: id }).populate("announcement");
      } else {
        observed = await Observed.find({});
      }
    } catch (error) {
      response.status(500).json({ message: error.message });
    }

    return response.status(200).json(observed);
  }

  async deleteObserved(request, response) {
    const id = request.params.id;

    try {
      const observed = await Observed.findOne({ _id: id });
      if (observed) {
        await observed.deleteOne();
        response.sendStatus(204);
      } else {
        return response
          .status(422)
          .json({ message: "Nie znaleziono obserwowanego ogłoszenia." });
      }
    } catch (error) {
      return response.status(422).json({ message: error.message });
    }
  }
}

module.exports = new ObservedController();
