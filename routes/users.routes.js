const usersController = require("../controllers/user.controller");

const express = require("express");
const router = express.Router();

router.post("/register", usersController.register);
router.post("/login", usersController.login);
router.get("/user-Profile/:email", usersController.userProfile);
router.get("/update-user", usersController.updateUser);

module.exports = router;