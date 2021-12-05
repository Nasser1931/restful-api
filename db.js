var mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mydb",
});

con.connect(function (err) {
    if (err) console.log(err);
    console.log("Connected!");
});

export default con;