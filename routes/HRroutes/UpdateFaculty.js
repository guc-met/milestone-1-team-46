const express = require("express");
const route = express.Router({mergeParams: true});
const signOut=require("../../models/SignOut");
const faculty = require("../../models/Faculties");

require('dotenv').config();

route.post('/', async(req,res)=>{
    // const id=req.id;
    // let member= await staffMember.findOne({id:id});
    // if(! member){
    //     return res.status(400).json({msg:"incorrect credentials"});        
    // }
  const name = req.body.name
  const newName = req.body.newName
  const departments = req.body.departments;
  

  if(!name){
      return res.send("Please Enter faculty name");
  }
  else{
    
    if(newName){
        await faculty.findOneAndUpdate({name:name} , {$set:{name:newName}})
    }

     if(departments){
        await faculty.findOneAndUpdate({name:name} , {$set:{departments:departments}})
     }
      
     const f = await faculty.findOne({name:newName});
     return res.send(f);
  }
   

 
}
)

module.exports = route;