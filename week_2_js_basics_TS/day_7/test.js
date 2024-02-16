/* function isIsogram(str) {
    const arr = str.toLowerCase().split('');
  
    const isIsogramResult = arr.reduce((acc, current) => {
      if (!acc.includes(current)) {
        acc.push(current);
      } else {
        acc.isIsogram = false;
      }
      return acc;
    }, []);
   
    return isIsogramResult.isIsogram;
  }
  
  const res = isIsogram('DermatoDlyphics');
  console.log(res); // Output: false
  
 */
  let aged = true;
  let realAge = '0';
  
  if (aged) {
    realAge = '4 years';
  }
  
  let dogAge = realAge * 7;
  
  console.log(`${dogAge} years`);
  