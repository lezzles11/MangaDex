const _ = require("lodash");
const fs = require("fs");
const { loopThroughRecList, getListData } = require("./services");
const {
  MY_LIST,
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
  getHTML,
} = require("./utils");

async function letsPrint() {
  // let data = await getHTML("https://j2semi.com/cpxx");
  // fs.writeFileSync("./openAi/cpxx.html", data);

  // let data2 = await getHTML(
  //   "https://www.hkstp.org/zh-hk/news-room/mou-signing-ceremony/"
  // );
  // fs.writeFileSync("./openAi/hkstp.html", data2);

  let data3 = await getHTML("https://www.j2semi.com/gsjj");
  fs.writeFileSync("./openAi/gsjj.html", data3);
}

letsPrint();
