const express = require("express");
const router = express.Router();
const {
  homePageController,
  homeLoginController,
  registerPageController,
  registerController,
  profilePageController,
} = require("../controllers/index-controller");

const {isLoggedIn} = require("../middlewares/isLoggedIn")

router.get("/", homePageController);
router.post("/login", homeLoginController);

router.get("/register", registerPageController);
router.post("/register", registerController);

router.get("/profile", isLoggedIn, profilePageController)
module.exports = router;
