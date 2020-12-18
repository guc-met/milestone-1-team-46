const express = require("express");
const route = express.Router();
const viewSchedule=require("./academicsRoutes/viewschedule");
const repreq=require("./academicsRoutes/replacementrequest")
const slotlinking=require("./academicsRoutes/slotlinking");
const viewre=require("./academicsRoutes/viewallrequests");

//routes
route.use("/viewschedule",viewSchedule);
route.use("/replacementrequest",repreq);
route.use("/slotlinking",slotlinking);
route.use("/viewallrequests",viewre);




module.exports = route;