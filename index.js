const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var mongoose = require("mongoose");
const p = 137;
const q = 149;
const n = p * q;
const r = (p - 1) * (q - 1);
const e = eVal();
const d = dVal();
function eVal() {
  let ye = 2;
  for (let i = 2; i < r; i++) {
    if (gcd(i, r) == 1) {
      ye = i;
      break;
    }
  }
  return ye;
}
function dVal() {
  let d1 = 0;
  for (let k = 1; ; k++) {
    let sum = 1 + k * r;
    let f = parseInt(sum / e);
    if (f * e == sum) {
      d1 = f;
      break;
    }
  }
  return d1;
}
function gcd(a, b) {
  if (a == 0) {
    return b;
  }
  return gcd(b % a, a);
}
mongoose.connect("mongodb://localhost:27017/userDB", { useNewUrlParser: true });
async function encrypt(p) {
  val = await encryptString(p);
  return val;
}
async function encryptString(p1) {
  var a = [];
  for (let i in p1) {
    s = p1.charCodeAt(i);
    g = s ** e % n;
    a.push(g);
  }
  return a;
}

app.listen(3000, function () {
  console.log("Server is running on 3000");
});

app.get("/", function (req, res) {
  val = encrypt("Aditya");
  val.then((d1) => {
    console.log(val);
    res.send(d1);
  });
});
app.post("/", async function (req, res) {
  console.log(req.body);
  res.send(val);
});