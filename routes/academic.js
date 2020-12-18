const express = require("express");
const route = express.Router();
const viewSchedule=require("./academicsRoutes/viewschedule");

//routes
route.use("/viewschedule",viewSchedule);



module.exports = route;