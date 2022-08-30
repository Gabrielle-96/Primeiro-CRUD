const database = require('../database/connections');
const bcrypt = require('bcrypt');

class loginController {

    autenticar(req, res) {
        let { email, senha } = req.body;
        //const saltRounds = 10;
        // senha = bcrypt.hashSync(senha, saltRounds);

        database.select('id', 'nome', 'senha')
            .from('usuarios')
            .where('email', '=', email)
            //.where('senha', '=', senha)
            .then(usuarios => {
                if (usuarios.length > 0) {
                    if (bcrypt.compareSync(senha, usuarios[0].senha)) {
                        res.json(usuarios);
                    } else {
                        res.status(400).json({ message: "E-mail ou senha incorretos" });
                    }
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