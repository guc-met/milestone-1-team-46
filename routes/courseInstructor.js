const express = require("express");
const route = express.Router();
const viewStaff=require("./courseInstructorRoutes/viewStaff");
const assignSlot=require("./courseInstructorRoutes/assignSlot");
const assignCC=require("./courseInstructorRoutes/assignCC");

route.use("/viewstaff",viewStaff);
route.use("/assignslot",assignSlot);
route.use("/assigncc",assignCC);

module.exports = route;