// Create a function spiral , which gets two deimension array and return onedimensional array with elements positioned by spiral, ex.:

function spiral(matrix) {
    const result = [];

    while (matrix.length) {
        result.push(...matrix.shift());
        matrix.forEach(row => row.length && result.push(row.pop()));
        matrix.length && result.push(...matrix.pop().reverse());
        matrix.slice().reverse().forEach(row => row.length && result.push(row.shift()));
    }

    return result;
}

const a = [[4, 5], [6, 7]];
const b = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
const c = [
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20]
];
console.log(JSON.stringify(a), " is spiral: ", spiral(a));
console.log(JSON.stringify(b), " is spiral: ", spiral(b));
console.log(JSON.stringify(c), " is spiral: ", spiral(c));