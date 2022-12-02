const express = require("express");
const router = express.Router();

const PeopleController = require("../controllers/api/peopleController");
const UserController = require("../controllers/api/userController");
const AnnouncementController = require("../controllers/api/announcementController");

router.get("/people", PeopleController.getPeople);
router.get("/people/:id", PeopleController.getPerson);
router.post("/people", PeopleController.savePerson);
router.put("/people/:id", PeopleController.updatePerson);
router.delete("/people/:id", PeopleController.deletePerson);

router.post("/auth", UserController.saveUser);
router.post("/auth/login", UserController.getUser);

router.get("/announcements", AnnouncementController.getAnnouncements);
router.get("/announcements/:id", AnnouncementController.getAnnouncement);
router.post("/announcements", AnnouncementController.saveAnnouncement);
router.put("/announcements/:id", AnnouncementController.updateAnnouncement);
router.delete("/announcements/:id", AnnouncementController.deleteAnnouncement);

module.exports = router;
