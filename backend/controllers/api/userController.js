const User = require("../../db/models/user");
const bcrypt = require("bcrypt");

class UserController {
  async saveUser(request, response) {
    try {
      const hashedPassword = await bcrypt.hash(request.body.password, 10);
      const user = new User({
        login: request.body.login,
        password: hashedPassword,
      });
      await user.save();
      response.status(201).send();
    } catch {
      response.status(500).send();
    }
  }

  async getUser(request, response) {
    const user = await User.findOne({ login: request.body.login });

    if (user == null) {
      return response.status(400).send("Cannot find user");
    }

    try {
      if (await bcrypt.compare(request.body.password, user.password)) {
        response.send("Success");
      } else {
        response.send("Not allowed");
      }
    } catch {
      response.status(500).send();
    }
  }
}

module.exports = new UserController();
