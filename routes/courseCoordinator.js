const express = require("express");
const route = express.Router();
const slot=require("./courseCoordinatorRoutes/courseslots");

route.use("/slots",slot);


module.exports = route;