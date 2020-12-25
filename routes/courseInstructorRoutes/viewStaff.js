const express = require("express");
const route = express.Router({mergeParams: true});
const staffMember=require("../../models/staffMember");


route.get("/",async(req,res)=>{
    try{
        const id=req.id;
        const member= await staffMember.findOne({id:id,ac:true});
        if(! member){
            return res.status(401).json({msg:"incorrect credentials"});        
        }
        if(!member.ci){
            return res.status(403).json({msg:"Forbidden, you are not a course instructor"});            
        }
        //get the course instructor's faculty and department
        const faculty=member.faculty; 
        const department=member.department;
        const course=req.body.course;
        //get all staff members in the same department
        let preresult= await staffMember.find({faculty:faculty,department:department,ac:true});
        if(!preresult)
            return res.status(406).json({msg:"no academic members were found in your department"});
        let result=[];
        //if the course instructor specified a certain course
        if(course){
            for(let i=0;i<preresult.length;i++){
                let member=preresult[i];
                if(member&&member.courses&&member.courses.includes(course)){
                    result.push(member);
                }  
            }
        }
        else{
            result=preresult;
        }
        if(result.length==0)
            return res.status(401).json({msg:"no academic members assigned to this course were found"});
        res.json(result);
    }
    catch(err){
        return res.status(500).json({error:err.message});
    }
})


module.exports = route;