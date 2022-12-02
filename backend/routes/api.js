const express = require("express");
const router = express.Router();

const PeopleController = require("../controllers/api/peopleController");
const UserController = require("../controllers/api/userController");

router.get("/people", PeopleController.getPeople);
router.get("/people/:id", PeopleController.getPerson);
router.post("/people", PeopleController.savePerson);
router.put("/people/:id", PeopleController.updatePerson);
router.delete("/people/:id", PeopleController.deletePerson);

router.post("/auth", UserController.saveUser);
router.post("/auth/login", UserController.getUser);

module.exports = router;
