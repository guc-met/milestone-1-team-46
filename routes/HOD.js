const express = require("express");
const route = express.Router();
const viewStaff=require("./HODroutes/viewStaff");
const assignCourseInstructor=require("./HODroutes/assignCourseInstructor");
const deleteCourseInstructor=require("./HODroutes/deleteCourseInstructor");
const updateCourseInstructor=require("./HODroutes/updateCourseInstructor");

route.use("/viewStaff",viewStaff);
route.use("/assignCourseInstructor",assignCourseInstructor);
route.use("/deleteCourseInstructor",deleteCourseInstructor);
route.use("/updateCourseInstructor",updateCourseInstructor);
module.exports = route;
