require("dotenv").config();
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.MYSQLHOST || "mysql.railway.internal",
  port: process.env.MYSQLPORT || 3306,
  user: process.env.MYSQLUSER || "root",
  password: process.env.MYSQLPASSWORD || "kBZiRuwfdXcmNZAnGvMfRscxvaGNTSyc",
  database: process.env.MYSQLDATABASE || "railway",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to Railway MySQL!");
});

module.exports = db;
