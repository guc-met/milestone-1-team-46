const express = require("express");
const route = express.Router({mergeParams: true});
const faculty = require("../../models/Faculties");

require('dotenv').config();

route.post('/', async(req,res)=>{
    // const id=req.id;
    // let member= await staffMember.findOne({id:id});
    // if(! member){
    //     return res.status(400).json({msg:"incorrect credentials"});        
    // }
  const name = req.body.name

  

  if(!name){
      return res.send("Please Enter faculty name");
  }
  else{
    
   
     faculty.findOneAndDelete({name:name}).then(()=>{
         console.log("Faculty deleted");
         res.send("Deleted faculty " + name)
     })
  }
   

 
}
)

module.exports = route;