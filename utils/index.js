const { getHTML } = require("./getHTML");
const {
  numberOfSimilarities,
  getDifference,
  freqCount,
  orderBy,
} = require("./arrays");
const { jaccard, overlap, minSimilar } = require("./conditions");
const { renameFile, getSimilarData, getData } = require("./folders");
module.exports = {
  numberOfSimilarities,
  getDifference,
  freqCount,
  orderBy,
  jaccard,
  overlap,
  minSimilar,
  renameFile,
  getSimilarData,
  getData,
  getHTML,
};
