const database = require('../database/connections')
const bcrypt = require('bcrypt');

class userController {
    inserir(req, res) {
        let { email, nome, sobrenome, senha, cep, endereco, numero, bairro, cidade, estado } = req.body;
        const saltRounds = 10;
        senha = bcrypt.hashSync(senha, saltRounds);

        database.insert({ email, nome, sobrenome, senha, cep, endereco, numero, bairro, cidade, estado }).table("usuarios").then(inserir => {
            res.json({ message: "Usuário cadastrado com sucesso!!" });
        }).catch(error => {
            console.log(error);
            res.status(400).json({ status: 400, message: "Erro ao cadastrar usuário" });
        });
    }

    listar(req, res) {
        database.select("id", "email", "nome", "sobrenome", "cep", "endereco", "numero", "bairro", "cidade", "estado").table("usuarios").then(usuario => {
            res.json(usuario);
        }).catch(error => {
            console.log(error);
            res.status(400).json({ status: 400, message: "Erro ao listar usuários" });
        });
    }

    obter(req, res) {
        const id = req.params.id;

        database.select("id", "email", "nome", "sobrenome", "cep", "endereco", "numero", "bairro", "cidade", "estado").table("usuarios").where({ id: id }).then(usuario => {
            if (usuario.length > 0) {
                res.json(usuario[0]);
            } else {
                res.json("");
            }
        }).catch(error => {
            console.log(error);
            res.status(400).json({ status: 400, message: "Erro ao obter usuário" });
        });
    }

    atualizar(req, res) {
        const id = req.params.id
        const { email, nome, sobrenome, cep, endereco, numero, bairro, cidade, estado } = req.body;

        database.where({ id: id }).update({
            email: email, nome: nome, sobrenome: sobrenome, cep: cep, endereco: endereco,
            numero: numero, bairro: bairro, cidade: cidade, estado: estado
        }).table("usuarios").then(resultado => {
            res.json({ message: "Usuário atualizado com sucesso!!" });
        }).catch(error => {
            console.log(error);
            res.status(400).json({ status: 400, message: "Erro ao atualizar usuário" });
        });
    }

    excluir(req, res) {
        const id = req.params.id

        database.where({ id: id }).del().table("usuarios").then(resultado => {
            res.json({ message: "Usuário excluído com sucesso!!" });
        }).catch(error => {
            console.log(error);
            res.status(400).json({ status: 400, message: "Erro ao excluir usuário" });
        });
    }

    atualizarSenha(req, res) {
        const id = req.params.id
        let { senha } = req.body;
        const saltRounds = 10;
        senha = bcrypt.hashSync(senha, saltRounds);

        database.where({ id: id }).update({ senha: senha }).table("usuarios").then(atualizarSenha => {
            res.json({ message: "Senha do usuário atualizada com sucesso!!" });
        }).catch(error => {
            console.log(error);
            res.status(400).json({ status: 400, message: "Erro ao atualizar senha do usuário" });
        });
    }

    obterAutenticado(req, res) {
        res.json({ usuario: {
                nome: req.user.nome,
                email: req.user.email
        } });
    }
}

module.exports = new userController();