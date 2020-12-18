const express = require("express");
const route = express.Router({mergeParams: true});
const staffMember=require("../../models/staffMember");
const Schedule=require("../../models/Schedule");

route.get("/",async(req,res)=>{
    try{
        const id=req.id;
        const member= await staffMember.findOne({id:id});
        if(! member){
            return res.status(400).json({msg:"incorrect credentials"});        
        }
        if(!member.ci){
            return res.status(401).json({msg:"unauthorized"});            
        }
        const faculty=member.faculty; 
        const department=member.department;
        const course=req.body.course;
        let preresult= await staffMember.find({faculty:faculty,department:department});
        let result=[];
        if(course){
            for(i=0;i<preresult.length;i++){
                const member=preresult[i];
                const memberSchedule= await Schedule.findOne({id:member.id});
                let pushed=false;
                if(memberSchedule){
                    if(memberSchedule.Saturday){
                        memberSchedule.Saturday.forEach(slot=>{
                            if (slot.course===course&&!pushed){
                                result.push(member);
                                pushed=true;
                            }
                        })
                    }
                    if(memberSchedule.Sunday){
                        memberSchedule.Sunday.forEach(slot=>{
                            if (slot.course===course&&!pushed){
                                result.push(member);
                                pushed=true;
                            }
                        })
                    }
                    if(memberSchedule.Monday){
                        memberSchedule.Monday.forEach(slot=>{
                            if (slot.course===course&&!pushed){
                                result.push(member);
                                pushed=true;
                            }
                        })
                    }
                    if(memberSchedule.Tuesday){
                        memberSchedule.Tuesday.forEach(slot=>{
                            if (slot.course===course&&!pushed){
                                result.push(member);
                                pushed=true;
                            }
                        })
                    }
                    if(memberSchedule.Wednesday){                    
                        memberSchedule.Wednesday.forEach(slot=>{
                            if (slot.course===course&&!pushed){
                                result.push(member);
                                pushed=true;
                            }
                        })
                    }
                    if(memberSchedule.Thursday){
                        memberSchedule.Thursday.forEach(slot=>{
                            if (slot.course===course&&!pushed){
                                result.push(member);
                                pushed=true;
                            }
                        })
                    }
                }
            }
        }
        else{
            result=preresult;
        }
        res.json(result);
    }
    catch(err){
        return res.status(500).json({error:err.message});
    }
})


module.exports = route;