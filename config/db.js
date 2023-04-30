require("dotenv").config();
const { createPool } = require("mysql2");

const db = createPool({
  host: process.env.HOST || "localhost",
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE || "admitcarddb",
  connectionLimit: 10,
});

module.exports = {
  db,
};
