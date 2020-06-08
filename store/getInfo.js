const stockxAPI = require("stockx-api");
const stockX = new stockxAPI({ currency: "EUR" });

let url = "";
// const data = [];
const details = [];

const getInfo = async (query) => {
  stockX
    .searchProducts(query, {
      limit: 5,
    })
    .then((products) => {
      for (product of products) {
        if (product.pid == query) {
          url = product.urlKey;
        }
      }
    })
    .then(() => stockX.fetchProductDetails(`https://stockx.com/${url}`))
    .then((product) => {
      for (const item of product.variants) {
        details.push({
          size: item.size,
          lastSale: item.market.lastSale,
          lastSaleDate: item.market.lastSaleDate,
        });
      }

      // data.push({
      //   name: product.name,
      //   url: product.urlKey,
      //   sku: product.pid,
      //   details: details,
      // });

      const data = {
        name: product.name,
        url: product.urlKey,
        sku: product.pid,
        details: details,
      };
      return data;
    })
    // .then(() => console.log(data))
    .catch((err) =>
      console.log(`Error scraping product details: ${err.message}`)
    );
};
module.exports.getInfo = getInfo;
// const info = getInfo("CD0461-046");
// console.log(info);
// console.log(module.filename);
// console.log(module.id);
// console.log(module.exports);
