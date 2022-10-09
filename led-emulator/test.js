//////////////////////////////////////////
//////////////////////////////////////////
// THIS IS FOR TESTING PURPOSES ONLY /////
//////////////////////////////////////////
//////////////////////////////////////////
const URL =
  "http://microservice-balance-529083895.us-east-1.elb.amazonaws.com:5000/api/";
const fetch = require("node-fetch");
let urlx = microserviceURL + "toggle";
await fetch(urlx, {
  method: "POST",
  headers: {
    //   Accept: "application/json",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ ledid: req.body.ledid }),
  //other options
}).then(async (response) => {});
