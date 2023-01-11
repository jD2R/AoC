const input = fs.readFileSync('input.txt', 'utf8').split('');

// Part 1
let sum = 0;
input.forEach((i) => {
  i == '(' ? sum++ : sum--;
});
console.log(`Part 1: ${sum}`);

// Part 2
let floor = 0;
let values = [];
input.forEach((i, idx) => {
  i == '(' ? floor++ : floor--;
  if (floor == -1) {
    values.push(idx);
  }
});
console.log(`Part 2: ${values[0]}`);
