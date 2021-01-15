const express = require("express");
const route = express.Router();
const bcryptjs=require("bcryptjs");
const staffMember=require("../models/staffMember");
require('dotenv').config();
const Signin=require("../models/SignIn");

route.post("/", async (req,res)=>{
    try{
        console.log("Got to sign in")

        const id=req.id;
        const member= await staffMember.findOne({id:id});
        if(! member){
            return res.status(400).json({msg:"incorrect credentials"});        
        }
        const newSignIn= new Signin({
            id: id
        });
        newSignIn.save().then(()=>{
            console.log(`added a sign-in entry of id: ${id}`)
        }).catch(err=>{
            console.log(err.message)
        });
        res.json(newSignIn);
    }
    catch(err){
        return res.status(500).json({error:err.message});
    }
})


module.exports = route;