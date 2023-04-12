const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const bcrypt = require('bcrypt');

const app = express();

const saltRounds = 10;

app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

connection.getConnection((err, conn) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database');
    conn.release();
  }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Signup
app.post('/signup', async (req, res) => {
  const { email, password, displayName } = req.body;

  // Validate the input here

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    connection.query(
      'INSERT INTO users (email, password, display_name) VALUES (?, ?, ?)',
      [email, hashedPassword, displayName],
      (error, results) => {
        if (error) {
          console.error('Error in the INSERT query:', error);
          res.status(500).send({ error });
        } else {
          res.status(201).send({ message: 'User registered successfully' });
        }
      }
    );
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).send({ error });
  }
});

// Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Validate the input here
    if (!email || !password) {
        return res.status(400).send({ message: 'Email and password are required' });
    }

    connection.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
        if (error) {
            res.status(500).send({ error });
        } else {
            const user = results[0];
            if (!user) {
                res.status(401).send({ message: 'Invalid email or password' });
            } else {
                const match = await bcrypt.compare(password, user.password);
                if (!match) {
                    res.status(401).send({ message: 'Invalid email or password' });
                } else {
                    res.status(200).send({ message: 'Login successful', user });
                }
            }
        }
    });
});
