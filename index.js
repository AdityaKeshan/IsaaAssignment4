const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
var mongoose = require("mongoose");
const itemSchema = new mongoose.Schema({
  id: String,
  name: Array,
  phone: Array,
  email: Array,
  password: Array,
  dob: Array,
});
const Item = mongoose.model("Item", itemSchema);

mongoose.connect("mongodb://localhost:27017/userDB", { useNewUrlParser: true });
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
function encrypt(p) {
  val = encryptString(p);
  return val;
}
function encryptString(p1) {
  var a = [];
  for (let i in p1) {
    s = p1.charCodeAt(i);
    g = s ** e % n;
    a.push(g);
  }
  return a;
}
function decryptString(p1) {
  let a = "";
  for (let i in p1) {
    let k = parseInt(p1[i]);
    let f = BigInt(k) ** BigInt(d) % BigInt(n);
    a = a + String.fromCharCode(parseInt(f));
  }
  return a;
}
function getFromDb(id) {
  
}
function saveToDb(p) {
  let id = parseInt(Math.random() * 8999 + 1000);
  let name = encrypt(p.name);
  let phone = encrypt(p.phone);
  let email = encrypt(p.email);
  let password = encrypt(p.password);
  let dob = encrypt(p.dob);
  const newItem = new Item({
    id: id,
    name: name,
    phone: phone,
    email: email,
    password: password,
    dob: d,
  });
  newItem.save();
  return id;
}
app.listen(3000, function () {
  console.log("Server is running on 3000");
});

app.get("/", function (req, res) {
  res.render("index");
});
app.get("/view", function (req, res) {
  res.render("view", { itemS: {} });
});
app.post("/view", async function (req, res) {
  let id = req.body.id;
  let its;
  Item.findOne({ id: id }, function (err, its) {
    if (err) {
      return -1;
    } else {
      its = {
        name: decryptString(its.name),
        phone: decryptString(its.phone),
        email: decryptString(its.email),
        password: decryptString(its.password),
        dob: decryptString(its.dob),
      };
      console.log(its);
      res.render("view", { itemS: its });
    }
  });
  
});
app.post("/", async function (req, res) {
  console.log(req.body);
  let v = saveToDb(req.body);
  console.log(v);
  if (v >= 1000) {
    res.send("Saved!. Please Remember your id : " + v);
  } else {
    res.send("Error in Parameters");
  }
  // v.then(function (value) {
  //   console.log(value);
  //   if(value>=1000)
  //   {
  //     res.send("Saved");
  //   }
  //   else
  //   {
  //     res.send("Error in Parameters");
  //   }
  // });
});
