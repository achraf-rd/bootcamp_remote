const express = require('express');
const router = express.Router();


let products = [
    { id: 1, name: 'iPhone 12 Pro', price: 1000 },
    { id: 2, name: 'Samsung Galaxy S21', price: 999.99 },
    { id: 3, name: 'Sony PlayStation 5', price: 499.99 },
    { id: 4, name: 'MacBook Pro 16', price: 2399.99 },
    { id: 5, name: 'DJI Mavic Air 2', price: 799.99 },
  ]; 

router.get('/products', (req, res) => {
    //we cant send and json in the same route
    res.json(products);
  });
  
  
router.get('/products/search', (req, res) => {
    const { q, minPrice, maxPrice} = req.query
    if(!q || !minPrice || !maxPrice){
    res.json('q, minPrice and maxPrice are required');
    
}
    console.log(q,minPrice,maxPrice);   
    let pro = products.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()) && p.price >= minPrice && p.price <= maxPrice);
    if(!pro.length){
        res.json('product not found');
    
    }
    res.json(pro);
});

router.get('/products/:id', (req, res) => {
    
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
router.post('/products', (req, res) => {
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
router.put('/products/:id', (req, res) => {
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

router.delete('/products/:id', (req, res) => {
    const { id } = req.params;
    let removed = false;
    products.forEach((product, index) => {
        if(product.id === parseInt(id)){
            products.splice(index,1);
            removed = true;
        }
        
    }); 
    if(!removed){
        res.json('product not found');
        return ;
    } 
    res.json(products);
}
);

module.exports = router;