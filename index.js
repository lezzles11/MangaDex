const axios = require("axios");

const baseUrl = "https://api.mangadex.org";
const title = "Kanojyo to Himitsu to Koimoyou";
(async () => {
  const resp = await axios({
    method: "GET",
    url: `${baseUrl}/manga`,
    params: {
      title: title,
    },
  });
  let mangaIds = resp.data.data.map((manga) => manga.id);
  mangaIds.forEach(async (x) => {
    let rating = await getRating(x);
  });
  console.log(mangaIds);
})();

async function getRating(mangaID) {
  const resp = await axios({
    method: "GET",
    url: `${baseUrl}/statistics/manga/${mangaID}`,
  });
  let replies = "";
  console.log(Object.keys(resp.data.statistics[mangaID]));
  const { rating, follows, comments } = resp.data.statistics[mangaID];
  if (comments != null) {
    replies = comments["repliesCount"];
    console.log(Object.keys(comments));
  }

  console.log(
    "Mean Rating:",
    rating.average,
    "\n" + "Bayesian Rating:",
    rating.bayesian,
    "\n" + "Follows:",
    follows,
    "\n" + "Comments: " + replies
  );
}
