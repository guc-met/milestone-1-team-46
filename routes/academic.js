const express = require("express");
const route = express.Router();
const viewSchedule=require("./academicsRoutes/viewschedule");
const repreq=require("./academicsRoutes/replacementrequest")
const slotlinking=require("./academicsRoutes/slotlinking");
const viewre=require("./academicsRoutes/viewallrequests");
const viewslots=require("./academicsRoutes/viewunassignedslots");
const changedayoff=require("./academicsRoutes/changedayoff");
const leaverequests=require("./academicsRoutes/leaverequest");

//routes
route.use("/viewschedule",viewSchedule);
route.use("/replacementrequest",repreq);
route.use("/slotlinking",slotlinking);
route.use("/viewallrequests",viewre);
route.use("/viewunassignedslots",viewslots);
route.use("/changedayoff",changedayoff);
route.use("/leaverequest",leaverequests);




module.exports = route;