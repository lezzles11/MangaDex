const puppeteer = require("puppeteer");

async function getHTML(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
    );

    await page.goto(url);

    const html = await page.content();

    await browser.close();
    return html;
}
module.exports = { getHTML };