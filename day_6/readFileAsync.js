const fs = require('fs/promises'); // Using fs.promises for promise-based file operations

function readFileAsync(Path) {
  console.log("reading the file");
    return new Promise((resolve, reject) => {
      // Using fs.readFile to read the file asynchronously
      fs.readFile(Path, 'utf8')
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          // Handling errors, e.g., file not found
          if (error.code === 'ENOENT') {
            reject(`Error: File not found at ${Path}`);
          } else {
            reject(`Error reading file: ${error.message}`);
          }
        });
    });
}
module.exports = readFileAsync;