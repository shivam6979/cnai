const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    firstName:{type:String, required:true},
    number:{type:Number, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
});

const User = mongoose.model("user",userSchema)

module.exports = User;