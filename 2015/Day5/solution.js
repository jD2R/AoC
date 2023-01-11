const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').split('\n').map(line => line.trim());

// Part 1
const niceStrings = input.filter(s => s.match(/([a-z])\1/) && s.match(/[aeiou].*[aeiou].*[aeiou]/) && !s.match(/ab|cd|pq|xy/));
console.log(`Part 1: ${niceStrings.length}`);

// Part 2
const nicerStrings = input.filter(s => s.match(/([a-z])[a-z]\1/) && s.match(/^.*?([a-z]{2,}).*?(\1).*$/));
console.log(`Part 2: ${nicerStrings.length}`);