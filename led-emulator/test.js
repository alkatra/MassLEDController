//////////////////////////////////////////
//////////////////////////////////////////
// THIS IS FOR TESTING PURPOSES ONLY /////
//////////////////////////////////////////
//////////////////////////////////////////
const URL = "http://54.208.202.63:5000/api/";
const fetch = require("node-fetch");

async function get(x) {
  let urlx = URL + "toggle";
  await fetch(urlx, {
    method: "POST",
    headers: {
      //   Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ledid: x }),
    //other options
  }).then((response) => {
    if (response.status == 200) {
      console.log("\x1b[32m%s\x1b[0m", "Success.");
    } else {
      console.log("\x1b[31m%s\x1b[0m", "Fail.");
    }
  });
}

async function group() {
  console.time("Total");
  get("030303");
  get("030304");
  get("030305");
  get("030306");
  get("030307");
  get("030308");
  get("030309");
  get("030401");
  console.timeEnd("Total");
}

group();
