const text = 'The quick brown fox jumps over the lazy dog.';
const wordToMatch = 'fox';

// Using match to find a word in the text
const matchResult = text.match(wordToMatch);

if (matchResult) {
  console.log(`Match found: ${matchResult[0]}`);
} else {
  console.log('No match found.');
}


import products from './products'

let shipping : number 
let taxPercent : number 
let taxTotal : number 
let total : number 
let shippingAddress : string
let productName : string
productName = 'fanny pack' ;

const product = products.find(element => element.name === productName );
console.log(product);
 
 if ( product?.preOrder === 'true') console.log("we’ll send you a message when it’s on the way.");

if(Number(product?.price)>= 25){
   shipping = 0;
   console.log("we provide free shipping for this product");
}else shipping = 5;

shippingAddress = 'New York,404'
let match = shippingAddress.match('New York');
if(match) taxPercent = 0.1; else taxPercent = 0.05

if(product){
taxTotal = taxPercent * Number(product.price);
total = taxTotal + Number(product.price) +shipping ;
console.log(`Product name : ${product.name}\nShipping address : ${shippingAddress}\nPrice of the product : ${product.price} $\nTax total : ${taxTotal} $\nShipping : ${shipping} $\nTotal amount : ${total} $`);
}