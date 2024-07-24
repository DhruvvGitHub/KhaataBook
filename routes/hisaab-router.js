const express = require('express');
const router = express.Router();
const {createPageController, createHisaabController} = require('../controllers/hisaab-controller');
const { isLoggedIn } = require('../middlewares/isLoggedIn');

router.get("/create", isLoggedIn, createPageController);
router.post("/create", isLoggedIn, createHisaabController);

module.exports = router;