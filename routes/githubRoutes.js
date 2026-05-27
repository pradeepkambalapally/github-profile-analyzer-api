
const express = require('express');

const router = express.Router();
const {analyzeProfile } = require('../controllers/githubController');

router.get("/analyze/:username", analyzeProfile);


module.exports = router;