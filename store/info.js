const stockxAPI = require("stockx-api");
const stockX = new stockxAPI({ currency: "EUR" });

// const urlProduct = function (query) {
//   let url = "";
//   stockX
//     .searchProducts(query, {
//       limit: 5,
//     })
//     .then((products) => {
//       for (product of products) {
//         if (product.pid == query) {
//           url = product.urlKey;
//         }
//       }
//       console.log(`url=${url}`);
//       return url;
//     })
//     .catch((err) => console.log(`Error searching: ${err.message}`));
//   return urlProduct;
// };

(getSneakerInfo = async (query) => {
  const urlProduct = stockX
    .searchProducts(query, {
      limit: 5,
    })
    .then((products) => {
      for (product of products) {
        if (product.pid == query) {
          url = product.urlKey;
        }
      }
      return url;
    })
    .catch((err) => console.log(`Error searching: ${err.message}`));

  return urlProduct;
})();
module.exports = getSneakerInfo;
