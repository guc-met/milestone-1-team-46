const express = require("express");
const route = express.Router({mergeParams: true});
const staffMember=require("../../models/staffMember");
const Schedule=require("../../models/Schedule");
const faculties=require("../../models/Faculties");
const room=require("../../models/Room");

route.post("/",async(req,res)=>{
    let member= await staffMember.findOne({id:req.id});
    if(!member){
        return res.status(400).json({msg:"incorrect credentials"});        
    }
    if(!member.hr){
      return res.status(400).json({msg:"unauthorized"});        
  }
  
    try{
        const HRId=req.id;
        const member= await staffMember.findOne({id:HRId});
        if(! member){
            return res.status(400).json({msg:"incorrect credentials"});        
        }
        if(!member.hr){
            return res.status(401).json({msg:"unauthorized you can't access this page"});            
        }
        const id=req.body.id;

        if(!id){
           
                return res.status(400).json({msg:"please select a staff member"});
            
        }
        try{
            console.log(id);
            let office= await room.findOne({"office":id.office});
            let loc=office.location;
             await room.findOneAndUpdate({"location":loc},{$set :{"currcapacity":office.currcapacity-1}});
            await staffMember.findOneAndDelete({id:id});
           
    
        }
        catch(err){
            return res.status(501).json({error:err.message});
        }

        schedule= await Schedule.findOneAndDelete({id:id});
    
        res.json("deleted staff member successfully");
    }
    catch(err){
        return res.status(500).json({error:err.message});
    }
})


module.exports = route;