//////////////////////////////////////////
//////////////////////////////////////////
// THIS IS FOR TESTING PURPOSES ONLY /////
//////////////////////////////////////////
//////////////////////////////////////////
const URL = "http://54.208.202.63:5000/api/";
const fetch = require("node-fetch");
var successes = 0;
var fails = 0;
const RESEND_LIMIT = 2;

async function get(x, attempt) {
  let urlx = URL + "toggle";
  let response = await fetch(urlx, {
    method: "POST",
    headers: {
      //   Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ledid: x }),
    //other options
  });

  if (response.status == 200) {
    console.log("\x1b[32m%s\x1b[0m", "Success.");
    successes++;
  } else {
    console.log("\x1b[31m%s\x1b[0m", "Fail. TRYING AGAIN");
    if (attempt < RESEND_LIMIT) {
      get(x, ++attempt);
    } else {
      fails++;
    }
  }
}

async function group(string) {
  do {
    successes = 0;
    fails = 0;
    console.time("Total " + string);
    await get(string + "0303", 0);
    await get(string + "0304", 0);
    await get(string + "0305", 0);
    await get(string + "0306", 0);
    await get(string + "0307", 0);
    await get(string + "0308", 0);
    await get(string + "0309", 0);
    await get(string + "0401", 0);
    console.timeEnd("Total " + string);
    let rate = (successes / (successes + fails)) * 100;
    console.log("Current Success Rate: " + rate);
  } while (true);
}

group("01");
group("02");
group("03");
group("04");
