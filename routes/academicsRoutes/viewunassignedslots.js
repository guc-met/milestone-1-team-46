const express = require("express");
const route = express.Router({mergeParams: true});

const teachingSlots=require("../../models/TeachingSlots");




route.get("/", async(req, res)=>{
    try{
    const course=req.body.course;
    const result= await teachingSlots.find({"slot.course":course});
    res.send(result);

    }catch(err)
    {
        return res.status(500).json({error:err.message});
    }
})

module.exports = route;
