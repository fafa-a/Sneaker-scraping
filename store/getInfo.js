const stockxAPI = require("stockx-api");
const stockX = new stockxAPI({ currency: "EUR" });

let url = "";
let data = {};
const details = [];

const getInfo = async (query) => {
  const info = stockX
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
      return (data = {
        name: product.name,
        url: product.urlKey,
        sku: product.pid,
        details: details,
      });
    })
    .catch((err) =>
      console.log(`Error scraping product details: ${err.message}`)
    );
  return info;
};
module.exports = getInfo;
