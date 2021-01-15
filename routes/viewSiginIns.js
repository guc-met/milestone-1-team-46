const express = require("express");
const route = express.Router();
const staffMember=require("../models/staffMember");
const SignIn = require("../models/SignIn");
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

    let signIns = [];
    let output =[];
    signIns = await SignIn.find({id:id});
    signIns.forEach(element => {
        if(element.time.getMonth()+1 == month)
        output.push(element);
    });
    const memid=pre+member.no;
    res.send(output);

}
)

module.exports = route;