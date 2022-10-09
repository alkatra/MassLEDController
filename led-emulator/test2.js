//////////////////////////////////////////
//////////////////////////////////////////
// THIS IS FOR TESTING PURPOSES ONLY /////
//////////////////////////////////////////
//////////////////////////////////////////
const URL = "http://54.208.202.63:5000/api/";
const fetch = require("node-fetch");
var successes = 0;
var fails = 0;

async function get(x) {
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
    // console.log("\x1b[32m%s\x1b[0m", "Success.");
    successes++;
  } else {
    // console.log("\x1b[31m%s\x1b[0m", "Fail. TRYING AGAIN");
    fails++;
    let response2 = await fetch(urlx, {
      method: "POST",
      headers: {
        //   Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ledid: x }),
      //other options
    });

    if (response2.status == 200) {
      // console.log("\x1b[32m%s\x1b[0m", "Success AFTER TRYING AGAIN.");
      successes++;
    } else {
      // console.log("\x1b[31m%s\x1b[0m", "[CRITICAL] FAILED TWICE for = " + x);
      fails++;
    }
  }
}

async function group(string) {
  do {
    console.time("Total " + string);
    await get(string + "0303");
    await get(string + "0304");
    await get(string + "0305");
    await get(string + "0306");
    await get(string + "0307");
    await get(string + "0308");
    await get(string + "0309");
    await get(string + "0401");
    console.timeEnd("Total " + string);
    let rate = (successes / (successes + fails)) * 100;
    console.log("Current Success Rate: " + rate);
  } while (true);
}

group("02");
