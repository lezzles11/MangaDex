let data1 = [
  {
    title: "Mairimashita! Iruma-kun",
    rating: 9.8,
    link: "https://www.mangago.me/read-manga/mairimashita_iruma_kun/",
  },
  {
    title: "Like a Butterfly",
    rating: 9.8,
    link: "https://www.mangago.me/read-manga/like_a_butterfly/",
  },
  {
    title: "Nano Machine",
    rating: 9.7,
    link: "https://www.mangago.me/read-manga/nano_machine/",
  },
  {
    title: "Eleceed",
    rating: 9.9,
    link: "https://www.mangago.me/read-manga/eleceed/",
  },
];
let data2 = [
  {
    title: "Eleceed",
    rating: 9.9,
    link: "https://www.mangago.me/read-manga/eleceed/",
  },
  {
    title: "Inso's Law Webtoon",
    rating: 9.6,
    link: "https://www.mangago.me/read-manga/inso_s_law/",
  },
  {
    title: "Match Made in Heaven by Chance",
    rating: 9.7,
    link: "https://www.mangago.me/read-manga/match_made_in_heaven_by_chance/",
  },
];
function cosineSimilarity(arr1, arr2) {
  let dotProduct = 0;
  let magnitude1 = 0;
  let magnitude2 = 0;

  for (let i = 0; i < arr1.length; i++) {
    let val1 = arr1[i].rating;
    let val2 = arr2.find((item) => item.title === arr1[i].title)?.rating || 0;

    dotProduct += val1 * val2;
    magnitude1 += val1 ** 2;
  }

  for (let i = 0; i < arr2.length; i++) {
    magnitude2 += arr2[i].rating ** 2;
  }

  let magnitudeProduct = Math.sqrt(magnitude1) * Math.sqrt(magnitude2);

  if (magnitudeProduct === 0) {
    return 0;
  } else {
    return dotProduct / magnitudeProduct;
  }
}
function pearsonCorrelation(arr1, arr2) {
  let sum1 = 0;
  let sum2 = 0;
  let sum1Sq = 0;
  let sum2Sq = 0;
  let pSum = 0;
  let n = arr1.length;

  for (let i = 0; i < n; i++) {
    let val1 = arr1[i].rating;
    let val2 = arr2.find((item) => item.title === arr1[i].title)?.rating || 0;

    sum1 += val1;
    sum2 += val2;
    sum1Sq += val1 ** 2;
    sum2Sq += val2 ** 2;
    pSum += val1 * val2;
  }

  let num = pSum - (sum1 * sum2) / n;
  let den = Math.sqrt((sum1Sq - sum1 ** 2 / n) * (sum2Sq - sum2 ** 2 / n));

  if (den === 0) {
    return 0;
  } else {
    return num / den;
  }
}

function sorensenDice(arr1, arr2, minRating) {
  const set1 = new Set(arr1.map((item) => item["title"]));
  const set2 = new Set(arr2.map((item) => item["title"]));
  const intersectionSize = new Set(
    arr1.filter((item) => set2.has(item["title"]))
  ).size;
  const denominator = set1.size + set2.size;
  let rating = (2 * intersectionSize) / denominator;
  console.log(rating);
}
function jaccard(arr1, arr2, minRating) {
  const set1 = new Set(arr1.map((item) => item["title"]));
  const set2 = new Set(arr2.map((item) => item["title"]));
  const intersection = new Set(arr1.filter((item) => set2.has(item["title"])));
  const union = new Set([...set1, ...set2]);
  let rating = intersection.size / union.size;
  console.log(rating);
}
console.log(cosineSimilarity(data1, data2));
console.log(pearsonCorrelation(data1, data2));
sorensenDice(data1, data2);
jaccard(data1, data2);
