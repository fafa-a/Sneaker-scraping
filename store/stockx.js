const stockxAPI = require("stockx-api");
const stockX = new stockxAPI();

// stockX
//   .searchProducts("fw4968", {
//     limit: 5,
//   })
//   .then((products) => console.log(products.pid))
//   .catch((err) => console.log(`Error searching: ${err.message}`));
const result = [];
stockX
  .fetchProductDetails("https://stockx.com/adidas-Yeezy-500-High-Slate")
  .then(
    (product) => console.log(product)

    // DONT WORK
    //   result.push({
    //     name: product.name,
    //     ur: product.urlKey,
    //     sku: product.pid,
    //     variants: product.variants,
    //   })
  )

  .catch((err) =>
    console.log(`Error scraping product details: ${err.message}`)
  );
