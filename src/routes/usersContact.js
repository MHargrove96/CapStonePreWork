const express = require("express");
const router = express.Router();
const usersContactController = require("../controllers/usersContactController.js");
// const { checkJWT } = require("../controllers/authController");

router.get("/", usersContactController.listAll);
router.get("/:id", usersContactController.getByID);
router.post("/add-contact", usersContactController.addContact);
router.put("/:id", usersContactController.updateContact);
router.delete("/:id", usersContactController.removeContact);

module.exports = router;
