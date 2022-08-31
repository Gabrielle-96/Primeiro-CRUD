const express = require('express');
const login = require('../middleware/auth');
const router = express.Router()
const userController = require('../controllers/userController')
const loginController = require('../controllers/loginController');

router.post('/usuario', userController.inserir);

router.get('/usuario', userController.listar);

router.get('/usuario/:id', userController.obter);

router.put('/usuario/:id', userController.atualizar);

router.delete('/usuario/:id', userController.excluir);

router.put('/usuario/senha/:id', userController.atualizarSenha);

router.post('/login', loginController.autenticar);

router.get('/usuario-logado', login.required, userController.obterAutenticado);

module.exports = router;