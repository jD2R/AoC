const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').split('\r\n').map(x => x.split(" "));

const HAND_SIZE = 5;
const RANK_A = "23456789TJQKA";
const RANK_B = "J23456789TQKA";

function getPrimaryRank(string, jokerMode) {
    let counts = {};
    let cardArray = string.split("");

    for (let i = 0; i < HAND_SIZE; i++) {
        counts[cardArray[i]] = (counts[cardArray[i]] || 0) + 1;
    }
    if (jokerMode && counts["J"]) {
        if (Object.values(counts).length !== 1) { // JJJJJ
            let max = 0;
            let highestKey = 0;
            
            for ([key, value] of Object.entries(counts)) {
                if (value > max && key !== "J") {
                    max = value;
                    highestKey = key;
                }
            }
    
            counts[highestKey] += counts["J"]
            delete counts["J"];
        }
    }
    counts = Object.values(counts);

    if (counts.length === 1) {
        return 6; // FIVE_OF_A_KIND
    } else if (counts.length === 2 && counts.includes(4)) {
        return 5; // FOUR_OF_A_KIND
    } else if (counts.length === 2 && counts.includes(3)) {
        return 4; // FULL_HOUSE
    } else if (counts.length === 3 && counts.includes(3)) {
        return 3; // THREE_OF_A_KIND
    } else if (counts.length === 3 && counts.includes(2)) {
        return 2; // TWO_PAIR
    } else if (counts.length === 4) {
        return 1; // ONE_PAIR
    } else {
        return 0; // HIGH_CARD
    }
}

function sortHandsPartOne(handA, handB) {
    let rankA = getPrimaryRank(handA[0], false);
    let rankB = getPrimaryRank(handB[0], false);

    let h1 = handA[0];
    let h2 = handB[0];

    if (rankA !== rankB) {
        return rankA - rankB;
    }

    for (let i = 0; i < HAND_SIZE; i++) {
        if (RANK_A.indexOf(h1[i]) !== RANK_A.indexOf(h2[i])) {
            return RANK_A.indexOf(h1[i]) - RANK_A.indexOf(h2[i]);
        }
    }

    return 0;
}
function sortHandsPartTwo(handA, handB) {
    let rankA = getPrimaryRank(handA[0], true);
    let rankB = getPrimaryRank(handB[0], true);

    let h1 = handA[0];
    let h2 = handB[0];

    if (rankA !== rankB) {
        return rankA - rankB;
    }

    for (let i = 0; i < HAND_SIZE; i++) {
        if (RANK_B.indexOf(h1[i]) !== RANK_B.indexOf(h2[i])) {
            return RANK_B.indexOf(h1[i]) - RANK_B.indexOf(h2[i]);
        }
    }

    return 0;
}

let sumPartOne = 0;
let sumPartTwo = 0;

let sortedOne = input.toSorted(sortHandsPartOne);
let sortedTwo = input.toSorted(sortHandsPartTwo);

for (let i = 0; i < input.length; i++) {
    sumPartOne += (i + 1) * +sortedOne[i][1];
    sumPartTwo += (i + 1) * +sortedTwo[i][1];
}

console.log("Part 1:", sumPartOne);
console.log("Part 2:", sumPartTwo);