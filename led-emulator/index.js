// Number of LEDs to be emulated. Each floor has X rooms and each room has Y leds.
const floors = 8;
const rooms = 20;
const ledCount = 10;

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
      "" +
      this.location.floor +
      "" +
      this.location.room +
      "" +
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

let ledArray = [];

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

initializeLEDs(floors, rooms, ledCount);

console.log(ledArray[1].ping());
ledArray[1].dimlight();
ledArray[1].flip();
ledArray[1].dimlight();
ledArray[1].flip();

console.log(ledArray[1].ping());
