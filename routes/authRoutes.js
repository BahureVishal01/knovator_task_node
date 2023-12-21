const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { validateRegistrationDetails } = require("../validators/validator");
validateRegistrationDetails
router.route("/signup").post(validateRegistrationDetails,authController.signup);
router.route("/login").post(authController.signin);

module.exports = router;
