const usersController = require("../controllers/user.controller");
// const cors = require('cors');

const express = require("express");
const { application } = require("express");
const router = express.Router();



router.post("/register", usersController.register);
router.post("/login", usersController.login);
router.get("/user-Profile", usersController.userProfile);
router.put("/update-user", usersController.updateUser);
router.put('/deactivate-user', usersController.deactivateUser);

module.exports = router;