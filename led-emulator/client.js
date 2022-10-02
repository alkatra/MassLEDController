//////////////////////////////////////////
//////////////////////////////////////////
// CLIENT.JS /////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////

const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://broker.hivemq.com:1883");

client.on("connect", () => {
  console.log("MQTT connected");
  publishAlertfulDrone();
});

function publishAlertfulDrone() {
  // THIS PUBLISHES A STATIC DATA DRONE TO TRIGGER SECOND CEP SCENARIO
  let topic = "/sit314sgfproject/led/061600";
  let message = "2,3";
  client.publish(topic, message);
  topic = "/drones/short/11/altitude";
  message = "120";
  client.publish(topic, message);
}
