const con = require('./conn')

const createUser = (name, email, password) => {
    const sql = "INSERT INTO `users`(name, email, password) VALUES('" + name + "','" + email + "', '" + password + "')";

    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("User added!!");
    });
}

const loginUser = (email, password) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM `users` WHERE email='" + email + "' AND password='" + password + "'";

        con.query(sql, function (err, result) {
            if (err) reject(err);
            resolve(result)
        });
    })
}

const checkUser = (email) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM `users` WHERE email='" + email + "'";

        con.query(sql, function (err, result) {
            if (err) reject(err);
            resolve(result)
        });
    })
}

module.exports = { createUser, loginUser, checkUser }