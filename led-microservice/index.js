const express = require("express");

const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.options("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.end();
});
const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://broker.hivemq.com:1883");
client.on("connect", () => {
  console.log("MQTT connected");
  client.subscribe("/sit314sagufproject/ledresponse/#");
});

const port = 5000;

let responses = [];

const FLOORS = 8;
const ROOMS = 20;
const LEDCOUNT = 10;

app.post("/api/toggle", async (req, res) => {
  console.log(req.body);
  let ledid = req.body.ledid;
  let topic = "/sit314sagufproject/led/" + ledid;
  let message = "flip";
  client.publish(topic, message);
  responses.push({
    res: res,
    topic: "/sit314sagufproject/ledresponse/" + ledid,
  });
});

client.on("message", (topic, message) => {
  console.log(message + " from " + topic);
  let removed = undefined;
  responses.forEach((response, index) => {
    if (response.topic == topic) {
      if (message == "Successful.") {
        response.res.status(200).send(message);
      } else {
        response.res.status(400).send(message);
      }
      removed = index;
    }
  });
  responses.splice(removed, 1);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
