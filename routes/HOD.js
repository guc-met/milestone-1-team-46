const express = require("express");
const route = express.Router();
const viewStaff=require("./HODroutes/viewStaff");
const assignCourseInstructor=require("./HODroutes/assignCourseInstructor");

route.use("/viewStaff",viewStaff);
route.use("/assignCourseInstructor",assignCourseInstructor);
module.exports = route;
