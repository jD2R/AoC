// Day 4: Ceres Search
// Solved 12/20/2024

const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').split(/\r?\n/);

const GRID_SIZE = input.length;

function findStrings(x, y, targetString) {
    if (input[y][x] !== targetString[0]) return false;

    let strings = new Array(8).fill("");

    for (let i = 0; i < targetString.length; i++) {
        strings[0] += input[y - i]?.[x - i];
        strings[1] += input[y - i]?.[x];
        strings[2] += input[y - i]?.[x + i];
        strings[3] += input[y]?.[x - i];
        strings[4] += input[y]?.[x + i];
        strings[5] += input[y + i]?.[x - i];
        strings[6] += input[y + i]?.[x];
        strings[7] += input[y + i]?.[x + i];
    }

    return strings.filter(str => str === targetString).length;
}
function findXMAS(x, y) {
    if (input[y][x] !== 'A') return false;

    let str1 = `${input[y - 1]?.[x - 1]}${input[y + 1]?.[x + 1]}`.split('').sort().join('');
    let str2 = `${input[y + 1]?.[x - 1]}${input[y - 1]?.[x + 1]}`.split('').sort().join('');

    return +(str1 === 'MS' && str2 === 'MS');
}

let P1 = 0;
let P2 = 0;
for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
        P1 += findStrings(x, y, 'XMAS');
        P2 += findXMAS(x, y);
    }
}
console.log(`P1: ${P1}`);
console.log(`P2: ${P2}`);