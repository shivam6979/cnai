const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
// const Token = require("../models/token")
const crypto = require("crypto");
let validateEmail = function (email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);    //Checking if user entered a valid email or not
};
let validatePassword = function (password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/.test(password)    //Checking if user entered a valid password or not
};

// login route
router.post("/",async (req,res)=>{
    try{
        let data = req.body;
        console.log("data----------",data)
        let {email,password}= data
        if(!data) return res.status(400).send({status:false, msg:"please enter data"});
        if(!email) return res.status(400).send({status:false, msg:"please enter email"})
        if(!password) return res.status(400).send({status:false, msg:"please enter password"})
        const user = await User.findOne({email:req.body.email})
        if(!user) return res.status(401).send({message:"Invalid emailId or password"});
        const validPassword = await bcrypt.compare(req.body.password,user.password);
        if(!validPassword) return res.status(401).send({message:"Invalid Email or password"});
        console.log("before Token")
        let userId = user._id
        console.log("userId-----------", userId)
        // const token = jwt.sign({ userId:userId, exp:"1h" }, 'ProjectNo-5')
        const token = jwt.sign({ userId:userId,name:user.firstName }, "privateKey",{expiresIn:"1h"});
        console.log("token out side--------------- ",token)
        res.status(200).send({status:true, token:token});
    }
    catch(e){
        res.status(500).send({message:e.meaasge})
    }
})
module.exports=router

