
const fsp = require('fs/promises');

const getJsonData = async () => { 
    let data = await fsp.readFile('./data.json', 'utf8', (err) => {
    if (err) {
        console.log(err);
        throw err.message;
    }
        });

  return JSON.parse(data);
}

const postJsonData = async (data) => {
    await fsp.writeFile('data.json', JSON.stringify(data), (err) => {
        if (err) {
            console.log(err);
            throw err.message;
        }
    });
}

module.exports = { 
    getJsonData,
    postJsonData
};