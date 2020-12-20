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
        if(!member.hod){
            return res.status(401).json({msg:"unauthorized access"});            
        }
        const faculty=member.faculty; 
        const department=member.department;
        const course=req.body.course;
        let preresult= await staffMember.find({faculty:faculty,department:department}); // get members in same department
        let result=[];
       
        if(course){                                                                       // if hod checks for staff with a course
            for(let i=0;i<preresult.length;i++){
                let Staffmember=preresult[i];
                if(Staffmember.courses&&Staffmember.courses.includes(course)){
                    result.push(Staffmember);
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