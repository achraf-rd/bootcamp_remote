const express = require('express');
const app = express();
const port = 3000;

let products = [
  { id: 1, name: 'iPhone 12 Pro', price: 1000 },
  { id: 2, name: 'Samsung Galaxy S21', price: 999.99 },
  { id: 3, name: 'Sony PlayStation 5', price: 499.99 },
  { id: 4, name: 'MacBook Pro 16', price: 2399.99 },
  { id: 5, name: 'DJI Mavic Air 2', price: 799.99 },
];

app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// error handler midleware
const availableRoutes = ['/products', '/products/search', '/products/:id', '/'];

app.use((req, res, next) => {
  const rout = req.path;
  console.log('request route : ',rout);
  if (!availableRoutes.includes(rout)) {
    res.send('Route not found');
    return;
  }
  next();
});


app.use((req, res, next) => {
  // In a real application, you would perform actual authentication logic here
  const isAuthenticated = true; // For the sake of example, assuming the user is authenticated
  if (isAuthenticated) {
    console.log('Authenticated');
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
});



app.get('/', (req, res) => {
  res.send('Welcome to my Express.js server!');
});


app.get('/products', (req, res) => {
  //we cant send and json in the same route
  res.json(products);
});


app.get('/products/search', (req, res) => {
    const { q, minPrice, maxPrice} = req.query
    console.log(q,minPrice,maxPrice);   
    let pro = products.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()) && p.price >= minPrice && p.price <= maxPrice);
    if(!pro.length){
        res.json('product not found');
        return ;
    }
    res.json(pro);
  });

app.get('/products/:id', (req, res) => {
    
    const { id } = req.params;
    let pro = products.find((product) => product.id === parseInt(id));
    if(!pro){
        res.json('product not found id is required');
        return ;
    }
    res.json(pro);

  }
);



  //how to post a product :  {"name":"iphone 13","price":1200}
app.post('/products', (req, res) => {
    let npro = req.body;
    if(!npro.name || !npro.price){
        res.json('name and price are required');
        return ;
    }
        npro['id'] = products.length + 1;
        products.push(npro);
        res.json(products);
  }
);

//{"name":"iphone 13","price":1200}
app.put('/products/:id', (req, res) => {
    const {id} = req.params
    let mpro = req.body;
    if(!id){     
        res.json('id is required');
        return ;
    }
    mpro['id'] = parseInt(id);
    products[id-1] = mpro;
    res.json(products);
  }
);

app.delete('/products/:id', (req, res) => {
    const { id } = req.params;
    products.forEach((product, index) => {
        if(product.id === parseInt(id)){
            products.splice(index,1);
        }else {
            res.json('product not found');
            return
        }
    });  
    res.json(products);
  }
);

app.listen( port , () => {
    console.log(`listening at http://localhost:${port}`);
});
