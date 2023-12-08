function calculateWins(time, record) {
    let options = 0;

    for (let i = 0; i <= time; i++) {
        if ((time - i) * i > record) {
            options++;
        }
    }

    return options;
}

function calculateRaceMargins(raceIterable) {
    let errorMargin = 1;

    raceIterable.forEach((item, index) => {
        errorMargin *= calculateWins(item[0], item[1]);
    });

    return errorMargin;
}

console.log("Part 1:", calculateRaceMargins([[60, 475], [94, 2138], [78, 1015], [82, 1650]]));
console.log("Part 2:", calculateRaceMargins([[60947882, 475213810151650]]));