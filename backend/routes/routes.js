const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.post('/usuario', userController.novoUsuario);

router.get('/usuario', (req, res) => {
    return res.json("Ok")
});

module.exports = router 