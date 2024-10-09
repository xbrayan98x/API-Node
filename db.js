
const {
    Pool
} = require('pg');

const pool = new Pool({
    host: process.env.HOST_NETWORK_DB, //'localhost',
    port: 5432,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
});

module.exports = pool;