// Step 1: Set up the project
const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const app = express();

// Step 2: Configure Passport.js

// Configure session management
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false
}));

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Configure serialization and deserialization of user data
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Step 3: Create Login Routes

const User = require('./models/User');

// User registration route
app.post('/register', (req, res) => {
  const { email, password } = req.body;

  // Create a new user record and hash the password
  const newUser = new User({ email, password });
  newUser.save();

  res.redirect('/login');
});

// User login route
app.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login'
}));

// User logout route
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// Step 4: Implement Local Authentication Strategy

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, (email, password, done) => {
  User.findOne({ email }, (err, user) => {
    if (err) return done(err);
    if (!user) return done(null, false);

    // Compare the provided password with the stored user password
    user.comparePassword(password, (err, isMatch) => {
      if (err) return done(err);
      if (!isMatch) return done(null, false);

      return done(null, user);
    });
  });
}));

// Step 5: Protect Routes

// Example protected route
app.get('/dashboard', isAuthenticated, (req, res) => {
  // Only accessible to authenticated users
  res.render('dashboard');
});

// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
