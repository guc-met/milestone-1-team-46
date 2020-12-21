const express = require("express");
const route = express.Router();

const staffMember=require("../../models/staffMember");
const Coursesmodel=require("../../models/CoursesModel");


route.get("/", async(req, res)=>{
    try{
        const id=req.id;
        const member= await staffMember.findOne({id:id});
       // console.log(member);
        if(! member){
            return res.status(400).json({msg:"incorrect credentials"});        
        }
       if(!member.hod){
            return res.status(401).json({msg:"unauthorized"});            
       }
        //get the hod's faculty and department
        const faculty=member.faculty; 
        const department=member.department;

        let result= await staffMember.find({faculty:faculty,department:department});
        let coursesresults=[];
        let coursename;
        let course;
        let names=[];
        const k=0;
        
        //console.log(result);
        for(let i=0;i<result.length;i++){
            //console.log("p")
         for(let j=0;j<((result[i]).courses).length;j++){
            //console.log("please");
             coursename= result[i].courses[j];
             course= await Coursesmodel.findOne({coursename:coursename});
                coursesresults.push(course);
             }
             }
             


    
        res.json(coursesresults);
    } 
    catch(err)
    {
        //return res.status(401).json({msg:"testing"});  
        return res.status(500).json({error:err.message});
    }
})

module.exports = route;