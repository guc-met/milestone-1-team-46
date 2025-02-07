const express = require("express");
const route = express.Router({mergeParams: true});
const staffMember=require("../../models/staffMember");
const courses=require("../../models/CoursesModel");
const faculties=require("../../models/Faculties");

route.post("/",async(req,res)=>{
    try{
        let HODId=req.id;
        let member= await staffMember.findOne({id:HODId});
        if(! member){
            return res.status(400).json({msg:"incorrect credentials"});        
        }
        if(!member.hod){
            return res.status(401).json({msg:"unauthorized you can't access this page"});            
        }
        let faculty=member.faculty; 
        let department=member.department;   //get the HOD's faculty and department
       
        let course=req.body.course;   //get the course and the staff member to be assigned as CI's id
        let id=req.body.id;

        if(!id && !course){
            return res.status(400).json({msg:"please select all fields "});  
        }

        if(!id ){
            return res.status(400).json({msg:"please select instructor id "});  
        }

        if(!course ){
            return res.status(400).json({msg:"please select course "});  
        }
        try{
            member= await staffMember.findOne({id:id});
            // await staffMember.findOneAndUpdate({faculty:faculty,department:department,id:id},{$set :{"ci": true}});
            await courses.findOneAndUpdate({coursename:course},{$set :{"ciId": id}});
            member.courses.push(course);
        }
        catch(err){
            return res.status(501).json({error:err.message});
        }
    
        member= await staffMember.findOne({id:id});
        let pre="";
        if(member.hr)
        {
            pre="hr-";
        }
        else{
            pre="ac-";
        }
        let memid=pre+member.no;
        
        res.json({
           "name":member.name,
           "ID":memid,
           "ci":member.ci,
           "email":member.email,
           "Office":member.office,
           "Day-Off":member.daysOff,
           "Annual Leave Balance":member.annualLeaveBalance,
           "Accidental Leave Balance":member.accidentalLeaveBalance,
           "Department":member.department,
           "Faculty":member.faculty,
        //    "Salary":member.Salary
        })
    }
    catch(err){
        return res.status(500).json({error:err.message});
    }
})


module.exports = route;