function matrixAddition(a = [], b = []){
    return a.map((l,i)=>{
        return l.map((c,j)=>{
            return c += b[i][j];
        });
    });   
    
}

 let sum = matrixAddition(
    [ [8, 2, 3],
      [3, 2, 1],
      [1, 1, 1] ],

    [ [2, 2, 1],
      [3, 2, 3],
      [1, 1, 3] ] );

console.log('sum :',sum);


  


