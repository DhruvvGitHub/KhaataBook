const express = require('express');
const router = express.Router();
const {createPageController} = require('../controllers/hisaab-controller')

router.get("/", createPageController);

module.exports = router;