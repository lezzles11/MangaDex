const { getHTML } = require("./getHTML");
const {
  numberOfSimilarities,
  getDifference,
  freqCount,
  orderBy,
} = require("./arrays");
const { jaccard, overlap, minSimilar } = require("./conditions");
const { renameAndDelete, getSimilarData, getData } = require("./folders");
module.exports = {
  numberOfSimilarities,
  getDifference,
  freqCount,
  orderBy,
  jaccard,
  overlap,
  minSimilar,
  renameAndDelete,
  getSimilarData,
  getData,
  getHTML,
};
