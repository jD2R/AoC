const input = fs.readFileSync('input.txt', 'utf8').split('');
let sum = 0;

input.forEach((i) => {
  i == '(' ? sum++ : sum--;
});

// Part 1
console.log(`Part 1: ${sum}`);

let floor = 0;
let values = [];

input.forEach((i, idx) => {
  i == '(' ? floor++ : floor--;
  if (floor == -1) {
    values.push(idx);
  }
});

console.log(`Part 2: ${values[0]}`);
