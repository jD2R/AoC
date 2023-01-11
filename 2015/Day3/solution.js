const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').split('');

const checkCoordinate = (xc, yc, arr) => arr.includes(`${xc}.${yc}`);
const changeDirection = (xc, yc, dir) => {
    switch (dir) {
        case '^':
            return [xc, yc - 1];
        case 'v':
            return [xc, yc + 1];
        case '<':
            return [xc - 1, yc];
        case '>':
            return [xc + 1, yc];
    }
};

// Part 1
let [x, y] = [0, 0];
let coords = ["0.0"];
input.forEach(c => {
    [x, y] = changeDirection(x, y, c);
    if (!checkCoordinate(x, y, coords)) {
        coords.push(`${x}.${y}`);
    }
});
console.log(`Part 1: ${coords.length}`);

// Part 2
let [sx, sy] = [0, 0];
let [rx, ry] = [0, 0];
let santa = true;
coords = ["0.0"];
input.forEach(c => {
    if (santa) {
        [sx, sy] = changeDirection(sx, sy, c);
        if (!checkCoordinate(sx, sy, coords)) {
            coords.push(`${sx}.${sy}`);
        }
        santa = false;
    } else {
        [rx, ry] = changeDirection(rx, ry, c);
        if (!checkCoordinate(rx, ry, coords)) {
            coords.push(`${rx}.${ry}`);
        }
        santa = true;
    }
});
console.log(`Part 2: ${coords.length}`);