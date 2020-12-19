const express = require("express");
const route = express.Router({mergeParams: true});
const staffMember=require("../../models/staffMember");
const teachingSlots=require("../../models/TeachingSlots");
const faculties=require("../../models/Faculties");

//adding a slot
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
        //get the location and the timing of the slot to be added
        const location=req.body.location;
        const time=req.body.time;
        const type=req.body.type;
        //get the course coordinator's course
        let course= "";//await getCourse(member);
        //get the member's faculty and department
        const faculty=member.faculty; 
        const department=member.department;
        //getting the course
        const curFaculty=await faculties.findOne({name:faculty});
        for(let i=0;i<curFaculty.departments.length;i++){
            if(curFaculty.departments[i].name===department){
                curDept=curFaculty.departments[i];
                break;
            }
        }
        for(let i=0;i<curDept.courses.length;i++){
            if(curDept.courses[i].ccId===member.id){
                course=curDept.courses[i];
            }
        }
        //adding the slot
        const ts=new teachingSlots({
            slot:{
                location:location,
                time:time,
                course:course.coursename,
                type:type
            },
            ccId:CCId
        });
        await ts.save();

        //updating the total number of this course's slots
        if(!course.totalslots)
            course.totalslots=0;
        course.totalslots+=1;
        if(type==="lab"){
            course.labs++;
        }
        else if(type==="tutorial"){
            course.tutorials++;
        }
        if(type==="lecture"){
            course.lectures++;
        }
        await curFaculty.save();
        res.json(ts);
    }
    catch(err){
        return res.status(500).json({error:err.message});
    }
})

//deleting a teaching slot
route.delete("/",async(req,res)=>{
    try{
        const CCId=req.id;
        const member= await staffMember.findOne({id:CCId});
        if(! member){
            return res.status(400).json({msg:"incorrect credentials"});        
        }
        if(!member.cc){
            return res.status(401).json({msg:"unauthorized"});            
        }
        //getting the slot's id
        const slotID=req.body.id;
        const curSlot=await teachingSlots.findById(slotID);
        const type=curSlot.slot.type;
        //get the course coordinator's course
        let course= "";
         //get the member's faculty and department
         const faculty=member.faculty; 
         const department=member.department;
         //getting the course
         const curFaculty=await faculties.findOne({name:faculty});
         for(let i=0;i<curFaculty.departments.length;i++){
             if(curFaculty.departments[i].name===department){
                 curDept=curFaculty.departments[i];
                 break;
             }
         }
         for(let i=0;i<curDept.courses.length;i++){
             if(curDept.courses[i].ccId===member.id){
                 course=curDept.courses[i];
             }
         }
        //the course coordinator is authorized to only delete a slot from his/her course
        if(curSlot.slot.course!==course.coursename){
            return res.status(401).json({msg:"unauthorized"});                        
        }
        
        const deletedSlot=await teachingSlots.findByIdAndDelete(slotID);
        //updating total number of course slots
        if(deletedSlot){
            if(!course.totalslots)
                course.totalslots=0;
            if(course.totalslots>0){
                course.totalslots-=1;
                if(type==="lab"){
                    course.labs--;
                }
                else if(type==="tutorial"){
                    course.tutorials--;
                }
                if(type==="lecture"){
                    course.lectures--;
                }
            }
        }
        await curFaculty.save();
        res.json(deletedSlot);
    }
    catch(err){
        return res.status(500).json({error:err.message});
    }
})
//updating a teaching slot
route.put("/",async(req,res)=>{
    try{
        const CCId=req.id;
        const member= await staffMember.findOne({id:CCId});
        if(! member){
            return res.status(400).json({msg:"incorrect credentials"});        
        }
        if(!member.cc){
            return res.status(401).json({msg:"unauthorized"});            
        }
        //getting the slot's updated time and/or location
        const time=req.body.time;
        const location=req.body.location;
        const type=req.body.type;
        const slotID=req.body.id;
        const curSlot=await teachingSlots.findById(slotID);
        //get the course coordinator's course
        let course="";
        //get the member's faculty and department
        const faculty=member.faculty; 
        const department=member.department;
        //getting the course name
        const curFaculty=await faculties.findOne({name:faculty});
        for(let i=0;i<curFaculty.departments.length;i++){
            if(curFaculty.departments[i].name===department){
                curDept=curFaculty.departments[i];
                break;
            }
        }
        for(let i=0;i<curDept.courses.length;i++){
            if(curDept.courses[i].ccId===member.id){
                course=curDept.courses[i];
            }
        }
        //the course coordinator is authorized to only delete a lot from his/her course
        if(curSlot.slot.course!==course.coursename){
            return res.status(401).json({msg:"unauthorized"});                        
        }
        if(time){
            await teachingSlots.findByIdAndUpdate(slotID,{$set:{"slot.time":time}});
        }
        if(location){
            await teachingSlots.findByIdAndUpdate(slotID,{$set:{"slot.location":location}});
        }
        if(type){
            //updating numbers of each type of slots
            const curSlot= await teachingSlots.findById(slotID);
            const oldType=curSlot.slot.type;
            await teachingSlots.findByIdAndUpdate(slotID,{$set:{"slot.type":type}});
            if(oldType!==type){
                if(type==="lab"){
                    course.labs++;
                }
                else if(type==="tutorial"){
                    course.tutorials++;
                }
                else if(type==="lecture"){
                    course.lectures++;
                }

                if(oldType==="lab"){
                    course.labs--;
                }
                else if(oldType==="tutorial"){
                    course.tutorials--;
                }
                else if(oldType==="lecture"){
                    course.lectures--;
                }
                await curFaculty.save();
            }
        }
        const upSlot=await teachingSlots.findById(slotID);
        res.json(upSlot);
    }
    catch(err){
        return res.status(500).json({error:err.message});
    }
})

const getCourse = async (member) => {
    //get the member's faculty and department
    const faculty=member.faculty; 
    const department=member.department;
    //getting the course name
    const curFaculty=await faculties.findOne({name:faculty});
    for(let i=0;i<curFaculty.departments.length;i++){
        if(curFaculty.departments[i].name===department){
            curDept=curFaculty.departments[i];
            break;
        }
    }
    for(let i=0;i<curDept.courses.length;i++){
        if(curDept.courses[i].ccId===member.id){
            return curDept.courses[i].coursename;
        }
    }
}



module.exports = route;