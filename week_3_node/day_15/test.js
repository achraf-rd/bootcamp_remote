function onlyDuplicates(str) {
    arr = str.split('');
    arr.fore
    return arr.reduce((acc,a)=>{
       let count = arr.reduce((acc,b) => {
      if(a===b){
        acc++;
      }
      return acc 
    },0)
  let duplicated = count > 1;
        
       if(duplicated){
         acc.push(a);
       }
      return acc;
    },[]).join('');
  }

function onlyDuplicates(str) {
    return str.split('').filter(e => str.indexOf(e) != str.lastIndexOf(e)).join('')
  }
const Test = require('@codewars/test-compat');

describe("Basic tests",function() {
it("Small numbers",function() {
    Test.assertEquals(onlyDuplicates('abccdefee'), 'cceee')
    Test.assertEquals(onlyDuplicates('hello'), 'll')
    Test.assertEquals(onlyDuplicates('colloquial'), 'ollol')
    Test.assertEquals(onlyDuplicates('foundersandcoders'), 'ondersndoders')
})})