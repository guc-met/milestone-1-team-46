const express = require("express");
const route = express.Router({mergeParams: true});
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
  const name = req.body.name
  const departments = req.body.departments;
  
 if(! member.hr){
        return res.status(400).json({msg:"unauthorized you can't access this page"});        
    }
  if(!name){
      return res.send("Please Enter faculty name");
  }
  else{
     const f1 = new faculty({
         name : name
     })

     if(departments){
         f1.departments = departments
     }
      await f1.save().then(()=>{
          console.log("Faculty Added");
      })
     return res.send(f1);
  }
   

 
}
)

module.exports = route;