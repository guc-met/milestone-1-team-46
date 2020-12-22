const express = require("express");
const route = express.Router();
const staffMember=require("../../models/staffMember");
const room=require("../../models/Room");
const staffMember = require("../../models/staffMember");

require('dotenv').config();

route.post('/', async(req,res)=>{
    const HRid=req.id;
    let member= await staffMember.findOne({id:HRid});
    if(! member.hr){
        return res.status(400).json({msg:"unauthorized you can't access this page"});        
    }
    let cc,ac,ci,hod=false;
    var hr=false;
    let dayOff="";
    let office="";
    const name=req.body.name;
    const role=req.body.role;
    const email=req.body.email;
    const department=req.body.department;
    const Faculty=req.body.faculty;
  //   const email=req.body.email;
    // const salary=req.body.salary;
    // const office=req.body.office;  //passing parameters
    for(i=0;i<role.length;i++){
        if(role[i]=="ac"){
            ac=true;
        }
        if(role[i]=="cc"){
            cc=true;
        }
        if(role[i]=="ci"){
            ci=true;
        }
        if(role[i]=="hr"){
            hr=true;
            dayOff="Saturday";
        }
        if(role[i]=="hod"){
            hod=true;
        }
    }
    let member2= await staffMember.findOne({email:email});
    if (member2 !=null){
        res.send("please enter a unique email");
    }
    const curRoom=await room.find({roomtype:"office"});
    for(i=0;i<curRoom.length;i++){
        if (curRoom[i].currcapacity +1 <=curRoom[i].maxcapacity){
            office=curRoom[i].location;
            await room.findOneAndUpdate({location:curRoom[i].location},{$set :{"currcapacity": curRoom[i].currcapacity+1}});
        }
    }
    if(name){

        
          let NewStaff = new staffMember({
            name:name,
            hr:hr,
            ac:ac,
            cc:cc,
            ci:ci,
            hod:hod,
            email:email,
            department:department,
            faculty:Faculty,
            daysOff:dayOff,
            office:office
            
           })
         await  NewStaff.save();
           
    }
    else{
        return res.status(401).json({ msg: "unauthorized you cant add your own missing sign-in " })
    }
    
     member= await staffMember.findOne({email:email});
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
    // res.send("added new staff member successfully")
}
)

module.exports = route;