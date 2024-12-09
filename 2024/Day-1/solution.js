// Day 1: Historian Hysteria
// Solved 12/9/2024

const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').split(/\r?\n/);

let arr1 = [];
let arr2 = [];
let raw = [];

for (let i = 0; i < input.length; i++) {
    raw = input[i].split(/\s+/);
    arr1.push(raw[0]);
    arr2.push(raw[1]);
}

arr1.sort();
arr2.sort();

// -----------------------------------------

let distance = arr1.reduce((acc, v, i) => acc + Math.abs(v - arr2[i]), 0);

const findSimilarityScore = (target, raw) => raw.filter(v => v === target).length * target;
let similarity = arr1.reduce((acc, v) => acc + findSimilarityScore(v, arr2), 0);

// -----------------------------------------

console.log(`Part 1: ${distance}`);
console.log(`Part 2: ${similarity}`);