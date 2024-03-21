/* project-root/
|-- node_modules/
|-- src/
|   |-- controllers/
|   |   |-- userController.js
|   |   |-- postController.js
|   |-- middleware/
|   |   |-- authentication.js
|   |-- models/
|   |   |-- User.js
|   |   |-- Post.js
|   |-- routes/
|   |   |-- userRoutes.js
|   |   |-- postRoutes.js
|   |-- app.js
|-- .env
|-- package.json
*/

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT;
const uri = process.env.MONGODB_URI;

mongoose
  .connect(uri)
  .then(() => {
    console.log('Connected to database');
  })
  .catch((error) => {
    console.log('Error connecting to database: ', error);
  });



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

