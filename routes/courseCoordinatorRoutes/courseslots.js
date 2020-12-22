const express = require("express");
const route = express.Router({mergeParams: true});
const staffMember=require("../../models/staffMember");
const teachingSlots=require("../../models/TeachingSlots");
const faculties=require("../../models/Faculties");
const schedules=require("../../models/Schedule");

//viewing  course slot(s)
route.get("/",async(req,res)=>{
    try{
        const CCId=req.id;
        const member= await staffMember.findOne({id:CCId});
        //if the course coordinator specified an id
        const id=req.body.id;
        if(! member){
            return res.status(400).json({msg:"incorrect credentials"});        
        }
        if(!member.cc){
            return res.status(401).json({msg:"unauthorized"});            
        }
        //const slots;
        if(id){
            slots=await teachingSlots.find({ccId:CCId,_id:id});
        }
        else{
            slots=await teachingSlots.find({ccId:CCId});
        }
        
        res.json(slots);
    }
    catch(err){
        return res.status(500).json({error:err.message});
    }
})


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
        const day=req.body.day;
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
                type:type,
                day:day
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
        const day=req.body.day;
        const slotID=req.body.id;
        const curSlot=await teachingSlots.findById(slotID);
        if(!curSlot)
            return res.status(500).json("No such teaching slot was found");
        //get the course coordinator's course
        let course="";
        //get the member's faculty and department
        const faculty=member.faculty; 
        const department=member.department;
        //getting the course name
        const curFaculty=await faculties.findOne({name:faculty});
        if(!curFaculty)
            return res.status(500).json("the course coordinator's faculty was not found in the database");
        
        for(let i=0;i<curFaculty.departments.length;i++){
            if(curFaculty.departments[i].name===department){
                curDept=curFaculty.departments[i];
                break;
            }
        }
        if(!curDept)
            return res.status(500).json("the course coordinator's department was not found in the database");  

        for(let i=0;i<curDept.courses.length;i++){
            if(curDept.courses[i].ccId===member.id){
                course=curDept.courses[i];
                break;
            }
            if(i==curDept.courses.length-1)
                return res.status(500).json("course coordinator's course was not found");
        }
        //the course coordinator is authorized to only update a slot from his/her course
        if(curSlot.slot.course!==course.coursename){
            return res.status(401).json({msg:"unauthorized"});                        
        }
        //updating the teaching slot
        const actualSlot=curSlot.slot;
        const oldDay=actualSlot.day;
        const ass_id=curSlot.assigneeid;
        //if no academic member is assigned to this slot
        if(ass_id===null){
            if(time){
                await teachingSlots.findByIdAndUpdate(slotID,{$set:{"slot.time":time}});
            }
            if(location){
                await teachingSlots.findByIdAndUpdate(slotID,{$set:{"slot.location":location}});
            }
            if(day&&day!==oldDay){
                await teachingSlots.findByIdAndUpdate(slotID,{$set:{"slot.day":day}});
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
        }
        //if there is an assignee we have to update his/her schedule
        else{
            //get his/her schedule slot to be updated
            ass_schedule= await schedules.findOne({id:ass_id});
            if(!ass_schedule)
                return res.status(500).json("No schedule was found for the assignee to be updated");
            acslotID=actualSlot._id;
            let schedSlot=undefined;
            switch(oldDay){
                case "Saturday":
                    for(i=0;i<ass_schedule.Saturday.length;i++){
                        if(ass_schedule.Saturday[i]._id.equals(acslotID)){
                            schedSlot=ass_schedule.Saturday[i];
                            break;
                        }
                    }
                    break;
                case "Sunday":
                    for(i=0;i<ass_schedule.Sunday.length;i++){
                        if(ass_schedule.Sunday[i]._id.equals(acslotID)){
                            schedSlot=ass_schedule.Sunday[i];
                            break;
                        }
                    }
                    break;
                case "Monday":
                    for(i=0;i<ass_schedule.Monday.length;i++){
                        if(ass_schedule.Monday[i]._id.equals(acslotID)){
                            schedSlot=ass_schedule.Monday[i];
                            break;
                        }
                    }
                    break;
                case "Tuesday":
                    for(i=0;i<ass_schedule.Tuesday.length;i++){
                        if(ass_schedule.Tuesday[i]._id.equals(acslotID)){
                            schedSlot=ass_schedule.Tuesday[i];
                            break;
                        }
                    }
                    break;
                case "Wednesday":
                    for(i=0;i<ass_schedule.Wednesday.length;i++){
                        if(ass_schedule.Wednesday[i]._id.equals(acslotID)){
                            schedSlot=ass_schedule.Wednesday[i];
                            break;
                        }
                    }
                    break;
                case "Thursday":
                    for(i=0;i<ass_schedule.Thursday.length;i++){
                        if(ass_schedule.Thursday[i]._id.equals(acslotID)){
                            schedSlot=ass_schedule.Thursday[i];
                            break;
                        }
                    }
                    
                    break;
                default:
                    console.log("day is wrong");

            }
            if(time){
                await teachingSlots.findByIdAndUpdate(slotID,{$set:{"slot.time":time}});
                schedSlot.time=time;
                await ass_schedule.save();
            }
            if(location){
                await teachingSlots.findByIdAndUpdate(slotID,{$set:{"slot.location":location}});
                schedSlot.location=location;
                await ass_schedule.save();    
            }
            if(type){
                //updating numbers of each type of slots
                const curSlot= await teachingSlots.findById(slotID);
                const oldType=curSlot.slot.type;
                await teachingSlots.findByIdAndUpdate(slotID,{$set:{"slot.type":type}});
                schedSlot.type=type;
                await ass_schedule.save(); 
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
            if(day&&day!==oldDay){
                await teachingSlots.findByIdAndUpdate(slotID,{$set:{"slot.day":day}});
                schedSlot.day=day;
                await ass_schedule.save();
                //change the assignee's slot day
                //remove slot from old day
                switch(oldDay){
                    case "Saturday":
                        ass_schedule.Saturday.splice(ass_schedule.Saturday.indexOf(schedSlot),1);
                        break;
                    case "Sunday":
                        ass_schedule.Sunday.splice(ass_schedule.Sunday.indexOf(schedSlot),1);
                        break;
                    case "Monday":
                        ass_schedule.Monday.splice(ass_schedule.Monday.indexOf(schedSlot),1);
                        break;
                    case "Tuesday":
                        ass_schedule.Tuesday.splice(ass_schedule.Tuesday.indexOf(schedSlot),1);
                        break;
                    case "Wednesday":
                        ass_schedule.Wednesday.splice(ass_schedule.Wednesday.indexOf(schedSlot),1);
                        break;
                    case "Thursday":
                        ass_schedule.Thursday.splice(ass_schedule.Thursday.indexOf(schedSlot),1);
                        break;
                    default:
                        console.log("day is wrong");
    
                }
                //add the slot to the updated day
                switch(day){
                    case "Saturday":
                        ass_schedule.Saturday.push(schedSlot);
                        break;
                    case "Sunday":
                        ass_schedule.Sunday.push(schedSlot);
                        break;
                    case "Monday":
                        ass_schedule.Monday.push(schedSlot);
                        break;
                    case "Tuesday":
                        ass_schedule.Tuesday.push(schedSlot);
                        break;
                    case "Wednesday":
                        ass_schedule.Wednesday.push(schedSlot);
                        break;
                    case "Thursday":
                        ass_schedule.Thursday.push(schedSlot);
                        break;
                    default:
                        console.log("day is wrong");
                }
                await ass_schedule.save();
            }
        }
        const upSlot=await teachingSlots.findById(slotID);
        res.json(upSlot);
   }
    catch(err){
        return res.status(500).json({error:err.message});
    }
})





module.exports = route;