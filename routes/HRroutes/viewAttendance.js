const express = require("express");
const route = express.Router({mergeParams: true});
const staffMember=require("../../models/staffMember");
const signIn = require('../../models/SignIn');
const leaves = require('../../models/leaves');
const signOut = require('../../models/SignOut');
const HourBalance = require('../../models/HourBalance');
const { sign } = require("jsonwebtoken");
require('dotenv').config();

route.get('/', async(req,res)=>{
    const id=req.id;
    const sID=req.body.id;
    let member= await staffMember.findOne({id:id});
    if(! member){
        return res.status(400).json({msg:"incorrect credentials"});        
    }
    if(! member.hr){
        return res.status(400).json({msg:"you can't access this page"});        
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
    const month=req.body.month; 
    const allAttendanceIN=  await signIn.find({id : sID});
    const allAttendanceOUT=  await signOut.find({id : sID});
    let output = []
    let ins = []
    let outs = []
    let object ;

    if(month)
    {
        //if he specifies a month?

        //sign ins
       
        for(i = 0 ; i<allAttendanceIN.length ; i++){
            if(new Date(allAttendanceIN[i].time).getMonth()+1 == month){
          object = {
                  id : memid,
                  time : allAttendanceIN[i].time,
                  HR_id : allAttendanceIN[i].HR_id
          }
          ins.push(object);

        }
        }
         
            //sign outs

        for(i = 0 ; i<allAttendanceOUT.length ; i++){
            if(new Date(allAttendanceOUT[i].time).getMonth()+1 == month){
          object = {
                  id : memid,
                  time : allAttendanceOUT[i].time,
                  HR_id : allAttendanceOUT[i].HR_id
          }
          outs.push(object);

        }
        }
        return res.send("Sign ins : " + JSON.stringify(ins) + "\n" + "Signs outs : " + JSON.stringify(outs));
    }

    else   //if he doesnt specify a month , get all records
    {
    
      for(i = 0 ; i<allAttendanceIN.length ; i++){

        object = {
                id : memid,
                time : allAttendanceIN[i].time,
                HR_id : allAttendanceIN[i].HR_id
        }
        ins.push(object);
      }





      for(i = 0 ; i<allAttendanceOUT.length ; i++){

        object = {
                id : memid,
                time : allAttendanceOUT[i].time,
                HR_id : allAttendanceOUT[i].HR_id
        }
        outs.push(object);
      }
     

      return res.send("Sign ins : " + JSON.stringify(ins) + "\n" + "Signs outs : " + JSON.stringify(outs));
    }
    
   
   
    
}
)

module.exports = route;