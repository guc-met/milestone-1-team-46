const express = require("express");
const route = express.Router({mergeParams: true});
const staffMember=require("../../models/staffMember");
//const CourseModel=require("../../models/CourseModel");
const coursesModel=require("../../models/CoursesModel");
const teachingslots=require("../../models/TeachingSlots");


route.get("/",async(req,res)=>{
    try{
        const id=req.id;
        const member= await staffMember.findOne({id:id});
        if(! member){
            return res.status(400).json({msg:"incorrect credentials"});        
        }
        if(!member.ci){
            return res.status(401).json({msg:"unauthorized"});            
        }
   //get the member's faculty and department
   const faculty=member.faculty; 
   const department=member.department;
   let courses= await coursesModel.find({ciId:id});
   let results=[];
   for(i=0;i<courses.length;i++){
       console.log(courses);
       
     let slot= await teachingslots.findOne({coursename:courses[i].coursename});
     if(slot)
     results.push(slot);
   }
    res.json(results);
    }
    catch(err){
        return res.status(500).json({error:err.message});
    }
})


module.exports = route;