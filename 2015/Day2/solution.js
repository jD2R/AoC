const fs = require('fs');
// convert every line of input formatted 'NxNxN' to [N, N, N]
const input = fs.readFileSync('input.txt', 'utf8').split('\r\n').map(str => str.split('x').map(x => parseInt(x, 10)));

// Part 1
const p = input.reduce((acc, c) => acc + (2*c[0]*c[1]) + (2*c[1]*c[2]) + (2*c[2]*c[0]) + Math.min((c[0]*c[1]), (c[1]*c[2]), (c[2]*c[0])), 0);
console.log(`Part 1: ${p}`);

// Part 2
let r = 0;
input.forEach(x => {
    let c = [...x];
    c.splice(x.indexOf(Math.max(...x)), 1);
    r += (c[0] * 2) + (c[1] * 2);
    r += x[0] * x[1] * x[2];
})
console.log(`Part 2: ${r}`);