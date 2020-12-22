const express = require("express");
const route = express.Router();
const viewStaff=require("./courseInstructorRoutes/viewStaff");
const assignSlot=require("./courseInstructorRoutes/slots");
const assignCC=require("./courseInstructorRoutes/assignCC");
const assignees=require("./courseInstructorRoutes/assignees");

route.use("/viewstaff",viewStaff);
route.use("/slots",assignSlot);
route.use("/assigncc",assignCC);
route.use("/assignees",assignees);

module.exports = route;