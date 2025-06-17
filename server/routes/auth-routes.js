const express = require('express');
const router = express.Router();
const authController = require("../controllers/auth-controller");
const ValidateMiddleware= require("../middlewares/validate-middleware")
const {registerSchema,loginSchema}= require("../validations/auth-validatioin")
const authMiddleware=require("../middlewares/auth-middleware")
router.route("/me").get(authMiddleware,authController.getMe)
router.route("/register").post(ValidateMiddleware(registerSchema),authController.register)
router.route("/login").post(ValidateMiddleware(loginSchema),authController.login)


module.exports = router;
