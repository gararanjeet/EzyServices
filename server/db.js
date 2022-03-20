const mysql = require("mysql2");
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "1234",
  database: "ezyservices",
});

db.connect((err) => {
  if (!err) {
    console.log("Connected Succefully");
  } else {
    console.log(err);
  }
});

module.exports = { db };
