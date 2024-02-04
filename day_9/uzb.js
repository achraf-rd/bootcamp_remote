function processArray(arr) {
    while (arr.length > 1) {
        let result = [];
        let i = 0;

        while (i < arr.length) {
            let count = 1;

            // Count consecutive identical numbers
            while (i + 1 < arr.length && arr[i] === arr[i + 1]) {
                count++;
                i++;
            }

            // Append count if greater than 1, else append 1
            result.push(count > 1 ? count : 1);

            i++;
        }

        arr = result;
    }

    return arr[0];
}

// Test example
let testArray = [0, 4, 6, 8, 8, 8, 5, 5, 7];
let result = processArray(testArray);
console.log(result);
