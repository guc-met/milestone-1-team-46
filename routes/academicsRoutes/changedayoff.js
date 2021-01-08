const express = require("express");
const route = express.Router({mergeParams: true});
const requests=require("../../models/Requests");
const StaffMembers=require("../../models/staffMember");
const Faculties=require("../../models/Faculties")


route.post("/", async(req, res)=>{
    try{
        const id=req.id;
        const member= await StaffMembers.findOne({id:id});
        const dayOff=req.body.dayOff;

        if(! member){
            return res.status(400).json({msg:"incorrect credentials"});        
        }
       if(!member.ac){
            return res.status(401).json({msg:"unauthorized"});            
       }
    const memId=req.id;
 
    const mem=  await StaffMembers.findOne({id:memId});
    const daysOfWeek=["Saturday","Sunday","Monday","Tuesday","Wednesday","Thursday"];
    if(!daysOfWeek.includes(dayOff))
    {
        res.send("Enter a Valid day ");
        return;
    }
    if(mem.daysOff==dayOff)
    {
        res.send(`Your Day off is already ${dayOff}`);
        return;
    }
 
    const memFaculty=mem.faculty;
    const memDepartment=mem.department;
    const faculty=await Faculties.findOne({name:memFaculty});
    const departments=faculty.departments;
    
    let hodId=0;

    console.log(departments);
    for(let i=0;i<departments.length;i++)
    {
        if(departments[i].name==memDepartment)
        {
            hodId=departments[i].HOD;
        }

    }

      const r1=new requests(
          {
              sender_id: req.id,
              receiver_id:hodId,
              type: "change-day-off",
              info: dayOff
          }
      )
     await r1.save().then(()=>{
         res.send("Request submitted successfully");
         console.log(`Request submitted successfully ${r1}`);
        
      } ).catch(err=>{
          console.log(err.message);
      });
    

    }catch(err)
    {
        return res.status(500).json({error:err.message});
    }
})

route.get("/", async(req, res)=>{
    try{
    const result=  await requests.find({sender_id: req.id,type:"change-day-off"});
     res.send(result);

    }catch(err)
    {
        return res.status(500).json({error:err.message});
    }
})



module.exports = route;
