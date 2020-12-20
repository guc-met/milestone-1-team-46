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
  const oldCourseName = req.body.oldCourseName;
  const oldCourseCode = req.body.oldCourseCode;
  const courseName = req.body.courseName;
  const courseCode = req.body.courseCode;
  const ccId = req.body.ccId;
  const labs = req.body.labs;
  const lectures = req.body.lectures;
  const tutorials = req.body.tutorials;
  const totalSlots = req.body.totalSlots;
  let dep;

  if(!facultyName){
      return res.send("Please Enter faculty name");
  }
  if(!departmentName){
    return res.send("Please Enter department name");
}
  if(!oldCourseName || !oldCourseCode){
    return res.send("Please Enter course name and course code");
}
  else{
    let course = {}

    let f = await faculty.findOne({name:facultyName});
    for(i = 0 ; i<f.departments.length ; i++){

        if(f.departments[i].name == departmentName){
            dep = f.departments[i];
            break;
        }
    }
    for(j = 0 ; j<dep.courses.length ; j++){
        if(oldCourseName == dep.courses[j].coursename && oldCourseCode == dep.courses[j].coursecode){
            course = dep.courses[j];
        }
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

    if(courseName)
    course.coursename = courseName;

    if(courseCode)
    course.coursecode = courseCode;

    
        await f.save();
      //  await faculty.updateOne({name:facultyName} , {$set: {departments : depArray}})

    
    const fUpdated =  await faculty.findOne({name:facultyName});
     return res.send(fUpdated);
  }
   

 
}
)

module.exports = route;