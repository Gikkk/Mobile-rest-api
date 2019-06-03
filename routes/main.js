const express = require('express');
const router = express.Router();

// Postman check, Get request, 
router.get("/", (req, res) => {
    res.send("Welcome to Rest Api")
});

module.exports = router;