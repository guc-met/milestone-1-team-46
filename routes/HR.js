const express = require("express");
const route = express.Router();
const updateSalary=require("./HRroutes/updateSalary");
const viewMissingHours=require("./HRroutes/viewMissingHours");
const viewAttendance=require("./HRroutes/viewAttendance");
const AddMissingSignIn=require("./HRroutes/AddMissingSignIn");
const AddMissingSignOut=require("./HRroutes/AddMissingSignOut");
const AddLocation=require("./HRroutes/AddLocation");
const UpdateLocation = require("./HRroutes/UpdateLocation");
const DeleteLocation = require("./HRroutes/DeleteLocation");
const AddFaculty = require("./HRroutes/AddFaculty");
const UpdateFaculty = require("./HRroutes/UpdateFaculty");
const DeleteFaculty = require("./HRroutes/DeleteFaculty");
const AddDepartment = require("./HRroutes/AddDepartment");
const UpdateDepartment = require("./HRroutes/UpdateDepartment")
const DeleteDepartment = require("./HRroutes/DeleteDepartment")
const AddCourse = require("./HRroutes/AddCourse")
const DeleteCourse = require("./HRroutes/DeleteCourse");
const UpdateCourse = require("./HRroutes/UpdateCourse");

route.use("/updateSalary",updateSalary);
route.use("/viewMissingHours",viewMissingHours);
route.use("/viewAttendance",viewAttendance);
route.use("/AddMissingSignIn",AddMissingSignIn);
route.use("/AddMissingSignOut",AddMissingSignOut);
route.use("/AddLocation",AddLocation);
route.use("/UpdateLocation",UpdateLocation);
route.use("/DeleteLocation" , DeleteLocation);
route.use("/AddFaculty" , AddFaculty);
route.use("/UpdateFaculty" , UpdateFaculty);
route.use("/DeleteFaculty",DeleteFaculty);
route.use("/AddDepartment" , AddDepartment);
route.use("/UpdateDepartment" , UpdateDepartment);
route.use("/DeleteDepartment" , DeleteDepartment);
route.use("/AddCourse" , AddCourse);
route.use("/DeleteCourse",DeleteCourse);
route.use("/UpdateCourse" , UpdateCourse);
module.exports = route;