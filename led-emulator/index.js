// Number of LEDs to be emulated. Each floor has X rooms and each room has Y leds.
const floors = 8;
const rooms = 20;
const ledCount = 10;
const MQTTuniqueURL = "/sit314sgfproject/";

class LED {
  constructor(state, dim, location) {
    this.state = state; // True = lit up
    this.dim = dim; // True = lit but dim
    this.location = location; // JSON = {floor:x, room:y, ledid:z}
  }
  flip() {
    // Flip state of switch, and set dim to 0 if state is 0.
    this.state = !this.state;
    if (!this.state && this.dim) this.dim = !this.dim;
  }
  dimlight() {
    // Flip state of dim (yes/no)
    if (this.state) this.dim = !this.dim;
  }
  locate() {
    return this.location;
  }
  getid() {
    return (
      (this.location.floor < 10 ? "0" : "") +
      this.location.floor +
      (this.location.room < 10 ? "0" : "") +
      this.location.room +
      (this.location.ledid < 10 ? "0" : "") +
      this.location.ledid
    );
  }
  ping() {
    return (
      "Successful. You have pinged LED id: " +
      this.getid() +
      ". State: " +
      this.state +
      ". Dim: " +
      this.dim
    );
  }
}

function initializeLEDs(floors, rooms, ledCount) {
  for (let i = 0; i < floors; i++) {
    for (let j = 0; j < rooms; j++) {
      for (let k = 0; k < ledCount; k++) {
        let location = { floor: i, room: j, ledid: k };
        ledArray.push(new LED(false, false, location));
      }
    }
  }
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
    console.log(topic + " = " + message);
    console.log("Array index: " + getLEDIndex(topic));
    console.log(ledArray[getLEDIndex(topic)].ping());
  });
}

function getLEDIndex(topic) {
  let topics = topic.split("/");
  let id = topics[3];
  let floor = id.substring(0, 2);
  let room = id.substring(2, 4);
  let ledid = id.substring(4, 6);
  // The following is the formula to get index of LED based on its ID (xxyyzz)
  // where xx is floor, yy is room, zz is ledid
  // It is an unconventional way to do it, but this is not our business logic.
  // It is simply to emulate the LEDs.
  let arrayindex =
    parseInt(floor) * 200 + parseInt(room) * 10 + parseInt(ledid);
  return arrayindex;
}

let ledArray = [];
initializeLEDs(floors, rooms, ledCount);
initializeMQTTBroker();
//console.log(ledArray[205].getid());
console.log(ledArray[1334].locate());
