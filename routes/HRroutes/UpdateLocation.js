const express = require("express");
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
  const roomType = req.body.roomType;
  const maxCapacity = req.body.maxCapacity;
  

  if(!location){
      return res.send("Please Enter location");
  }
  else{
    if(roomType)
    {
       await room.findOneAndUpdate({"location":location},  {$set :{"roomtype": roomType}});
    }
    if(maxCapacity)
    {
       await room.findOneAndUpdate({"location":location},  {$set :{"maxcapacity": maxCapacity}});
    }

    const r = await room.find({location:location})

     return res.json(r);
  }
   

 
}
)

module.exports = route;