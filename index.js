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

  const results = [];

  let items = await page.$$(".thumbnail-overlay");

  const url = page.url();
  let hostname = "";
  const extractHostname = (url) => {
    if (url.indexOf("//") > -1) {
      hostname = url.split("/")[2];
    } else {
      hostname = url.split("/")[0];
    }

    return hostname;
  };
  extractHostname(url);

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

  const DATE = new Date().toLocaleString("fr-FR").slice(0, 10);
  const date = DATE.split("/").join("-");
  const dir = `./data/${date}/`;

  fs.mkdir(dir, { recursive: false }, (err) => {
    if (err) throw err;
  });

  fs.writeFile(`${dir}${hostname}.json`, data, (err) => {
    if (err) throw err;
    console.log("Data written to file");
  });

  await browser.close();
})();
