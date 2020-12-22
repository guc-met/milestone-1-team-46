const express = require("express");
const route = express.Router({mergeParams: true});
const signin=require("../../models/SignIn");
const staffMember = require("../../models/staffMember");

require('dotenv').config();

route.post('/', async(req,res)=>{
    // const id=req.id;
    // let member= await staffMember.findOne({id:id});
    // if(! member){
    //     return res.status(400).json({msg:"incorrect credentials"});        
    // }
  const time=req.body.time
  const id=(req.body.id);
    if(id !=req.id )
    {
      
        let MissedSign = new signin({
            id: req.body.id,
            HR_id:req.id,
            time: req.body.time
           })
         await  MissedSign.save();
           
    }
    else{
        return res.status(401).json({ msg: "unauthorized you cant add your own missing sign-in " })
    }
   

    res.json({
        "ID":req.body.id,
        "HR_id":req.id,
        "time":req.body.time
        
     })
}
)

module.exports = route;