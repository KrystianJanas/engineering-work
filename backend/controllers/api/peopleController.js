import Person from "../../db/models/person.js";

class PeopleController {
  async savePerson(request, response) {
    const data = request.body;

    const datePoland = new Date();
    datePoland.setHours(datePoland.getHours() + 1);

    let person;
    try {
      person = new Person({
        name: data.name,
        city: data.city,
        zip_code: data.zip_code,
        phone_number: data.phone_number,
        avatar_url: data.avatar_url,
        user: data.user,
        created_at: datePoland,
        updated_at: datePoland,
      });
      await person.save();
    } catch (error) {
      return response.status(422).json({ message: error.message });
    }
    response.status(201).json(person);
  }

  async getPeople(request, response) {
    let document;

    try {
      document = await Person.find({});
    } catch (error) {
      response.status(500).json({ message: error.message });
    }

    response.status(200).json(document);
  }

  async getPerson(request, response) {
    const id = request.params.id;
    const person = await Person.findOne({ _id: id }).populate("user", [
      "login",
      "_id",
    ]);

    response.status(200).json(person);
  }

  async updatePerson(request, response) {
    const id = request.params.id;
    const data = request.body;

    const datePoland = new Date();
    datePoland.setHours(datePoland.getHours() + 1);

    try {
      const person = await Person.findOne({ _id: id });
      if (person) {
        person.name = data.name || person.name;
        person.city = data.city || person.city;
        person.zip_code = data.zip_code || person.zip_code;
        person.phone_number = data.phone_number || person.phone_number;
        person.avatar_url = data.avatar_url || person.avatar_url;

        person.updated_at = datePoland;

        await person.save();
        response.status(200).json(person);
      } else {
        return response.status(422).json({ message: "Person not found" });
      }
    } catch (error) {
      return response.status(422).json({ message: error.message });
    }
  }

  async deletePerson(request, response) {
    const id = request.params.id;

    await Person.deleteOne({ _id: id });

    response.sendStatus(204);
  }
}

export default new PeopleController();
