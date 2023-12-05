const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').split('\n');

let values = { "one": 1, "two": 2, "three": 3,
               "four": 4, "five": 5, "six": 6,
               "seven": 7, "eight": 8, "nine": 9 };

function parseString(string, words) {
    let stack = [];
    let regex = (words) ? new RegExp("(?=("+Object.entries(values).flat().join("|")+"))", "g") :
                          new RegExp("(?=("+Object.values(values).join("|")+"))", "g");

    while ((match = regex.exec(string)) !== null) {
        if (match.index === regex.lastIndex) {
          regex.lastIndex++;
        }
        stack.push(+match[1] || values[match[1]]);
    }

    let final = stack.filter(Number);
    return +`${final[0]}${final.at(-1)}`;
}

let sumPartOne = 0;
let sumPartTwo = 0;

for (let i = 0; i < input.length; i++) {
    sumPartOne += parseString(input[i], false);
    sumPartTwo += parseString(input[i], true);
}

console.log("Part 1:", sumPartOne);
console.log("Part 2:", sumPartTwo);
