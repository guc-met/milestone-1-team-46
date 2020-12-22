const express = require("express");
const route = express.Router();

const staffMember=require("../../models/staffMember");
const requests=require("../../models/Requests");
//const leaves=require("../../models/Leaves");


route.post("/", async(req, res)=>{
    try{
        const id=req.id;
        const member= await staffMember.findOne({id:id});
        if(! member){
            return res.status(400).json({msg:"incorrect credentials"});        
        }
       if(!member.hod){
            return res.status(401).json({msg:"unauthorized"});            
       }
        
       const request = await requests.findOne({sender_id:req.body.sender_id,receiver_id:req.body.receiver_id,type:req.body.type,status:req.body.status});
       if(request)
       await requests.findOneAndUpdate({sender_id:req.body.sender_id,receiver_id:req.body.receiver_id},{$set :{"status": "Accepted"}});

       const requesttype = req.body.type;
       

       if(requesttype=="change-day-off"){
         await staffMember.findOneAndUpdate({id:req.body.id},{$set :{"daysOff": req.body.info}});
        
       }
       else{
        const leave= new leaves({
            id: req.body.id,
            type: req.body.type,
            Duration: Number(req.body.info),
        })
        await leave.save()
       }
    } 
    catch(err)
    {
        //return res.status(401).json({msg:"testing"});  
        return res.status(500).json({error:err.message});
    }
})

module.exports = route;