const database = require('../database/connections');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passwordjwt = require('../database/password-jwt');

class loginController {

    autenticar(req, res) {
        let { email, senha } = req.body;
        //const saltRounds = 10;
        //senha = bcrypt.hashSync(senha, saltRounds);

        database.select('id', 'nome', 'senha', 'email')
            .from('usuarios')
            .where('email', '=', email)
            //.where('senha', '=', senha)
            .then(usuarios => {
                if (usuarios.length > 0) {
                    if (bcrypt.compareSync(senha, usuarios[0].senha)) {
                    const token = jwt.sign({
                        id: usuarios[0].id,
                        nome: usuarios[0].nome,
                        senha: usuarios[0].senha,
                        email: usuarios[0].email
                    },
                    passwordjwt,
                    {
                        expiresIn: "5min"
                    });

                    res.json({
                        message: "Autenticado com sucesso",
                        token: token,
                        usuario: {
                            nome: usuarios[0].nome,
                            email: usuarios[0].email,
                        }
                    });

                    } else {
                        res.status(401).json({ message: "Falha na autenticação" });
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