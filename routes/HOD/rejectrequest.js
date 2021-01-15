const express = require("express");
const route = express.Router();
require('dotenv').config();

const staffMember=require("../../models/staffMember");
const requests=require("../../models/Requests");



route.post("/", async(req, res)=>{
    try{
        const memberid=req.id;
        const member= await staffMember.findOne({id:memberid});
        if(! member){
            return res.status(400).json({msg:"incorrect credentials"});        
        }
       if(!member.hod){
            return res.status(401).json({msg:"unauthorized"});            
       }
        
       let request = await requests.findOne({_id:req.body._id});
    //    console.log("request");
    //    console.log(request);
       if(request){
       requestt= await requests.findOneAndUpdate({_id:req.body._id},{$set :{"status": "Rejected"}});
    //    console.log(requestt);

    //    const requesttype = requestt.type;
       ;}
       else{
        return res.status(401).json("there are no requests for you");
    }
       

   
    } 
    catch(err)
    {
        //return res.status(401).json({msg:"testing"});  
        return res.status(500).json({error:err.message});
    }
})

module.exports = route;