

const readFileAsync = require('./readFileAsync');
const writeFileAsync = require('./writeFileAsync');
const processFiles = require('./processFiles');

const path = require('path');

const filePaths = [
  path.resolve(__dirname, 'f1.txt'),
  path.resolve(__dirname, 'f2.txt'),
  path.resolve(__dirname, 'f3.txt')
];

const filePath = filePaths[0];

const contentWrite = "I'am writting to this file by 'writeFileAsync function'  " ;
   // Provide an array of file paths to processFiles
   async function pross(filePaths) {
    try{
        await processFiles(filePaths);
      }catch(error){
        console.error(`Error processing files: ${error.message}`);
      } 
   }
  pross(filePaths); 
  // Reading the file
  readFileAsync(filePath)
    .then((data) => {
      console.log(`File content:\n${data}`);
  
      // Writing to the file
      const newContent = contentWrite;
      return writeFileAsync(filePath, newContent);
    })
    .then((successMessage) => {
      console.log(successMessage);
    })
    .catch((error) => {
      console.error(error);
    });
    setTimeout(() => console.log('1'),1000);
