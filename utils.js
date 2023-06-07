const puppeteer = require("puppeteer");
const _ = require("lodash");
const minimal_args = [
  "--autoplay-policy=user-gesture-required",
  "--disable-background-networking",
  "--disable-background-timer-throttling",
  "--disable-backgrounding-occluded-windows",
  "--disable-breakpad",
  "--disable-client-side-phishing-detection",
  "--disable-component-update",
  "--disable-default-apps",
  "--disable-dev-shm-usage",
  "--disable-domain-reliability",
  "--disable-extensions",
  "--disable-features=AudioServiceOutOfProcess",
  "--disable-hang-monitor",
  "--disable-ipc-flooding-protection",
  "--disable-notifications",
  "--disable-offer-store-unmasked-wallet-cards",
  "--disable-popup-blocking",
  "--disable-print-preview",
  "--disable-prompt-on-repost",
  "--disable-renderer-backgrounding",
  "--disable-setuid-sandbox",
  "--disable-speech-api",
  "--disable-sync",
  "--hide-scrollbars",
  "--ignore-gpu-blacklist",
  "--metrics-recording-only",
  "--mute-audio",
  "--no-default-browser-check",
  "--no-first-run",
  "--no-pings",
  "--no-sandbox",
  "--no-zygote",
  "--password-store=basic",
  "--use-gl=swiftshader",
  "--use-mock-keychain",
];
function renameAndDelete() {
  let FOLDER_NAME = "./data";
  let myData = fs.readFileSync("./myData.json");
  let parsed = JSON.parse(myData);
  // just get the top that have at least 6, delete the rest.
  fs.readdirSync(FOLDER_NAME).forEach((file) => {
    if (file.endsWith(".json")) {
      let fileName = `${FOLDER_NAME}/${file}`;
      let getData = fs.readFileSync(fileName);
      let arr = JSON.parse(getData);
      if (numberOfSimilarities(parsed, arr) <= 6) {
        fs.unlinkSync(fileName);
      } else {
        let numbersOnly = file.split("_");
        numbersOnly = numbersOnly[numbersOnly.length - 1];
        numbersOnly = `${FOLDER_NAME}/${numbersOnly}`;
        fs.renameSync(fileName, numbersOnly);
      }
    } else {
      console.log("not json");
    }
  });
}
async function getHTML(url) {
  const browser = await puppeteer.launch({
    headless: "old",
    args: minimal_args,
  });
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on("request", (req) => {
    if (req.resourceType() === "image") {
      req.abort();
    } else {
      req.continue();
    }
  });

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
  );
  await page.setViewport({
    width: 576,
    height: 767,
  });
  await page.goto(url, {
    waitUntil: "load",
    timeout: 0,
  });
  const html = await page.content();

  await browser.close();
  return html;
}

function numberOfSimilarities(arr1, arr2) {
  const similarities = _.intersectionWith(arr1, arr2, _.isEqual);
  return similarities.length;
}
module.exports = { getHTML, numberOfSimilarities };
