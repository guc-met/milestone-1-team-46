const express = require("express");
const route = express.Router({mergeParams: true});

const requests=require("../../models/Requests");


route.post("/", async(req, res)=>{
    try{
      const r1=new requests(
          {
              sender_id: req.id,
              type: "replacement"
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
    const result=  await requests.find({sender_id: req.id,type:"replacement"});
     res.send(result);

    }catch(err)
    {
        return res.status(500).json({error:err.message});
    }
})

module.exports = route;
