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
import UploadController from "../controllers/api/uploadController.js";
import InvoiceController from "../controllers/api/invoiceController.js";

import jwt from "jsonwebtoken";


function authenticate(req, res, next) {
    let token = req.headers.authorization;

    try {
        if (!token) {
            return res.sendStatus(401);
        }

        token = token.split(' ')[1];

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(401);

            req.user = user;
            next();
        });
    } catch(err) {
        if (err) return res.sendStatus(401);
    }
}

// ludzie
router.get("/people", PeopleController.getPeople);
router.get("/people/:id", PeopleController.getPerson);
router.post("/people", PeopleController.savePerson);
router.put("/people/:id", PeopleController.updatePerson);
router.delete("/people/:id", PeopleController.deletePerson);

// autentykacja...????
router.post("/auth", UserController.saveUser);
router.post("/auth/login", UserController.getUser);
router.put("/auth/updatePassword", authenticate, UserController.updatePassword); // check, if it works - delete this comment

// ogłoszenia
router.get("/announcements", authenticate, AnnouncementController.getAnnouncements);
router.get("/announcements/:id", authenticate, AnnouncementController.getAnnouncement);
router.get("/announcements/person/:id/:status", AnnouncementController.getAnnouncementsByPerson);
router.post("/announcements", authenticate, AnnouncementController.saveAnnouncement);
router.put("/announcements/:id", authenticate, AnnouncementController.updateAnnouncement);
router.delete("/announcements/:id", authenticate, AnnouncementController.deleteAnnouncement);

// konwersacje
router.get("/conversations/from/:id", authenticate, ConversationController.getConversationsFrom);
router.get("/conversations/to/:id", authenticate, ConversationController.getConversationsTo);
router.get("/conversations/checkExistFrom/:announcement_id/:person_from", authenticate, ConversationController.getConversationsCheckExistFrom);
router.get("/conversations/", authenticate, ConversationController.getConversations);
router.post("/conversations", authenticate, ConversationController.saveConversation);
router.delete("/conversations/:id", authenticate, ConversationController.deleteConversation);

// wiadomosci
router.get("/messages/:id", authenticate, MessageController.getMessages);
router.post("/messages", authenticate, MessageController.saveMessage);

// obserwowane ogłoszenia
router.get("/observed/:id", authenticate, ObservedController.getObservedAnnouncements);
router.post("/observed", authenticate, ObservedController.saveObserved);
router.delete("/observed/:id", authenticate, ObservedController.deleteObserved);

// nieruchomości
router.get("/estates", authenticate, EstateController.getEstates);
router.get("/estates/:id", authenticate, EstateController.getEstate);
router.get("/estates/person/:id/:status", authenticate, EstateController.getEstatesByPerson);
router.get("/estates/renter/:id/:status", authenticate, EstateController.getEstatesByRenter);
router.post("/estates", authenticate, EstateController.saveEstate);
router.put("/estates/:id", authenticate, EstateController.updateEstate);
router.put("/estates/add_renter/:id", authenticate, EstateController.addNewRenterToEstate);
router.put("/estates/remove_renter/:id", authenticate, EstateController.removeRenterFromEstate);
router.delete("/estates/:id", authenticate, EstateController.deleteEstate);

// nieruchomości -> wiadomości
router.get("/estates/messages/:id", authenticate, EstateMessageController.getMessages);
router.post("/estates/messages", authenticate, EstateMessageController.saveMessage);

// nieruchomości -> koszty stałe
router.get("/estates/costs/:id", authenticate, EstateCostController.getCosts);
router.post("/estates/costs", authenticate, EstateCostController.saveCosts);

// nieruchomości -> rozliczenia
router.get("/estates/settlements/:id", authenticate, EstateSettlementController.getSettlements);
router.get("/estates/settlements/thisMonth/:id", authenticate, EstateSettlementController.getSettlementInThisMonth);
router.post("/estates/settlements", authenticate, EstateSettlementController.saveSettlement);
router.delete("/estates/settlements/:id", authenticate, EstateSettlementController.deleteSettlement);

// nieruchomości -> faktury
router.get("/estates/invoices/:id", authenticate, InvoiceController.getInvoices);
router.post("/estates/invoices/:id", authenticate, InvoiceController.saveInvoice);
router.delete("/estates/invoices/:id", authenticate, InvoiceController.deleteInvoice);
router.put("/estates/invoices/payment/:id", authenticate, InvoiceController.updatePaymentRenterInvoice);
router.get("/estates/invoices/download/:name", authenticate, InvoiceController.downloadInvoice);




// zaproszenia do nieruchomości
router.get(
  "/estatesInvitations/person/:personID",
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

router.post("/upload/pictures", UploadController.saveImage);


router.get('/users/me', (req, res) => {
    let token = req.headers.authorization;
    try {
        if (!token) return res.sendStatus(401);
        token = token.split(' ')[1];

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(401);
            res.json(user);
        })
    } catch(err) {
        return res.sendStatus(401);
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie('_user');
    res.clearCookie('_token');

    res.status(204).json();
});

export default router;
