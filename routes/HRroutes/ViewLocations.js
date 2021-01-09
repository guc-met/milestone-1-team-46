const express = require("express");
const route = express.Router({mergeParams: true});
const signOut=require("../../models/SignOut");
const room = require("../../models/Room");
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

   const rooms = await room.find({});
      
      console.log("getting all rooms");
         // console.log(rooms)
          return res.send(rooms);
   

 
}
)

module.exports = route;