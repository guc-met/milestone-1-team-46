const express = require("express");
const route = express.Router({mergeParams: true});
const staffMember=require("../../models/staffMember");
const signIn = require('../../models/SignIn');
const leaves = require('../../models/leaves');
const signOut = require('../../models/SignOut');
const HourBalance = require('../../models/HourBalance');
const { sign } = require("jsonwebtoken");
require('dotenv').config();


route.post('/', async(req,res)=>{
    const id=req.id;
    const sID=req.body.id;
    let member= await staffMember.findOne({id:id});
    let output=[];
    let email="";
    if(! member){
        return res.status(400).json({msg:"incorrect credentials"});        
    }
    if(! member.hr){
        return res.status(400).json({msg:"you can't access this page"});        
    }

 
   
    const allstaff=  await staffMember.find({});
    const emails=[];
    
    allstaff.forEach(staff => {
       output.push(staff.email);
    });

    // for(let i=0;i<allstaff.length;i++){
    //     const staff=  await staffMember.findOne({});
    //     if(staff){
    //     output.push(staff.email);}
    //     const staff2=  await staffMember.findOne({email: {"$ne": staff.email}});
       
    //     if(staff2){
    //     output.push(staff2.email);
    //     }
    // }
  
    return res.send( JSON.stringify(output));
   
    
}
)

module.exports = route;