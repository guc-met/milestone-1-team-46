const express = require("express");
const route = express.Router({mergeParams: true});
const staffMember=require("../../models/staffMember");

const requests=require("../../models/Requests");




route.get("/", async(req, res)=>{
    try{
        const id=req.id;
        const member= await staffMember.findOne({id:id});
        if(! member){
            return res.status(400).json({msg:"incorrect credentials"});        
        }
       if(!member.ac){
            return res.status(401).json({msg:"unauthorized"});            
       }
    const status=req.body.status;
    let result;
    if(status=="all")
    {
        result=  await requests.find({sender_id: req.id});
    }
    else
    {
        result=  await requests.find({sender_id: req.id,status:status});
    }
     res.send(result);

    }catch(err)
    {
        return res.status(500).json({error:err.message});
    }
})

module.exports = route;
