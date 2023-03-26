const mongoose = require("mongoose");

module.exports = ()=>{
    try{
        mongoose.connect(process.env.DB,{
            useNewUrlParser:true
        });
        console.log("Connected to database successfully")
    }
    catch(e){
        console.log(e)
    }
}