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


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
});

var users = mongoose.model("users", userSchema);
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
