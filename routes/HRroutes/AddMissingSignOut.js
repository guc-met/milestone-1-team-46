const express = require("express");
const route = express.Router({mergeParams: true});
const signOut=require("../../models/SignOut");
const staffMember = require("../../models/staffMember");

require('dotenv').config();

route.post('/', async(req,res)=>{
  let member= await staffMember.findOne({id:req.id});
  if(!member){
      return res.status(400).json({msg:"incorrect credentials"});        
  }
  if(!member.hr){
    return res.status(400).json({msg:"unauthorized"});        
}

    // const id=req.id;
    // let member= await staffMember.findOne({id:id});
    // if(! member){
    //     return res.status(400).json({msg:"incorrect credentials"});        
    // }
  const time=req.body.time
  const id=(req.body.id);
    if(id !=req.id )
    {
      
        let MissedSign = new signOut({
            id: req.body.id,
            HR_id:req.id,
            time: req.body.time
           })
         await  MissedSign.save();
           
    }
    else{
        return res.status(401).json({ msg: "unauthorized you cant add your own missing sign-out" })
    }
   

    res.json({
        "ID":req.body.id,
        "HR_id":req.id,
        "time":req.body.time
        
     })
}
)

module.exports = route;