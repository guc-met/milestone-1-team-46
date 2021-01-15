
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
   if(!member.hod){
        return res.status(401).json({msg:"unauthorized"});            
   }
    const department=member.department;
    const faculty=member.faculty;
    const type1="change-day-off";
    const type2="compensation leave";
    const type3="annual leave";
    const type4="maternity leave";
    const type5="sick leave";
    const type6="accidental leave";
    //get all staff member in the same department
   // let allmemebrs= await staffMember.find({faculty:faculty,department:department});
    //get all requests with same type "change dayoff/leave"
    let allrequests=  await requests.find( { $or:[ {type:type1},{type:type2},{type:type3},{type:type4},{type:type5},{type:type6}],receiver_id:id,status:"Pending"});

  //  let results=[];
// console.log(allrequests);
  // console.log(allmemebrs);


  //  if((!allmemebrs)||allmemebrs.length==0&&(!allrequests)||allrequests.length==0){
 console.log(allrequests);
  if (allrequests){
  
    res.send(allrequests);
  }
    else{
       
        return res.status(401).json("there are no requests for you");
    }
      
  

    }catch(err)
    {
        return res.status(500).json({error:err.message});
    }
})

module.exports = route;