const fs = require("fs");

let data = [];
fs.readdirSync("./data").forEach((file) => {
  if (file.endsWith(".json")) {
    let getData = fs.readFileSync(`./data/${file}`);
    let obj = JSON.parse(getData);
    console.log(obj);
  } else {
    console.log("not json");
  }
});
