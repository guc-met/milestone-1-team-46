const express = require("express");
const route = express.Router();
const bcryptjs=require("bcryptjs");
const staffMember=require("../models/staffMember");
require('dotenv').config();
const SignOut=require("../models/SignOut");

route.post("/", async (req,res)=>{
    try{
        const id=req.id;
        const member= await staffMember.findOne({id:id});
        if(! member){
            return res.status(400).json({msg:"incorrect credentials"});        
        }
        const newSignOut= new SignOut({
            id: id
        });
        newSignOut.save().then(()=>{
            console.log(`added a sign-out entry of id: ${id}`)
        }).catch(err=>{
            console.log(err.message)
        });
        res.json(newSignOut);
    }
    catch(err){
        return res.status(500).json({error:err.message});
    }
})


module.exports = route;