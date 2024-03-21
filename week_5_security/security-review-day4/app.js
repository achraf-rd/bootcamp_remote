require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');
const jwt = require("jsonwebtoken");
const {body , validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const session = require('express-session');
const app = express();

const Users = [{username: 'admin', password: 'password'}, {username: 'user', password: 'password'}];
app.use(express.json());
//logs
app.use((req, res, next) => {
    console.log('Logging middleware:', req.method, req.url, new Date().toLocaleString());
    next();
  });

app.use(session({
  secret: 'secret', 
  resave: false,
  saveUninitialized: true,
}));
// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: process.env.SECRET_KEY, resave: false, saveUninitialized: false }));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(csurf({ cookie: true }));
console.log('loaded');
const bcrypt = require('bcrypt');

// Function to hash a password
async function hashPassword(password) {
  try {
    // Generate a salt (a random string used during the hash generation)
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the password using the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  } catch (error) {
    console.error('Error hashing password:', error);
    throw error; 
  }
}


function isAuthtenticated(req, res, next) {
  const authHeader = req.headers["authorization"];
  console.log(authHeader)
  if  (!authHeader) {
    return res.status(401).json({ message: "Unauthenticated empty" });
  }
  // Bearer token
  const token = authHeader.split(" ")[1];
  console.log(token)
  if(!token) {
      return res.status(401).json({ message: "Unauthenticated" });
  }
  try {
      const user = jwt.verify(token, "secret");
      if(!user) {
          return res.status(403).json({ message: "Unauthenticated user" });
      }
      req.user = user;
      console.log('user' , user);
      next();
  }catch (err) { 
      return res.status(403).json({ message: "Unauthenticated user" });
  } 
  
}
app.get('/dashboard',isAuthtenticated, (req, res) => {
  // Secure the dashboard route to only allow authenticated users
  const userId = req.session.userId;

  if (userId) {
    res.render('dashboard');
  } else {
    res.redirect('/');
  }
});

// Routes
app.get('/' ,(req, res) => {
  res.render('index', { csrfToken: req.csrfToken() });
});

// function validateLogin(req, res, next) {
//   const validationRules = [
//     body('username').isLength({ min: 4 }).trim().escape(),
//     // Add more validation rules here
//   ];

//   Promise.all(validationRules.map(validation => validation.run(req)))
//     .then(() => {
//       const errors = validationResult(req);
//       if (errors.isEmpty()) {
//         return next();
//       }

//       // If there are validation errors, send a response with the errors
//       res.status(400).json({ errors: errors.array() });
//     });
// }

// app.post('/login', validateLogin, (req, res) => {
//   // Your code here
// });

const validationMiddlewares = [
  body('username').isLength({ min: 4 }).trim().escape(),
  body('password').isLength({ min: 4 }).trim().escape(),
  // Add more validation middlewares here
]; 

app.post('/login', validationMiddlewares, (req, res) => { 
  // Validate and authenticate the user
  const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  //Verify CSRF token

    // if (!csrfToken || req.csrfToken() !== csrfToken) {
    //   return res.status(403).send('Invalid CSRF token');
    // } 
  const { username, password } = req.body;
    const user = Users.find((user) => user.username === username && user.password === password);
    if (user) {
      req.session.isAuthenticated = true;
      // const token = jwt.sign({ username: username }, "secret", {
      //   expiresIn: "1800s",
      // });
      req.session.userId = user.id;
      
      // res.json({ message: "Login Successful"});
      // res.redirect('/dashboard');
      //res.render('sendToken', { token : token });
    }else {
      res.redirect('/');
    }
});

app.post('/register',validationMiddlewares, async (req, res) => {
  const errors = validationResult(req); 
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { username, password } = req.body;
  const similar = Users.filter((el)=> el.username === username && el.password === password);
  if(similar.length > 0){
    return res.status(400).json({ message: "User already exist" });
  }
  try {
  const hashedPassword = await hashPassword(password);
  console.log('password hashed');
  Users.push({'username' : username,'password' : hashedPassword});
  res.redirect('/login');
  
  }catch(err) {
    console.log('error');
    res.redirect('/');
  }
});
//not found error handling
app.use((req, res, next) => {
  res.status(404).send('Not found');
});             
//csrf error handling     
app.use((err, req, res, next) => {
  //handle the csrs token error
  if (err.code !== 'EBADCSRFTOKEN') return next(err);

  // handle CSRF token errors here
  res.status(403);
  res.send('Invalid CSRF token');
});
//error stack catching
app.use((err, req, res, next) => {

  console.error('error stack :',err.stack);
  res.status(500).send('Something broke!');
});
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
