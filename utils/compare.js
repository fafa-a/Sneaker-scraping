const fs = require("fs");
const Diff = require("diff");

const data = require("../data.json");
const data2 = require("../data2.json");

const data01 = fs.readFile("data.json", (err, data) => {
  if (err) throw err;
  const result = JSON.parse(data);
});
const data02 = fs.readFile("data2.json", (err, data) => {
  if (err) throw err;
  const result = JSON.parse(data);
});

const diff = Diff.diffJson(data, data2);
const add = [];
const remove = [];
const result = [];

const resultDiff = diff.forEach((part) => {
  if (part.added === true) {
    add.push = part.value;
  }
  if (part.removed === true) {
    remove.push = part.value;
  }
});

/***********
 *  FIND A WAY TO FIND DIFFERRENCE BETWEEN 2 JSON FILE
 */

const searchDiff = Diff.diffSentences(add.push, remove.push);
// for (const index of searchDiff) {
//   console.log(index);

//   const value = index.value;
//   result.push = value;
// }

// console.log(searchDiff.length);
// console.log(searchDiff);

// console.log(searchDiff[0].value);
// console.log(searchDiff[1].value);

// console.log(Object.entries(searchDiff));
const i = Object.keys(searchDiff);
// console.log(Object.values(searchDiff));
for (const [key, value] of Object.keys(searchDiff)) {
  console.log(`${key}: ${value}`);
}

// console.log(result);

// console.log(result);
// console.log(add.push);
// console.log(remove.push);
