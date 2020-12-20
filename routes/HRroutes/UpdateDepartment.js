const express = require("express");
const route = express.Router({mergeParams: true});
const mongoose = require('mongoose');
const signOut=require("../../models/SignOut");
const faculty = require("../../models/Faculties");
const Courses = require("../../models/Courses");

require('dotenv').config();

route.post('/', async(req,res)=>{
  
  const facultyName = req.body.facultyName
  const oldDepartmentName = req.body.oldDepartmentName
  const departmentName = req.body.departmentName;
  const departmentHOD = req.body.departmentHOD;
  

  if(!facultyName){
      return res.send("Please Enter faculty name");
  }
  else{
    
    let f = await faculty.findOne({name:facultyName});

    if(departmentHOD){
        f.departments.forEach(element => {
            if(element.name == oldDepartmentName)
            {
                element.HOD = departmentHOD
            }
        });
    }


    if(oldDepartmentName && departmentName){ 
        f.departments.forEach(element => {
            if(element.name == oldDepartmentName)
            {
                element.name = departmentName
            }
        });
        

    }


    
        await f.save();
    const fUpdated =  await faculty.findOne({name:facultyName});
     return res.send(fUpdated);
  }
   

 
}
)

module.exports = route;