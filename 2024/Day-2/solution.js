// Day 2: Red-Nosed Reports
// Solved 12/9/2024

const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').split(/\r?\n/);

const runSequence = levels => {
    let direction = levels[0] - levels[1];

    if (direction > 0) {
        for (let i = 1; i < levels.length; i++) {
            let dist = levels[i - 1] - levels[i];
            if (dist > 0 && dist < 4) {
                continue;
            } else {
                return false;
            }
        }
        return true;
    } else if (direction < 0) {
        for (let i = 1; i < levels.length; i++) {
            let dist = levels[i] - levels[i - 1];
            if (dist > 0 && dist < 4) {
                continue;
            } else {
                return false;
            }
        }
        return true;
    } else {
        return false;
    }
};

const findSafeCombination = levels => {
    for (let i = 0; i < levels.length; i++) {
        let mutation = levels.slice(0, i).concat(levels.slice(i + 1));
        if (runSequence(mutation)) {
            return true;
        }
    }
    return false;
};

const rawToLevels = raw => raw.split(" ").map(Number);

let P1 = 0;
for (let i = 0; i < input.length; i++) {
    (runSequence(rawToLevels(input[i])) && P1++);
}
console.log(P1);

let P2 = 0;
for (let i = 0; i < input.length; i++) {
    (findSafeCombination(rawToLevels(input[i])) && P2++);
}
console.log(P2);