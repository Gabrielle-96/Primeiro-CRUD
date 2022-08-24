const database = require('../database/connections')
const md5 = require('md5');

class userController {
    inserir(req, res) {
        let { email, nome, sobrenome, senha, cep, endereco, numero, bairro, cidade, estado } = req.body;
        senha = md5(senha);
        //console.log("AAAAAA", email, nome, sobrenome, senha);

        database.insert({ email, nome, sobrenome, senha, cep, endereco, numero, bairro, cidade, estado }).table("usuarios").then(data => {
            res.json({ message: "Usuário cadastrado com sucesso!" });
        }).catch(error => {
            console.log(error);
            res.status(400).json({ status: 400, message: "Erro ao cadastrar usuário" });
        });
    }

    listar(req, res) {
        database.select("*").table("usuarios").then(listas => {
            res.json(listas);
        }).catch(error => {
            console.log(error);
            res.status(400).json({ status: 400, message: "Erro ao listar usuários" });
        });
    }

    obter(req, res) {
        const id = req.params.id;

        database.select("*").table("usuarios").where({id:id}).then(buscar => {
            res.json(buscar);
        }).catch(error => {
            console.log(error);
            res.status(400).json({ status: 400, message: "Erro ao obter usuário" });
        });
    }

    atualizar(req, res) {
        const id = req.params.id
        const {email:email, nome:nome, sobrenome:sobrenome, senha:senha, cep:cep, endereco:endereco,
            numero:numero, bairro:bairro, cidade:cidade, estado:estado} = req.body

        database.where({id:id}).update({email:email, nome:nome, sobrenome:sobrenome, senha:senha, cep:cep, endereco:endereco,
        numero:numero, bairro:bairro, cidade:cidade, estado:estado }).table("usuarios").then(atualizar => {
            res.json({ message: "Usuário atualizado com sucesso!!" });
        }).catch(error => {
            console.log(error);
            res.status(400).json({ status: 400, message: "Erro ao atualizar usuário" });
        });
    }

    excluir(req, res) {
        const id = req.params.id
        
        database.where({id:id}).del().table("usuarios").then(deletar=> {
            res.json({message: "Usuário excluído com sucesso"});
        }).catch(error=> {
            console.log(error);
            res.status(400).json({ status: 400, message: "Erro ao excluir usuário" });
        });
    }

    autenticar(req, res) {
        let { email, senha } = req.body;
        senha = md5(senha);

        database.select('id', 'nome')
            .from('usuarios')
            .where('email', '=', email)
            .where('senha', '=', senha)
            .then(usuarios => {
                if (usuarios.length > 0) {
                    res.json(usuarios[0]);
                } else {
                    res.status(400).json({ message: "Usuário não encontrado" });
                }
            }).catch(error => {
                console.log(error);
                res.status(400).json({ status: 400, message: "Erro ao encontrar usuário" });
            });
    }
}

module.exports = new userController();