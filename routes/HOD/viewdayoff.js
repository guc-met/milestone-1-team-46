const express = require("express");
const route = express.Router();

const staffMember=require("../../models/staffMember");


route.get("/", async(req, res)=>{
    try{
        const id=req.id;
        const member= await staffMember.findOne({id:id});
        if(! member){
            return res.status(400).json({msg:"incorrect credentials"});        
        }
        if(!member.hod){
            return res.status(401).json({msg:"unauthorized"});            
        }
        //get the hod's faculty and department
        const faculty=member.faculty; 
        const department=member.department;
        //get all staff member in the same department
        let result= await staffMember.find({faculty:faculty,department:department});

        res.json(result);
    } 
    catch(err)
    {
        return res.status(500).json({error:err.message});
    }
})

module.exports = route;