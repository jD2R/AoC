// Day 5: Print Queue
// Solved [UPDATE]

const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8')
    .split(/\r?\n\r?\n/)
    .map(e => e.split(/\r?\n/));
const prints = input[1].map(e => e.split(','));

const createDictionary = (arr) => {
    const obj = {};
    let key, value;

    for (let i = 0; i < arr.length; i++) {
        key = arr[i].slice(0, 2);
        value = +arr[i].slice(3);

        (!obj[key] && (obj[key] = []));
        obj[key].push(value);
    }
    return obj;
};

const confirmPrint = (dict, print) => {
    for (let i = 0; i < print.length; i++) {
        let mainTarget = print[i];
        if (!dict[mainTarget]) continue;
        
        for (let j = 0; j < dict[mainTarget].length; j++) {
            let subTarget = dict[mainTarget][j];
            if (print.indexOf(mainTarget) > print.indexOf(String(subTarget)) &&
                print.indexOf(String(subTarget)) !== -1) return false;
        }
    }
    return true;
};

const fixBrokenPrint = (dict, print) => {
    let fixedPrint = [print[0]];

    for (let i = 1; i < print.length; i++) {
        fixedPrint.unshift(print[i]);
        if (confirmPrint(dict, fixedPrint)) continue;
        
        for (let j = 0; j < fixedPrint.length; j++) {
            [fixedPrint[j], fixedPrint[j + 1]] = [fixedPrint[j + 1], fixedPrint[j]];
            if (confirmPrint(dict, fixedPrint)) break;
        }
    }
    return fixedPrint;
};

const runP1 = (dict, prints) => {
    let result = 0;
    let broken = [];
    for (let i = 0; i < prints.length; i++) {
        if (confirmPrint(dict, prints[i])) {
            result += +prints[i][Math.floor(prints[i].length / 2)];
        } else {
            broken.push(prints[i]);
        }
    }
    console.log(`P1: ${result}`);
    return broken;
}
const runP2 = (prints) => {
    let result = 0;

    for (let i = 0; i < prints.length; i++) {
        result += +prints[i][Math.floor(prints[i].length / 2)];
    }
    console.log(`P2: ${result}`);
}

let printDict = createDictionary(input[0]);
let brokenPrints = runP1(printDict, prints).map(e => fixBrokenPrint(printDict, e));
runP2(brokenPrints);