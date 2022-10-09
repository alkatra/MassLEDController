//////////////////////////////////////////
//////////////////////////////////////////
// THIS IS FOR TESTING PURPOSES ONLY /////
//////////////////////////////////////////
//////////////////////////////////////////
const URL = "http://54.208.202.63:5000/api/";
const fetch = require("node-fetch");

async function get() {
  let urlx = URL + "toggle";
  let response = await fetch(urlx, {
    method: "POST",
    headers: {
      //   Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ledid: "030303" }),
    //other options
  });
  console.log(await response.json());
}

get();
