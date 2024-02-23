require('dotenv').config();

const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');

const jwt = require("jsonwebtoken");

const {body , validationResult} = require('express-validator');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log('Logging middleware:', req.method, req.url, new Date().toLocaleString());
    next();
  });
// Middleware

app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: process.env.SECRET_KEY, resave: false, saveUninitialized: false }));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(csurf({ cookie: true }));
console.log('loaded');



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

  const user = jwt.verify(token, "secret");
  if(!user) {
      return res.status(403).json({ message: "Unauthenticated user" });
  }
  req.user = user;
  next();
}

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
  console.log('body :',req.body);

    // if (!csrfToken || req.csrfToken() !== csrfToken) {
    //   return res.status(403).send('Invalid CSRF token');
    // } 

  const { username, password } = req.body;

    if (username === 'admin' && password === 'password') {
      req.session.isAuthenticated = true;
      const token = jwt.sign({ username: username }, "secret", {
        expiresIn: "1800s",
      });
      // res.json({ message: "Login Successful", token: token });
      // res.redirect('/dashboard');
      res.render('sendToken', { token : token });
    }else {
      res.redirect('/');
    }
});



app.get('/dashboard',isAuthtenticated, (req, res) => {
  // Secure the dashboard route to only allow authenticated users
  if (req.session.isAuthenticated) {
    res.render('dashboard');
  } else {
    res.redirect('/');
  }
});

app.use((req, res, next) => {
  res.status(404).send('Not found');
});             


//
app.use((err, req, res, next) => {
  //handle the csrs token error
  if (err.code !== 'EBADCSRFTOKEN') return next(err);

  // handle CSRF token errors here
  res.status(403);
  res.send('Invalid CSRF token');
});



app.use((err, req, res, next) => {

  console.error('error stack :',err.stack);
  res.status(500).send('Something broke!');
});




app.listen(3000, () => {
  console.log('Server started on port 3000');
});
