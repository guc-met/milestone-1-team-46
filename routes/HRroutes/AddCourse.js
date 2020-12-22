const express = require("express");
const route = express.Router({mergeParams: true});
const mongoose = require('mongoose');
const signOut=require("../../models/SignOut");
const faculty = require("../../models/Faculties");

require('dotenv').config();

route.post('/', async(req,res)=>{
    // const id=req.id;
    // let member= await staffMember.findOne({id:id});
    // if(! member){
    //     return res.status(400).json({msg:"incorrect credentials"});        
    // }
  const facultyName = req.body.facultyName
  const departmentName = req.body.departmentName;
  const courseName = req.body.courseName;
  const courseCode = req.body.courseCode;
  const ccId = req.body.ccId;
  const labs = req.body.labs;
  const lectures = req.body.lectures;
  const tutorials = req.body.tutorials;
  const totalSlots = req.body.totalSlots;
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
  if(!courseName || !courseCode){
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
    const course = {
        coursename : courseName,
        coursecode : courseCode
    }

    if(ccId)
    course.ccId = ccId;

    if(labs)
    course.labs = labs;

    if(lectures)
    course.lectures = lectures;

    if(tutorials)
    course.tutorials = tutorials;

    if(totalSlots)
    course.totalslots = totalSlots;

    dep.courses.push(course);
    
        await f.save();
      //  await faculty.updateOne({name:facultyName} , {$set: {departments : depArray}})

    
    const fUpdated =  await faculty.findOne({name:facultyName});
     return res.send(fUpdated);
  }
   

 
}
)

module.exports = route;