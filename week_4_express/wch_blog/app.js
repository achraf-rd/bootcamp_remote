const express = require('express');
const app = express();
const port = 3000;
const routes = require('./routes/blogRoutes');

//this file containe just the express handling

app.use(express.json());

app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.path}`);
    next();
    });

//routes handeler
app.use(routes);


//error handler
app.use((req, res) => {
    res.status(404).json({error: 'Not Found'});
});

//lisening loop
app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});
