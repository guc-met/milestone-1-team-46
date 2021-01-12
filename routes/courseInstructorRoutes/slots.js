const express = require("express");
const route = express.Router({mergeParams: true});
const staffMember=require("../../models/staffMember");
const teachingSlots=require("../../models/TeachingSlots");
const schedules=require("../../models/Schedule");

//get all slots of his/her courses
route.get("/",async(req,res)=>{
    try{
        const CIId=req.id;
        const member= await staffMember.findOne({id:CIId,ac:true});
        if(! member){
            return res.status(401).json({msg:"incorrect credentials"});        
        }
        if(!member.ci){
            return res.status(403).json({msg:"Forbidden, you are not a course instructor"});            
        }
        const course=req.params.course;
        courses=member.courses;
        if(course)
            courses=[course];
        result=[];
        const slots=await teachingSlots.find();
        if(!slots)
            return res.status(406).json({msg:"No teaching slots were found"});
        for(i=0;i<slots.length;i++){
            if(courses.includes(slots[i].slot.course))
                result.push(slots[i]);
        }
        if(slots.length==0)
            return res.status(406).json({msg:"No teaching slots were found for your courses"});

        res.json(result);
    }
    catch(err){
        return res.status(500).json({error:err.message});
    }
})
//assigning an academic member to an unassigned slot
route.post("/",async(req,res)=>{
    try{
        const CIId=req.id;
        const member= await staffMember.findOne({id:CIId,ac:true});
        if(! member){
            return res.status(401).json({msg:"incorrect credentials"});        
        }
        if(!member.ci){
            return res.status(403).json({msg:"Forbidden, you are not a course instructor"});            
        }
        //get the teaching slot id and the academic member id
        const UASlotID=req.body.slot_id;
        const assID=req.body.ass_id;
        const assignee=await staffMember.findOne({id:assID,ac:true});
        const UASlot=await teachingSlots.findById(UASlotID);
        if(!assignee)
            return res.status(406).json({msg:"No academic members with this id were found"});    
        if(!UASlot)
            return res.status(406).json({msg:"No slots with this id were found"});    
        const course=UASlot.slot.course;
        //if someone is already assigned
        if(UASlot.assigneeid!==null){
            if(UASlot.assigneeid==assID)
                return res.status(406).json({msg:"this slot is already assigned to this academic member"});
            else
                return res.status(406).json({msg:"this slot is already assigned to another academic member"});    
        }
        //if this academic member is not assigned to this course
        if(!assignee.courses.includes(course)){
            return res.status(406).json({msg:"this academic member is not assigned to this course"});    
        } 
        //adding the slot to the assignee's schedule
        const actualSlot=UASlot.slot;
        day=actualSlot.day;
        if(day==assignee.daysOff)
            return res.status(406).json({msg:"you can not assign this slot to this academic member on his/her day off"});                
        const ass_schedule= await schedules.findOne({id:assID});
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
        //assigning this academic member to this slot
        UASlot.assigneeid=assID;
        await ass_schedule.save();
        await UASlot.save();
        res.json(ass_schedule);
    }
    catch(err){
        return res.status(500).json({error:err.message});
    }
})
//removing an academic member's assignment to a slot
route.delete("/",async(req,res)=>{
    try{
        const CIId=req.id;
        const member= await staffMember.findOne({id:CIId,ac:true});
        if(! member){
            return res.status(401).json({msg:"incorrect credentials"});        
        }
        if(!member.ci){
            return res.status(403).json({msg:"Forbidden, you are not a course instructor"});            
        }
        //get the teaching slot id and the academic member id
        const UASlotID=req.body.slot_id;
        const UASlot=await teachingSlots.findById(UASlotID);
        if(!UASlot)
            return res.status(406).json({msg:"No slots with this id were found"});    
        //if someone is already assigned
        if(UASlot.assigneeid===null){
            return res.status(406).json({msg:"this slot is already unassigned to an academic member"});    
        }
        const assID=UASlot.assigneeid;
        const assignee=await staffMember.findOne({id:assID,ac:true});
       
        //removing the slot from the assignee's schedule
        const actualSlot=UASlot.slot;
        day=actualSlot.day;
        acslotID=actualSlot._id;
        const ass_schedule= await schedules.findOne({id:assID});
        if(!ass_schedule)
            return res.status(406).json({msg:"no schedule for the assignee academic member was found"});
        switch(day){
            case "Saturday":
                    for(i=0;i<ass_schedule.Saturday.length;i++){
                        if(ass_schedule.Saturday[i]._id.equals(acslotID)){
                            ass_schedule.Saturday.splice(i,1);
                            break;
                        }
                        if(i==ass_schedule.Saturday.length-1)
                            return res.status(406).json({msg:"this slot was not found in the assignee academic member's schedule"});
                    }
                    break;
                case "Sunday":
                    for(i=0;i<ass_schedule.Sunday.length;i++){
                        if(ass_schedule.Sunday[i]._id.equals(acslotID)){
                            ass_schedule.Sunday.splice(i,1);
                            break;
                        }
                        if(i==ass_schedule.Sunday.length-1)
                            return res.status(406).json({msg:"this slot was not found in the assignee academic member's schedule"});
                    }
                    break;
                case "Monday":
                    for(i=0;i<ass_schedule.Monday.length;i++){
                        if(ass_schedule.Monday[i]._id.equals(acslotID)){
                            ass_schedule.Monday.splice(i,1);
                            break;
                        }
                        if(i==ass_schedule.Monday.length-1)
                            return res.status(406).json({msg:"this slot was not found in the assignee academic member's schedule"});
                    }
                    break;
                case "Tuesday":
                    for(i=0;i<ass_schedule.Tuesday.length;i++){
                        if(ass_schedule.Tuesday[i]._id.equals(acslotID)){
                            ass_schedule.Tuesday.splice(i,1)
                            break;
                        }
                        if(i==ass_schedule.Tuesday.length-1)
                            return res.status(406).json({msg:"this slot was not found in the assignee academic member's schedule"});
                    }
                    break;
                case "Wednesday":
                    for(i=0;i<ass_schedule.Wednesday.length;i++){
                        if(ass_schedule.Wednesday[i]._id.equals(acslotID)){
                            ass_schedule.Wednesday.splice(i,1)
                            break;
                        }
                        if(i==ass_schedule.Wednesday.length-1)
                            return res.status(406).json({msg:"this slot was not found in the assignee academic member's schedule"});
                    }
                    break;
                case "Thursday":
                    for(i=0;i<ass_schedule.Thursday.length;i++){
                        if(ass_schedule.Thursday[i]._id.equals(acslotID)){
                            ass_schedule.Thursday.splice(i,1)
                            break;
                        }
                        if(i==ass_schedule.Thursday.length-1)
                            return res.status(406).json({msg:"this slot was not found in the assignee academic member's schedule"});
                    }
                    break;
                default:
                    console.log("day is wrong");

        }
        //unassigning this academic member to this slot
        UASlot.assigneeid=null;
        await ass_schedule.save();
        await UASlot.save();
        res.json(ass_schedule);
    }
    catch(err){
        return res.status(500).json({error:err.message});
    }
})

//updating an academic member's slot assignment
route.put("/",async(req,res)=>{
    try{
        const CIId=req.id;
        const member= await staffMember.findOne({id:CIId,ac:true});
        if(! member){
            return res.status(401).json({msg:"incorrect credentials"});        
        }
        if(!member.ci){
            return res.status(403).json({msg:"Forbidden, you are not a course instructor"});            
        }
        //get the teaching slot id and the academic member id
        const slotID=req.body.slot_id;
        const NewAssID=req.body.ass_id;
        const NewAssignee=await staffMember.findOne({id:NewAssID,ac:true});
        if(!NewAssignee)
            return res.status(406).json({msg:"No academic member with the given id was found"});
        const Slot=await teachingSlots.findById(slotID);
        if(!Slot)
            return res.status(406).json({msg:"No teaching slot with the given id was found"});
        const assID=Slot.assigneeid;
        const course=Slot.slot.course;
        //if someone is already assigned
        if(Slot.assigneeid===null){
            return res.status(406).json({msg:"this slot is unassigned"});    
        }
        //if this academic member is not assigned to this course
        if(!NewAssignee.courses.includes(course)){
            return res.status(406).json({msg:"this academic member is not assigned to this course"});    
        }
        
        //adding the slot to the assignee's schedule
        const actualSlot=Slot.slot;
        const acslotID=actualSlot._id;
        day=actualSlot.day;
        const nass_schedule= await schedules.findOne({id:NewAssID});
        if(day==NewAssignee.daysOff)
            return res.status(406).json({msg:"you can not assign this slot to this academic member on his/her day off"});                
        if(!nass_schedule)
            return res.status(406).json({msg:"the schedule of this academic member was not found"});
            switch(day){
                case "Saturday":
                    for(i=0;i<nass_schedule.Saturday.length;i++){
                        if(nass_schedule.Saturday[i].time===actualSlot.time)
                            return res.status(406).json({msg:"this academic member has another slot at the same time"});                                        
                    }
                    nass_schedule.Saturday.push(actualSlot);
                    break;
                case "Sunday":
                    for(i=0;i<nass_schedule.Sunday.length;i++){
                        if(nass_schedule.Sunday[i].time===actualSlot.time)
                            return res.status(406).json({msg:"this academic member has another slot at the same time"});                                        
                    }
                    nass_schedule.Sunday.push(actualSlot);
                    break;
                case "Monday":
                    for(i=0;i<nass_schedule.Monday.length;i++){
                        if(nass_schedule.Monday[i].time===actualSlot.time)
                            return res.status(406).json({msg:"this academic member has another slot at the same time"});                                        
                    }
                    nass_schedule.Monday.push(actualSlot);
                    break;
                case "Tuesday":
                    for(i=0;i<nass_schedule.Tuesday.length;i++){
                        if(nass_schedule.Tuesday[i].time===actualSlot.time)
                            return res.status(406).json({msg:"this academic member has another slot at the same time"});                                        
                    }
                    nass_schedule.Tuesday.push(actualSlot);
                    break;
                case "Wednesday":
                    for(i=0;i<nass_schedule.Wednesday.length;i++){
                        if(nass_schedule.Wednesday[i].time===actualSlot.time)
                            return res.status(406).json({msg:"this academic member has another slot at the same time"});                                        
                    }
                    nass_schedule.Wednesday.push(actualSlot);
                    break;
                case "Thursday":
                    for(i=0;i<nass_schedule.Thursday.length;i++){
                        if(nass_schedule.Thursday[i].time===actualSlot.time)
                            return res.status(406).json({msg:"this academic member has another slot at the same time"});                                        
                    }
                    nass_schedule.Thursday.push(actualSlot);
                    break;
                default:
                    console.log("day is wrong");
    
            }
        //assigning the new academic member to this slot
        Slot.assigneeid=NewAssID;
        await nass_schedule.save();
        await Slot.save();
        //removing the slot from the old academic member's schedule
        const ass_schedule= await schedules.findOne({id:assID});
        if(!ass_schedule)
            return res.status(406).json({msg:"no schedule for the old assignee academic member was found"});
        switch(day){
            case "Saturday":
                    for(i=0;i<ass_schedule.Saturday.length;i++){
                        if(ass_schedule.Saturday[i]._id.equals(acslotID)){
                            ass_schedule.Saturday.splice(i,1);
                            break;
                        }
                        if(i==ass_schedule.Saturday.length-1)
                            return res.status(406).json({msg:"this slot was not found in the old assignee academic member's schedule"});
                    }
                    break;
                case "Sunday":
                    for(i=0;i<ass_schedule.Sunday.length;i++){
                        if(ass_schedule.Sunday[i]._id.equals(acslotID)){
                            ass_schedule.Sunday.splice(i,1);
                            break;
                        }
                        if(i==ass_schedule.Sunday.length-1)
                            return res.status(406).json({msg:"this slot was not found in the old assignee academic member's schedule"});
                    }
                    break;
                case "Monday":
                    for(i=0;i<ass_schedule.Monday.length;i++){
                        if(ass_schedule.Monday[i]._id.equals(acslotID)){
                            ass_schedule.Monday.splice(i,1);
                            break;
                        }
                        if(i==ass_schedule.Monday.length-1)
                            return res.status(406).json({msg:"this slot was not found in the old assignee academic member's schedule"});
                    }
                    break;
                case "Tuesday":
                    for(i=0;i<ass_schedule.Tuesday.length;i++){
                        if(ass_schedule.Tuesday[i]._id.equals(acslotID)){
                            ass_schedule.Tuesday.splice(i,1)
                            break;
                        }
                        if(i==ass_schedule.Tuesday.length-1)
                            return res.status(406).json({msg:"this slot was not found in the old assignee academic member's schedule"});
                    }
                    break;
                case "Wednesday":
                    for(i=0;i<ass_schedule.Wednesday.length;i++){
                        if(ass_schedule.Wednesday[i]._id.equals(acslotID)){
                            ass_schedule.Wednesday.splice(i,1)
                            break;
                        }
                        if(i==ass_schedule.Wednesday.length-1)
                            return res.status(406).json({msg:"this slot was not found in the old assignee academic member's schedule"});
                    }
                    break;
                case "Thursday":
                    for(i=0;i<ass_schedule.Thursday.length;i++){
                        if(ass_schedule.Thursday[i]._id.equals(acslotID)){
                            ass_schedule.Thursday.splice(i,1)
                            break;
                        }
                        if(i==ass_schedule.Thursday.length-1)
                            return res.status(406).json({msg:"this slot was not found in the old assignee academic member's schedule"});
                    }
                    break;
                default:
                    console.log("day is wrong");

        }
        await ass_schedule.save();
        res.json(nass_schedule);
    }
    catch(err){
        return res.status(500).json({error:err.message});
    }
})

module.exports = route;