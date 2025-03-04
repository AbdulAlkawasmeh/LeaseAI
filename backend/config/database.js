const mysql = require("mysql");

const db = mysql.createConnection({
    host: "dyud5fa2qycz1o3v.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "dxq4wpnxelmveitm",
    password: "q1ah0tbwmls4dcca",
    database: "sp8wofntfetcntjc",
    port: 3306
});

module.exports = db;
