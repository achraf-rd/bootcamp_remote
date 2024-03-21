const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/users")
  .then(() => console.log("Connected to the database"))
  .catch((error) => console.log("Error: ", error)); 


const usershemas = new mongoose.Schema({
          name : {type : String , required : true},
          price : {type : Number , required : true , min : 0},
          description : String,
          inStock:  {type : Boolean , default : true},//Boolean (default to true)
          createdAt : {type : Date , default : Date.now}
})
ProductModel = mongoose.model('Products',usershemas);

// for(let i =0 ; i<10 ; i++){
// const product = new ProductModel({
//   name : 'product'+Math.floor(Math.random()*1000) + 1,
//   price : 25,
//   description : 'description',
//   inStock : true,
//   createdAt : new Date()
// })
// product.save().then((product) => console.log('product created succesfully: ',product.name)).catch((error) => console.log('Error creating product: ',error));
// }

// ProductModel.find()
//             .sort({price : -1})
//             .then((products) => {
//               products.forEach(element => console.log('products sorted by price: ',element.name  + ' ' + element.price)); 
//             });

// ProductModel.find()
//             .limit(5)
//             .then((products) => {
//               products.forEach(element => console.log('products limited to 5: ',element.name  + ' ' + element.price)); 
//             });

// const pageSize = 2;
// const pageNumber = 3;


// ProductModel.find()
//             .skip((pageNumber - 1) * pageSize)
//             .limit(pageSize)
//             .then((products) => {
//               products.forEach(element => console.log('products paginatd: ',element.name  + ' ' + element.price)); 
//             });


// ProductModel.aggregate([
//     {
//       $group : {
//         _id : "inStock",
//         count : {$sum : 1}
//       }
//     }

// ]).then((groups) =>  console.log(groups)); 

// ProductModel.aggregate([{
//   $group : {
//     _id : "",
//     averagprice  : {$avg : "$price"}
//   }
// }]).then((groups) =>  console.log(groups)); 

// ProductModel.find()
//             .sort(
//               {name : 1}
//             ).then((products) => {
//               products.forEach(element => console.log('products sorted by name: ',element.name  + ' ' + element.price)); 
//                });


//add category to all products

ProductModel.find()
  .then((products) => {
    // Use map to create an array of update operations
    const updateOperations = products.map((product) => {
      const category = product.price < 200 ?  "clothes" : "electronics";
      return {
        updateOne: {
          filter: { _id: product._id },
          update: [{ $set: { category: category } }] ,
        },
      };
    });

    // Use bulkWrite to execute multiple update operations
    return ProductModel.bulkWrite(updateOperations);
  })
  .then((result) => {
    console.log(`${result.modifiedCount} products updated with categories.`);
  })
  .catch((error) => {
    console.error('Error updating products:', error);
  })
  .finally(() => {
    mongoose.disconnect();
  });

// ProductModel.aggregate([
//   {
//     $group: {
//       _id: '$category',
//       count: { $sum: 1 },
//       products: { $push: '$$ROOT' }, // Optionally, you can include the entire documents in the result
//     },
//   },
// ])
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.error('Error aggregating products:', error);
//   })
//   .finally(() => {
//     mongoose.disconnect();
//   });


// realised that i have use the array in lms 
// const productsToInsert = [
//   {
//     name: 'Laptop',
//     price: 1200,
//     description: 'High-performance laptop with powerful specs.',
//     inStock: true,
//   },
//   {
//     name: 'Smartphone',
//     price: 800,
//     description: 'Latest smartphone with advanced features.',
//     inStock: true,
//   },
//   {
//     name: 'Headphones',
//     price: 150,
//     description: 'Over-ear headphones with noise-cancelling technology.',
//     inStock: true,
//   },
//   {
//     name: 'Smartwatch',
//     price: 250,
//     description: 'Fitness tracker and smartwatch with health monitoring.',
//     inStock: false,
//   },
//   {
//     name: 'Camera',
//     price: 600,
//     description: 'Digital camera with high-resolution imaging.',
//     inStock: true,
//   },
//   {
//     name: 'Gaming Console',
//     price: 400,
//     description: 'Next-gen gaming console for immersive gaming experiences.',
//     inStock: true,
//   },
//   {
//     name: 'Bluetooth Speaker',
//     price: 80,
//     description: 'Portable Bluetooth speaker with crisp sound.',
//     inStock: true,
//   },
//   {
//     name: 'Tablet',
//     price: 300,
//     description: 'Slim and lightweight tablet for on-the-go productivity.',
//     inStock: true,
//   },
//   {
//     name: 'Coffee Maker',
//     price: 50,
//     description: 'Automatic coffee maker for brewing your favorite coffee.',
//     inStock: true,
//   },
//   {
//     name: 'Fitness Tracker',
//     price: 100,
//     description: 'Wearable fitness tracker with heart rate monitoring.',
//     inStock: false,
//   },
//   {
//     name: 'External Hard Drive',
//     price: 120,
//     description: 'Large-capacity external hard drive for data storage.',
//     inStock: true,
//   },
//   {
//     name: 'Wireless Mouse',
//     price: 30,
//     description: 'Ergonomic wireless mouse for comfortable computing.',
//     inStock: true,
//   },
//   {
//     name: 'Portable Charger',
//     price: 20,
//     description: 'Compact portable charger for on-the-go device charging.',
//     inStock: true,
//   },
//   {
//     name: 'Smart Bulbs',
//     price: 15,
//     description: 'Set of smart bulbs for customizable lighting at home.',
//     inStock: true,
//   },
//   {
//     name: 'Backpack',
//     price: 40,
//     description: 'Durable backpack with multiple compartments for storage.',
//     inStock: true,
//   },
//   {
//     name: 'Wireless Earbuds',
//     price: 120,
//     description: 'True wireless earbuds for immersive audio experiences.',
//     inStock: false,
//   },
//   {
//     name: 'Graphic Tablet',
//     price: 200,
//     description: 'Digital graphic tablet for artists and designers.',
//     inStock: true,
//   },
//   {
//     name: 'Desk Chair',
//     price: 150,
//     description: 'Comfortable desk chair with adjustable features.',
//     inStock: true,
//   },
//   {
//     name: 'Air Purifier',
//     price: 80,
//     description: 'HEPA air purifier for cleaner and fresher indoor air.',
//     inStock: true,
//   },
//   {
//     name: 'Electric Toothbrush',
//     price: 40,
//     description: 'Electric toothbrush for effective dental care.',
//     inStock: true,
//   },
// ];
// // Insert the array of products into the collection
// ProductModel.insertMany(productsToInsert)
//   .then((result) => {
//     console.log(`${result.insertedCount} products inserted successfully.`);
//   })
//   .catch((error) => {
//     console.error('Error inserting products:', error);
//   })
//   .finally(() => {
//     mongoose.disconnect();
//   });
