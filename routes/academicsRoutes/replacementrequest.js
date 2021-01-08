const express = require("express");
const route = express.Router({mergeParams: true});
const staffMember=require("../../models/staffMember");
const requests=require("../../models/Requests");


route.post("/", async(req, res)=>{
    try{
        const id=req.id;

        const member= await staffMember.findOne({id:id});
        if(! member){
            return res.status(400).json({msg:"incorrect credentials"});        
        }
       if(!member.ac){
            return res.status(401).json({msg:"unauthorized"});            
       }
       const email=req.body.email;
       const memberR=await staffMember.findOne({email:email});
       const academics= await staffMember.find({ac:true});
       let found =false;
       for(let i=0;i<academics.length;i++)
       {
           if(academics[i].email==email)
           {
                found=true;
           }

       }
       if(!found)
       {
           
           
        return res.status(401).json({msg:"There is no academic member with this ID"});
       }
      
      const r1=new requests(
          {
              sender_id:id,
              type: "replacement",
              replacementId: memberR.id,
              info: req.body.day
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
