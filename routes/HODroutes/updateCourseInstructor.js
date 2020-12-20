const express = require("express");
const route = express.Router({mergeParams: true});
const staffMember=require("../../models/staffMember");
const faculties=require("../../models/Faculties");

route.post("/",async(req,res)=>{
    try{
        const HODId=req.id;
        const member= await staffMember.findOne({id:HODId});
        if(! member){
            return res.status(400).json({msg:"incorrect credentials"});        
        }
        if(!member.hod){
            return res.status(401).json({msg:"unauthorized you can't access this page"});            
        }
        const faculty=member.faculty; 
        const department=member.department;   //get the HOD's faculty and department
       
        const course=req.body.course;   //get the course and the staff member to be assigned as CI's id
        const Oldid=req.body.Oldid;
        const Newid=req.body.Newid;
        try{
            await staffMember.findOneAndUpdate({faculty:faculty,department:department,id:Newid},{$set :{"ci": true}});
            await staffMember.findOneAndUpdate({faculty:faculty,department:department,id:Oldid},{$set :{"ci": false}});
        }
        catch(err){
            return res.status(501).json({error:err.message});
        }
    
        res.json("updated course instructor successfully");
    }
    catch(err){
        return res.status(500).json({error:err.message});
    }
})


module.exports = route;