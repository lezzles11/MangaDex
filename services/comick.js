const cheerio = require("cheerio");
const fs = require("fs");
const moment = require("moment");
const _ = require("lodash");

function getUserMangas(html) {
  const mangas = [];
  const $ = cheerio.load(html);
  const sections = $("#__NEXT_DATA__");
  let text = sections.text();
  let js = JSON.parse(text);
  let getComics = js["props"]["pageProps"]["follows"];
  getComics.forEach((object) => {
    let title = object["md_comics"]["title"];
    let rating;
    if (object.score) {
      rating = parseFloat(object.score);
    } else {
      rating = parseFloat(object["md_comics"]["bayesian_rating"]);
    }
    // console.log(object)
    // #TODO: TEST THE LINK
    let link = `https://comick.app/comic/${object.md_comics.slug}`;
    mangas.push({ title, rating, link });
  });
  return mangas;
}

function getRecList(htmlString) {
  let recLists = [];
  const $ = cheerio.load(mangaPageRecs);
  let navigation = parseInt($(".pagination ol option").length);
  // then loop through the navigation here
  let recLinks = $("tbody tr");
  recLinks.each((index, element) => {
    let date = $(element).find(".date span").text();
    if (moment(date).isAfter(moment("2021-12-31"))) {
      let link = $(element)
        .find("a[style='break-word;color:#4CCCA9;height:25px;']")
        .attr("href");
      let title = $(element)
        .find("a[style='break-word;color:#4CCCA9;height:25px;']")
        .text();
      let obj = { title, link, date };
      recLists.push(obj);
    }
  });
  return recLists;
}

function getNavigation(htmlString) {
  const $ = cheerio.load(htmlString);
  let navigation = parseInt($(".navigation option").length);
  for (let j = 1; j <= navigation; j++) {
    let listUrl = `https://www.mangago.me/home/mangalist/${LIST_ID}/?filter=&page=${j}`;
  }
}
