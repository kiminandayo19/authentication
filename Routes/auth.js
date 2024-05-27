const express = require("express");
const { registerSchema, loginSchema } = require("../utils/schema");
const AuthController = require("../Controllers/authController");

const router = express.Router();
const authController = new AuthController();

router.post(
  "/register",
  authController.registerValidation(registerSchema),
  authController.register
);
router.post(
  "/login",
  authController.loginValidation(loginSchema),
  authController.login
);

module.exports = router;
