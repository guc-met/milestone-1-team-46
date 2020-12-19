const express = require("express");
const route = express.Router({mergeParams: true});

const Requests=require("../../models/Requests");




route.post("/", async(req, res)=>{
    try{
    const reqId=req.body.reqId;
    const request= await Requests.findOne({_id:reqId}).then(()=>{
        console.log(`found request with id:${reqId}`);
    }).catch(err=>{
        console.log(err.message);
    });

    if(request.status=="Pending")
    {
        await Requests.deleteOne({_id:reqId}).then(()=>{
            console.log("Request cancelled successfully");
            res.send("Request Cancelled");
        }).catch(err=>{
            console.log(err.message)
        });
    }
    else
    {
        res.send("Cannot delete a non-pending request")
    }

    }
    catch(err)
    {
        return res.status(500).json({error:err.message});
    }
})

module.exports = route;
