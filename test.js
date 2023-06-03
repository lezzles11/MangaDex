const puppeteer = require("puppeteer");
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const moment = require("moment");
const _ = require("lodash");

function getRecList(htmlString) {
  let recLists = [];
  const $ = cheerio.load(htmlString);
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
async function getNavigation(LIST_ID, htmlString) {
  let data = [];
  const $ = cheerio.load(htmlString);
  let navigation = parseInt($(".navigation option").length);
  for (let j = 1; j <= navigation; j++) {
    let listUrl = `https://www.mangago.me/home/mangalist/${LIST_ID}/?filter=&page=${j}`;
    let getData = await getHTML(listUrl);
    let getPage = getOnePage(getData);
    data.push(getPage);
  }
  return _.flattenDeep(data);
}
function getOnePage(htmlString) {
  const mangas = [];
  const $ = cheerio.load(htmlString);
  const sections = $(".comment");
  sections.each((index, element) => {
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
  });
  return _.flattenDeep(mangas);
}
async function getList(id) {
  let html = await getHTML(`https://www.mangago.me/home/mangalist/${id}/`);
  let getData = await getNavigation(id, html);
  console.log(getData);
}
// getList("2359589");
