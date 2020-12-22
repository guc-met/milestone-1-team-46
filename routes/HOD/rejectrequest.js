const express = require("express");
const route = express.Router();
require('dotenv').config();

const staffMember=require("../../models/staffMember");
const requests=require("../../models/Requests");



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
        const status= "Rejected";
       const request = await requests.findOne({sender_id:req.body.sender_id,receiver_id:req.body.receiver_id,type:req.body.type,status:req.body.status});
       if(request){
        await requests.findOneAndUpdate({sender_id:req.body.sender_id,receiver_id:req.body.receiver_id},{$set :{"status": status}});
        res.send("Request Rejected!");}
        
       }
       
    catch(err)
    {
        //return res.status(401).json({msg:"testing"});  
        return res.status(500).json({error:err.message});
    }
})

module.exports = route;