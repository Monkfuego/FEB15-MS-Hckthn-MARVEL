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
    return res.redirect("./signin.html")
})

app.post("/signup", async (req, res) => {
    var usernamemain = req.body.username;
    var password = req.body.password;
    var confirmPassword = req.body.confirmPassword;
  
    if (toString(password) === toString(confirmPassword)) {
      const hashedPassword = await bcrypt.hash(password, 10);
  
      var data = {
        username: usernamemain,
        password: hashedPassword,
      };
  
      marvel.collection("users").insertOne(data, async (err, collection) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error signing up");
        } else {
          console.log("User signed up successfully");
          res.redirect("./signin.html");
        }
      });
    } else {
      res.status(400).send("Password not matching");
    }
  });

app.post("/signin" , async (req , res) => {
  var usernamemain = req.body.username
  var passwords = req.body.password
  var dbstored = await marvel.collection("users").find({}).toArray()
  console.log(usernamemain)
  console.log(dbstored)
  console.log(passwords)
  for (var i = 0 ; i < dbstored.length ; i++){
    var ele = dbstored[i]
    try{
      if (dbstored){
        var pass = await bcrypt.compare(passwords , ele.password)
        if(pass == true){
          res.send("logged in")
        }
      }
      res.send("incorrect login details")
    }
    catch(err){
      console.log(err)
    }
  }
})
  

app.listen(200 , () => {
    console.log("server")
})