const express = require("express");
const route = express.Router();
const bcryptjs=require("bcryptjs");
const staffMember=require("../models/staffMember");
const jwt=require("jsonwebtoken");
require('dotenv').config();

route.post("/", async (req,res)=>{
    try{
        res.json({})
    }
    catch(err){
        return res.status(500).json({error:err.message});
    }
})


module.exports = route;