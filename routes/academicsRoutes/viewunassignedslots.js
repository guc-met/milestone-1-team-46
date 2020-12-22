const express = require("express");
const route = express.Router({mergeParams: true});
const staffMember=require("../../models/staffMember");

const teachingSlots=require("../../models/TeachingSlots");




route.get("/", async(req, res)=>{
    try{
        const id=req.id;
        const member= await staffMember.findOne({id:id});
        const myCourses= member.courses;
        const course=req.body.course;
        if(! member){
            return res.status(400).json({msg:"incorrect credentials"});        
        }
       if(!member.ac){
            return res.status(401).json({msg:"unauthorized"});            
       }
       if(!myCourses.includes(course))
       {
        return res.status(401).json({msg:"unauthorized"});            
       }
    
    const result= await teachingSlots.find({"slot.course":course});
    res.send(result);

    }catch(err)
    {
        return res.status(500).json({error:err.message});
    }
})

module.exports = route;
