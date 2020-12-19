const express = require("express");
const route = express.Router({mergeParams: true});
const staffMember=require("../../models/staffMember");


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
        //get the course instructor's faculty and department
        const faculty=member.faculty; 
        const department=member.department;
        const course=req.body.course;
        //get all staff members in the same department
        let preresult= await staffMember.find({faculty:faculty,department:department});
        let result=[];
        //if the course instructor specified a certain course
        if(course){
            for(let i=0;i<preresult.length;i++){
                let Smember=preresult[i];
                if(Smember.courses&&Smember.courses.includes(course)){
                    result.push(Smember);
                }  
            }
        }
        else{
            result=preresult;
        }
        res.json(result);
    }
    catch(err){
        return res.status(500).json({error:err.message});
    }
})


module.exports = route;