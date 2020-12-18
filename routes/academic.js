const express = require("express");
const route = express.Router();
const viewSchedule=require("./academicsRoutes/viewschedule");
const repreq=require("./academicsRoutes/replacementrequest")
const slotlinking=require("./academicsRoutes/slotlinking");


//routes
route.use("/viewschedule",viewSchedule);
route.use("/replacementrequest",repreq);
route.use("/slotlinking",slotlinking);



module.exports = route;