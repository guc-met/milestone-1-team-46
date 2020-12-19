const express = require("express");
const route = express.Router();
const slot=require("./courseCoordinatorRoutes/courseslots");
const requests=require("./courseCoordinatorRoutes/requests");

route.use("/slots",slot);
route.use("/requests",requests);


module.exports = route;