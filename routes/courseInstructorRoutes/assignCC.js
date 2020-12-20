const express = require("express");
const route = express.Router({mergeParams: true});
const staffMember=require("../../models/staffMember");
const faculties=require("../../models/Faculties");

route.post("/",async(req,res)=>{
    try{
        const CIId=req.id;
        const member= await staffMember.findOne({id:CIId});
        if(! member){
            return res.status(400).json({msg:"incorrect credentials"});        
        }
        if(!member.ci){
            return res.status(401).json({msg:"unauthorized"});            
        }
        //get the course instructor's faculty and department
        const faculty=member.faculty; 
        const department=member.department;
        //get the course and the staff member to be assigned as CC's id
        const course=req.body.course;
        const id=req.body.id;
        //update the staff member's rank/privilege
        try{
            await staffMember.findOneAndUpdate({faculty:faculty,department:department,id:id},{$set :{"cc": true}});
        }
        catch(err){
            return res.status(501).json({error:err.message});
        }
        const curFaculty=await faculties.findOne({name:faculty});
        for(let i=0;i<curFaculty.departments.length;i++){
            if(curFaculty.departments[i].name===department){
                curDept=curFaculty.departments[i];
                break;
            }
        }
        for(let i=0;i<curDept.courses.length;i++){
            if(curDept.courses[i].coursename===course){
                curDept.courses[i].ccId=id;
                break;
            }
        }
        await curFaculty.save().catch(err=>{
            console.log(err.message)
        });
        res.json("done");
    }
    catch(err){
        return res.status(500).json({error:err.message});
    }
})


module.exports = route;