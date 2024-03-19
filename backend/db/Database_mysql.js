const mysql = require('mysql');


const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

const connectDatabaseMysql = () => {
    db.connect((err) => {
        if (err) {
            throw err;
        }else{
            console.log('Connected to MySQL database');
        }
    });
};

module.exports = connectDatabaseMysql;