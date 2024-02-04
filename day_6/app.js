
const fs = require('fs/promises'); // Using fs.promises for promise-based file operations

// Function to read a file asynchronously and return a Promise
function readFileAsync(filePath) {
  return new Promise((resolve, reject) => {
    // Using fs.readFile to read the file asynchronously
    fs.readFile(filePath, 'utf8')
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        if (error.code === 'ENOENT') {
          reject(`Error: File not found at ${filePath}`);
        } else {
          reject(`Error reading file: ${error.message}`);
        }
      });
  });
}
function writeFileAsync(filePath, content) {
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



function processFiles(filePaths) {
  const promises = filePaths.map(filePath => {
    // Read the file content
    return readFileAsync(filePath)
      .then(originalContent => {
        // Manipulate the content (example: reverse and convert to uppercase)
        const modifiedContent = originalContent
          .split('')
          .reverse()
          .join('')
          .toUpperCase();

        // Create a new file path for the modified content
        const modifiedFilePath = filePath.replace('.txt', '_modified.txt');

        // Write the modified content to a new file
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
  // with sync await 

  /* async function processFiles(filePaths) {
    try {
      for (const filePath of filePaths) {
        // Read the file content
        const originalContent = await readFileAsync(filePath);
  
        // Manipulate the content (example: append a timestamp to each line)
        const modifiedContent = originalContent
          .split('\n')
          .map((line) => `${line.trim()} - ${new Date().toISOString()}`)
          .join('\n');
  
        // Create a new file path for the modified content
        const modifiedFilePath = filePath.replace('.txt', '_modified.txt');
  
        // Write the modified content to a new file
        await writeFileAsync(modifiedFilePath, modifiedContent);
  
        console.log(`File processed: ${filePath} -> ${modifiedFilePath}`);
      }
  
      console.log('All files processed successfully.');
    } catch (error) {
      console.error(`Error processing files: ${error.message}`);
    }
  } */
  if (fs) {
    // Continue with fs-related operations

  //Provide an array of file paths to processFiles
const path = require('path');

const filePaths = [
  path.resolve(__dirname, 'files/f1.txt'),
  path.resolve(__dirname, 'files/f2.txt'),
  path.resolve(__dirname, 'files/f3.txt'),
];

//const filePaths = ['files/f1.txt','files/f2.txt','files/f.txt']

  const filePath = filePaths[0];
  

   
   processFiles(filePaths).then(() => {
    return readFileAsync(filePath);
   }).then((data) => {
      console.log(`File content:\n${data}`);
  
      // Writing to the file
      const newContent = 'New content added asynchronously!';
      return writeFileAsync(filePath, newContent);
    })
    .then((successMessage) => {
      console.log(successMessage);
    })
    .catch((error) => {
      console.error(error);
    });
   
  } else {
    console.log("install the fs module to execut this code <npm install fs>");
  }
setTimeout(() => console.log('1'),1000);
