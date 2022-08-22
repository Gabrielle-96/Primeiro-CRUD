const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.post('/usuario', (req, res) => {
    return res.json("Certo");
});

router.get('/usuario', (req, res) => {
    return res.json("Ok")
});

module.exports = router 