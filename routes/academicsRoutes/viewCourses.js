const express = require("express");
const route = express.Router({mergeParams: true});
const staffMember=require("../../models/staffMember");
const schedules=require("../../models/Schedule");


route.get("/", async(req, res)=>{
    try{
        const id=req.id;
        const member= await staffMember.findOne({id:id});
        if(! member){
            return res.status(400).json({msg:"incorrect credentials"});        
        }
       if(!member.ac){
            return res.status(401).json({msg:"unauthorized"});            
       }
        const myCourses= await staffMember.findOne({id:id}).courses;
        res.json(myCourses);

    }catch(err)
    {
        return res.status(500).json({error:err.message});
    }
})

module.exports = route;