const EstateInvitation = require("../../db/models/estateInvitation");

class EstateInvitationController {
  async saveEstateInvitation(request, response) {
    const data = request.body;

    let estateInvitation;
    try {
      estateInvitation = new EstateInvitation({
        estate: data.estate,
        person: data.person,
      });
      await estateInvitation.save();
    } catch (error) {
      return response.status(422).json({ message: error.message });
    }
    if (estateInvitation) {
      response.status(201).json(estateInvitation);
    }
  }

  async getEstateInvitations(request, response) {
    const personID = request.params.id;
    let estateInvitations;
    estateInvitations = await EstateInvitation.findOne({
      person: personID,
    }).populate("estate");

    if (estateInvitations) {
      response.status(200).json(estateInvitations);
    } else {
      response
        .status(404)
        .json({ message: "Nie znaleziono zaproszeń do nieruchomości." });
    }
  }

  async deleteEstateInvitation(request, response) {
    const id = request.params.id;

    try {
      const estateInvitation = await EstateInvitation.findOne({ _id: id });
      if (estateInvitation) {
        await conversation.deleteOne();
        response.sendStatus(204);
      } else {
        return response
          .status(422)
          .json({ message: "Estate invitation not found" });
      }
    } catch (error) {
      return response.status(422).json({ message: error.message });
    }
  }
}

module.exports = new EstateInvitationController();
