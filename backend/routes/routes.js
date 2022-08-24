const connections = require('../database/connections')
const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.post('/usuario', userController.novoUsuario);

router.get('/busca', userController.buscarUsuario)

router.get('/buscar/:id', userController.buscarUnicoUsuario)

router.put('/atualizar/usuario/:id', userController.atualizarDados)

router.delete('/deletar/dados/:id', userController.removerDados)

router.post('/login', userController.login);

router.get('/usuario', (req, res) => {
    return res.json("Ok")
});



module.exports = router 

// function newFunction() {
//     return '/buscar/:id';
// }
