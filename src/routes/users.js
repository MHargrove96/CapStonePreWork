const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const { checkJWT } = require("../controllers/authController");

router.get("/", usersController.listAllUsers);
router.get("/:id", usersController.getUserByID);
router.post("/usersignup", usersController.createUser);
router.put("/:id",  usersController.editUser);
router.delete("/:id", usersController.removeUser);

module.exports = router;
