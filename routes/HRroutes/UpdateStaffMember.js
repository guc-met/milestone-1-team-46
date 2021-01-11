const express = require("express");
const route = express.Router();
const staffMember=require("../../models/staffMember");

require('dotenv').config();

route.put('/', async(req,res)=>{
    let member= await staffMember.findOne({id:req.id});
    if(!member){
        return res.status(400).json({msg:"incorrect credentials"});        
    }
    const id=req.id;
    const email=req.body.email;
     member= await staffMember.findOne({id:id});
    if(! member.hr){
        return res.status(400).json({msg:"unauthorized you can't access this page"});        
    }
    const department=req.body.department; 
    const faculty=req.body.faculty; //passing parameters
    if(department)
    {
       await staffMember.findOneAndUpdate({email:email},  {$set :{department: department}});
    }
    if(faculty)
    {
       await staffMember.findOneAndUpdate({email:email},  {$set: {faculty: faculty}});
    }
     member= await staffMember.findOne({email:email});
    // let pre="";
    // if(member.hr)
    // {
    //     pre="hr-";
    // }
    // else{
    //     pre="ac-";
    // }
    // const memid=pre+member.no;
    
    res.json({
       "name":member.name,
    //    "ID":memid,
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