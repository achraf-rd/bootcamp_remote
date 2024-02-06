//const fs = require('fs');
const writeFileAsync = require('../day_6/writeFileAsync');
const csvtojson = require('csvtojson');

const csvFilePath = 'worldcities.csv';  
const jsonFilePath = 'worldcities.json'; 

csvtojson()
  .fromFile(csvFilePath)
  .then((jsonArray) => {
    // Write the JSON array to a file
    console.log(jsonArray.length);
    //fs.writeFileSync(jsonFilePath, JSON.stringify(jsonArray, null, 2), 'utf8');
    return writeFileAsync(jsonFilePath, JSON.stringify(jsonArray, null, 2));
    
  }).then(() => console.log(`Conversion complete. JSON data written to ${jsonFilePath}`))
  .catch((error) => {
    console.error('Error converting CSV to JSON:', error.message);
  });
