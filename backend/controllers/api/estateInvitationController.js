import EstateInvitation from "../../db/models/estateInvitation.js";

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
    const id = request.params.id.trim();
    let estateInvitations;
    try {
      estateInvitations = await EstateInvitation.find({ person: id }).populate("estate", ["location", "size", "rooms", "state", "fee", "rent", "caution"]).
      populate("person", ["_id", "name", "phone_number"]);
    } catch (e) {
    }

    if (estateInvitations) {
      response.status(200).json(estateInvitations);
    } else {
      response.status(404).json({
        message: "Nie znaleziono zaproszeń do nieruchomości.",
      });
    }
  }

  async deleteEstateInvitation(request, response) {
    const id = request.params.id;

    try {
      const estateInvitation = await EstateInvitation.findOne({ _id: id });
      if (estateInvitation) {
        await estateInvitation.deleteOne();
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

export default new EstateInvitationController();
