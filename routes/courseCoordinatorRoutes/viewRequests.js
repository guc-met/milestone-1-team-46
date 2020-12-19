const express = require("express");
const route = express.Router({mergeParams: true});
const staffMember=require("../../models/staffMember");
const Requests=require("../../models/Requests");

route.get("/",async(req,res)=>{
    try{
        const CCId=req.id;
        const member= await staffMember.findOne({id:CCId});
        if(! member){
            return res.status(400).json({msg:"incorrect credentials"});        
        }
        if(!member.cc){
            return res.status(401).json({msg:"unauthorized"});            
        }
        
    }
    catch(err){
        return res.status(500).json({error:err.message});
    }
})

const getCourse = async (member) => {
    //get the member's faculty and department
    const faculty=member.faculty; 
    const department=member.department;
    //getting the course name
    const curFaculty=await faculties.findOne({name:faculty});
    for(let i=0;i<curFaculty.departments.length;i++){
        if(curFaculty.departments[i].name===department){
            curDept=curFaculty.departments[i];
            break;
        }
    }
    for(let i=0;i<curDept.courses.length;i++){
        if(curDept.courses[i].ccId===member.id){
            return curDept.courses[i].coursename;
        }
    }
}

module.exports = route;