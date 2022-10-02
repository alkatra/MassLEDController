//////////////////////////////////////////
//////////////////////////////////////////
// CLIENT.JS /////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////

const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://broker.hivemq.com:1883");

client.on("connect", () => {
  console.log("MQTT connected");
  client.subscribe("/sit314sagufproject/ledresponse/#");
});

function publishAlertfulDrone() {
  // THIS PUBLISHES A STATIC DATA DRONE TO TRIGGER SECOND CEP SCENARIO
  console.log("submitting");
  let topic = "/sit314sagufproject/led/061600";
  let message = "flip";
  client.publish(topic, message);
  topic = "/sit314sagufproject/led/061600";
  message = "";
  client.publish(topic, message);
  topic = "/sit314sagufproject/led/061600";
  message = "ping";
  client.publish(topic, message);
}

client.on("message", (topic, message) => {
  console.log(topic + " = " + message);
});

publishAlertfulDrone();
