const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();

// CSRF Protection
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);

//xss protection
const he = require('he');

// input validation

const { check, validationResult } = require('express-validator');

app.use(express.json());
// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Sample Vulnerable Node.js Application');
});

app.get('/login', (req, res) => {
  res.send(`
    <h1>Login</h1>
    <form action="/login" method="POST">
      <input type="text" name="username" placeholder="Username" required><br>
      <input type="password" name="password" placeholder="Password" required><br>
      <input type="hidden" name="_csrf" value="${req.csrfToken()}"> <!-- CSRF token -->
      <button type="submit">Login</button>
    </form>
  `);
});

app.post('/login',[
  // Validate and sanitize input
  check('username').isAlphanumeric().trim(),
  check('password').isLength({ min: 5 }).trim(),
], (req, res) => {
  console.log(req.body);
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
  if (!csrfToken || !req.csrfToken() === csrfToken) {
    return res.status(403).send('Invalid CSRF token');
  }
  const { username, password } = req.body;
  // Authenticate user (vulnerable code for the challenge)
   // Sanitize user input
   const sanitizedUsername = he.encode(username);
   const sanitizedPassword = he.encode(password);

  const csrfToken = req.body._csrf;
  if (username === 'admin' && password === 'password') {
    req.session.authenticated = true;
    res.redirect('/profile');
  } else {
    res.send('Invalid username or password');
  }
});


app.get('/profile', (req, res) => {
  if (req.session.authenticated) {
    res.send(`<h1>Welcome to your profile, ${req.session.username}</h1>`);
  } else {
    res.redirect('/login');
  }
});

// Server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
