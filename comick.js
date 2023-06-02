const puppeteer = require("puppeteer");
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const moment = require("moment");
const _ = require("lodash");

console.log("wut");
const COMICK_FOLLOWS_LIST = getHTML("./comick_follows_list.html");
const COMICK_MANGA_PAGE = getHTML("./comick_manga_page.html");
const COMICK_USER_PAGE = getHTML("./comick_user_page.html");
const COMICK_USER_PAGE_URL =
  "https://comick.app/user/8af71eb9-5882-4b12-952f-f8841ab4e331/list";
async function getHTML(url) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const html = await page.evaluate(() => document.documentElement.outerHTML);
    await browser.close();
    return html;
  } catch (exception) {
    console.log("ERROR: ", exception);
  }
}
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.example.com");
  const html = await page.evaluate(() => document.documentElement.outerHTML);
  console.log(html);
  await browser.close();
})();
// getHTML("http://example.com");
/*
function getHTML(fileLocation) {
  const getListHTML = fs.readFileSync(fileLocation);
  let listHTML = getListHTML.toString("utf8");
  return listHTML;
}

const $ = cheerio.load(COMICK_FOLLOWS_LIST);
const section = $("a.flex[href*=/user]");
section.each((index, element) => {
  // $(element).siblings().find("img[alt='avatar']")
  console.log($(element).siblings().find("img[alt='asdf']"));
});
const confirm = $("img[alt='avatar']");
console.log(confirm.length);
console.log(section.length);
*/
// console.log(getOnePage(listHTML))
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

function numberOfSimilarities(arr1, arr2) {
  const similarities = _.intersectionWith(arr1, arr2, _.isEqual);
  return similarities.length;
}
function orderBy(arr) {
  return _.orderBy(arr, "rating", "desc");
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
// console.log(getRecList(mangaPageRecs))
// console.log(recLinks)
// one at a time
function getNavigation(htmlString) {
  const $ = cheerio.load(htmlString);
  let navigation = parseInt($(".navigation option").length);
  for (let j = 1; j <= navigation; j++) {
    let listUrl = `https://www.mangago.me/home/mangalist/${LIST_ID}/?filter=&page=${j}`;
    // console.log(listUrl)
    // const getData = await axios.get(listUrl);
    // const data = getData.data;
    //
  }
}
// console.log(getNavigation(listHTML))
