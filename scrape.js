const getInfo = require("./store/getInfo");

(async () => {
  const query = "CD0461-046";
  await getInfo(query)
    .then((info) => console.log(info))
    .catch((error) => console.log(error));
})();
