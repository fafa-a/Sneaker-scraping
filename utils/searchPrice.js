const puppeteer = require("puppeteer");

const getDescription = async (page) => {
  const result = await page.evaluate(() => {
    // const brand = document.querySelector(
    //   (selectors = "product-data__brand-name")
    // ).innerText;
    // const model = document.querySelector((selectors = "product-data__model"))
    //   .innerText;
    // const sku = document.querySelector((selectors = `[data-attribute="sku"]`))
    //   .innerText;
    const price = document.querySelector((selectors = "price")).innerText;
    return {
      //   brand,
      //   model,
      //   sku,
      price,
    };
  });
  return result;
};

(async () => {
  const sku = "fw4968";
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(
    `https://www.sivasdescalzo.com/en/catalogsearch/result/?q=${sku}`
  );
  //   await page.click("tile browse-tile");
  //   await page.screenshot({ path: "svd.png" });
  const results = [];

  const items = await page.$(".smooth-link");
  const skuResult = await getDescription(page);

  results.push({
    brand: skuResult.brand,
    model: skuResult.model,
    sku: skuResult.sku,
    price: skuResult.price,
  });
  console.log(results);
  await browser.close();
})();
