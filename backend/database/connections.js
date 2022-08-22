var knex = require('knex') ({
    client: 'mysql',

    connection: {
        host: 'localhost',
        user:  'root',
        port: 3306,
        password: 'acesso',
        database: 'projeto_tora',
    }
});

// connection: {
//     host: 'localhost',
//     user:  'root',
//     port: 3306,
//     password: 'Ineffabilis.22',
//     database: 'projeto_tora',
// }

module.exports = knex