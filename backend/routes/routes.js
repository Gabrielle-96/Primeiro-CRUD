const connections = require('../database/connections')
const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.post('/usuario', userController.novoUsuario);

router.get('/newuser', userController.catalogarUsuario)

router.get('buscar', userController.buscarUnicoUsuario)

router.post('/login', userController.login);

router.get('/usuario', (req, res) => {
    return res.json("Ok")
});



module.exports = router 

function newFunction() {
    return '/buscar/:id';
}
