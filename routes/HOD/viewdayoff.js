const express = require("express");
const route = express.Router();

const staffMember=require("../../models/staffMember");


route.post("/", async(req, res)=>{
    try{
        const id=req.id;
        const member= await staffMember.findOne({id:id});
        if(! member){
            return res.status(400).json({msg:"incorrect credentials"});        
        }
       if(!member.hod){
            return res.status(401).json({msg:"unauthorized"});            
       }
       
      
       

        
        
        res.json(member.daysOff);
    } 
    catch(err)
    {
        return res.status(500).json({error:err.message});
    }
})

module.exports = route;