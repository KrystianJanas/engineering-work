import Estate from "../../db/models/estate.js";
import person from "../../db/models/person.js";
import { mongo } from "mongoose";


class EstateController {
  async saveEstate(request, response) {
    const data = request.body;

    let estate;
    try {
      estate = new Estate({
        person: data.person,
        title: data.title,
        info: data.info,
        location: data.location,
        state: data.state,
        size: data.size,
        rooms: data.rooms,
        fee: data.fee,
        caution: data.caution,
        rent: data.rent,
        images: data.images,
        renter: data.renter,
      });
      await estate.save();
    } catch (error) {
      return response.status(422).json({ message: error.message });
    }
    if (estate) {
      response.status(201).json(estate);
    }
  }

  async getEstates(request, response) {
    let estates;
    try {
      estates = await Estate.find({ status: true });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }

    response.status(200).json(estates);
  }

  async getEstate(request, response) {
    let estate;
    const id = request.params.id.trim();
    try {
      estate = await Estate.findOne({_id: id})
          .populate("person", ["_id", "name", "phone_number"])
          .populate("renter", ["_id", "name", "phone_number"]);
    } catch (e) {
    }

    if (estate) {
      response.status(200).json(estate);
    } else {
      response.status(404).json({ message: "Nie znaleziono nieruchomości." });
    }
  }

  async getEstatesByPerson(request, response) {
    let estates;
    const person = request.params.id;
    const status = request.params.status || true;
    try {
      estates = await Estate.find({
        person,
        status,
      });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }

    if (estates) {
      response.status(200).json(estates);
    } else {
      response.status(404).json({ message: "Nie znaleziono nieruchomości." });
    }
  }

  async getEstatesByRenter(request, response) {
    let estates;
    const renter = request.params.id;
    const status = request.params.status || true;
    try {
      estates = await Estate.find({
        renter,
        status,
      });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }

    if (estates) {
      response.status(200).json(estates);
    } else {
      response.status(404).json({ message: "Nie znaleziono nieruchomości." });
    }
  }

  async updateEstate(request, response) {
    const id = request.params.id;
    const data = request.body;

    try {
      const estate = await Estate.findOne({ _id: id });
      if (estate) {
        estate.title = data.title || estate.title;
        estate.info = data.info || estate.info;
        estate.location = data.location || estate.location;
        estate.state = data.state || estate.state;
        estate.size = data.size || estate.size;
        estate.rooms = data.rooms || estate.rooms;
        estate.fee = data.fee || estate.fee;
        estate.caution = data.caution || estate.caution;
        estate.rent = data.rent || estate.rent;
        estate.images = data.images || estate.images;

        estate.renter = data.renter || estate.renter;

        estate.updated_at = Date.now();

        await estate.save();
        response.status(200).json(estate);
      } else {
        return response.status(422).json({ message: "Nie znaleziono nieruchomości." });
      }
    } catch (error) {
      return response.status(422).json({ message: error.message });
    }
  }

  async addNewRenterToEstate(request, response) {
    const id = request.params.id;
    const data = request.body;

    // check:
    // 1. czy jest dodany do nieruchomosci juz jako renter
    // 2. czy jest dodany do estateInvitations jako oczekujacy?...

    try {
      const estate = await Estate.findOne({ _id: id });
      if (estate) {
        estate.renter = [...estate.renter, data.person_id]
        estate.updated_at = Date.now();

        await estate.save();
        response.sendStatus(204);
      } else {
        return response.status(422).json({ message: "Nie znaleziono nieruchomości." });
      }
    } catch (error) {
      return response.status(422).json({ message: error.message });
    }
  }

  async removeRenterFromEstate(request, response) {
    const id = request.params.id;
    const { person_id } = request.body;


    try {
      const estate = await Estate.findOne({ _id: id });
      if (estate) {
        if(estate.renter.includes(person_id)) {
          estate.renter = estate.renter.filter((est) => !est.equals( new mongo.ObjectID(person_id)))
          await estate.save();

          response.sendStatus(204);
        } else {
          return response.status(422).json({ message: "Nie znaleziono osoby przypisanej do tej nieruchomości." });
        }
      } else {
        return response.status(422).json({ message: "Nie znaleziono nieruchomości." });
      }
    } catch (error) {
      return response.status(422).json({ message: error.message });
    }
  }

  async deleteEstate(request, response) {
    const id = request.params.id;

    try {
      const estate = await Estate.findOne({ _id: id });
      if (estate) {
        estate.status = false;
        estate.updated_at = Date.now();

        await estate.save();

        response.sendStatus(204);
      } else {
        return response.status(422).json({ message: "Nie znaleziono nieruchomości." });
      }
    } catch (error) {
      return response.status(422).json({ message: error.message });
    }
  }
}

export default new EstateController();
