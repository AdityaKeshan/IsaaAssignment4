const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var mongoose = require("mongoose");
const itemSchema = new mongoose.Schema({
  id: String,
  name: String,
  address: String,
  phone: String,
  aadhaar: String,
  email: String,
  password: String,
  dob: String,
});
const Item = mongoose.model("Item", itemSchema);
const item1 = new Item({
  id: "123",
  name: "String",
  phone: "String",
  email: "String",
  password: "String",
  dob: "String",
});
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
async function decryptString(p1)
{
  let a="";
  for(let i in p1)
  {
    let k=parseInt(p1[i]);
    let f=(BigInt(k) ** BigInt(d))%BigInt(n);
    a=a+String.fromCharCode(parseInt(f));
  }
  return a;
}
async function getFromDb(id)
{
Item.findOne({id:id},function(err,its)
{
console.log(its);
if(err)
{
  return -1;
}
else
{
  const ans={id: id,
    name: decryptString(its.name),
    phone: decryptString(its.phone),
    email: decryptString(its.email),
    password: decryptString(its.password),
    dob: decryptString(its.dob)};
    return ans;
}
});
}
async function saveToDb(p) {
  let id = parseInt(Math.random() * 8999 + 1000);
  const newItem = new Item({
    id: id,
    name: encrypt(p.name),
    phone: encrypt(p.phone),
    email: encrypt(p.email),
    password: encrypt(p.password),
    dob: encrypt(p.dob)
  });
  newItem.save();
  return id;
}
app.listen(3000, function () {
  console.log("Server is running on 3000");
});

app.get("/", function (req, res) {
  val = encrypt("Aditya");
  item1.save();
  val.then((d1) => {
    console.log(val);
    res.send(d1);
  });
});

app.post("/", async function (req, res) {
  let v = await saveToDb(req.body);
  v.then(function (value) {
    if(value>=1000)
    {
      res.send("Saved");
    }
    else
    {
      res.send("Error in Parameters");
    }
  });
});
