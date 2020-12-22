const express = require("express");
const route = express.Router({mergeParams: true});

const requests=require("../../models/Requests");


route.post("/", async(req, res)=>{
    try{
      const r1=new requests(
          {
              sender_id: req.id,
              type: "replacement",
              replacementId: req.body.repId
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
    const result1=  await requests.find({sender_id: req.id,type:"replacement"});
    const result2= await requests.find({replacementId: req.id});
    const result= result1.concat(result2);
     res.send(result1);

    }catch(err)
    {
        return res.status(500).json({error:err.message});
    }
})

module.exports = route;
