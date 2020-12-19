const express = require("express");
const route = express.Router({mergeParams: true});

const schedules=require("../../models/Schedule");


route.get("/", async(req, res)=>{
    try{
        
        const mySchedule= await schedules.findOne({id:req.id});
        res.json(mySchedule);

    }catch(err)
    {
        return res.status(500).json({error:err.message});
    }
})

module.exports = route;
