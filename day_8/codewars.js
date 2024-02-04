
   function isIsogram(str) {
    let flag = true;;
    const arr = str.toLowerCase().split('');
    const acc = [];
    obj={
      flag : flag,
      acc : acc
    }
  
    arr.forEach((current) => {
      if (!acc.includes(current)) {
        acc.push(current);
      } else {
        return false; 
      }
    });
    
    // If 'false' is found in the result array, there is a repeated character
    //return !result.includes(false);
    return obj;
  }
  
  

obj = isIsogram('Demaolyphls');

console.log(obj.flag);
console.log("the word isogramed :",obj.acc.join(''));