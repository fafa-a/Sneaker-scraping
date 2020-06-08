/*******
 *  TEST RESPONSE
 */
const request = require("request-promise");

const newLocal = "https://stockx.com/jordan-4-retro-white-cement-2016";
const options = {
  headers: {
    "sec-fetch-mode": "cors",
    "accept-language": "en-US,en;q=0.9",
    authorization: "",
    "x-requested-with": "XMLHttpRequest",
    appos: "web",
    "user-agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36",
    accept: "*/*",
    authority: "stockx.com",
    "sec-fetch-site": "same-origin",
    appversion: "0.1",
  },
  simple: false,
  resolveWithFullResponse: true,
};

// const res = request(newLocal, options);

// // const body = JSON.parse(res.body);

// console.log(request.body);
// console.log(res.body);
const Product = {};
request(newLocal, options)
  .then(function (response) {
    const body = JSON.parse(response);

    const { Products } = body;
    return Product;
  })
  .catch(function (error) {
    console.log(error);
  });
