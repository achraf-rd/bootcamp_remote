
let arr = [0, 4, 6, 8, 8, 8, 5, 5, 7];

function setReducer(arr) {
    while(arr.length-1) {
      arr = arr.reduce((acc,current,i)=>{
        if(current!=arr[i-1]) acc.push(1)
        else acc[acc.length-1]++
        console.log(acc);
        return acc
        
      }, [])
      
    }
    return arr.pop()
  }

  console.log(setReducer(arr));

