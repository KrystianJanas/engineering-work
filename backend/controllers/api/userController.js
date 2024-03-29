import User from "../../db/models/user.js";
import Person from "../../db/models/person.js";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";

class UserController {
  async saveUser(request, response) {
    // check: if user exist
    try {
      const user = await User.findOne({ login: request.body.login });
      if (user) {
        return response.status(400).send("Wygląda na to, że taki użytkownik już istnieje.");
      }
    } catch {
      return response.status(500).send();
    }

    const datePoland = new Date();
    datePoland.setHours(datePoland.getHours() + 1);

    // let's create an account
    try {
      const hashedPassword = await hash(request.body.password, 10);
      const user = new User({
        login: request.body.login,
        password: hashedPassword,
        created_at: datePoland,
        updated_at: datePoland,
      });
      await user.save();

      const person = new Person({
        user: user._id,
        name: user.login,
        city: "",
        zip_code: "",
        phone_number: "",
        avatar_url: "",
        created_at: datePoland,
        updated_at: datePoland,
      });
      await person.save();
      response.status(201).send();
    } catch {
      response.status(422).send();
    }
  }

  async getUser(request, response) {
    const user = await User.findOne({ login: request.body.login });
    if (user == null) {
      return response.status(404).send("Adres e-mail lub hasło jest nieprawidłowe.");
    }

    const person = await Person.findOne({ user: user._id });
    if (person == null) {
      return response.status(404).send("Nie można znaleźć konta osoby przypisanego do użytkownika.");
    }

    try {
      if (await compare(request.body.password, user.password)) {
        const accessToken = jwt.sign(
          { login: request.body.login, _id: person._id },
          process.env.ACCESS_TOKEN_SECRET
        );

        response.cookie('_token', accessToken, {httpOnly: false});
        response.cookie('_user', person._id.toString(), {httpOnly: false});


        response.status(200).json({
          accessToken: accessToken,
          user_id: user._id,
          person_id: person._id,
        });

      } else {
        response.status(404).send("Adres e-mail lub hasło jest nieprawidłowe.");
      }
    } catch {
      response.status(400).send();
    }
  }

  async updatePassword(request, response) {
    const data = request.body;

    const person = await Person.findOne({ _id: data.personID });
    if (person == null) {
      return response
          .status(404)
          .send("Nie można znaleźć osoby, spróbuj ponownie.");
    }

    const user = await User.findOne({ _id: person.user });
    if (user == null) {
      return response
        .status(404)
        .send("Nie można znaleźć użytkownika, spróbuj ponownie.");
    }

    try {
      if (await compare(data.password, user.password)) {
        const hashedNewPassword = await hash(data.newPassword, 10);
        user.password = hashedNewPassword;

        await user.save();
        response.status(200).json(user);
      } else {
        response.status(422).send('Aktualne hasło jest nieprawidłowe!');
      }
    } catch {
      response.status(500).send();
    }
  }
}

export default new UserController();
