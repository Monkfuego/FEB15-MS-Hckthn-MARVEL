var bodyparser = require("body-parser")
var express = require("express")
var app = express()
var bcrypt = require("bcrypt")
var mongoose = require("mongoose")
app.use(express.static(__dirname + "/"))
app.use(bodyparser.json())
require("dotenv").config()
var PORT = process.env.PORT || 200
var users = require("./models/users")
app.use(bodyparser.urlencoded({extended : true}))
mongoose.connect(process.env.MONGO_URI);
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
    var mail = req.body.email

  
    if (toString(password) === toString(confirmPassword)) {
      const hashedPassword = await bcrypt.hash(password, 10);
  
      var data = {
        username: usernamemain,
        password: hashedPassword,
        email : mail  
        
      };
      try{
      await users.insertMany(data)
      res.redirect("./signin.html")
      }
      catch (err){
        throw err
      }
    } else {
      res.status(400).send("Password not matching");
    }
  });

app.post("/signin" , async (req , res) => {
  var usernamemain = req.body.username
  var passwords = req.body.password
  var dbstored = await user.find({}).toArray()
  console.log(usernamemain)
  console.log(dbstored)
  console.log(passwords)
  for (var i = 0 ; i < dbstored.length ; i++){
    var ele = dbstored[i]
    try{
      if (dbstored){
        var pass = await bcrypt.compare(passwords , ele.password)
        if(pass == true && type){
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
  

app.listen(PORT , () => {
    console.log("server")
})