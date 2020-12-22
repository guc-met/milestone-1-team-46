const express = require("express");
const route = express.Router({mergeParams: true});
const mongoose = require('mongoose');
const signOut=require("../../models/SignOut");
const faculty = require("../../models/Faculties");
const Courses = require("../../models/Courses");
const staffMember = require("../../models/staffMember");

require('dotenv').config();

route.post('/', async(req,res)=>{
    const id=req.id;
    let member= await staffMember.findOne({id:id});
    if(! member){
        return res.status(400).json({msg:"incorrect credentials"});        
    }
  const facultyName = req.body.facultyName
  const departments = req.body.departments;
  const departmentName = req.body.departmentName;
  const departmentHOD = req.body.departmentHOD;
  if(! member.hr){
    return res.status(400).json({msg:"unauthorized you can't access this page"});        
}

  if(!facultyName){
      return res.send("Please Enter faculty name");
  }
  else{
    
    let f = await faculty.findOne({name:facultyName});

    // if(departments){
    //     f.departments = f.departments.concat(departments);
    // }
    if(departmentName && departmentHOD){ 
        const dep = ({
            name : departmentName,
            HOD : departmentHOD
        })
        f.departments.push(dep);
        await f.save();
      //  await faculty.updateOne({name:facultyName} , {$set: {departments : depArray}})

    }
    const fUpdated =  await faculty.findOne({name:facultyName});
     return res.send(fUpdated);
  }
   

 
}
)

module.exports = route;