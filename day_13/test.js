function narcissistic(value) {
    let arr = (''+ value).split('')
    return arr.reduce((acc,cur) => {return acc + (+cur) ** arr.length} ,0) === value ;
  }

  console.log(narcissistic(12) );
  
let i = 0 ;
setInterval(() => {
    let a = i
    i++ ;
},1000);

