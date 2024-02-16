const http = require('http');
const  url = require('url');
const temp = require('../day_13/weather_api.js');
const server = http.createServer(async (req, res) => {
        const parsedUrl = url.parse(req.url, true);
        const path = parsedUrl.pathname;
        const query = parsedUrl.query;
        console.log('server');
        // Inside the request handler
    if (path === '/weather') {
        console.log('query:',query);
        const city = query;
        const name = city.name;
        const lat = city.lat;
        const lng = city.lng;
        if (!name) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('City parameter is missing');
            return ;
        }
        if (!(lat || lng)) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('coordination parameters are missing');
            return ;
        }
        try{
            let tempetature = await temp(city);
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(`temperature in ${city.name}: ${tempetature} `);
        }catch(error){
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error fetching temperature : '+error.message);
        }
        
    } else if (path === '/products') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('I am a list of products :p');  
    } else {
        res.end('Handle unknown endpoints');
    }

    }
);
const port = 3000;
server.listen(port, () => {
    console.log('Server is listening on port ', port);
  });

console.log('End of the program');