const connections = require('../database/connections')
const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.post('/usuario', userController.inserir);

router.get('/usuario', userController.listar);

router.get('/usuario/:id', userController.obter);

router.put('/usuario/:id', userController.atualizar);

router.delete('/usuario/:id', userController.excluir);

router.post('/login', userController.autenticar);

module.exports = router;