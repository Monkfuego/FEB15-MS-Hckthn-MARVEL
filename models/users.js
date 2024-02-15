var mongoose = require("mongoose")

const Schema = mongoose.Schema
var usersschema = new Schema({
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    }
})
module.exports = mongoose.model("users" , usersschema)