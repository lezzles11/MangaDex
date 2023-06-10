const _ = require("lodash");
const fs = require("fs");
const { loopThroughRecList, getListData } = require("./services");
const {
  MY_LIST,
  NAUGHTY_LIST,
  MIN_RATING,
  MIN_SIMILAR,
  MIN_JACCARD,
  MIN_OVERLAP,
  TO_COMPARE,
} = require("./config");
const {
  jaccard,
  overlap,
  minSimilar,
  getSimilarData,
  freqCount,
  renameFile,
  orderBy,
} = require("./utils");

loopThroughRecList(MY_LIST, TO_COMPARE, 1, 400, 6).then((response) => {
  console.log(response, "works");
});
// renameFile();

// let data = getSimilarData(minSimilar, 11);
// let counted = freqCount(data);
// let parsed = JSON.stringify(counted);
// fs.writeFileSync("./output/minSimilar.json", parsed);

function getHent() {
  let data = [];
  fs.readdirSync("./data").forEach((file) => {
    if (file.endsWith(".json")) {
      let getData = fs.readFileSync(`./data/${file}`);
      let arr = JSON.parse(getData);
      data.push(arr);
      data = _.flattenDeep(data);
    } else {
      console.log("not json");
    }
  });
  return orderBy(data);
}

let getHData = getHent();
let counted = freqCount(getHData);
let strung = JSON.stringify(counted);
fs.writeFileSync("./output/similar.json", strung);
