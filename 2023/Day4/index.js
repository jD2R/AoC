const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').split('\r\n');

/* Part 1 (runs fast) */

function findMatches(card) {
    let newCard = card.substring(card.indexOf(":") + 2).split(" | ").map(c => c.trim().split(/\s+/));
    let intersection = newCard[0].filter(x => newCard[1].includes(x));

    return intersection.length;
}

function calculateScore(matches) {
    return Math.pow(2, (matches - 1)) | 0;
}

let sumPartOne = 0;

input.forEach(cardData => {
    sumPartOne += calculateScore(findMatches(cardData));
});

/* Part 2 (runs really slowly) */

let sumPartTwo = 0;

let cardInstances = new Array(input.length).fill(1)

input.forEach((cardData, number) => {

    let cachedInstances = cardInstances[number];
    for (let i = 0; i < cachedInstances; i++) {
        let copies = findMatches(cardData);

        for (let j = 0; j < copies; j++) {
            cardInstances[number + (j + 1)]++;
        }
    }

    console.log(number, " DONE");
    console.log(cardInstances);

});

sumPartTwo = cardInstances.reduce((acc, cur) => acc + cur, 0);

/* Output */

console.log("Part 1:", sumPartOne);
console.log("Part 2:", sumPartTwo);