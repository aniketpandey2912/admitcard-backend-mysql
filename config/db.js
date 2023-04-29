require("dotenv").config();
const { createPool } = require("mysql2");

const db = createPool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE || "admitcarddb",
});

module.exports = {
  db,
};
