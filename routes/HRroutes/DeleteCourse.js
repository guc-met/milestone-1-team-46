const express = require("express");
const route = express.Router({mergeParams: true});
const mongoose = require('mongoose');
const signOut=require("../../models/SignOut");
const faculty = require("../../models/Faculties");
const staffMember = require("../../models/staffMember");

require('dotenv').config();

route.post('/', async(req,res)=>{
    const id=req.id;
    let member= await staffMember.findOne({id:id});
    if(! member){
        return res.status(400).json({msg:"incorrect credentials"});        
    }
  const facultyName = req.body.facultyName
  const departmentName = req.body.departmentName;
  const courseName = req.body.courseName;
  const courseCode = req.body.courseCode;
  
  let dep;
  if(! member.hr){
    return res.status(400).json({msg:"unauthorized you can't access this page"});        
}

  if(!facultyName){
      return res.send("Please Enter faculty name");
  }
  if(!departmentName){
    return res.send("Please Enter department name");
}
  if(!courseName && !courseCode){
    return res.send("Please Enter course name and course code");
}
  else{

    let f = await faculty.findOne({name:facultyName});
    for(i = 0 ; i<f.departments.length ; i++){

        if(f.departments[i].name == departmentName){
            dep = f.departments[i];
            break;
        }
    }
    
    for(j = 0 ; j<dep.courses.length ; j++){
        if(courseName == dep.courses[j].coursename){
            dep.courses.splice(j,1);
        }
    }

   
    
        await f.save();
      //  await faculty.updateOne({name:facultyName} , {$set: {departments : depArray}})

    
    const fUpdated =  await faculty.findOne({name:facultyName});
     return res.send(fUpdated);
  }
   

 
}
)

module.exports = route;