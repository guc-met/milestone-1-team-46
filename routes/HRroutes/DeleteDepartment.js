const express = require("express");
const route = express.Router({mergeParams: true});
const mongoose = require('mongoose');
const signOut=require("../../models/SignOut");
const faculty = require("../../models/Faculties");
const Courses = require("../../models/Courses");

require('dotenv').config();

route.post('/', async(req,res)=>{
  
  const id=req.id;
    let member= await staffMember.findOne({id:id});
    if(! member){
        return res.status(400).json({msg:"incorrect credentials"});        
    }
  const facultyName = req.body.facultyName
  const departmentName = req.body.departmentName;
  
  if(! member.hr){
    return res.status(400).json({msg:"unauthorized you can't access this page"});        
}

  if(!facultyName){
      return res.send("Please Enter faculty name");
  }
  else{
    
    let f = await faculty.findOne({name:facultyName});

    console.log(f.departments);

    if(departmentName){ 
      for(i = 0 ; i <f.departments.length ; i++){
          if(f.departments[i].name == departmentName){
              f.departments.splice(i,1);
          }
      }

    }


    
        await f.save();
    const fUpdated =  await faculty.findOne({name:facultyName});
     return res.send(fUpdated);
  }
   

 
}
)

module.exports = route;