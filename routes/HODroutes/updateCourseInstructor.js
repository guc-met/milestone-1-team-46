const express = require("express");
const route = express.Router({mergeParams: true});
const staffMember=require("../../models/staffMember");
const faculties=require("../../models/Faculties");
const courses=require("../../models/CoursesModel");

route.put("/",async(req,res)=>{
    try{
        const HODId=req.id;
        let member= await staffMember.findOne({id:HODId});
        if(! member){
            return res.status(400).json({msg:"incorrect credentials"});        
        }
        if(!member.hod){
            return res.status(401).json({msg:"unauthorized you can't access this page"});            
        }
        const faculty=member.faculty; 
        const department=member.department;   //get the HOD's faculty and department
       
        const course=req.body.course;   //get the course and the staff member to be assigned as CI's id
        const Oldid=req.body.Oldid;
        const Newid=req.body.Newid;

        if(!Oldid && !Newid && !course ){
            return res.status(400).json({msg:"please select and fill the fields "});  
        }
        if(!Oldid ){
            return res.status(400).json({msg:"please select old instructor id "});  
        }
        if(!Newid ){
            return res.status(400).json({msg:"please select new instructor id "});  
        }
        if(!course ){
            return res.status(400).json({msg:"please enter coursename "});  
        }
        let object="";
        let output=[];
        console.log("new id is"+ Newid);
        console.log("old id is"+ Oldid);
        try{
            // await staffMember.findOneAndUpdate({faculty:faculty,department:department,id:Newid},{$set :{"ci": true}});
            await courses.findOneAndUpdate({coursename:course},{$set :{"ciId": Newid}});

            // await staffMember.findOneAndUpdate({faculty:faculty,department:department,id:Oldid},{$set :{"ci": false}});
            let c = await courses.findOne({coursename:course});
            let newCI=[];
            console.log((c.ciId).length);
    
                for(i=0;i<(c.ciId).length;i++){
                    if (c.ciId[i] !=Oldid){
                        newCI.push(c.ciId[i]);
                    }
                }
                await courses.findOneAndUpdate({coursename:course},{$set :{"ciId": newCI}});
                 console.log(newCI);

                 const assignee= await staffMember.findOne({id:Oldid,ci:true});
                 if(!assignee){
                 object={
                     message:"No course instructor with the provided id was found"
                 }
                   output.push(object);
                   return res.send(JSON.stringify(output));
                }
                 if(!assignee.courses.includes(course)){
                    object={
                        message:"this course instructor is not assigned to this course"
                    }
                    output.push(object);
                    return res.send(JSON.stringify(output));

                 }
               
                 for(i=0;i<assignee.courses.length;i++){
                     if(assignee.courses[i]===course){
                         assignee.courses.splice(i,1);
                         break;
                     }
                 }
                 await assignee.save();
                //  res.json(assignee);
                const assignee2= await staffMember.findOne({id:Newid,ci:true});
                assignee2.courses.push(course);
                for(let i=0;i<assignee2.courses.length;i++){
                    console.log(assignee2.courses[i]);
                  
                }
                await assignee2.save();
                object={
                    message:"updated successfully"
                }
                  output.push(object);
                  return res.send(JSON.stringify(output));
               
        }
        catch(err){
            return res.status(501).json({error:err.message});
        }
    
        member= await staffMember.findOne({id:Newid});
        let pre="";
        if(member.hr)
        {
            pre="hr-";
        }
        else{
            pre="ac-";
        }
        let memid=pre+member.no;
        
        res.json({
           "name":member.name,
           "ID":memid,
           "ci":member.ci,
           "email":member.email,
           "Office":member.office,
           "Day-Off":member.daysOff,
           "Annual Leave Balance":member.annualLeaveBalance,
           "Accidental Leave Balance":member.accidentalLeaveBalance,
           "Department":member.department,
           "Faculty":member.faculty,
        //    "Salary":member.Salary
        })
    }
    catch(err){
        return res.status(500).json({error:err.message});
    }
})


module.exports = route;