const mysql = require('mysql')

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'hrwndr',
    database: '2fa_main'
})

con.connect(err => {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = con