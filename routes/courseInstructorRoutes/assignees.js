const express = require("express");
const route = express.Router({mergeParams: true});
const staffMember=require("../../models/staffMember");
const teachingSlots=require("../../models/TeachingSlots");
const faculties=require("../../models/Faculties");
const schedules=require("../../models/Schedule");

//remove academic member from a course
route.post("/",async(req,res)=>{
    try{
        const CIId=req.id;
        const member= await staffMember.findOne({id:CIId,ac:true});
        if(! member){
            return res.status(401).json({msg:"unauthorized: incorrect credentials"});        
        }
        if(!member.ci){
            return res.status(403).json({msg:"Forbidden, you are not a course instructor"});            
        }
        //get the academic member's id
        const ass_id=req.body.ass_id;
        const course=req.body.course;
        const assignee= await staffMember.findOne({id:ass_id,ac:true});
        if(!assignee)
            return res.status(406).json({msg:"No academic member with the provided id was found"});
        if(!assignee.courses.includes(course)){
            return res.status(406).json({msg:"this academic member is not assigned to this course"});
        }
        for(i=0;i<assignee.courses.length;i++){
            if(assignee.courses[i]===course){
                assignee.courses.splice(i,1);
                break;
            }
        }
        await assignee.save();
        res.json(assignee);
    }
    catch(err){
        return res.status(500).json({error:err.message});
    }
})
module.exports = route;