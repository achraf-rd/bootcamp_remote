import restaurants from './restaurants';
let hour  = 13 //new Date().getHours()
const dollarSigns = '$$';
const deliveryTimeMax = '90';
const maxDistance = 10;
let result ;

const priceBracket = dollarSigns.length;

const filteredRestaurants = restaurants.filter((restaurant) => {
  if (Number(restaurant.priceBracket) > priceBracket) {
    return false;
  }

  if (restaurant.deliveryTimeMinutes > Number(deliveryTimeMax)) {
    return false;
  }

  if (Number(restaurant.distance )> maxDistance) {
    return false;
  }
  /* if(hour>Number(restaurant.closeHour) || hour<Number(restaurant.openHour)){
    return false ;
  } */

  return restaurant;
});

if (filteredRestaurants.length === 0) {
  result = 'There are no restaurants available right now.';
} else {
  result = `We found ${filteredRestaurants.length} restaurants, the first is ${filteredRestaurants[0].name}.`;
}
console.log(hour);
console.log(result);
