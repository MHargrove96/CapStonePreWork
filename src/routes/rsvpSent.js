const express = require("express");
const router = express.Router();
const rsvpSentController = require("../controllers/rsvpSentController");

router.post("/", rsvpSentController.createNewInvite);
router.get("/admin-all", rsvpSentController.listAllRsvp);
router.get("/user/:id", rsvpSentController.listAllByUserID);
router.get("/guest/:id", rsvpSentController.getByGuestID);
router.put("/:id", rsvpSentController.updateInvite);
router.delete("/delete/:id", rsvpSentController.removeInvite);

module.exports = router;
