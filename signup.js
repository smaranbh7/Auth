const express = require("express");
const bcrypt = require("bcryptjs");
const pool = require("./db"); // Importing from db.js
const router = express.Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user already exists
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (result.rows.length > 0) {
      return res.status(400).send("User already exists");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store the user in the database
    await pool.query("INSERT INTO users (email, password) VALUES ($1, $2)", [email, hashedPassword]);

    res.status(201).send("User registered successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
