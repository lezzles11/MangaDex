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
  renameFile,
} = require("./utils");

// loopThroughRecList(MY_LIST, TO_COMPARE, 801, 1300, 6).then((response) => {
//   console.log(response, "works");
// });
// renameFile();

// let data = getSimilarData(minSimilar, 11);
// let counted = freqCount(data);
// let parsed = JSON.stringify(counted);
// fs.writeFileSync("./output/minSimilar.json", parsed);
