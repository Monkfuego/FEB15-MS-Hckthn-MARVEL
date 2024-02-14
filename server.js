var express = require("express")
var app = express()
app.use(express.static(__dirname + "/"))
app.get("/" , (req , res) => {
    res.sendFile(__dirname + "/")
})

app.listen(200 , () => {
    console.log("server")
})