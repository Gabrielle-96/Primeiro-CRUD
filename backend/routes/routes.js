const connection = require('../database/connections')
const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.post('/nova-tarefa', userController.novaTarefa)
// router.get('/nova-tarefa', (req, res) =>{
//     return res.json("Ok")
// })

module.exports = router 