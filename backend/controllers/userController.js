const database = require('../database/connections')
const md5 = require('md5');

class userController {
    novoUsuario(req, res) {
        let { email, nome, sobrenome, senha } = req.body
        senha = md5(senha);
        console.log("AAAAAA", email, nome, sobrenome, senha);

        database.insert({ email, nome, sobrenome, senha }).table("usuarios").then(data => {
            console.log(data)
            res.json({ message: "Usuário cadastrado com sucesso!" });
        }).catch(error => {
            res.status(400).json({ status: 400, message: "Erro ao cadastrar usuário" });
        })
    }
}

module.exports = new userController()