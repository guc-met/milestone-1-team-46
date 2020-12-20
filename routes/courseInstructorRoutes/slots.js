const express = require("express");
const route = express.Router({mergeParams: true});
const staffMember=require("../../models/staffMember");
const teachingSlots=require("../../models/TeachingSlots");
const faculties=require("../../models/Faculties");
const schedules=require("../../models/Schedule");

//assigning an academic member to an unassigned slot
route.post("/",async(req,res)=>{
    try{
        const CIId=req.id;
        const member= await staffMember.findOne({id:CIId});
        if(! member){
            return res.status(400).json({msg:"incorrect credentials"});        
        }
        if(!member.ci){
            return res.status(401).json({msg:"unauthorized"});            
        }
        //get the teaching slot id and the academic member id
        const UASlotID=req.body.slot_id;
        const assID=req.body.ass_id;
        const assignee=await staffMember.findOne({id:assID});
        const UASlot=await teachingSlots.findById(UASlotID);
        const course=UASlot.slot.course;
        //if someone is already assigned
        if(UASlot.assigneeid!==null){
            return res.status(400).json({msg:"this slot is already assigned"});    
        }
        //if this academic member is not assigned to this course
        if(!assignee.courses.includes(course)){
            return res.status(400).json({msg:"this staff member is not assigned to this course"});    
        }
        //assigning this academic member to this slot
        UASlot.assigneeid=assID;
        //adding the slot to the assignee's schedule
        const actualSlot=UASlot.slot;
        day=actualSlot.day;
        const ass_schedule= await schedules.findOne({id:assID});
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
        await UASlot.save();
        res.json("done");
    }
    catch(err){
        return res.status(500).json({error:err.message});
    }
})
//removing an academic member's assignment to a slot
route.delete("/",async(req,res)=>{
    try{
        const CIId=req.id;
        const member= await staffMember.findOne({id:CIId});
        if(! member){
            return res.status(400).json({msg:"incorrect credentials"});        
        }
        if(!member.ci){
            return res.status(401).json({msg:"unauthorized"});            
        }
        //get the teaching slot id and the academic member id
        const UASlotID=req.body.slot_id;
        const UASlot=await teachingSlots.findById(UASlotID);
        const course=UASlot.slot.course;
        //if someone is already assigned
        if(UASlot.assigneeid===null){
            return res.status(400).json({msg:"this slot is already unassigned"});    
        }
        const assID=UASlot.assigneeid;
        const assignee=await staffMember.findOne({id:assID});
        //unassigning this academic member to this slot
        UASlot.assigneeid=null;
        //removing the slot from the assignee's schedule
        const actualSlot=UASlot.slot;
        day=actualSlot.day;
        acslotID=actualSlot._id;
        const ass_schedule= await schedules.findOne({id:assID});
        switch(day){
            case "Saturday":
                    for(i=0;i<ass_schedule.Saturday.length;i++){
                        if(ass_schedule.Saturday[i]._id.equals(acslotID)){
                            ass_schedule.Saturday.splice(i,1);
                            break;
                        }
                    }
                    break;
                case "Sunday":
                    for(i=0;i<ass_schedule.Sunday.length;i++){
                        if(ass_schedule.Sunday[i]._id.equals(acslotID)){
                            ass_schedule.Sunday.splice(i,1);
                            break;
                        }
                    }
                    break;
                case "Monday":
                    for(i=0;i<ass_schedule.Monday.length;i++){
                        if(ass_schedule.Monday[i]._id.equals(acslotID)){
                            ass_schedule.Monday.splice(i,1);
                            break;
                        }
                    }
                    break;
                case "Tuesday":
                    for(i=0;i<ass_schedule.Tuesday.length;i++){
                        if(ass_schedule.Tuesday[i]._id.equals(acslotID)){
                            ass_schedule.Tuesday.splice(i,1)
                            break;
                        }
                    }
                    break;
                case "Wednesday":
                    for(i=0;i<ass_schedule.Wednesday.length;i++){
                        if(ass_schedule.Wednesday[i]._id.equals(acslotID)){
                            ass_schedule.Wednesday.splice(i,1)
                            break;
                        }
                    }
                    break;
                case "Thursday":
                    for(i=0;i<ass_schedule.Thursday.length;i++){
                        if(ass_schedule.Thursday[i]._id.equals(acslotID)){
                            ass_schedule.Thursday.splice(i,1)
                            break;
                        }
                    }
                    
                    break;
                default:
                    console.log("day is wrong");

        }
        await ass_schedule.save();
        await UASlot.save();
        res.json("done");
    }
    catch(err){
        return res.status(500).json({error:err.message});
    }
})

//updating an academic member's slot assignment
route.put("/",async(req,res)=>{
    try{
        const CIId=req.id;
        const member= await staffMember.findOne({id:CIId});
        if(! member){
            return res.status(400).json({msg:"incorrect credentials"});        
        }
        if(!member.ci){
            return res.status(401).json({msg:"unauthorized"});            
        }
        //get the teaching slot id and the academic member id
        const slotID=req.body.slot_id;
        const NewAssID=req.body.ass_id;
        const NewAssignee=await staffMember.findOne({id:NewAssID});
        const Slot=await teachingSlots.findById(slotID);
        const assID=Slot.assigneeid;
        const assignee=await staffMember.findOne({id:assID});
        const course=Slot.slot.course;
        //if someone is already assigned
        if(Slot.assigneeid===null){
            return res.status(400).json({msg:"this slot is unassigned"});    
        }
        //if this academic member is not assigned to this course
        if(!NewAssignee.courses.includes(course)){
            return res.status(400).json({msg:"this staff member is not assigned to this course"});    
        }
        //assigning the new academic member to this slot
        Slot.assigneeid=NewAssID;
        //adding the slot to the assignee's schedule
        const actualSlot=Slot.slot;
        const acslotID=actualSlot._id;
        day=actualSlot.day;
        const nass_schedule= await schedules.findOne({id:NewAssID});
        switch(day){
            case "Saturday":
                nass_schedule.Saturday.push(actualSlot);
                break;
            case "Sunday":
                nass_schedule.Sunday.push(actualSlot);
                break;
            case "Monday":
                nass_schedule.Monday.push(actualSlot);
                break;
            case "Tuesday":
                nass_schedule.Tuesday.push(actualSlot);
                break;
            case "Wednesday":
                nass_schedule.Wednesday.push(actualSlot);
                break;
            case "Thursday":
                nass_schedule.Thursday.push(actualSlot);
                break;
            default:
                console.log("day is wrong");

        }
        await nass_schedule.save();
        await Slot.save();
        //removing the slot from the old academic member's schedule
        const ass_schedule= await schedules.findOne({id:assID});
        switch(day){
            case "Saturday":
                    for(i=0;i<ass_schedule.Saturday.length;i++){
                        if(ass_schedule.Saturday[i]._id.equals(acslotID)){
                            ass_schedule.Saturday.splice(i,1);
                            break;
                        }
                    }
                    break;
                case "Sunday":
                    for(i=0;i<ass_schedule.Sunday.length;i++){
                        if(ass_schedule.Sunday[i]._id.equals(acslotID)){
                            ass_schedule.Sunday.splice(i,1);
                            break;
                        }
                    }
                    break;
                case "Monday":
                    for(i=0;i<ass_schedule.Monday.length;i++){
                        if(ass_schedule.Monday[i]._id.equals(acslotID)){
                            ass_schedule.Monday.splice(i,1);
                            break;
                        }
                    }
                    break;
                case "Tuesday":
                    for(i=0;i<ass_schedule.Tuesday.length;i++){
                        if(ass_schedule.Tuesday[i]._id.equals(acslotID)){
                            ass_schedule.Tuesday.splice(i,1)
                            break;
                        }
                    }
                    break;
                case "Wednesday":
                    for(i=0;i<ass_schedule.Wednesday.length;i++){
                        if(ass_schedule.Wednesday[i]._id.equals(acslotID)){
                            ass_schedule.Wednesday.splice(i,1)
                            break;
                        }
                    }
                    break;
                case "Thursday":
                    for(i=0;i<ass_schedule.Thursday.length;i++){
                        if(ass_schedule.Thursday[i]._id.equals(acslotID)){
                            ass_schedule.Thursday.splice(i,1)
                            break;
                        }
                    }
                    
                    break;
                default:
                    console.log("day is wrong");

        }
        await ass_schedule.save();
        res.json("done");
    }
    catch(err){
        return res.status(500).json({error:err.message});
    }
})

module.exports = route;