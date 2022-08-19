const { response } = require('express')
const database = require('../database/connections')

class userController {
    novaTarefa(req, res) {
        const {email, nome, sobrenome, senha} = req.body

        console.log("AAAAAA",email, nome, sobrenome, senha)

        database.insert({email, nome, sobrenome, senha}).table("usuarios").then(data=>{
            console.log(data)
            response.json({message:"Tarefa criada com sucesso!"})
        }).catch(error=>{
            console.log("EEEEEEEE", error) 
        })
    }
}

module.exports = new userController()