const express = require('express');
const cors = require('cors');
const path = require('path');
const mysql = require('mysql2');
const session = require('express-session');
const bcrypt = require('bcrypt');

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from frontend
app.use(express.static(path.join(__dirname, '../frontend')));
app.use(express.static(path.join(__dirname, 'public')));

// Session setup
app.use(session({
  secret: 'shree123testapp', 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '2006shree20',
  database: 'test_db'
});

db.connect(err => {
  if (err) throw err;
  console.log('✅ Connected to the database.');
});

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/home/home.html'));
});

app.use('/login', express.static(path.join(__dirname, '../frontend/login')));

// Serve dashboard only if user is logged in
app.get('/dashboard', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login/login.html'); 
  }
  res.sendFile(path.join(__dirname, '../frontend/dashboard/dashboard.html'));
});

app.get('/check-auth', (req, res) => {
  if (req.session.user) {
    res.json({ loggedIn: true });
  } else {
    res.json({ loggedIn: false });
  }
});

// Signup endpoint
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please fill in all fields.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(query, [name, email, hashedPassword], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error saving user to database.', error: err });
      }
      res.json({ message: 'Signup successful!' });
    });
  } catch (error) {
    res.status(500).json({ message: 'Error processing signup.', error });
  }
});

// Login endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Please enter both email and password.' });
  }

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Error logging in.', error: err });

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Save user data in session
    req.session.user = { id: user.id, email: user.email, name: user.name };
    res.json({ message: 'Login successful!' });
  });
});

// Logout route
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).send('Could not log out.');
    res.redirect('/login');
  });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
