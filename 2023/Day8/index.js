const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').split('\r\n');

const pattern = input[0].split("");
const maps = input.slice(2).reduce((totalMap, subMap) => {
    totalMap[subMap.substring(0, 3)] = [subMap.substring(7, 10), subMap.substring(12, 15)];
    return totalMap;
}, {});

function findNextLocation(start, pattern) {
    return (pattern === 'L') ? maps[start][0] : maps[start][1];
}

function traverseNodeSequence(startKey, endFunction) {
    let count = 0;
    let location = startKey;

    while (!endFunction(location)) {
        location = findNextLocation(location, pattern[count % pattern.length]);
        count++;
    }

    return count;
}

const GCD = (a, b) => !b ? a : GCD(b, a % b);
const LCM = (a, b) => (a * b) / GCD(a, b);

let countPartOne = traverseNodeSequence('AAA', x => x === 'ZZZ');

let steps = [];
let locations = Object.keys(maps).filter(x => x[2] === 'A');
for (let i = 0; i < locations.length; i++) {
    steps.push(traverseNodeSequence(locations[i], x => x[2] === 'Z'));
}
let countPartTwo = steps.reduce(LCM);

console.log("Part 1:", countPartOne);
console.log("Part 2:", countPartTwo);