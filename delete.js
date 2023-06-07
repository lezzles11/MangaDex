const _ = require("lodash");
const fs = require("fs");

function getDifference(toCompare, original) {
  const difference = _.differenceWith(
    toCompare,
    original,
    (obj1, obj2) => obj1.title === obj2.title
  );
  return difference;
}
let myData = fs.readFileSync("./myData.json");
let sample = fs.readFileSync("./data/89698.json");
let parsed1 = JSON.parse(myData);
let parsed2 = JSON.parse(sample);
let result = getDifference(parsed2, parsed1);
console.log(result);
