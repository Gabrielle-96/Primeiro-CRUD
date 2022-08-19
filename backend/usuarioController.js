const db = require('./db');

async function inserir(usuario) {
    const result = await db.query(
      `INSERT INTO usuarios(nome, sobrenome, email, senha)
      VALUES ('${usuario.nome}', '${usuario.sobrenome}', '${usuario.email}',md5('${usuario.senha}'));`
    );
  
    let message = 'Erro ao criar usuario';
  
    if (result.affectedRows) {
      message = 'usuario criado com sucesso';
    }
  
    return {message};
 }

 module.exports = {
    inserir
}