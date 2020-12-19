
const express = require("express");
const route = express.Router({mergeParams: true});

const requests=require("../../models/Requests");


route.get("/", async(req, res)=>{
    try{
    const status=req.body.status;
    const department=member.department;
    //get all staff member in the same department
    let result= await staffMember.find({faculty:faculty,department:department});




    if(type=="all")
    {
     result=  await requests.find({sender_id: req.id});
    }
    else
    {
         result=  await requests.find({sender_id: req.id,status:status});
    }
     res.send(result);

    }catch(err)
    {
        return res.status(500).json({error:err.message});
    }
})

module.exports = route;