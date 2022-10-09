const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const base = `${__dirname}/public`;
const User = require("./models/User");
const LED = require("./models/LED");

const microserviceURL = "http://34.195.33.192:5000/api/";

const app = express();
const port = 5000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(cookieParser());

const MONGO = "mongodb://root:root@35.174.221.105:27017";
mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true });

import cookieParser from "cookie-parser";
var cookies = [];

const FLOORS = 8;
const ROOMS = 20;
const LEDCOUNT = 10;

app.use(function (req, res, next) {
  req.access = ""; // clean any value that attacker may have set.

  var cookie = req.cookies["massledauth"];
  cookies.forEach((element) => {
    if (element.value == cookie) {
      req.access = element.access;
    }
  });

  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5000");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.get("/", (req, res) => {
  res.sendFile(`${base}/index.html`);
});

app.get("/list", (req, res) => {
  res.sendFile(`${base}/list.html`);
});

app.get("/api/initializeLEDs", (req, res) => {
  deleteled()
    .then(() => {
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 20; j++) {
          for (let k = 0; k < 10; k++) {
            let genid =
              (i < 10 ? "0" : "") +
              i +
              (j < 10 ? "0" : "") +
              j +
              (k < 10 ? "0" : "") +
              k;
            const newLED = new LED({
              ledid: genid,
              state: false,
              dim: false,
            });
            newLED.save();
          }
        }
      }
    })
    .then(() => res.status(200).send("Initialized LEDs"));
});

app.post("/api/login", async (req, res) => {
  let success = false;
  await User.find({ username: req.body.username }).then((users) => {
    users.forEach((element) => {
      if (element.password == req.body.password) {
        let cookiex = {
          value: Math.floor(Math.random() * 1000000000),
          username: req.body.username,
          access: element.access,
        };
        res.cookie("massledauth", cookiex.value.toString(), {
          maxAge: 86400 * 1000, // 24 hours
          //httpOnly: true, // http only, prevents JavaScript cookie access
        });
        success = true;
        cookies.push(cookiex);
        res.status(200).send("OK");
      }
    });
  });
  if (!success) {
    res.status(403).send("Unauthorized");
  }
});

app.get("/api/user", (req, res) => {
  // if (req.access == "admin") {
  User.find({}, (err, users) => {
    return err ? res.send(err) : res.send(users);
  });
});

app.get("/api/access", (req, res) => {
  if (req.access == "admin") {
    LED.find({}, (err, led) => {
      return err ? res.status(404).send(err) : res.status(200).send({ led });
    });
  } else {
    let stringx = req.access.substring(0, 2) + "[0-9]{4}";
    LED.find({ ledid: { $regex: new RegExp(stringx) } }, (err, led) => {
      return err ? res.status(404).send(err) : res.status(200).send({ led });
    });
  }
});

app.post("/api/toggle", async (req, res) => {
  let urlx = microserviceURL + "toggle";
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
    console.log(ledarray);
  });
  // LED.find({ ledid: req.body.ledid }, (err, led) => {
  //   if (err) res.status(500).send(err);
  //   LED.findOneAndUpdate(
  //     { ledid: req.body.ledid },
  //     { state: !led[0].state },
  //     (err, ledx) => {
  //       if (err) res.status(500).send(err);
  //       res.status(200).send({ now: !led[0].state });
  //     }
  //   );
  // });
});

app.get("/api/led", (req, res) => {
  LED.find({ ledid: "030302" }, (err, users) => {
    return err ? res.status(404).send(err) : res.status(200).send(users);
  });
});

app.get("/api/deleteled", (req, res) => {
  deleteled().then(() => {
    res.send("Done");
  });
});

async function deleteled() {
  await LED.deleteMany({});
}

app.get("/api/createUser", (req, res) => {
  const newUser = new User({
    username: "adam",
    password: "adam",
    access: "02xxxx",
  });
  newUser.save((err) => {
    return err ? res.send(err) : res.send("successfully added new user");
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
