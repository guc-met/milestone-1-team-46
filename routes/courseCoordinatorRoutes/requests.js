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
        const member= await staffMember.findOne({id:CCId,ac:true});
        if(! member){
            return res.status(401).json({msg:"incorrect credentials"});        
        }
        if(!member.cc){
            return res.status(403).json({msg:"Forbidden, you are not a course coordinator"});            
        }
        const reqs= await Requests.find({type:"slot linking",receiver_id:CCId,status:"Pending"});
        if((!reqs)||reqs.length==0)
            return res.status(401).json("there are no pending slot linking requests for you");
        else
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
        const member= await staffMember.findOne({id:CCId,ac:true});
        if(! member){
            return res.status(401).json({msg:"incorrect credentials"});        
        }
       if(!member.cc){
            return res.status(403).json({msg:"Forbidden, you are not a course coordinator"});            
        }
        //request id and whether to accept or reject it
        const id=req.body.id;
        const accepted=req.body.accepted;
        //get the request
        const cureq= await Requests.findById(id);
        if(!cureq)
            return res.status(406).json("no request with the given id was found");
        if(accepted){
            //get the teaching slot            
            slotID=cureq.info;
            const curSlot=await teachingSlots.findById(slotID);
            if(!curSlot)
                return res.status(406).json("no teaching slot with the given id was found");
            //adding the slot to the assignee's schedule
            const actualSlot=curSlot.slot;
            day=actualSlot.day;
            assignee= await staffMember.findOne({id:cureq.sender_id,ac:true});
            if(!assignee)
                return res.status(406).json({msg:"couldn't find the academic member who sent this request"});
            if(day==assignee.daysOff)
                return res.status(406).json({msg:"you can not assign this slot to this academic member on his/her day off"});                
        const ass_schedule= await schedules.findOne({id:cureq.sender_id});
        if(!ass_schedule)
            return res.status(406).json({msg:"the schedule of this academic member was not found"});                
        switch(day){
            case "Saturday":
                for(i=0;i<ass_schedule.Saturday.length;i++){
                    if(ass_schedule.Saturday[i].time===actualSlot.time)
                        return res.status(406).json({msg:"this academic member has another slot at the same time"});                                        
                }
                ass_schedule.Saturday.push(actualSlot);
                break;
            case "Sunday":
                for(i=0;i<ass_schedule.Sunday.length;i++){
                    if(ass_schedule.Sunday[i].time===actualSlot.time)
                        return res.status(406).json({msg:"this academic member has another slot at the same time"});                                        
                }
                ass_schedule.Sunday.push(actualSlot);
                break;
            case "Monday":
                for(i=0;i<ass_schedule.Monday.length;i++){
                    if(ass_schedule.Monday[i].time===actualSlot.time)
                        return res.status(406).json({msg:"this academic member has another slot at the same time"});                                        
                }
                ass_schedule.Monday.push(actualSlot);
                break;
            case "Tuesday":
                for(i=0;i<ass_schedule.Tuesday.length;i++){
                    if(ass_schedule.Tuesday[i].time===actualSlot.time)
                        return res.status(406).json({msg:"this academic member has another slot at the same time"});                                        
                }
                ass_schedule.Tuesday.push(actualSlot);
                break;
            case "Wednesday":
                for(i=0;i<ass_schedule.Wednesday.length;i++){
                    if(ass_schedule.Wednesday[i].time===actualSlot.time)
                        return res.status(406).json({msg:"this academic member has another slot at the same time"});                                        
                }
                ass_schedule.Wednesday.push(actualSlot);
                break;
            case "Thursday":
                for(i=0;i<ass_schedule.Thursday.length;i++){
                    if(ass_schedule.Thursday[i].time===actualSlot.time)
                        return res.status(406).json({msg:"this academic member has another slot at the same time"});                                        
                }
                ass_schedule.Thursday.push(actualSlot);
                break;
            default:
                console.log("day is wrong");

        }
            //change request state
            cureq.status="Accepted";
            //update the assignee id to be the sender's id
            curSlot.assigneeid=cureq.sender_id;
            await ass_schedule.save();
            await curSlot.save();
            await cureq.save();
        }
        else{
            //change request state
            cureq.status="Rejected";
            await cureq.save();
        }
        res.json(cureq);
    }
    catch(err){
        return res.status(500).json({error:err.message});
    }
})



module.exports = route;