const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const app = express();
const saltRounds = 10;
const crypto = require('crypto');
const nodemailer = require('nodemailer');

dotenv.config();
app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

const transporter = nodemailer.createTransport({
  service: 'gmail', // or another email service
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
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

////////////////////////////////////// Signup///////////////////////////////////////////////////

app.post('/signup', async (req, res) => {
  const { email, password, displayName } = req.body;

  // Validate the input here

  // Check if the display_name already exists
  connection.query('SELECT * FROM users WHERE display_name = ?', [displayName], async (error, results) => {
    if (error) {
      console.error('Error during database query:', error);
      res.status(500).send({ error: 'Error during database query', details: error });
    } else if (results.length > 0) {
      // display_name already exists
      res.status(400).send({ message: 'Display name already exists. Please choose another one.' });
    } else {
      try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const token = crypto.randomBytes(32).toString('hex');

        connection.query(
          'INSERT INTO users (email, password, display_name, token) VALUES (?, ?, ?, ?)',
          [email, hashedPassword, displayName, token],
          // rest of the code
        );
      } catch (error) {
        console.error('Error hashing password:', error);
        res.status(500).send({ error: 'Error hashing password', details: error });
      }
    }
  });
});

// Rest of the code (login and verify-email routes)





///////////////////////////////////// Login/////////////////////////////////////////////////////////

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



app.get('/verify-email', (req, res) => {
  const { token } = req.query;

  // Validate the token and activate the user
  connection.query(
    'UPDATE users SET is_verified = 1, token = NULL WHERE token = ?',
    [token],
    (error, results) => {
      if (error) {
        res.status(500).send({ error });
      } else if (results.affectedRows === 0) {
        res.status(400).send({ message: 'Invalid or expired verification link' });
      } else {
        res.status(200).send({ message: 'Email verified successfully. You can now log in.' });
      }
    }
  );
});

app.get('/profile/:userId', (req, res) => {
  const userId = req.params.userId;

  connection.query('SELECT * FROM users WHERE id = ?', [userId], (error, results) => {
    if (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).send({ error: 'Error fetching user profile', details: error });
    } else {
      const user = results[0];
      if (!user) {
        res.status(404).send({ message: 'User not found' });
      } else {
        res.status(200).send({ user });
      }
    }
  });
});
