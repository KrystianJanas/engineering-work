const express = require("express");
const router = express.Router();

const PeopleController = require("../controllers/api/peopleController");
const UserController = require("../controllers/api/userController");
const AnnouncementController = require("../controllers/api/announcementController");
const ConversationController = require("../controllers/api/conversationController");
const MessageController = require("../controllers/api/messageController");
const ObservedController = require("../controllers/api/observedController");

router.get("/people", PeopleController.getPeople);
router.get("/people/:id", PeopleController.getPerson);
router.post("/people", PeopleController.savePerson);
router.put("/people/:id", PeopleController.updatePerson);
router.delete("/people/:id", PeopleController.deletePerson);

router.post("/auth", UserController.saveUser);
router.post("/auth/login", UserController.getUser);
router.post("/auth/updatePassword", UserController.updatePassword); // check, if it works - delete this comment

router.get("/announcements", AnnouncementController.getAnnouncements);
router.get("/announcements/:id", AnnouncementController.getAnnouncement);
router.post("/announcements", AnnouncementController.saveAnnouncement);
router.put("/announcements/:id", AnnouncementController.updateAnnouncement);
router.delete("/announcements/:id", AnnouncementController.deleteAnnouncement);

router.get(
  "/conversations/from/:id",
  ConversationController.getConversationsFrom
);
router.get("/conversations/to/:id", ConversationController.getConversationsTo);
router.get("/conversations/", ConversationController.getConversations);
router.post("/conversations", ConversationController.saveConversation);
router.delete("/conversations/:id", ConversationController.deleteConversation);

router.get("/messages/:id", MessageController.getMessages);
router.post("/messages", MessageController.saveMessage);

router.get("/observed", ObservedController.getObserved);
router.get("/observed/:id", ObservedController.getObserved);
router.post("/observed", ObservedController.saveObserved);
router.delete("/observed/:id", ObservedController.deleteObserved);

module.exports = router;
