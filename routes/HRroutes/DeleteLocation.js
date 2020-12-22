const express = require("express");
const { findOneAndDelete } = require("../../models/Room");
const route = express.Router({mergeParams: true});
const room = require("../../models/Room");

require('dotenv').config();

route.post('/', async(req,res)=>{
    const id=req.id;
    let member= await staffMember.findOne({id:id});
    if(! member){
        return res.status(400).json({msg:"incorrect credentials"});        
    }
    
    if(! member.hr){
        return res.status(400).json({msg:"unauthroised access"});        
    }
  const location = req.body.location
 
  if(!location){
      return res.send("Please Enter location");
  }
  else{
   

    await room.findOneAndDelete({location:location});
     return res.send("Deleted Room " + location);
  }
   

 
}
)

module.exports = route;