const express = require("express");
const route = express.Router();
const updateSalary=require("./HRroutes/updateSalary");
const viewMissingHours=require("./HRroutes/viewMissingHours");
const viewAttendance=require("./HRroutes/viewAttendance");
const AddMissingSignIn=require("./HRroutes/AddMissingSignIn");
const AddMissingSignOut=require("./HRroutes/AddMissingSignOut");
const DeleteStaffMember=require("./HRroutes/DeleteStaffMember");
const AddStaffMember=require("./HRroutes/AddStaffMember");

route.use("/updateSalary",updateSalary);
route.use("/viewMissingHours",viewMissingHours);
route.use("/viewAttendance",viewAttendance);
route.use("/AddMissingSignIn",AddMissingSignIn);
route.use("/AddMissingSignOut",AddMissingSignOut);
route.use("/DeleteStaffMember",DeleteStaffMember);
route.use("/AddStaffMember",AddStaffMember);
module.exports = route;