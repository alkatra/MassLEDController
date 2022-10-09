const url = "http://54.208.202.63:5000/api/";
var ledarrayG = [];

async function getLEDs() {
  let urlx = url + "access";
  await fetch(urlx, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    //other options
  }).then(async (response) => {
    let ledarray = await response.json();
    ledarrayG = ledarray.led;

    let floors = extractFloors();
    floors.forEach((floor) => {
      document.getElementById("get").innerHTML += returnFloorFlexBox(floor);
    });
  });
}

getLEDs();

async function ledToggle(ledid) {
  let urlx = url + "toggle";
  await fetch(urlx, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ ledid }),
    //other options
  }).then(async (response) => {
    let newVal = await response.json();
    newVal = newVal.now;
    if (newVal) {
      document.getElementById(ledid + "flex").classList.remove("bg-danger");
      document.getElementById(ledid + "flex").classList.add("bg-success");
    } else {
      document.getElementById(ledid + "flex").classList.remove("bg-success");
      document.getElementById(ledid + "flex").classList.add("bg-danger");
    }
  });
}

function extractFloors() {
  let floors = [];
  ledarrayG.forEach((led) => {
    let floor = parseInt(led.ledid.substring(0, 2));
    if (!floors.includes(floor)) floors.push(floor);
  });
  return floors;
}

function extractRooms(floorNumber) {
  let rooms = [];
  ledarrayG.forEach((led) => {
    if (parseInt(led.ledid.substring(0, 2)) == floorNumber) {
      let room = parseInt(led.ledid.substring(2, 4));
      if (!rooms.includes(room)) rooms.push(room);
    }
  });
  return rooms;
}

function extractLEDs(floor, room) {
  let objects = [];
  let string = "";
  string = (floor < 10 ? "0" : "") + floor + "" + (room < 10 ? "0" : "") + room;
  ledarrayG.forEach((led) => {
    if (led.ledid.substring(0, 4) == string) {
      objects.push(led);
    }
  });
  return objects;
}

function handleRoomClick(floor, room) {
  var leds = extractLEDs(floor, room);
  document.getElementById(
    "get"
  ).innerHTML = `<h3>Floor: ${floor}, Room: ${room}</h3><br></br>`;
  leds.forEach((led, id) => {
    document.getElementById("get").innerHTML += returnLEDFlexBox(
      led,
      floor,
      room,
      id
    );
  });
}

function handleFloorClick(floorNumber) {
  let rooms = extractRooms(floorNumber);
  document.getElementById(
    "get"
  ).innerHTML = `<h3>Floor: ${floorNumber}</h3><br></br>`;
  rooms.forEach((room) => {
    document.getElementById("get").innerHTML += returnRoomFlexBox(
      floorNumber,
      room
    );
  });
}

function returnLEDFlexBox(led, floor, room, id) {
  let x = "a" + led.ledid + "a";

  return `<div class="d-inline-flex p-2 m-2 bg-${
    led.state ? "success" : "danger"
  }" id="${led.ledid}flex">
  ID: ${led.ledid} <br/>
  <button type="button" class="btn btn-info m-2" onclick=ledToggle("${
    led.ledid
  }")>
  Toggle <br/>
  </button>
  </div>`;
}

function returnFloorFlexBox(floor) {
  return `<button type="button" class="btn btn-info m-2" id="${floor}floorbox" onclick=handleFloorClick(${floor})>
  Floor: ${floor} <br/>
  </button>`;
}

function returnRoomFlexBox(floor, room) {
  return `<button type="button" class="btn btn-info m-2" id="${room}roombox" onclick=handleRoomClick(${floor},${room})>
  Room: ${room} <br/>
  </button>`;
}
