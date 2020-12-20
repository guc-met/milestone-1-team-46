const express = require("express");
const route = express.Router({mergeParams: true});
const staffMember=require("../../models/staffMember");
const Requests=require("../../models/Requests");
const teachingSlots=require("../../models/TeachingSlots");
const schedules=require("../../models/Schedule");

//view all slot linking requests
route.get("/",async(req,res)=>{
    try{
        const CCId=req.id;
        const member= await staffMember.findOne({id:CCId});
        if(! member){
            return res.status(400).json({msg:"incorrect credentials"});        
        }
        if(!member.cc){
            return res.status(401).json({msg:"unauthorized"});            
        }
        const reqs= await Requests.find({type:"slot linking",receiver_id:CCId,status:"Pending"});
        res.json(reqs);
    }
    catch(err){
        return res.status(500).json({error:err.message});
    }
})

//accept/reject slot linking request
route.post("/",async(req,res)=>{
    try{
        const CCId=req.id;
        const member= await staffMember.findOne({id:CCId});
        if(! member){
            return res.status(400).json({msg:"incorrect credentials"});        
        }
       if(!member.cc){
            return res.status(401).json({msg:"unauthorized"});            
        }
        //request id and whether to accept or reject it
        const id=req.body.id;
        const accepted=req.body.accepted;
        //get the request
        const cureq= await Requests.findById(id);
        if(accepted){
            //change request state
            cureq.status="Accepted";
            //get the teaching slot            
            slotID=cureq.info;
            const curSlot=await teachingSlots.findById(slotID);
            //update the assignee id to be the sender's id
            curSlot.assigneeid=cureq.sender_id;
            //adding the slot to the assignee's schedule
            const actualSlot=curSlot.slot;
            day=actualSlot.day;
            const ass_schedule= await schedules.findOne({id:cureq.sender_id});
            switch(day){
                case "Saturday":
                    ass_schedule.Saturday.push(actualSlot);
                    break;
                case "Sunday":
                    ass_schedule.Sunday.push(actualSlot);
                    break;
                case "Monday":
                    ass_schedule.Monday.push(actualSlot);
                    break;
                case "Tuesday":
                    ass_schedule.Tuesday.push(actualSlot);
                    break;
                case "Wednesday":
                    ass_schedule.Wednesday.push(actualSlot);
                    break;
                case "Thursday":
                    ass_schedule.Thursday.push(actualSlot);
                    break;
                default:
                    console.log("day is wrong");

            }
            await ass_schedule.save();
            await curSlot.save();
            await cureq.save();
        }
        else{
            //change request state
            cureq.status="Rejected";
            await cureq.save();
        }
        res.json("done");
    }
    catch(err){
        return res.status(500).json({error:err.message});
    }
})



module.exports = route;