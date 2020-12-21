const express = require("express");
const route = express.Router();

const staffMember=require("../../models/staffMember");
const TeachingSlots=require("../../models/TeachingSlots");


route.get("/", async(req, res)=>{
    try{
        const id=req.id;
        const member= await staffMember.findOne({id:id});
        if(! member){
            return res.status(400).json({msg:"incorrect credentials"});        
        }
       if(!member.hod){
            return res.status(401).json({msg:"unauthorized"});            
       }
        //get the hod's faculty and department
        const faculty=member.faculty; 
        const department=member.department;
        let staffmembers= await staffMember.find({faculty:faculty,department:department});
        let results=[];

        
       
        for(let i=0;i<staffmembers.length;i++){
          let memberid=staffmembers[i].id;
          let match= await TeachingSlots.findOne({assigneeid:memberid});
          if(match)
          results.push(match);
         }
         
        
        res.json(results);
    } 
    catch(err)
    {
        //return res.status(401).json({msg:"testing"});  
        return res.status(500).json({error:err.message});
    }
})

module.exports = route;