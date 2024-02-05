
/* function group(arr) {
    let newarr = [];
    for(let e of arr){
        if(! (newarr.some(subarray => subarray.includes(e)))){
        let newsub = [];
        newsub = arr.reduce((acc,current,i) => {
            if(e == current) {
                acc.push(current);
                 
            }
            return acc
        },[])
        newarr.push(newsub);
        console.log(arr);
    }
    }

    return newarr;

} */
function group(arr) {
    var result = [];
    while(arr.length > 0)
    {
      console.log(arr);
      result.push(arr.filter(a => a == arr[0]));
      arr = arr.filter(a => a != arr[0]);    
    }
    return result;
  }
console.log(group([3, 2, 6, 2, 1, 3,3,2,1,4,7,8,8,9,5,5,-5,2,2]));