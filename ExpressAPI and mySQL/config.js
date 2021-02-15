const dotenv = require("dotenv");
dotenv.config();

const mysql = require('mysql');
let connection;
try {
    connection = mysql.createConnection({
        host: process.env.DBHOST,
        user: process.env.DBUSERNAME,
        password: process.env.DBPASSWORD,
        database: process.env.DBNAME
    });
} catch (error) {
    console.log("We got an error");
}


module.exports = {connection}