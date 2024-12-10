// Day 3: Mull It Over
// Solved 12/10/2024

const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');

let regex = /mul\((\d+),(\d+)\)|don't\(\)|do\(\)/g
let match;

let enabled = true;

let P1 = 0;
let P2 = 0;

while ((match = regex.exec(input)) !== null) {
    let operation = match[0].slice(0, 3);

    switch (operation) {
        case "mul":
            P1 += match[1] * match[2];
            if (enabled) P2 += match[1] * match[2];
            break;
        case "do(":
            enabled = true;
            break;
        case "don":
            enabled = false;
    }
}
console.log(P1);
console.log(P2);