const express = require("express");
const route = express.Router();
const viewSchedule=require("./academicsRoutes/viewschedule");
const repreq=require("./academicsRoutes/replacementrequest")
const slotlinking=require("./academicsRoutes/slotlinking");
const viewre=require("./academicsRoutes/viewallrequests");
const viewslots=require("./academicsRoutes/viewunassignedslots");

//routes
route.use("/viewschedule",viewSchedule);
route.use("/replacementrequest",repreq);
route.use("/slotlinking",slotlinking);
route.use("/viewallrequests",viewre);
route.use("/viewunassignedslots",viewslots);




module.exports = route;