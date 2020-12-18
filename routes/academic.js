const express = require("express");
const route = express.Router();
const viewSchedule=require("./academicsRoutes/viewschedule");
const repreq=require("./academicsRoutes/replacementrequest")


//routes
route.use("/viewschedule",viewSchedule);
route.use("/replacementrequest",repreq);



module.exports = route;