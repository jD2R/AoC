const crypto = require('crypto');
const input = require('fs').readFileSync('input.txt', 'utf8');
const MD5 = data => crypto.createHash('md5').update(data).digest('hex');

const checkTarget = (data, target) => data.slice(0, target.length) === target;

let counter = 0;

// Part 1
while (!checkTarget(MD5(`${input}${counter}`), '00000')) counter++;
console.log(`Part 1: ${counter}`);

// Part 2
counter = 0;
while (!checkTarget(MD5(`${input}${counter}`), '000000')) counter++;
console.log(`Part 2: ${counter}`);