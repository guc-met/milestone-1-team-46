const express = require("express");
const route = express.Router();
const staffMember=require("../models/staffMember");
const bcryptjs=require("bcryptjs");
require('dotenv').config();

route.post('/', async(req,res)=>{
    const id=req.id;
    let member= await staffMember.findOne({id:id});
    if(! member){
        return res.status(400).json({msg:"incorrect credentials"});        
    }
    const oldPassword=req.body.oldPassword; 
    const newPassword=req.body.newPassword; //passing parameters
    if(oldPassword && newPassword)
    {
        const confirmed= await bcryptjs.compare(oldPassword,member.password);   
        if(confirmed)
        {
            const salt=bcryptjs.genSaltSync();
            const hashedPassword=bcryptjs.hashSync(newPassword,salt);
            await staffMember.findOneAndUpdate({"id":id},  {$set :{"password": hashedPassword}});
        }
        else
        {
           return res.send("Wrong Old Password");
        }
    }
    else
    {
       return res.send("Please enter both password fields");
    }
    
     member= await staffMember.findOne({id:id});
    let pre="";
    if(member.hr)
    {
        pre="hr-";
    }
    else{
        pre="ac-";
    }
    const memid=pre+member.no;
   
    res.json({
       "id" : memid,
       "email":member.email,
       "password" : newPassword
    })
}
)

module.exports = route;