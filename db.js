const { Pool } = require('pg')
const dotenv = require('dotenv')

dotenv.config()

const client = new Pool({
    user: 'benrichardson',
    host: 'localhost',
    database: 'todo',
    password: '',
    port: 5432,

})

module.exports = client;