var knex = require('knex')({
    client: 'mysql',

    connection: {
        host: 'localhost',
        user: 'root',
        port: 3306,
        password: 'acesso',
        database: 'projeto_tora',
    }

 });

module.exports = knex