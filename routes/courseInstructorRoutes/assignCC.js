const express = require("express");
const route = express.Router({mergeParams: true});
const staffMember=require("../../models/staffMember");
const faculties=require("../../models/Faculties");

route.post("/",async(req,res)=>{
    try{
        const CIId=req.id;
        const member= await staffMember.findOne({id:CIId,ac:true});
        if(! member){
            return res.status(401).json({msg:"Unauthorized: incorrect credentials"});        
        }
        if(!member.ci){
            return res.status(403).json({msg:"Forbidden, you are not a course instructor"});            
        }
        //get the course instructor's faculty and department
        const faculty=member.faculty; 
        const department=member.department;
        //get the course and the staff member to be assigned as CC's id
        const course=req.body.course;
        const id=req.body.id;
        let NCC=await staffMember.findOne({id:id,ac:true});
        if(!NCC)
            return res.status(406).json("No member of this id was found, are you sure you specified a member id?"); 
        if(!NCC.courses.includes(course))
            return res.status(406).json("can not set this member as a course coordinator to a course he/she is not assigned to");
        //update the staff member's rank/privilege
        await staffMember.findOneAndUpdate({faculty:faculty,department:department,id:id},{$set :{"cc": true}});
        const curFaculty=await faculties.findOne({name:faculty});
        if(!curFaculty)
            return res.status(406).json("the course instructor's faculty was not found in the database");
        
        for(let i=0;i<curFaculty.departments.length;i++){
            if(curFaculty.departments[i].name===department){
                curDept=curFaculty.departments[i];
                break;
            }
        }
        if(!curDept)
            return res.status(406).json("the course instructor's department was not found in the database");  

        for(let i=0;i<curDept.courses.length;i++){
            if(curDept.courses[i].coursename===course){
                if(curDept.courses[i].ccId==id){
                    return res.status(406).json("this academic member is already the course coordinator for this course");    
                }
                curDept.courses[i].ccId=id;
                break;
            }
            if(i==curDept.courses.length-1)
                return res.status(406).json("course was not found, are you sure you specified a course name?");
        }
        await curFaculty.save().catch(err=>{
            console.log(err.message)
        });
        NCC=await staffMember.findOne({id:id});
        res.json(NCC);
    }
    catch(err){
        return res.status(500).json({error:err.message});
    }
})


module.exports = route;