const _ = require("lodash");
const fs = require("fs");
const { loopThroughRecList } = require("./services");
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
} = require("./utils");
/*
loopThroughRecList(MY_LIST, TO_COMPARE, 1, 2, 2).then((response) => {
  console.log(response, "works");
});
*/

let data = getSimilarData(overlap, 0.7);
let counted = freqCount(data);
let parsed = JSON.stringify(counted);
fs.writeFileSync("./output/overlap.json", parsed);
