const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection config
// triggering azure deployment
const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'mysql-chandra.mysql.database.azure.com',
  user: 'saichandra1022@mysql-chandra', // ✅ use full username format
  password: 'Ts07hs@3822',       // 🔒 your actual password
  database: 'studentdb',                // make sure this DB exists
  ssl: {
    rejectUnauthorized: true
  }
});


db.connect((err) => {
  if (err) {
    console.error('❌ Database connection failed:', err.stack);
    return;
  }
  console.log('✅ Connected to Azure MySQL Database!');

  // Create database if it doesn't exist
  db.query('CREATE DATABASE IF NOT EXISTS studentdb', (err, result) => {
    if (err) {
      console.error("❌ Couldn't create DB:", err);
    } else {
      console.log("✅ Database 'studentdb' ensured.");
    }
  });
});


app.get('/api/students', (req, res) => {
  db.query('SELECT * FROM students', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
