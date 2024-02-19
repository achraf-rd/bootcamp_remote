const express = require('express');
const app = express();
const port = 3000;

const proroutes = require('./routes/productRoutes');


app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});




app.use((req, res, next) => {
  // In a real application, you would perform actual authentication logic here
  const isAuthenticated = true; // For the sake of example, assuming the user is authenticated
  if (isAuthenticated) {
    console.log('Authenticated');
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
});



app.get('/', (req, res) => {
  res.send('Welcome to my Express.js server!');
});

app.use('/store',proroutes);


// error handler midleware
const availableRoutes = ['/products', '/products/search', '/products/:id', '/'];

app.use((req, res, next) => {
  const rout = req.path;
  console.log('request route : ',rout);
  if (!availableRoutes.includes(rout)) {
    res.status(404).send('Route not found');
  }
});

app.listen( port , () => {
    console.log(`listening at http://localhost:${port}`);
});


