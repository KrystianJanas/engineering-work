import { Router } from "express";
const router = Router();

import PeopleController from "../controllers/api/peopleController.js";
import UserController from "../controllers/api/userController.js";
import AnnouncementController from "../controllers/api/announcementController.js";
import ConversationController from "../controllers/api/conversationController.js";
import MessageController from "../controllers/api/messageController.js";
import ObservedController from "../controllers/api/observedController.js";
import EstateController from "../controllers/api/estateController.js";
import EstateInvitationController from "../controllers/api/estateInvitationController.js";
import EstateMessageController from "../controllers/api/estateMessageController.js";
import EstateCostController from "../controllers/api/estateCostController.js";
import EstateSettlementController from "../controllers/api/estateSettlementController.js";

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

// konwersacje
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

// wiadomosci
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
router.put("/estates/add_renter/:id", EstateController.addNewRenterToEstate);
router.put("/estates/remove_renter/:id", EstateController.removeRenterFromEstate);
router.delete("/estates/:id", EstateController.deleteEstate);

// nieruchomości -> wiadomości
router.get("/estates/messages/:id", EstateMessageController.getMessages);
router.post("/estates/messages", EstateMessageController.saveMessage);

// nieruchomości -> koszty stałe
router.get("/estates/costs/:id", EstateCostController.getCosts);
router.post("/estates/costs", EstateCostController.saveCosts);

// nieruchomości -> rozliczenia
router.get("/estates/settlements/:id", EstateSettlementController.getSettlements);
router.get("/estates/settlements/thisMonth/:id", EstateSettlementController.getSettlementInThisMonth);
router.post("/estates/settlements", EstateSettlementController.saveSettlement);
router.delete("/estates/settlements/:id", EstateSettlementController.deleteSettlement);



// zaproszenia do nieruchomości
router.get(
  "/estatesInvitations/person/:id",
  EstateInvitationController.getPersonInvitationsToEstate
);
router.get(
    "/estatesInvitations/estate/:id",
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

export default router;
