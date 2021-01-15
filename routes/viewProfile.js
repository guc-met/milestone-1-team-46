const express = require("express");
const route = express.Router();
const staffMember=require("../models/staffMember");

require('dotenv').config();

route.post('/', async(req,res)=>{
    const id=req.id;
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
    const memid=pre+member.no;
    return res.json({
       name:member.name,
       ID:memid,
       email:member.email,
       Office:member.office,
       DayOff:member.daysOff,
       AnnualLeaveBalance:member.annualLeaveBalance,
       AccidentalLeaveBalance:member.accidentalLeaveBalance,
       Department:member.department,
       Faculty:member.faculty
    })
}
)

module.exports = route;