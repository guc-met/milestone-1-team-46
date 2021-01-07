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
        const member= await staffMember.findOne({id:CCId,ac:true});
        //if the course coordinator specified an id
        const id=req.query.id;
        if(! member){
            return res.status(401).json({msg:"incorrect credentials"});        
        }
        if(!member.cc){
            return res.status(403).json({msg:"Forbidden, you are not a course coordinator"});            
        }
        //get the course coordinator's course
        let course="";
        //get the member's faculty and department
        const faculty=member.faculty; 
        const department=member.department;
        //getting the course name
        const curFaculty=await faculties.findOne({name:faculty});
        if(!curFaculty)
            return res.status(406).json("the course coordinator's faculty was not found in the database");
        
        for(let i=0;i<curFaculty.departments.length;i++){
            if(curFaculty.departments[i].name===department){
                curDept=curFaculty.departments[i];
                break;
            }
        }
        if(!curDept)
            return res.status(406).json("the course coordinator's department was not found in the database");  

        for(let i=0;i<curDept.courses.length;i++){
            if(curDept.courses[i].ccId===member.id){
                course=curDept.courses[i].coursename;
                break;
            }
            if(i==curDept.courses.length-1)
                return res.status(406).json("course coordinator's course was not found");
        }
        if(id){
            slots=await teachingSlots.find({"slot.course":course,_id:id});
        }
        else{
            slots=await teachingSlots.find({"slot.course":course});
        }
        if(!slots)
            return res.status(406).json("No teaching slots for your course were found");
        
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
        const member= await staffMember.findOne({id:CCId,ac:true});
        if(! member){
            return res.status(401).json({msg:"incorrect credentials"});        
        }
        if(!member.cc){
            return res.status(403).json({msg:"Forbidden, you are not a course coordinator"});            
        }
        //get the location and the timing of the slot to be added
        const location=req.body.location;
        const time=req.body.time;
        const type=req.body.type;
        const day=req.body.day;
        if(!(location||time||type||day))
            return res.status(406).json("Please specify a location, day, time and type for the teaching slot");
       //get the course coordinator's course
       let course=undefined;
       //get the member's faculty and department
       const faculty=member.faculty; 
       const department=member.department;
       //getting the course name
       const curFaculty=await faculties.findOne({name:faculty});
       if(!curFaculty)
           return res.status(406).json("the course coordinator's faculty was not found in the database");
       
       for(let i=0;i<curFaculty.departments.length;i++){
           if(curFaculty.departments[i].name===department){
               curDept=curFaculty.departments[i];
               break;
           }
       }
       if(!curDept)
           return res.status(406).json("the course coordinator's department was not found in the database");  

       for(let i=0;i<curDept.courses.length;i++){
           if(curDept.courses[i].ccId===member.id){
               course=curDept.courses[i];
               break;
           }
           if(i==curDept.courses.length-1)
               return res.status(406).json("course coordinator's course was not found");
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
        const member= await staffMember.findOne({id:CCId,ac:true});
        if(! member){
            return res.status(401).json({msg:"incorrect credentials"});        
        }
        if(!member.cc){
            return res.status(403).json({msg:"Forbidden, you are not a course coordinator"});            
        }
        //getting the slot's id
        const slotID=req.body.id;
        const curSlot=await teachingSlots.findById(slotID);
        if(!curSlot)
            return res.status(406).json("no teaching slots of this id were found");
        const type=curSlot.slot.type;
        //get the course coordinator's course
        let course=undefined;
        //get the member's faculty and department
        const faculty=member.faculty; 
        const department=member.department;
        //getting the course name
        const curFaculty=await faculties.findOne({name:faculty});
        if(!curFaculty)
            return res.status(406).json("the course coordinator's faculty was not found in the database");
        
        for(let i=0;i<curFaculty.departments.length;i++){
            if(curFaculty.departments[i].name===department){
                curDept=curFaculty.departments[i];
                break;
            }
        }
        if(!curDept)
            return res.status(406).json("the course coordinator's department was not found in the database");  
 
        for(let i=0;i<curDept.courses.length;i++){
            if(curDept.courses[i].ccId===member.id){
                course=curDept.courses[i];
                break;
            }
            if(i==curDept.courses.length-1)
                return res.status(406).json("course coordinator's course was not found");
        }
        //the course coordinator is authorized to only delete a slot from his/her course
        if(curSlot.slot.course!==course.coursename){
            return res.status(403).json({msg:"forbidden, you can only delete slots from your own course"});                        
        }
        
        const deletedSlot=await teachingSlots.findByIdAndDelete(slotID);
        //updating total number of course slots
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
                else if(type==="lecture"){
                    course.lectures--;
                }
            }
            //remove this slot from the assignee's schedule
            if(deletedSlot.assigneeid!=null){
                const actualSlot=deletedSlot.slot;
                day=actualSlot.day;
                acslotID=actualSlot._id;
                assID=deletedSlot.assigneeid;
                assignee=await staffMember.findOne({id:assID,ac:true});
                if(!assignee)
                    return res.status(406).json("course coordinator's course was not found");
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
                await ass_schedule.save();

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
        const member= await staffMember.findOne({id:CCId,ac:true});
        if(! member){
            return res.status(401).json({msg:"incorrect credentials"});        
        }
        if(!member.cc){
            return res.status(403).json({msg:"Forbidden, you are not a course coordinator"});            
        }
        //getting the slot's updated time, type, day and/or location
        let time=req.body.time;
        const location=req.body.location;
        const type=req.body.type;
        let day=req.body.day;
        const slotID=req.body.id;
        const curSlot=await teachingSlots.findById(slotID);
        if(!curSlot)
            return res.status(406).json("No teaching slot with this id was found");
        //get the course coordinator's course
        let course="";
        //get the member's faculty and department
        const faculty=member.faculty; 
        const department=member.department;
        //getting the course name
        const curFaculty=await faculties.findOne({name:faculty});
        if(!curFaculty)
            return res.status(406).json("the course coordinator's faculty was not found in the database");
        
        for(let i=0;i<curFaculty.departments.length;i++){
            if(curFaculty.departments[i].name===department){
                curDept=curFaculty.departments[i];
                break;
            }
        }
        if(!curDept)
            return res.status(406).json("the course coordinator's department was not found in the database");  

        for(let i=0;i<curDept.courses.length;i++){
            if(curDept.courses[i].ccId===member.id){
                course=curDept.courses[i];
                break;
            }
            if(i==curDept.courses.length-1)
                return res.status(406).json("course coordinator's course was not found");
        }
        //the course coordinator is authorized to only update a slot from his/her course
        if(curSlot.slot.course!==course.coursename){
            return res.status(403).json({msg:"forbidden, you can only update slots from your own course"});                        
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
            assignee=await staffMember.findOne({id:ass_id,ac:true});
            if(!assignee)
                return res.status(406).json("the assignee was not found");
            if(!ass_schedule)
                return res.status(406).json("No schedule was found for the assignee to be updated");
            //looking for schedule conflicts
            if(day||time){
                if(!time)
                    time=curSlot.slot.time;
                if(!day)
                    day=curSlot.slot.day;
                if(day==assignee.daysOff)
                    return res.status(406).json({msg:"you can not assign this slot to this academic member on his/her day off"});                
                switch(day){
                    case "Saturday":
                        for(i=0;i<ass_schedule.Saturday.length;i++){
                            if(ass_schedule.Saturday[i].time==time){
                                return res.status(406).json("the assigned academic member has another teaching slot at the same time");
                            }
                        }
                        break;
                    case "Sunday":
                        for(i=0;i<ass_schedule.Sunday.length;i++){
                            if(ass_schedule.Sunday[i].time==time){
                                return res.status(406).json("the assigned academic member has another teaching slot at the same time");
                            }
                        }
                        break;
                    case "Monday":
                        for(i=0;i<ass_schedule.Monday.length;i++){
                            if(ass_schedule.Monday[i].time==time){
                                return res.status(406).json("the assigned academic member has another teaching slot at the same time");
                            }
                        }
                        break;
                    case "Tuesday":
                        for(i=0;i<ass_schedule.Tuesday.length;i++){
                            if(ass_schedule.Tuesday[i].time==time){
                                return res.status(406).json("the assigned academic member has another teaching slot at the same time");
                            }
                        }
                        break;
                    case "Wednesday":
                        for(i=0;i<ass_schedule.Wednesday.length;i++){
                            if(ass_schedule.Wednesday[i].time==time){
                                return res.status(406).json("the assigned academic member has another teaching slot at the same time");
                            }
                        }
                        break;
                    case "Thursday":
                        for(i=0;i<ass_schedule.Thursday.length;i++){
                            if(ass_schedule.Thursday[i].time==time){
                                return res.status(406).json("the assigned academic member has another teaching slot at the same time");
                            }
                        }
                        
                        break;
                    default:
                        console.log("day is wrong");
    
                }
            }
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
            if(time&&time!=curSlot.slot.time){
                await teachingSlots.findByIdAndUpdate(slotID,{$set:{"slot.time":time}});
                schedSlot.time=time;
                await ass_schedule.save();
            }
            if(location&&location!=curSlot.slot.location){
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