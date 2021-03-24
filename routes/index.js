const express = require("express");
const router = express.Router();
const passport = require("passport");
const { pass } = require("../config/mongoose");
const home_controller = require("../controller/home_controller");

router.post("/signUp", home_controller.signUp);
router.post(
  "/signIn",
  passport.authenticate("local", { failureRedirect: "/failiure-redirect" }),
  home_controller.createSession
);

router.get("/profile", passport.checkAuthentication, home_controller.profile);
router.get("/failiure-redirect", home_controller.failiureRedirect);
module.exports = router;
