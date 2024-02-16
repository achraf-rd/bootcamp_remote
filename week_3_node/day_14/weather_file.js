const fs = require('fs/promises');
const path = require('path');

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
  


//  function selectRandomCity(cities) {
//     const randomIndex = Math.floor(Math.random() * cities.length);
//     console.log('randomIndex,city :',randomIndex,cities[randomIndex]);
//     return cities[randomIndex];
//   }

async function fetchtemp(city){
    const [name, lat, lng] = city;
    console.log('city :',name, lat, lng);

    try {
         const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${parseFloat(lat)}&longitude=${parseFloat(lng)}&current_weather=true`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
         return data.current_weather.temperature ;
      } catch (error) {
        console.error('Error fetching user data:', error.message);
        throw error;
      }
}
async function deleteFileIfExists(filePath) {
    try {
      // Check if the file exists by attempting to access it
      await fs.access(filePath);
  
      // If the access is successful, delete the file
      await fs.unlink(filePath);
      console.log('File deleted successfully.');
    } catch (error) {
      console.log('file may not exist so we cant delet :', error.message);
    }
  }
async function main() {
            try {
            let cities  = await readFileAsync('input.txt');
                
            
            console.log(cities);
            cities = cities.split(',');
            let temp  = await fetchtemp(cities);
            console.log(`temperature in ${cities[0]}: ${temp} `);            
            // fs.access(`${cities[0]}.txt`, fs.constants.F_OK, (err) => {
            //     if (err) {
            //       console.error('File does not exist or cannot be accessed:', err);
            //     } else {
            //       // Delete the file
            //       fs.unlink(`${cities[0]}.txt`, (unlinkErr) => {
            //             if (unlinkErr) {
            //                 console.error('Error deleting file:', unlinkErr);
            //             } else {
            //                 console.log('File deleted successfully.');
            //             }
            //         });
            //     }
            // });
            await deleteFileIfExists(`${cities[0]}.txt`);
            console.log(await writeFileAsync(`${cities[0]}.txt`,`temperature in ${cities[0]}: ${temp} `));
        } catch (error) {
            console.log('file may not exist :', error.message);
        }
}

main();
// let c;
// readFileAsync('input.txt').then((city) => {
//     console.log(city);
//     city = city.split('/n');
//     c = city;
//     return fetchtemp(city);
//     ;}).then((temp) => {
//         console.log(`temperature : ${temp} `);
//         return writeFileAsync(`${c[0]}.txt`,`temperature in ${c[0]}: ${temp} `);
//     }).then((message) => {  
//         console.log(message);
//     }).catch((error) => {
//         console.error(error);
//     }   
//     );

