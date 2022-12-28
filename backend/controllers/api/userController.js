import User from "../../db/models/user.js";
import Person from "../../db/models/person.js";
import { hash, compare } from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

class UserController {
  async saveUser(request, response) {
    // check: if user exist
    try {
      const user = await User.findOne({ login: request.body.login });
      if (user) {
        return response.status(400).send("User is already exist!");
      }
    } catch {
      return response.status(500).send();
    }

    // let's create an account
    try {
      const hashedPassword = await hash(request.body.password, 10);
      const user = new User({
        login: request.body.login,
        password: hashedPassword,
      });
      await user.save();

      const person = new Person({
        user: user._id,
        name: user.login,
        city: "",
        zip_code: "",
        phone_number: "",
        avatar_url: "",
      });
      await person.save();
      response.status(201).send();
    } catch {
      response.status(500).send();
    }
  }

  async getUser(request, response) {
    const user = await User.findOne({ login: request.body.login });
    if (user == null) {
      return response.status(404).send("Username or password is incorrect");
    }

    const person = await Person.findOne({ user: user._id });
    if (person == null) {
      return response.status(404).send("Cannot find person associated to user");
    }

    try {
      if (await compare(request.body.password, user.password)) {
        const accessToken = jsonwebtoken.sign(
          { login: request.body.login },
          process.env.ACCESS_TOKEN_SECRET
        );
        response.status(200).json({
          accessToken: accessToken,
          user_id: user._id,
          person_id: person._id,
        });
      } else {
        response.status(404).send("Username or password is incorrect");
      }
    } catch {
      response.status(500).send();
    }
  }

  async updatePassword(request, response) {
    const data = request.body;

    const user = await User.findOne({ _id: data.user_id });
    if (user == null) {
      return response
        .status(404)
        .send("Error: we can't find user. Please log out and log in again.");
    }

    try {
      if (await compare(data.password, user.password)) {
        const hashedNewPassword = await hash(data.newPassword, 10);
        user.password = hashedNewPassword;

        await user.save();
        response.status(200).json(user);
      } else {
        response.status(404).send("Actually password is incorrect");
      }
    } catch {
      response.status(500).send();
    }
  }
}

export default new UserController();
