const express = require("express");

const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://broker.hivemq.com:1883");
client.on("connect", () => {
  console.log("MQTT connected");
  client.subscribe("/sit314sagufproject/ledresponse/#");
});

const port = 5000;

const FLOORS = 8;
const ROOMS = 20;
const LEDCOUNT = 10;

app.post("/api/toggle", async (req, res) => {
  console.log(req.body);
  let ledid = req.body.ledid;
  let topic = "/sit314sagufproject/led/" + ledid;
  let message = "flip";
  client.publish(topic, message);
  res.status(200).send("Success");
});

client.on("message", (topic, message) => {
  console.log(message + " from " + topic);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
