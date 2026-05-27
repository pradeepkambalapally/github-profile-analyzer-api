
const express = require('express');

const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        message : "GitHub Analyzer Testing"
    })
})


module.exports = router;