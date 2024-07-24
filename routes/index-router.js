const express = require("express");
const router = express.Router();
const {
  homePageController,
  registerPageController,
  registerController,
} = require("../controllers/index-controller");

router.get("/", homePageController);

router.get("/register", registerPageController);
router.post("/register", registerController);

module.exports = router;
