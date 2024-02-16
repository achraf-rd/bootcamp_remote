const fsp = require('fs').promises ;
const fs = require('fs') ;

//first element in the callback queue
fs.writeFile('testsync.txt', 'Hello, world!', 'utf-8', (err) => {  
    if (err) throw err;
    console.log('File written successfully 1.');
});

async function a () {
    try {
        const mes = await fsp.readFile('test.txt', 'utf-8');
        console.log('File readed successfully 2.');
        return mes;
    } catch (err) {
        console.error('Error reading to file:', err);
    }

}


async function main() {
    const v = await a()
    console.log(v);
}
main();
console.log('End of the program');