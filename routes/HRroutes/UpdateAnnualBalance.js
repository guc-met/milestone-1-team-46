const express = require("express");
const route = express.Router();
const staffMember=require("../../models/staffMember");


require('dotenv').config();

route.put('/', async(req,res)=>{
const query = {};
const update = { "$inc": { "annualLeaveBalance": 2.5 } };
const options = { "upsert": false }
return staffMember.updateMany(query, update, options)
  .then(result => {
    const { matchedCount, modifiedCount } = result;
    console.log(`Successfully matched ${matchedCount} and modified ${modifiedCount} items.`)
    res.send(result);
  })
  .catch(err => console.error(`Failed to update items: ${err}`))
});

module.exports = route;