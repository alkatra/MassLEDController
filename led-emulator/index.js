// Number of LEDs to be emulated. Each floor has X rooms and each room has Y leds.
const floors = 8;
const rooms = 20;
const ledCount = 10;
const MQTTuniqueURL = "/sit314sagufproject/";

class LED {
  constructor(flipstate, dimsstate, location) {
    this.flipstate = flipstate; // True = lit up
    this.dimsstate = dimsstate; // True = lit but dimsstate
    this.location = location; // JSON = {floor:x, room:y, ledid:z}
  }

  handleMQTTMessage(message, mqttClient) {
    let topic = "/sit314sagufproject/ledresponse/" + this.getid();
    let response = "";
    switch (message) {
      case "flip":
        this.flipstate = !this.flipstate;
        if (!this.flipstate && this.dimsstate) this.dimsstate = !this.dimsstate;
        response = "Successful.";
        break;
      case "dim":
        if (this.flipstate) this.dimsstate = !this.dimsstate;
        response = "Successful.";
        break;
      case "ping":
        response =
          "Successful. You have pinged LED id: " +
          this.getid() +
          ". State: " +
          this.flipstate +
          ". Dim: " +
          this.dimsstate;
        break;
      case "state":
        response = this.flipstate.toString();
        break;
      case "dimstate":
        response = this.dimsstate.toString();
        break;
      default:
        response = "Unknown operation";
        break;
    }
    mqttClient.publish(topic, response);
  }

  getid() {
    // to format XXYYZZ
    return (
      (this.location.floor < 10 ? "0" : "") +
      this.location.floor +
      (this.location.room < 10 ? "0" : "") +
      this.location.room +
      (this.location.ledid < 10 ? "0" : "") +
      this.location.ledid
    );
  }
}

function initializeLEDs(floors, rooms, ledCount) {
  let ledArray = [];
  for (let i = 0; i < floors; i++) {
    for (let j = 0; j < rooms; j++) {
      for (let k = 0; k < ledCount; k++) {
        let location = { floor: i, room: j, ledid: k };
        ledArray.push(new LED(false, false, location));
      }
    }
  }
  return ledArray;
}

function initializeMQTTBroker() {
  const mqtt = require("mqtt");
  const client = mqtt.connect("mqtt://broker.hivemq.com:1883");
  let filter = MQTTuniqueURL + "led/#";
  client.on("connect", () => {
    console.log("mqtt connected");
    client.subscribe(filter);
    console.log("Filter using parameters: " + filter);
  });

  client.on("message", (topic, message) => {
    let arrayIndex = getLEDIndex(topic);
    ledArray[arrayIndex].handleMQTTMessage(message.toString(), client);
  });
}

function getLEDIndex(topic) {
  let topics = topic.split("/");
  let id = topics[3];
  let floor = id.substring(0, 2);
  let room = id.substring(2, 4);
  let ledid = id.substring(4, 6);
  // The following is the formula to get ledArray index of LED based on
  // its ID (xxyyzz) where xx is floor, yy is room, zz is ledid
  // It is an unconventional way to do it, but this is not our business logic.
  // It is simply to emulate the LEDs.
  let arrayindex =
    parseInt(floor) * 200 + parseInt(room) * 10 + parseInt(ledid);
  return arrayindex;
}

let ledArray = initializeLEDs(floors, rooms, ledCount);
initializeMQTTBroker();
