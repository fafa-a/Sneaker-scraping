const puppeteer = require("puppeteer");
const fs = require("fs");

const getSneakerDescription = async (page) => {
  // await page.waitFor(".thumbnail-overlay");
  const result = await page.evaluate(() => {
    const img = document
      .querySelector(".image-element__wrap")
      .getAttribute("src");
    const brand = document.querySelector((selectors = ".brand")).innerText;
    const name = document.querySelector((selectors = ".title")).innerText;
    const href = document
      .querySelector((selectors = ".hidden-product-link"))
      .getAttribute("href");
    const release = document.querySelector((selectors = ".modal_price"))
      .innerText;

    return {
      img,
      brand,
      name,
      href,
      release,
    };
  });
  return result;
};

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("https://wethenew.com/collections/coming-soon");
  await page.screenshot({ path: "sample.png" });
  const results = [];

  let items = await page.$$(".thumbnail-overlay");

  // recherche sur ElementHandle

  for (const item of items) {
    const sneakerDescription = await getSneakerDescription(page);
    const sneakerName = await page.evaluate((el) => {
      if (el) {
        return el.innerText;
      }
      return "";
    }, item);

    results.push({
      img: sneakerDescription.img,
      brand: sneakerDescription.brand,
      name: sneakerName,
      href: sneakerDescription.href,
      release: sneakerDescription.release,
    });
  }
  const data = JSON.stringify(results);
  fs.writeFile("./data.json", data, (err) => {
    if (err) throw err;
    console.log("Data written to file");
  });

  await browser.close();
})();
