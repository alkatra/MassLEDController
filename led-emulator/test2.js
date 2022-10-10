//////////////////////////////////////////
//////////////////////////////////////////
// THIS IS FOR TESTING PURPOSES ONLY /////
//////////////////////////////////////////
//////////////////////////////////////////
const URL = "http://18.234.237.86:5000/api/";
const fetch = require("node-fetch");
var successes = 0;
var fails = 0;
const RESEND_LIMIT = 10;

async function get(x, attempt) {
  try {
    let urlx = URL + "toggle";
    let response = await fetch(urlx, {
      method: "POST",
      headers: {
        //   Accept: "application/json",
        "Content-Type": "application/json",
      },
      timeout: 5000,
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
  } catch (e) {
    if (attempt < RESEND_LIMIT) {
      get(x, ++attempt);
    } else {
      console.log("\x1b[31m%s\x1b[0m", "Timed out. Fail" + x);
      fails++;
    }
  }
}

async function group(string) {
  successes = 0;
  fails = 0;
  console.time("Total " + string);
  await get(string + "0503", 0);
  await get(string + "0504", 0);
  await get(string + "0505", 0);
  await get(string + "0506", 0);
  console.timeEnd("Total " + string);
  let rate = (successes / (successes + fails)) * 100;
  console.log("Current Success Rate: " + rate);
}

async function gets() {
  do {
    await group("05");
    await group("06");
    await group("07");
  } while (true);
}

gets();
