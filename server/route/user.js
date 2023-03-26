const User = require("../models/user");
const router = require("express").Router();
const bcrypt = require("bcrypt");
// const Token = require("../models/token")
// const sendEmail = require("../utiles/sendEmail")
const crypto = require("crypto");//global module no ned to install

// regex for validation email
let validateEmail = function (email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);    //Checking if user entered a valid email or not
};

let validatePassword = function (password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/.test(password)    //Checking if user entered a valid password or not
};

let validatephone = function (phone) {
    return /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[6789]\d{9}|(\d[ -]?){10}\d$/.test(number)   //Checking if user entered a valid phone or not
};

// register route or signup
router.post("/",async (req,res)=>{
    try{
        let data = req.body;
        console.log("data.firstname============",data.firstname)
        console.log("data=============",data)
        if(!data) return res.status(400).send({status:false, msg:"please enter data"})
        let {firstName,number,email,password} = data
        console.log("=====================1")
        if(!firstName) return res.status(400).send({status:false, msg:"please enter name"}, console.log("firstname=======",firstname))
        console.log("=====================2")
        if(!number) return res.status(400).send({status:false, msg:"please enter number"})
        if(!email) return res.status(400).send({status:false, msg:"please enter email"})
        if(!password) return res.status(400).send({status:false, msg:"please enter password"})
        console.log("=====================3")
        let user = await User.findOne({email:req.body.email});
        if(user) return res.status(409).send({message:"User with given email already exits!"});
        const salt  = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password,salt)
        let user1 = await new User({...req.body,password:hashPassword}).save();
        res.status(201).send({status:true,message:user1});
    }
    catch(e){
        console.log(e)
        return res.status(400).send({status:true, msg:"Something went wrong"})
    }
})
module.exports = router;


