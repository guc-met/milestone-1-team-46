const express = require("express");
const route = express.Router();
const staffMember=require("../models/staffMember");

require('dotenv').config();

route.post('/', async(req,res)=>{
    const id=req.id;
    let member= await staffMember.findOne({id:id});
    if(! member){
        return res.status(400).json({msg:"incorrect credentials"});        
    }
    const office=req.body.office; 
    const dayoff=req.body.dayoff; //passing parameters

    if(!office && !dayoff){
        return res.send("Please Enter an office or dayoff to update");
    }

    if(office)
    {
       await staffMember.findOneAndUpdate({"id":id},  {$set :{"office": office}});
    }
    if(dayoff)
    {
       await staffMember.findOneAndUpdate({"id":id},  {$set: {"daysOff": [dayoff]}});
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
       "name":member.name,
       "ID":memid,
       "email":member.email,
       "Office":member.office,
       "Day-Off":member.daysOff,
       "Annual Leave Balance":member.annualLeaveBalance,
       "Accidental Leave Balance":member.accidentalLeaveBalance,
       "Department":member.department,
       "Faculty":member.faculty,
    //    "Salary":member.Salary
    })
}
)

module.exports = route;