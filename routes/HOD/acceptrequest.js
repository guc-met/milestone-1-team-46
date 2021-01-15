const express = require("express");
const route = express.Router();

const staffMember=require("../../models/staffMember");
const requests=require("../../models/Requests");
const leaves=require("../../models/leaves");


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
       console.log(request);
       if(request){
       requestt= await requests.findOneAndUpdate({_id:req.body._id},{$set :{"status": "Accepted"}});

    //    const requesttype = requestt.type;
       ;}
       else{
        return res.status(401).json("there are no requests for you");
    }
       

       if(requestt.type=="change-day-off"){
        //const sender = await staffMember.findOne({id:request.sender_id});
        //console.log(request.info);
        await staffMember.findOneAndUpdate({_id:req.body._id},{$set :{"daysOff": request.info}});
        res.send("Day off changed!");
       }
       else{
        const leave= new leaves({
            id: request.sender_id,
            type: request.type,
            Duration: parseInt(request.info),
        })
        await leave.save();
        res.send("New leave created!")
       }
    } 
    catch(err)
    {
        //return res.status(401).json({msg:"testing"});  
        return res.status(500).json({error:err.message});
    }
})

module.exports = route;