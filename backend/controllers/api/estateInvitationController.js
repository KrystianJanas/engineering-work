import EstateInvitation from "../../db/models/estateInvitation.js";
import User from "../../db/models/user.js";
import Person from "../../db/models/person.js";
import Estate from "../../db/models/estate.js";

class EstateInvitationController {
  async saveEstateInvitation(request, response) {
    const data = request.body;

    let estateInvitation;
    let estateInvitation_check;
    let user;
    let person;
    try {
      user = await User.findOne({login: data.user_email});
      if(user) {
        const user_id = user._id.toString();
        person = await Person.findOne({user: user_id});
        if(person) {
          const person_id = person._id.toString();
          if(data.person_sender_id === person_id) {
            return response.status(400).json({ message: "Nie możesz sam sobie wysłać zaproszenia do nieruchomości." });
          }
          estateInvitation_check = await EstateInvitation.find({estate: data.estate_id, person: person_id})
          if(estateInvitation_check && estateInvitation_check.length>0) {
            return response.status(400).json({ message: "Ta osoba ma już wcześniej wysłane zaproszenie do nieruchomości." });
          } else {
            estateInvitation = new EstateInvitation({
              estate: data.estate_id,
              person: person_id,
            });
            await estateInvitation.save();
            return response.status(200).json({message: "Jeśli użytkownik z podanym adresem email istnieje, zostanie do niego wysłane zaproszenie."});
          }
        }
      }
    } catch (error) {
      return response.status(422).json({ message: error.message });
    }
    return response.status(200).json({message: "Jeśli użytkownik z podanym adresem email istnieje, zostanie do niego wysłane zaproszenie."});
  }

  async getPersonInvitationsToEstate(request, response) {
    const personID = request.params.personID.trim();
    let estateInvitations;

    try {
      estateInvitations = await EstateInvitation.find({ person: personID }).populate("estate", ["_id", "location", "size", "rooms", "state", "fee", "rent", "caution"]).
      populate("person", ["_id", "name", "phone_number"]);

    } catch (e) {
      response.status(404).json({message: "Nie znaleziono zaproszeń do nieruchomości.",});
    }
    return response.status(200).json(estateInvitations);
  }

  async getEstateInvitations(request, response) {
    const estateID = request.params.id.trim();
    let estateInvitations, estate;

    try {

      estate = await Estate.findOne({_id: estateID})
          .populate("person", ["_id", "name", "phone_number"])
          .populate("renter", ["_id", "name", "phone_number"]);

      if(estate) {
        if(estate.status===false) {
          return response.status(404).json({message: "Nie znaleziono zaproszenia lub jest ono nieaktualne.",});
        }
      } else {
        return response.status(404).json({message: "Nie znaleziono nieruchomości.",});
      }

      estateInvitations = await EstateInvitation.find({ estate: estateID }).populate("person", ["_id", "name", "phone_number"]);
    } catch (e) {
      return response.status(404).json({message: "Nie znaleziono zaproszeń do nieruchomości.",});
    }

    return response.status(200).json(estateInvitations);

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
