const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').split('\r\n').map(s => s.substring(s.indexOf(":") + 2));

function checkValidGame(string, red, green, blue) {
    let str = string.split(";").map(s => s.split(","));
    let gameValid = true;

    for (let j = 0; j < str.length; j++) {
        for (let k = 0; k < str[j].length; k++) {

            let colorString = str[j][k].trim().split(" ");
            let num = colorString[0];
            let color = colorString[1];

            switch (color) {
                case "red":
                    if (num > red) gameValid = false;
                    break;
                case "green":
                    if (num > green) gameValid = false;
                    break;
                case "blue":
                    if (num > blue) gameValid = false;
                    break;
            }

        }
    }

    return gameValid;
}

function getSetPower(string) {
    let str = string.split(";").map(s => s.split(","));

    let redMax = 0;
    let greenMax = 0;
    let blueMax = 0;

    for (let j = 0; j < str.length; j++) {
        for (let k = 0; k < str[j].length; k++) {
            
            let colorString = str[j][k].trim().split(" ");
            let num = +colorString[0];
            let color = colorString[1];

            switch (color) {
                case "red":
                    if (num > redMax) redMax = num;
                    break;
                case "green":
                    if (num > greenMax) greenMax = num;
                    break;
                case "blue":
                    if (num > blueMax) blueMax = num;
                    break;
            }

        }
    }

    return redMax * greenMax * blueMax;
}

let id = 1;
let idTotal = 0;
let setTotal = 0;

for (let i = 0; i < input.length; i++) {
    if (checkValidGame(input[i], 12, 13, 14)) {
        idTotal += id;
    }
    id++;

    setTotal += getSetPower(input[i]);
}

console.log("Part 1:", idTotal);
console.log("Part 2:", setTotal);