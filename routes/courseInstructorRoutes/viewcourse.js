
const express = require("express");
const route = express.Router({mergeParams: true});
const staffMember=require("../../models/staffMember");
const coursesModel=require("../../models/CoursesModel");


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

        let results=[];
        
        for(let i=0;i<(member.courses).length;i++){
            let course= await coursesModel.find({coursename:member.courses[i]});
            results.push(course);
        }

        res.json(results);

  
    }

    catch(err){
        return res.status(500).json({error:err.message});
    }
})


module.exports = route;