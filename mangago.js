const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const moment = require("moment");
const _ = require("lodash");
const MANGA_LIST = "https://www.mangago.me/home/mangalist/2359589";
const LIST_ID = 2359589;
// const getListHTML = fs.readFileSync("./list_page.html");
// let listHTML = getListHTML.toString("utf8");
const { getHTML } = require("./utils")

function numberOfSimilarities(arr1, arr2) {
  const similarities = _.intersectionWith(arr1, arr2, _.isEqual);
  return similarities.length;
}
function orderBy(arr) {
  return _.orderBy(arr, "rating", "desc");
}

async function getRecList() {
  let recLists = []
  // const $ = cheerio.load(htmlString);
  //  let navigation = parseInt($(".pagination ol option").length);
  for (let i = 1; i < 2; i++) {
    let url = `https://www.mangago.me/home/manga/list/solo_leveling/1/?page=${i}`
    let html = await getHTML(url);
    let getList = getOneListData(html)
    recLists.push(getList);
    recLists = _.flattenDeep(recLists);
  }
  return recLists;
}


let mangas = []
getRecList().then((data) => {
  console.log(data.length, "number of lists")

  for (let i = 0; i < data.length; i++) {
    let link = data[i].link;
    if (data[i].link) {
      link = link.replace("https://www.mangago.me/home/mangalist/", "")
      link = link.replace("/", "")
      getMangaGoList(link).then((response) => {
        console.log(response)
        mangas.push(response)
      })
    }
  }
})
console.log("YES", mangas.length)
function getOneListData(htmlString) {
  let recLists = [];
  const $ = cheerio.load(htmlString);
  let recLinks = $("div[style='border-bottom:1px dashed #bdbdbd;width:620px;float:left;line-height:25px;padding:10px 0']");
  recLinks.each((index, element) => {
    let date = $(element).find("span[style='text-align:right;color:#bdbdbd;font-size:13px;width:100px;line-height:50px;']").text();
    if (moment(date).isAfter(moment("2021-12-31"))) {
      let link = $(element)
        .find("a[href*=https://www.mangago.me/home/mangalist/]")
        .attr("href");
      let title = $(element)
        .find("a[href*=https://www.mangago.me/home/mangalist/]")
        .text()
      let obj = { title, link, date };
      recLists.push(obj);
    }
  });
  return recLists;
}

// console.log(getRecList(mangaPageRecs))
// console.log(recLinks)
// one at a time
async function getNavigation(htmlString, listID) {
  let allData = []
  const $ = cheerio.load(htmlString);
  let navigation = parseInt($(".navigation option").length);
  for (let j = 1; j <= navigation; j++) {
    let listUrl = `https://www.mangago.me/home/mangalist/${listID}/?filter=&page=${j}`;
    let mangaData = await getHTML(listUrl);
    let data = getOnePage(mangaData);
    allData.push(data)
    allData = _.flattenDeep(allData)
  }
  return allData;
}
async function getMangaGoList(listID) {
  let mangaUrl = `https://www.mangago.me/home/mangalist/${listID}`
  let html = await getHTML(mangaUrl);
  let data = await getNavigation(html, listID);
  return data;
}

// getMangaGoList(LIST_ID).then((response) => {
//  console.log(response)
// })
let recListUrl = "https://www.mangago.me/home/manga/list/solo_leveling/1/"

// getHTML(recListUrl).then((response) => {

// })
function getOnePage(htmlString) {
  const mangas = [];
  const $ = cheerio.load(htmlString);
  fs.writeFileSync("./test.html", htmlString)
  const sections = $(".comment");
  sections.each((index, element) => {
    let filterForConditions = $(element).text().toLowerCase()
    let no = filterForConditions.includes("yaoi")
    let no2 = filterForConditions.includes("yuri")
    if (!no && !no2) {
      let title = $(element).find(".title a").text();
      if (title.length > 1) {
        let link = $(element).find("a").attr("href");
        let rating = $(element)
          .find("span[style='color:#FBFA7C;line-height:16px;']")
          .text();
        rating = parseFloat(rating.trim());
        let obj = {
          title,
          rating,
          link,
        };
        mangas.push(obj);
      }
    }

  });
  return mangas;
}
// console.log(getOnePage(listHTML))
