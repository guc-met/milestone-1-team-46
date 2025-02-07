const express = require("express");
const route = express.Router({mergeParams: true});
const staffMember=require("../../models/staffMember");
const courses=require("../../models/CoursesModel");
const faculties=require("../../models/Faculties");

route.post("/",async(req,res)=>{
    try{
        let HODId=req.id;
        let member= await staffMember.findOne({id:HODId});
        if(! member){
            return res.status(400).json({msg:"incorrect credentials"});        
        }
        if(!member.hod){
            return res.status(401).json({msg:"unauthorized you can't access this page"});            
        }

        
     
        let id=req.body.id;
        let course=req.body.course;
        if(!id&& !course ){
            return res.status(400).json({msg:"please select and enter fields "});  
        }
        if(!id){
            return res.status(400).json({msg:"please select instructor id "});  
        }
        if(!course){
            return res.status(400).json({msg:"please enter course name "});  
        }
        let newcourses=[];
        try{
         
member=await staffMember.findOne({id:id});
for(i=0;i<member.courses.length;i++){
    if(member.courses[i]!==course){
        console.log(member.courses[i]);
        newcourses.push(member.courses[i]);
        break;
    }
}
await staffMember.findOneAndUpdate({id:id},{$set :{courses: newcourses}});

            // let curcourse = await faculty.findOne({coursename:course});

        let c = await courses.findOne({coursename:course});
        let newCI=[];
        console.log((c.ciId).length);

            for(i=0;i<(c.ciId).length;i++){
                if (c.ciId[i] !=id){
                    newCI.push(c.ciId[i]);
                }
            }
            await courses.findOneAndUpdate({coursename:course},{$set :{ciId: newCI}});
            return res.send("deleted successfully");
             console.log(newCI);
        
          
            
        }
        catch(err){
            return res.status(501).json({error:err.message});
        }
    
        member= await staffMember.findOne({id:id});
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