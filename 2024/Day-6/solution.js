// Day 6: Guard Gallivant
// Solved 12/21/2024

const fs = require('fs');
let input = fs.readFileSync('input.txt', 'utf8').split(/\r?\n/).map(row => row.split(''));

let guardCoords = [95, 67];
let activePos = [...guardCoords, 0, -1]; // x, y, xDir, yDir
let POS = new Set();
let DIR = new Set();

const moveGuard = (pos, roomSize) => {
    let position = pos;
    let xStep = position[0] + position[2];
    let yStep = position[1] + position[3];

    if (xStep < 0 || xStep >= roomSize || yStep < 0 || yStep >= roomSize) {
        return false;
    } else if (input[yStep][xStep] === '#') {
        [position[2], position[3]] = [-position[3], position[2]];
        [xStep, yStep] = [position[0] + position[2], position[1] + position[3]];
    }

    POS.add(`${xStep}.${yStep}`);
    return [xStep, yStep, position[2], position[3]];
};

const runSimulation = () => {
    let loop = 0;
    while (moveGuard(activePos, input.length)) {
        activePos = moveGuard(activePos, input.length);
        POS.add(`${activePos[0]}.${activePos[1]}`);
    
        if (DIR.has(`${activePos[0]}.${activePos[1]}.${activePos[2]}.${activePos[3]}`)) {
            loop++;
            break;
        } else {
            DIR.add(`${activePos[0]}.${activePos[1]}.${activePos[2]}.${activePos[3]}`);
        }
    }
    return loop;
};

const resetSimulation = () => {
    POS.clear();
    POS.add(`${activePos[0]}.${activePos[1]}`);
    DIR.clear();
    DIR.add(`${activePos[0]}.${activePos[1]}.${activePos[2]}.${activePos[3]}`);
};

const runPartTwoSimulations = () => {
    let m = 0;
    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input.length; x++) {
            if (input[y][x] === '.') {
                resetSimulation();
                input[y][x] = '#';
                m += runSimulation();
                input[y][x] = '.';
                activePos = [...guardCoords, 0, -1];
            }
        }
    }

    return m;
}

runSimulation();
console.log(`P1: ${POS.size}`);
console.log(`P2: ${runPartTwoSimulations()}`); // Takes ~30 seconds to run
