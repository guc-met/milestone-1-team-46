const express = require("express");
const route = express.Router();
const staffMember=require("../models/staffMember");
const signIn = require('../models/SignIn');
const signOut = require('../models/SignOut');
const leavesM = require('../models/leaves');
const hoursbalance = require("../models/HourBalance");
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
    let today = new Date()
    let yearEnum = today.getFullYear() ;
    let monthEnum = today.getMonth()+1;
    let daysInMonth = new Date(yearEnum , monthEnum , 0).getDate();
    if(month)
    {
     const monthIn = allAttendanceIN.filter((record)=>{
         return (new Date(record.time).getMonth()+1 == month || new Date(record.time).getMonth()+1 == month+1)
     })
     const monthOut = allAttendanceOUT.filter((record)=>{
        return (new Date(record.time).getMonth()+1 == month || new Date(record.time).getMonth()+1 == month+1)
    })

    
    //TODO: comment the console.logs
    //console.log(monthIn);
   // console.log(monthOut);

    //console.log("days in month " ,daysInMonth);
    for(i = 11 ; i<daysInMonth+11 ; i++){
        day = i%daysInMonth;
        if(day==0) day = daysInMonth;
        if(day==1) month++;
        if(month==13){month = 1; yearEnum +=1;};
        let dateEnum =  yearEnum +"-" + month + "-" + day;
        allLeaves.forEach(ele => {
            leaveMonth = ele.date.getMonth()+1;
            leaveDay = ele.date.getDate();
            leaveDuration = ele.Duration
            if(leaveMonth==month){
                if(leaveDay == day || (day <= leaveDay+leaveDuration && day>leaveDay)){
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
        if(!(day==member.daysOff || day=="Friday") && !leaveExecuse)
            monthIn.forEach(element => {
            elementMonth = element.time.getMonth()+1;
            dateformat = yearEnum + "-" + elementMonth + "-" + element.time.getDate();
            if(dateformat == dateEnum)
            {
                attended = true;
            }
                //console.log(dateformat + "   " + dateEnum);

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

     res.send(missing);

     //now add the missing days onto his hours balance
     //FARAH NEEDS THIS
    if(month-1 ==0) month = 13
     let balanceRecord = await hoursbalance.findOne({id:id , month:month-1});
     if(!balanceRecord){

        const record = new hoursbalance({
            id : id,
            month : month-1,
            days : -missing.length
        })
        await record.save();

     }
     else{
         console.log("Found once in db")
         balanceRecord.days = -missing.length;
         await balanceRecord.save();

     }

    }
    else{
        return res.send('Please enter a month to view its missing days');
    }

   
    
   
   
    
}
)

module.exports = route;