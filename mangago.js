const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const moment = require("moment");
const _ = require("lodash");
const user = "https://www.openrice.com/en/gourmet/reviews.htm?userid=50121664";
const list = "https://www.openrice.com/zh/hongkong/explore/chart/best-rating";
const MANGA_LIST = "https://www.mangago.me/home/mangalist/626481";
const LIST_ID = 2359589;
const getListHTML = fs.readFileSync("./list_page.html");
let listHTML = getListHTML.toString("utf8");
const getMangaPageRecs = fs.readFileSync("./manga_page_recs.html");
let mangaPageRecs = getMangaPageRecs.toString("utf8");
let sample_manga_data = [
  {
    title: "Solo Leveling",
    rating: 9.9,
    link: "https://www.mangago.me/read-manga/solo_leveling/",
  },
  {
    title: "Ranker who lives a second time",
    rating: 9.7,
    link: "https://www.mangago.me/read-manga/ranker_who_lives_a_second_time/",
  },
  {
    title: "Wind Breaker",
    rating: 9.8,
    link: "https://www.mangago.me/read-manga/wind_breaker/",
  },
  {
    title: "Legend of the Northern Blade",
    rating: 9.6,
    link: "https://www.mangago.me/read-manga/legend_of_the_northern_blade/",
  },
  {
    title: "The Undefeatable Swordsman",
    rating: 9.5,
    link: "https://www.mangago.me/read-manga/the_undefeatable_swordsman/",
  },
  {
    title: "Peerless Dad",
    rating: 9.6,
    link: "https://www.mangago.me/read-manga/peerless_dad/",
  },
  {
    title: "Omniscient Reader's Viewpoint",
    rating: 9.8,
    link: "https://www.mangago.me/read-manga/omniscient_reader_s_viewpoint/",
  },
  {
    title: "Tomb Raider King",
    rating: 9.5,
    link: "https://www.mangago.me/read-manga/tomb_raider_king/",
  },
  {
    title: "The Devil's Boy",
    rating: 9.1,
    link: "https://www.mangago.me/read-manga/the_devil_s_boy/",
  },
];
let sample_manga_lists = [
  {
    title: "๑🎀๑•୨୧┈ACTION- NO HAREM OP MC┈୨୧•๑🎀๑(181)",
    link: "https://www.mangago.me/home/mangalist/626481/",
    date: "2023-06-01",
  },
  {
    title: "MUST READ OVERPOWERED PROTAGONISTS(149)",
    link: "https://www.mangago.me/home/mangalist/280075/",
    date: "2023-05-07",
  },
  {
    title: "♤♤Strong Male Leads: No Ecchi, No Harem, No Oppais♧♧(129)",
    link: "https://www.mangago.me/home/mangalist/567417/",
    date: "2022-12-30",
  },
  {
    title: "✨Action-Thriller-Dungeons-fantasy-op mc-No romance✨(135)",
    link: "https://www.mangago.me/home/mangalist/901798/",
    date: "2023-05-05",
  },
  {
    title: "OP MC worth the hype!!(94)",
    link: "https://www.mangago.me/home/mangalist/824256/",
    date: "2022-08-30",
  },
  {
    title: "Non-Yaoi stuff that got me addicted xD(154)",
    link: "https://www.mangago.me/home/mangalist/82824/",
    date: "2023-03-29",
  },
  {
    title: "Good/Best Male MC’s - Part I(199)",
    link: "https://www.mangago.me/home/mangalist/587692/",
    date: "2022-03-12",
  },
  {
    title: "Character Growth / OP Lead(198)",
    link: "https://www.mangago.me/home/mangalist/688033/",
    date: "2022-03-13",
  },
  {
    title: " † action packed; epic fight scenes ᕦ(ò_óˇ)ᕤ (98)",
    link: "https://www.mangago.me/home/mangalist/665610/",
    date: "2022-08-10",
  },
  {
    title: " ✨ WebToon/ManHwa ✨ ~ This are 🌈COLORED🌈 Manhwa List (200)",
    link: "https://www.mangago.me/home/mangalist/76405/",
    date: "2022-02-07",
  },
  {
    title: "Manga with two male leads <3(197)",
    link: "https://www.mangago.me/home/mangalist/124687/",
    date: "2023-04-09",
  },
  {
    title: "✨🔥✨Strong MC MALES ONLY✨🔥✨(200)",
    link: "https://www.mangago.me/home/mangalist/548447/",
    date: "2023-05-26",
  },
  {
    title: "Full Color Manhua, Manhwa, Webtoon with a Female Lead Part 3.(200)",
    link: "https://www.mangago.me/home/mangalist/407446/",
    date: "2023-05-25",
  },
  {
    title: "Full Color Manhua, Manhwa, Webtoon with a Female Lead Part 1.(200)",
    link: "https://www.mangago.me/home/mangalist/219664/",
    date: "2023-05-13",
  },
  {
    title: "🔥STRONG 💥OR POWERFUL🔥 MC💥(200)",
    link: "https://www.mangago.me/home/mangalist/629010/",
    date: "2023-03-13",
  },
  {
    title:
      "Martial Arts, Cultivation, Magic, System, Survival Game, Action with a Male Lead Part 1.(199)",
    link: "https://www.mangago.me/home/mangalist/102225/",
    date: "2023-05-31",
  },
  {
    title:
      "Martial Arts, Cultivation, Magic, System, Survival Game, Action with a Male Lead Part 2.(186)",
    link: "https://www.mangago.me/home/mangalist/682623/",
    date: "2023-06-01",
  },
];

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
  return mangas;
}
// console.log(getOnePage(listHTML))
