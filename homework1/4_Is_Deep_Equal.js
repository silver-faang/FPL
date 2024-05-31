// Create a function isDeepEqual which gets two parameters (objects or arrays) and checks if they are equal by value:

function isDeepEqual(a, b) {
    if (typeof a !== 'object' || typeof b !== 'object') {
        return a === b;
    }
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) {
        return false;
    }
    for (let key of keysA) {
        if (!keysB.includes(key) || !isDeepEqual(a[key], b[key])) {
            return false;
        }
    }
    return true;
}

const a = { prop1: 1, list: [1, 2, 3], o: { x: 2 } };
const b = { list: [1, 2, 3], o: { x: 2 } };
console.log(a,b," are deepEqual",isDeepEqual(a, b));
b.prop1 = 1;
console.log(a,b," are deepEqual",isDeepEqual(a, b));