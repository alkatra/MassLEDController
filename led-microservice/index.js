const express = require("express");

const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

client.on("connect", () => {
  console.log("MQTT connected");
  client.subscribe("/sit314sagufproject/ledresponse/#");
});

const port = 5000;

const FLOORS = 8;
const ROOMS = 20;
const LEDCOUNT = 10;

const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://broker.hivemq.com:1883");

let responses = [];

app.post("/api/toggle", async (req, res) => {
  let ledid = req.body.ledid;
  let topic = "/sit314sagufproject/led/" + ledid;
  let message = "flip";
  client.publish(topic, message);
  responses.push({
    responseObject: res,
    topic: "/sit314sagufproject/ledresponse/" + ledid,
  });
});

client.on("message", (topic, message) => {
  let i = undefined;
  responses.forEach((response, idx) => {
    if (response.topic == topic) {
      response.res.status(200).send({ msg: "Success" });
      i = idx;
    }
  });
  if (i != undefined) responses.splice(i, 1); //remove
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
