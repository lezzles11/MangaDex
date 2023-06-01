require("dotenv").config();
const axios = require("axios");
const _ = require("lodash");
const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;
const EMAIL = process.env.EMAIL;
const baseUrl = "https://api.mangadex.org";
async function getToken() {
  try {
    // let string = JSON.stringify()
    let request = await axios({
      method: "POST",
      url: `${baseUrl}/auth/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        username: USERNAME,
        password: PASSWORD,
        // email: EMAIL,
      },
    });
    /*
    let request = await axios.post('https://api.mangadex.org/auth/login', {
			username: process.env.MANGADEX_USERNAME,
			password: process.env.MANGADEX_PASSWORD,
		});
    */
    console.log("Request", request);

    let { token } = request;
    console.log(token["session"]);
    return token["session"];
  } catch (error) {
    console.log("ERROR: " + error);
  }
}
// getToken();

async function getList(ID) {
  try {
    let getList = await axios.get(`${baseUrl}/list/${ID}`);
    let { data } = getList;
    let { relationships } = data["data"];
    let ids = _.map(relationships, "id");
    return ids;
  } catch (error) {
    console.log("ERROR: " + error);
  }
}
getList("e159f01c-e25e-4132-848f-4e32bcb67997");
async function getMangaById(ID) {
  try {
    let getManga = await axios.get(`${baseUrl}/manga/${ID}`);
    let { title } = getManga["data"]["data"]["attributes"];
    return title.en;
  } catch (error) {
    console.log("ERROR: " + error);
  }
}

// getMangaById("4a973243-952e-44d7-a50f-883b4b7c9cc2");
async function getByTitle(title) {
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
}
getByTitle("SSS-Class Suicide Hunter");
async function getRating(mangaID) {
  const resp = await axios({
    method: "GET",
    url: `${baseUrl}/statistics/manga/${mangaID}`,
  });
  let replies = "";
  const { rating, follows, comments } = resp.data.statistics[mangaID];
  if (comments != null) {
    replies = parseInt(comments["repliesCount"]);
    console.log(Object.keys(comments));
  }
  let obj = {
    mean: rating.average,
    rating: rating.bayesian,
    follows: follows,
    comments: replies,
  };
  return obj;
}
