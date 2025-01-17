const express = require("express");
const router = express.Router();
const {
  createPageController,
  createHisaabController,
  viewHisaabController,
  viewPasscodeHisaab,
  editHisaabPageController,
  editHisaabController,
  deleteHisaabController,
} = require("../controllers/hisaab-controller");
const { isLoggedIn } = require("../middlewares/isLoggedIn");

router.get("/create", isLoggedIn, createPageController);
router.post("/create", isLoggedIn, createHisaabController);

router.get("/view/:id", isLoggedIn, viewHisaabController);
router.post("/verify/:id", isLoggedIn, viewPasscodeHisaab);

router.get("/edit/:id", isLoggedIn, editHisaabPageController);
router.post("/edit/:id", isLoggedIn, editHisaabController);

router.get("/delete/:id", isLoggedIn, deleteHisaabController)

module.exports = router;