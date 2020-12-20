const express = require("express");
const route = express.Router();
const staffMember=require("../models/staffMember");
const signIn = require('../models/SignIn');
const signOut = require('../models/SignOut');
const leavesM = require('../models/leaves');
const { sign } = require("jsonwebtoken");
require('dotenv').config();

route.post('/', async(req,res)=>{
    const id=req.id;
    let member= await staffMember.findOne({id:id});
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
    let month=req.body.month; 
    const allAttendanceIN=  await signIn.find({id : id});
    const allAttendanceOUT=  await signOut.find({id : id});
    const allLeaves = await leavesM.find({id:id});
    let missing = []
    let attended = false;
    let dateformat = "";
    let day = "";
    let leaveExecuse = false;
    if(month)
    {
     const monthIn = allAttendanceIN.filter((record)=>{
         return (new Date(record.time).getMonth()+1 == month || new Date(record.time).getMonth()+1 == month+1)
     })
     const monthOut = allAttendanceOUT.filter((record)=>{
        return (new Date(record.time).getMonth()+1 == month || new Date(record.time).getMonth()+1 == month+1)
    })

    
    //TODO: comment the console.logs
    console.log(monthIn);
    console.log(monthOut);


    for(i = 11 ; i<42 ; i++){
        day = i%31;
        if(day==0) day = 31;
        if(day==1) month++;
        let dateEnum = "2020-" + month + "-" + day;
        allLeaves.forEach(ele => {
            leaveMonth = ele.date.getMonth()+1;
            leaveDay = ele.date.getDate();
            if(leaveMonth==month){
                if(leaveDay == day || (day == leaveDay-1) || (day < leaveDay+ele.Duration-1 && day>leaveDay)){
                        leaveExecuse = true;
                }
            }
        });

        switch (new Date(dateEnum).getDay()){
            case(0): day = "Sunday"; break;
            case(1): day = "Monday"; break;
            case(2): day = "Tuesday"; break;
            case(3): day = "Wednesday"; break;
            case(4): day = "Thursday"; break;
            case(5): day = "Friday"; break;
            case(6): day = "Saturday"; break;
        }
        if(!(day==member.daysOff[0] || day==member.daysOff[1]) && !leaveExecuse)
        
            monthIn.forEach(element => {
            elementMonth = element.time.getMonth()+1;
            dateformat = "2020-" + elementMonth + "-" + element.time.getDate();
            if(dateformat == dateEnum)
            {
                attended = true;
            }
                console.log(dateformat + "   " + dateEnum);

              });
        else{
             attended = true;
            }
    if(!attended)
    {
        missing.push(dateEnum);
    }
    attended = false;
    leaveExecuse = false;
}

    return res.send(missing);
    }
    else{
        return res.send('Please enter a month to view its missing days');
    }

   
    
   
   
    
}
)

module.exports = route;