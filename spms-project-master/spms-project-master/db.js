const mysql = require('mysql');

//local mysql db connection (Pooling)
/*const pool = mysql.createPool({
    connectionLimit : 10,
    host: 'spms.cn7an0phpvtb.us-east-2.rds.amazonaws.com',
    user: 'admin',
    password: 'h0n3YB33',
    database: 'spmsdatabasenew',
    insecureAuth: true,
    bigNumberStrings: true,
    dateStrings: true,
    debug: true,
    trace: true
});*/

const pool = mysql.createPool({
    connectionLimit : 10,
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'spmsdatabasenew',
    insecureAuth: true,
    bigNumberStrings: true,
    dateStrings: true,
    debug: true,
    trace: true
});

module.exports = pool;