const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.get("/", usersController.listAllUsers)
router.get("/:id", usersController.getUserByID)
router.post("/usersignup", usersController.createUser)
router.put("/:id", usersController.editUser)




module.exports = router;