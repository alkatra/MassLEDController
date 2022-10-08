const express = require("express");
// const mongoose = require("mongoose");
// const MONGO = "mongodb://root:root@35.174.221.105:27017";
// mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true });
const app = express();
// const bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
const port = 5000;
// const User = require("./models/User");
// const LED = require("./models/LED");

// app.get("/api/test", (req, res) => {
//   for (let i = 0; i < 8; i++) {
//     for (let j = 0; j < 20; j++) {
//       for (let k = 0; k < 10; k++) {
//         let genid =
//           (i < 10 ? "0" : "") +
//           i +
//           (j < 10 ? "0" : "") +
//           j +
//           (k < 10 ? "0" : "") +
//           k;
//         const newLED = new LED({
//           ledid: genid,
//           state: false,
//           dim: false,
//         });
//         newLED.save();
//       }
//     }
//   }
//   res.send("The API is working!");
// }); //works

app.get("/api/user", (req, res) => {
  try {
    console.log("Got it");
    res.status(200).send("Awesome");
  } catch (e) {
    console.log(e);
  }
  // User.find({}, (err, users) => {
  //   console.warn("ERROR");
  //   return err ? res.send(err) : res.send(users);
  // });
});

// app.get("/api/led", (req, res) => {
//   LED.find({}, (err, users) => {
//     return err ? res.send(err) : res.send(users);
//   });
// });

// app.get("/api/deleteled", (req, res) => {
//   deleteled().then(() => {
//     res.send("Done");
//   });
// });

// async function deleteled() {
//   await LED.deleteMany({});
// }

// app.get("/api/postled", (req, res) => {
//   const newUser = new User({
//     username: "admin",
//     password: "admin",
//     access: "admin",
//   });
//   newUser.save((err) => {
//     return err ? res.send(err) : res.send("successfully added new user");
//   });
// });

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
