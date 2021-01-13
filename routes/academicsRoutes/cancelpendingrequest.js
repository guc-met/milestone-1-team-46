const express = require("express");
const route = express.Router({mergeParams: true});
const staffMember=require("../../models/staffMember");

const Requests=require("../../models/Requests");




route.post("/", async(req, res)=>{
    try{
        const id=req.id;
        const member= await staffMember.findOne({id:id});
        if(! member){
            return res.status(400).json({msg:"incorrect credentials"});        
        }
       if(!member.ac){
            return res.status(401).json({msg:"unauthorized"});            
       }
    const reqId=req.body.reqId;
    const request= await Requests.findOne({_id:reqId});
    if(request.status=="Pending")
    {
       
        await Requests.deleteOne({_id:reqId}).then(()=>{

            console.log("Request cancelled successfully");
            res.send("Request Cancelled");
        }).catch(err=>{
            console.log(err.message)
        });
    }
    else
    {
        res.send("Cannot cancel a non-pending request")
    }

    }
    catch(err)
    {
        console.log(err.message);
        return res.status(500).json({error:err.message});
    }
})

module.exports = route;
