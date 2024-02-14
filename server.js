var bodyparser = require("body-parser")
var express = require("express")
var app = express()
var bcrypt = require("bcrypt")
var mongoose = require("mongoose")
app.use(express.static(__dirname + "/"))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended : true}))
var marvel = mongoose.connection
mongoose.connect("mongodb://0.0.0.0:27017/marvel", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.get("/" , (req , res) => {
    res.set({
        "Allow-access-Allow-Origin" : "*"
    })
    return res.redirect("index.html")
})

app.post("/signup", async (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    var confirmPassword = req.body.confirmPassword;
  
    if (toString(password) === toString(confirmPassword)) {
      const hashedPassword = await bcrypt.hash(password, 10);
  
      var data = {
        username: username,
        password: hashedPassword,
      };
  
      marvel.collection("users").insertOne(data, async (err, collection) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error signing up");
        } else {
          console.log("User signed up successfully");
          res.redirect("./index.html");
        }
      });
    } else {
      res.status(400).send("Password not matching");
    }
  });
  

app.listen(200 , () => {
    console.log("server")
})