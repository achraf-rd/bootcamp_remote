//imports
require('dotenv').config();
const express = require('express');
const {body , validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
//passport
const passport = require('passport');
const flash = require('connect-flash'); // Assuming you use connect-flash for flash messages
const session = require('express-session');
const methodOverride = require('method-override');

const initializePassport = require('./passport-config');

initializePassport(
    passport,
    email => Users.find(user => user.email === email),
    id => Users.find(user => user.id === id)
    )



//instances 
const app = express();
const Users = [{username: 'admin', password: 'password'}, {username: 'user', password: 'password'}];

//middlewares
app.use(express.json());

app.use(express.urlencoded({ extended: false }))//to inject the data from the form into the request object

app.use(session
    ({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false, 
    //  cookie: { secure: true }, // Example cookie configuration, adjust as needed
    })
); //session config 
app.use(flash())//midleware to show the flash messages
app.set('view engine', 'ejs');
//logs

app.use((req, res, next) => {
console.log('Logging middleware:', req.method, req.url, new Date().toLocaleString());
next();
});

app.use(passport.initialize())//
app.use(passport.session())//to inplement the serialization and deserialization of the user
app.use(methodOverride('_method'))//to use the delete method in the form

console.log('loaded');

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

app.get('/' ,(req, res) => {
    res.render('index', {owner: "rachid"});
  });

//routes
const validationMiddlewares = [
body('username').isLength({ min: 4 }).trim().escape(),
body('password').isLength({ min: 4 }).trim().escape(),
// Add more validation middlewares here
]; 
app.get('/login',checkNotAuthenticated, (req, res) => {
    res.render('login');
});

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: false
  }));



app.get('/register',checkNotAuthenticated, (req, res) => {
    res.render('register');
  })

  app.post('/register',checkNotAuthenticated,async (req, res) => {
   
    
    const { username, password } = req.body;
    const similar  = Users.filter((el)=> el.username === username && el.password === password);
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
  app.get('/dashboard',checkAuthenticated, (req, res) => {
    // Secure the dashboard route to only allow authenticated users
      res.render('dashboard'); 
  });

  
  app.delete('/logout',checkAuthenticated, (req, res) => {
      req.logOut()//destroy the session and the cookies and logout the user  
      res.redirect('/login')
    })
  
//functions
  function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { //the main methode to authenticate users
        console.log('autenticated');
      return next()
    }
    console.log('not autenticated');
    return res.redirect('/login')
  }
  
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    return next()
  }

 
app.listen(3000, () => {    
console.log('Server started on port 3000');
});
