const express = require('express');
const app = express();

// Middleware 1: Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Middleware 2: Authentication middleware
app.use((req, res, next) => {
  // In a real application, you would perform actual authentication logic here
  const isAuthenticated = true; // For the sake of example, assuming the user is authenticated
  if (isAuthenticated) {
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
});

app.get('/example', (req, res) => {
  console.log('Handling the /example route');
  res.send('Hello, this is the response!');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});