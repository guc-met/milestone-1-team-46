const express = require("express");
const route = express.Router({mergeParams: true});
const staffMember=require("../../models/staffMember");

require('dotenv').config();

route.post('/', async(req,res)=>{
    // const id=req.id;
    // let member= await staffMember.findOne({id:id});
    // if(! member){
    //     return res.status(400).json({msg:"incorrect credentials"});        
    // }
  const salary=req.body.salary
  const id=(req.body.id).match(/(\d+)/);
    if(id !=req.id )
    {
       await staffMember.findOneAndUpdate({"id":id},  {$set :{"salary": salary}});
    }
    else{
        return res.status(401).json({ msg: "unauthorized you cant update your own salary :)" })
    }
   
     member= await staffMember.findOne({id:id});
    let pre="";
    if(member.hr)
    {
        pre="hr-";
    }
    if(member.hod)
    {
        pre="hod-";
    }
    if(member.cc)
    {
        pre="cc-";
    }
    if(member.ci){
        pre="ci-";
    }
    const memid=pre+member.no;
    
    res.json({
       "name":member.name,
       "ID":memid,
       "salary":member.salary,
       "email":member.email
       
    })
}
)

module.exports = route;