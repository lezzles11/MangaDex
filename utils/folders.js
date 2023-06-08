const fs = require("fs");
const _ = require("lodash");
const { numberOfSimilarities, orderBy } = require("./arrays");

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
    fs.writeFileSync("./test2.json", stringed);
  }
}
let test = new Test();
// test.one();
// test.two();
// test.three();

function renameAndDelete() {
  let FOLDER_NAME = "./data";
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
}

function getSimilarData(getFunction, condition) {
  let myData = fs.readFileSync("./myData.json");
  let parsed = JSON.parse(myData);
  let data = [];
  fs.readdirSync("./data").forEach((file) => {
    if (file.endsWith(".json")) {
      let getData = fs.readFileSync(`./data/${file}`);
      let arr = JSON.parse(getData);
      let pass = getFunction(parsed, arr, condition);
      if (pass) {
        data.push(arr);
        data = _.flattenDeep(data);
      }
    } else {
      console.log("not json");
    }
  });
  return orderBy(data);
}

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
  return orderBy(data);
}

module.exports = { renameAndDelete, getSimilarData, getData };
