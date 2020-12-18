const express = require("express");
const route = express.Router();
const viewStaff=require("./courseInstructorRoutes/viewStaff");

route.use("/viewstaff",viewStaff);

module.exports = route;