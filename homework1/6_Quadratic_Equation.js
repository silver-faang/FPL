// Create a function quadraticEquation , which gets koefficients of a quadratic equation, and returns an array with roots of that equation (if they are exist):

function quadraticEquation(a, b, c) {
    const discriminant = b * b - 4 * a * c;
    if (discriminant < 0) {
        return [];
    } else if (discriminant === 0) {
        return [-b / (2 * a)];
    } else {
        const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
        return [root1, root2];
    }
}

console.log("quadraticEquation(1, -8, 72):", quadraticEquation(1, -8, 72));
console.log("quadraticEquation(1, 12, 36):", quadraticEquation(1, 12, 36));
console.log("quadraticEquation(1, 6, 1):", quadraticEquation(1, 6, 1));