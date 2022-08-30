const database = require('../database/connections');
const bcrypt = require('bcrypt');

class loginController {

    autenticar(req, res) {
        let { email, senha } = req.body;
        const saltRounds = 10;
        senha = bcrypt.hashSync(senha, salt);

        database.select('id', 'nome')
            .from('usuarios')
            .where('email', '=', email)
            .where('senha', '=', senha)
            .then(usuarios => {
                if (usuarios.length > 0) {
                    res.json(usuarios);
                } else {
                    res.status(400).json({ message: "Usuário não encontrado" });
                }
            }).catch(error => {
                console.log(error);
                res.status(400).json({ status: 400, message: "Erro ao encontrar usuário" });
            });
    }
}

module.exports = new loginController();