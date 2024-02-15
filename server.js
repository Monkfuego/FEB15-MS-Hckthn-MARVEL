var bodyParser = require("body-parser");
var express = require("express");
var session = require("express-session");
var bcrypt = require("bcrypt");
var mongoose = require("mongoose");
require("dotenv").config();

var app = express();
app.use(express.static(__dirname + "/"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session middleware with a random secret key and MongoDB store
var fs = require("fs")
var image1 = fs.readFileSync("RDT_20240215_181550740786580592949787.jpg")
var image2 = fs.readFileSync("RDT_20240215_1813402010455412332883482.jpg")
var image3 = fs.readFileSync("RDT_20240215_181550740786580592949787.jpg")
var image4 = fs.readFileSync("RDT_20240215_1813402010455412332883482.jpg")
var base64Image1 = image1.toString('base64')
var base64Image2 = image2.toString('base64')
var base64Image3 = image3.toString('base64')
var base64Image4 = image4.toString('base64')
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
});

var imageSchema = new mongoose.Schema({
  id : Number,
  image : String,
  dec : String
});

var users = mongoose.model("users", userSchema);
var images = mongoose.model("buying" , imageSchema)
app.get("/", (req, res) => {
  res.set({
    "Allow-access-Allow-Origin": "*",
  });
  return res.redirect("/signin.html");
});

// Signup route
app.post("/signup", async (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  var confirmPassword = req.body.confirmPassword;
  var email = req.body.email;

  if (password === confirmPassword) {
    const hashedPassword = await bcrypt.hash(password, 10);

    var data = {
      username: username,
      password: hashedPassword,
      email: email,
    };
    try {
      await users.create(data);
      res.redirect("./signin.html");
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  } else {
    res.status(400).send("Password not matching");
  }
});

// Signin route
app.post("/signin", async (req, res) => {
  var { username, password } = req.body;
  try {
    var user = await users.findOne({ username: username });
    module.exports = user

    if (user) {
      var pass = await bcrypt.compare(password, user.password);
      if (pass) {
        return res.redirect("./strange.html");
      }
      else if(!pass){
        return res.status(401).send("Incorrect password");
      }
    else {
      return res.status(404).send("User not found");
    }
  }
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
});

var PORT = process.env.PORT || 200;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});

var imgs1 = {
  id : 1,
  image : base64Image1
}
var imgs2 = {
  id : 2,
  image : base64Image2
}
var imgs3 = {
  id : 3,
  image : base64Image3
}
var imgs4 = {
  id : 4,
  image : base64Image4
}
users.create(imgs1)
users.create(imgs2)
users.create(imgs3)
users.create(imgs4)