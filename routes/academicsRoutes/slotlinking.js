const express = require("express");
const route = express.Router({mergeParams: true});
const teachingSlots=require("../../models/TeachingSlots");
const requests=require("../../models/Requests");


route.post("/", async(req, res)=>{
    try{
      const slotId=req.body.slotId;
      const tslot= await teachingSlots.find({_id:slotId});
      const cc= tslot.ccId;

      const r1=new requests(
          {
              sender_id: req.id,
              receiver_id:cc,
              type: "slot linking",
              info:slotId
          }
      )
     res.send(tslot.ccId);

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
