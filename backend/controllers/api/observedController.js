const Observed = require("../../db/models/observed");

class ObservedController {
  async saveObserved(request, response) {
    const data = request.body;

    let observed;
    try {
      observed = new Observed({
        announcement: data.announcement,
        person: data.person,
      });
      await observed.save();
    } catch (error) {
      return response.status(422).json({ message: error.message });
    }
    response.status(201).json(observed);
  }

  async getObserved(request, response) {
    let observed;
    let id = request.params.id;

    try {
      if (id) {
        observed = await Observed.find({ person: id });
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
          .json({ message: "Observed announcement not found" });
      }
    } catch (error) {
      return response.status(422).json({ message: error.message });
    }
  }
}

module.exports = new ObservedController();
