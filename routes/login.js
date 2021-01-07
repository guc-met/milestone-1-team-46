const express = require("express");
const route = express.Router();
const bcryptjs=require("bcryptjs");
const staffMember=require("../models/staffMember");
const jwt=require("jsonwebtoken");
require('dotenv').config();

route.post("/", async (req,res)=>{
    try{
        const{email,password}=req.body;
        if (!(email&&password)){
            return res.status(400).json({msg:"enter all fields"});
        }
        const member= await staffMember.findOne({email:email});
        if(! member){
            return res.status(400).json({msg:"incorrect email"});        
        }
        //comparing submitted password with the encrypted one
        const confirmed= await bcryptjs.compare(password,member.password);
        if(!confirmed){
            return res.status(400).json({msg:"wrong password"});        
        }
        //generating jwt token
        const token = jwt.sign({id:member.id},process.env.SIGNATURE);
        res.json({
            token,
            member
        })
    }
    catch(err){
        return res.status(500).json({error:err.message});
    }
})


module.exports = route;