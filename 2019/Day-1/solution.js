const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').split('\n');

// Part 1
const fuelRequired = input.reduce((a, c) => a + Math.floor(c/3) - 2, 0);
console.log(`Part 1: ${fuelRequired}`);

// Part 2
let totalFuel = 0;
for (let module in input) {
    let newFuel = 0;
}
