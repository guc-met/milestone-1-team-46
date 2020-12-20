const express = require("express");
const route = express.Router({mergeParams: true});
const requests=require("../../models/Requests");
const StaffMembers=require("../../models/staffMember");
const Faculties=require("../../models/Faculties")


route.post("/", async(req, res)=>{
    try{
    //getting the HOD
    const memId=req.id;
    const mem=  await StaffMembers.findOne({id:memId});
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
    //getting type of leave and info
    const type=req.body.type;
    const info=req.body.info;

      const r1=new requests(
          {
              sender_id: req.id,
              receiver_id:hodId,
              type: type,
              info: info
          }
      )
     await r1.save().then(()=>{
         res.send("request submittedd");
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
    const result=  await requests.find({sender_id: req.id,type:"slot linking"});
     res.send(result);

    }catch(err)
    {
        return res.status(500).json({error:err.message});
    }
})



module.exports = route;
