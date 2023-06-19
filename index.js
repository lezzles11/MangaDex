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
  sorensenDice,
  minSimilar,
  getSimilarData,
  freqCount,
  renameFile,
  orderBy,
} = require("./utils");
// did 1-1300
// loopThroughRecList(MY_LIST, TO_COMPARE, 1101, 1500, 6).then((response) => {
//   console.log(response, "works");
// });
// renameFile();
// let data = getSimilarData(jaccard, 0.09);
// let counted = freqCount(data);
// let parsed = JSON.stringify(counted);
// fs.writeFileSync("./output/jaccard.json", parsed);

let data = getSimilarData(overlap, 0.4);
let counted = freqCount(data);
let parsed = JSON.stringify(counted);
fs.writeFileSync("./output/overlap_naughty.json", parsed);

// getListData(NAUGHTY_LIST).then((result) => {
//   let stringed = JSON.stringify(result);
//   console.log(stringed);
//   fs.writeFileSync("./naughty_list.json", stringed);
// });
