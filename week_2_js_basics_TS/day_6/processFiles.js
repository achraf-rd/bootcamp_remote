
const readFileAsync = require('./readFileAsync');
const writeFileAsync = require('./writeFileAsync');

function processFiles(filePaths) {
  console.log("processing");
    const promises = filePaths.map(filePath => {
      // Read the file content
      return readFileAsync(filePath)
        .then(originalContent => {
            if (!originalContent) {
                throw new Error(`Error: Empty content in file ${filePath}`);
              }
          // Manipulate the content (reverse and convert to uppercase)
          const modifiedContent = originalContent
            .split('')
            .reverse()
            .join('')
            .toUpperCase();
  
          const modifiedFilePath =  'fil21'
  
          return writeFileAsync(modifiedFilePath, modifiedContent)
            .then(() => {
              console.log(`File processed: ${filePath} -> ${modifiedFilePath}`);
            });
        })
        .catch(error => {
          console.error(`Error processing file ${filePath}: ${error.message}`);
        });
    });
  
    // Use Promise.all to wait for all file operations to complete
    return Promise.all(promises)
      .then(() => {
        console.log('All files processed successfully.');
      })
      .catch(error => {
        console.error(`Error processing files: ${error.message}`);
      });
  }

module.exports = processFiles;