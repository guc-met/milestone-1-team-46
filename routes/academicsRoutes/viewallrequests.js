const express = require("express");
const route = express.Router({mergeParams: true});

const requests=require("../../models/Requests");




route.get("/", async(req, res)=>{
    try{
    const status=req.body.status;
    let result;
    if(status=="all")
    {
        result=  await requests.find({sender_id: req.id}).then(()=>{
            console.log(`found requests for staff member ${req.id}`);
           
         } ).catch(err=>{
             console.log(err.message);
         });
    }
    else
    {
        result=  await requests.find({sender_id: req.id,status:status}).then(()=>{
            console.log(`found requests for staff member ${req.id} with status: ${status}`);
           
         } ).catch(err=>{
             console.log(err.message);
         });
    }
     res.send(result);

    }catch(err)
    {
        return res.status(500).json({error:err.message});
    }
})

module.exports = route;
