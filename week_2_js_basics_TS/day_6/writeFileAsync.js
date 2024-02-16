const fs = require('fs/promises'); // Using fs.promises for promise-based file operations

function writeFileAsync(filePath, content) {
  console.log("writing");
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, content, 'utf8')
        .then(() => {
          resolve(`File written successfully at ${filePath}`);
        })
        .catch((error) => {
         // Handling errors, e.g., write permissions
          if (error.code === 'EACCES') {
            reject(`Error: Permission denied. Unable to write to ${filePath}`);
          } else {
            reject(`Error writing to file: ${error.message}`);
          }
        });
    });
  }

  module.exports = writeFileAsync;