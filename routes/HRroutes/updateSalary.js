const express = require("express");
const route = express.Router({mergeParams: true});
const staffMember=require("../../models/staffMember");
const Hours=require("../../models/HourBalance");

require('dotenv').config();

route.post('/', async(req,res)=>{
    // const id=req.id;
    // let member= await staffMember.findOne({id:id});
    // if(! member){
    //     return res.status(400).json({msg:"incorrect credentials"});        
    // }
  let salary=req.body.salary;
  var d = new Date();
  var n = d.getMonth()+1;
  console.log("month is"+ n);
  const id=(req.body.id);
    if(id !=req.id )
    {
        let deductions= await Hours.find({id:id,month:n});
        
        console.log("hours is"+deductions[0].hours);
        let deductionhours=-(deductions[0].hours);
        let deductiondays=-(deductions[0].days);
        console.log(deductionhours);
        console.log(deductionhours);
        if(deductionhours>2.98){
            salary=salary-(salary/180);
        }
        if(deductiondays!=0){
        for(i=0;i<deductiondays;i++){
        salary=salary-(salary/(180*60));
        }}
        
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
       "salary":member.salary,
       "email":member.email
       
    })
}
)

module.exports = route;