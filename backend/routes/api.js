const express = require("express");
const router = express.Router();

const PeopleController = require("../controllers/api/peopleController");
const UserController = require("../controllers/api/userController");
const AnnouncementController = require("../controllers/api/announcementController");
const ConversationController = require("../controllers/api/conversationController");
const MessageController = require("../controllers/api/messageController");
const ObservedController = require("../controllers/api/observedController");
const EstateController = require("../controllers/api/estateController");
const EstateInvitationController = require("../controllers/api/estateInvitationController");

// ludzie
router.get("/people", PeopleController.getPeople);
router.get("/people/:id", PeopleController.getPerson);
router.post("/people", PeopleController.savePerson);
router.put("/people/:id", PeopleController.updatePerson);
router.delete("/people/:id", PeopleController.deletePerson);

// autentykacja...????
router.post("/auth", UserController.saveUser);
router.post("/auth/login", UserController.getUser);
router.post("/auth/updatePassword", UserController.updatePassword); // check, if it works - delete this comment

// ogłoszenia
router.get("/announcements", AnnouncementController.getAnnouncements);
router.get("/announcements/:id", AnnouncementController.getAnnouncement);
router.get(
  "/announcements/person/:id/:status",
  AnnouncementController.getAnnouncementsByPerson
);
router.post("/announcements", AnnouncementController.saveAnnouncement);
router.put("/announcements/:id", AnnouncementController.updateAnnouncement);
router.delete("/announcements/:id", AnnouncementController.deleteAnnouncement);

// wiadomości
router.get(
  "/conversations/from/:id",
  ConversationController.getConversationsFrom
);
router.get("/conversations/to/:id", ConversationController.getConversationsTo);
router.get(
  "/conversations/checkExistFrom/:announcement_id/:person_from",
  ConversationController.getConversationsCheckExistFrom
);
router.get("/conversations/", ConversationController.getConversations);
router.post("/conversations", ConversationController.saveConversation);
router.delete("/conversations/:id", ConversationController.deleteConversation);

router.get("/messages/:id", MessageController.getMessages);
router.post("/messages", MessageController.saveMessage);

// obserwowane ogłoszenia
router.get("/observed", ObservedController.getObserved);
router.get("/observed/:id", ObservedController.getObserved);
router.post("/observed", ObservedController.saveObserved);
router.delete("/observed/:id", ObservedController.deleteObserved);

// nieruchomości
router.get("/estates", EstateController.getEstates);
router.get("/estates/:id", EstateController.getEstate);
router.get("/estates/person/:id/:status", EstateController.getEstatesByPerson);
router.get("/estates/renter/:id/:status", EstateController.getEstatesByRenter);
router.post("/estates", EstateController.saveEstate);
router.put("/estates/:id", EstateController.updateEstate);
router.delete("/estates/:id", EstateController.deleteEstate);

// zaproszenia do nieruchomości
router.get(
  "/estatesInvitations/:id",
  EstateInvitationController.getEstateInvitations
);
router.post(
  "/estatesInvitations",
  EstateInvitationController.saveEstateInvitation
);
router.delete(
  "/estatesInvitations/:id",
  EstateInvitationController.deleteEstateInvitation
);

module.exports = router;
