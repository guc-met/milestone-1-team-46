const express = require("express");
const route = express.Router();
const staffMember=require("../models/staffMember");
const SignOuts = require("../models/SignOut");
require('dotenv').config();

route.post('/', async(req,res)=>{
    const id=req.id;
    const month = req.body.month;
    const member= await staffMember.findOne({id:id});
    if(! member){
        return res.status(400).json({msg:"incorrect credentials"});        
    }
    let pre="";
    if(member.hr)
    {
        pre="hr-";
    }
    else{
        pre="ac-";
    }

    let SignOutss = [];
    let output =[];

    SignOutss = await SignOuts.find({id:id , month : month});
SignOutss.forEach(element => {
    if(element.time.getMonth()+1 == month)
    output.push(element);
});
    const memid=pre+member.no;
    res.send(output);
    console.log(output);
    console.log("hey")
}
)

module.exports = route;