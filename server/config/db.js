const mysql = require('mysql2')

const pool = mysql.createPool({
    host: 'crossover.proxy.rlwy.net',
    user: 'root',
    password: 'ZnisjrNIbFWOzqKrjXGqaShUuxPuJIZb',
    database: 'railway',
    port: 21796,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

const promisePool = pool.promise();

module.exports = promisePool