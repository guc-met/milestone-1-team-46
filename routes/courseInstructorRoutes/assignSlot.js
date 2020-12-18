const express = require("express");
const route = express.Router({mergeParams: true});
const staffMember=require("../../models/staffMember");
const schedule=require("../../models/Schedule");




module.exports = route;