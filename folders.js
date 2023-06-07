const fs = require("fs");
const _ = require("lodash");
const axios = require("axios");
const { numberOfSimilarities } = require("./utils");
const { getListData } = require("./mangago");
// Other potentials:
// Lists that have like 10+ similarities
//

class Test {
  one() {
    let data = getData(9.4);
  }
  two() {
    let data = getData(9.4);
    let stringed = JSON.stringify(freqCount(data));
    fs.writeFileSync("./test.json", stringed);
  }
  three() {
    let atLeastTenSimilarities = getSimilarData(10, 9.4);
    let stringed = JSON.stringify(freqCount(atLeastTenSimilarities));
    fs.writeFileSync("./test.json", stringed);
  }
}
let test = new Test();
// test.one();
// test.three();

function getSimilarData(numberSimilar, minRating) {
  let myData = fs.readFileSync("./myData.json");
  let parsed = JSON.parse(myData);
  let data = [];
  fs.readdirSync("./testData").forEach((file) => {
    if (file.endsWith(".json")) {
      let getData = fs.readFileSync(`./testData/${file}`);

      let arr = JSON.parse(getData);
      if (numberOfSimilarities(parsed, arr) >= numberSimilar) {
        const filteredData = arr.filter((obj) => obj.rating > minRating);
        data.push(filteredData);
        data = _.flattenDeep(data);
      }
    } else {
      console.log("not json");
    }
  });
  return data;
}
let FOLDER_NAME = "./testData";
let myData = fs.readFileSync("./myData.json");
let parsed = JSON.parse(myData);
// just get the top that have at least 6, delete the rest.
fs.readdirSync(FOLDER_NAME).forEach((file) => {
  if (file.endsWith(".json")) {
    let fileName = `${FOLDER_NAME}/${file}`;
    let getData = fs.readFileSync(fileName);
    let arr = JSON.parse(getData);
    if (numberOfSimilarities(parsed, arr) <= 6) {
      fs.unlinkSync(fileName);
    } else {
      let numbersOnly = file.split("_");
      numbersOnly = numbersOnly[numbersOnly.length - 1];
      numbersOnly = `${FOLDER_NAME}/${numbersOnly}`;
      fs.renameSync(fileName, numbersOnly);
    }
  } else {
    console.log("not json");
  }
});
function getData(minRating) {
  let data = [];
  fs.readdirSync("./data").forEach((file) => {
    if (file.endsWith(".json")) {
      let getData = fs.readFileSync(`./data/${file}`);
      let arr = JSON.parse(getData);
      const filteredData = arr.filter((obj) => obj.rating > minRating);
      data.push(filteredData);
      data = _.flattenDeep(data);
    } else {
      console.log("not json");
    }
  });
  return data;
}
function freqCount(arr) {
  const frequency = arr.reduce((count, obj) => {
    const key = JSON.stringify(obj);
    count[key] = (count[key] || 0) + 1;
    return count;
  }, {});
  const sortedArray = Object.entries(frequency).sort((a, b) => b[1] - a[1]);
  const sortedObj = Object.fromEntries(sortedArray);
  return sortedObj;
}
