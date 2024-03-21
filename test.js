

// let username = '1' == true || 'salah' === 'admin' && 'passwo' === 'password'

// if (eval(username === 'admin')) {
// }

// console.log('1' == true || 'salah' === 'admin' && 'passwo' === 'password')


// console.log(Math.random()*100 |0);

const text = lorem({
    count: 20,                      // Number of words, sentences, or paragraphs to generate.
    units: 'words',                 // Generate words, sentences, or paragraphs.
    format: 'plain',                // Plain text or html
  });
  
  console.log(text);