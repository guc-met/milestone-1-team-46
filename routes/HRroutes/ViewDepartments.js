const express = require("express");
const route = express.Router({mergeParams: true});
const signOut=require("../../models/SignOut");
const Faculty = require("../../models/Faculties");
const staffMember = require("../../models/staffMember");

require('dotenv').config();

route.post('/', async(req,res)=>{
    const id=req.id;
    let member= await staffMember.findOne({id:id});
    if(! member){
        return res.status(400).json({msg:"incorrect credentials"});        
    }
 
  
  if(! member.hr){
    return res.status(400).json({msg:"unauthorized you can't access this page"});        
}

    const faculty = req.body.faculty;

   const Fac = await Faculty.findOne({name:faculty});
      
         if(Fac){
    const departments = Fac.departments 
    console.log(departments);
    return(res.send(departments));
         }
   

 
}
)

module.exports = route;