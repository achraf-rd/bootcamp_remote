const mongoose = require('mongoose');

// Import Mongoose

// Define the schema for the product model
const productSchema = new mongoose.Schema({
    name : {type : String , required : true},
    price : {type : Number , required : true , min : 0},
    description : String,
    inStock:  {type : Boolean , default : true},//Boolean (default to true)
    isDeleted: { type: Boolean, default: false },
    expirationDate: { type: Date, default: Date.now },
},
{ timestamps: true});
// Create the product model using the schema
const Product = mongoose.model('Product', productSchema);

Product.statics.findProducts = function (query) {
    return this.find(query);
};

//Update Product by Name
Product.statics.updateProduct = await function (name, update) {
    return this.findOneAndUpdate({ name: name }, update);  
/*Soft Delete Products:
Modify the schema to include a new field named isDeleted with a default value of false.
Implement a function to "soft delete" a product by setting the isDeleted field to true.
Log the soft-deleted product if found; otherwise, indicate that the product was not found.*/

Product.statics.softDeleteProduct = function (name) {
    return this.findOneAndUpdate({ name: name }, { isDeleted: true }
    );
}

/*Hard Delete Expired Products:
Extend the schema to include a new field named expirationDate of type Date.
Insert a product with an expiration date in the past.
Implement a function to "hard delete" products whose expirationDate has passed.
Log the number of hard-deleted products*/

Product.statics.hardDeleteExpiredProducts = function () {
    return this.deleteMany({ expirationDate: { $lt: new Date() } }
    );
}

/*Bulk Update Products:
Implement a function to update the description of all products that are currently in stock.
Log the number of products updated.*/

Product.statics.bulkUpdateProducts = function (update) {
    return this.updateMany({ inStock: true }, update
    );
}

/*Bulk Delete Out-of-Stock Products:
Implement a function to delete all products that are currently out of stock.
Log the number of products deleted.*/

Product.statics.bulkDeleteOutOfStockProducts = function () {
    return this.deleteMany({ inStock: false }
    );
}





// Export the product model
module.exports = Product;