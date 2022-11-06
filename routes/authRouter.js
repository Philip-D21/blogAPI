const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");


const AuthController = require("../controller/authController");

router.post( "/signup",passport.authenticate('signup', { session: false }), AuthController.signup)
router.post("/login", passport.authenticate('login', { session: false }),AuthController.login)
//router.get( "/profile", passport.authenticate('profile', { session: false }),AuthController)


module.exports = router;
