const express = require("express");
const router = express.Router();
const {
  homePageController,
  registerPageController,
  registerController,
  profilePageController,
} = require("../controllers/index-controller");

router.get("/", homePageController);

router.get("/register", registerPageController);
router.post("/register", registerController);

router.get("/profile", profilePageController)
module.exports = router;
