const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors({
  origin: "http://localhost:3000",
}));
app.use(bodyParser.json());

// PostgreSQL connection
const pool = new Pool({
  user: "admin",
  host: "postgres",
  database: "testdb",
  password: "admin123",
  port: 5432,
});

// Create table if not exists
pool.query(`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100),
    email VARCHAR(100),
    message TEXT
  )
`);

// API to insert data
app.post("/submit", async (req, res) => {
  const { username, email, message } = req.body;

  try {
    await pool.query(
      "INSERT INTO users (username, email, message) VALUES ($1, $2, $3)",
      [username, email, message]
    );
    res.send("Data saved!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving data");
  }
});

app.listen(5000, "0.0.0.0", () => {
  console.log("Server running on port 5000");
});