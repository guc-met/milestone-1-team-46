const express = require("express");
const route = express.Router({mergeParams: true});
const signOut=require("../../models/SignOut");
const room = require("../../models/Room");

require('dotenv').config();

route.post('/', async(req,res)=>{
    const id=req.id;
    let member= await staffMember.findOne({id:id});
    if(! member){
        return res.status(400).json({msg:"incorrect credentials"});        
    }
  const location = req.body.location
  const roomType = req.body.roomType;
  const maxCapacity = req.body.maxCapacity;
  
  if(! member.hr){
    return res.status(400).json({msg:"unauthorized you can't access this page"});        
}

  if(!location || !roomType || !maxCapacity){
      return res.send("Please Enter all the detials of the location");
  }
  else{
      const r1 = new room({
          location : location,
          roomtype : roomType,
          maxcapacity : maxCapacity
      })
      await r1.save().then(()=>{
          console.log("Room saved");
      })
     return res.json({
        "location" : location,
        "roomtype" : roomType,
        "maxcapacity" : maxCapacity
      })
  }
   

 
}
)

module.exports = route;