const express = require("express");
const app = express();
const connParams = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,useFindAndModify:false };
const mongoose = require("mongoose");
require('dotenv').config();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSignature = process.env.SIGNATURE;
const login = require("./routes/login");
const signin=require("./routes/signin");
const signout=require("./routes/signout");
const viewProfile=require("./routes/viewProfile");
const updateprofile=require("./routes/updateprofile");
const courseInstructor=require("./routes/courseInstructor");
const courseCoordinator=require("./routes/courseCoordinator");
const resetPassword = require('./routes/resetpw');
const viewAtt = require("./routes/viewattendance");
const academic=require("./routes/academic");

const viewdayoff=require("./routes/HOD/viewdayoff");
const viewrequests=require("./routes/HOD/viewrequests");
const Requests = require("./models/Requests");
const viewcoverage = require("./routes/HOD/viewcoverage");
const viewta = require("./routes/HOD/viewta");
const viewcourse = require("./routes/courseInstructorRoutes/viewcourse");
const CoursesModel = require("./models/CoursesModel");
const viewslots = require("./routes/courseInstructorRoutes/viewslots");

const missingDays = require("./routes/viewmissingdays");
const missingHours = require("./routes/viewmissinghours");
const HR=require("./routes/HR");
const HOD=require("./routes/HOD");



                                                                                    
//authentication
const auth = (req, res, next) => {
    try {
       const token = req.header("auth-token");
        if (!token) {
            return res.status(401).json({ msg: "unauthorized etla3 bara" })
        }
        const verified = jwt.verify(token, jwtSignature);
        if (!verified) {
            return res.status(401).json({ msg: "unauthorized ya hacker" })
        }
        req.id = verified.id;
        next();
    }
    catch (err) {
        return res.status(500).json({ error: err.message })
    }

}

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//taking the login route before applying authentication
app.use("/", login);

//middleware of auth
app.use(auth);
app.use("/HR",HR);
app.use("/HOD",HOD);


//routes
app.use("/signin",signin);
app.use("/signout",signout);
app.use("/viewprofile",viewProfile);
app.use("/updateprofile",updateprofile);
app.use("/ci",courseInstructor);
app.use("/cc",courseCoordinator);
app.use("/resetpw" , resetPassword);
app.use("/viewatt" , viewAtt);
app.use("/ac",academic);

app.use("/viewdayoff",viewdayoff);
app.use("/viewrequests",viewrequests);
app.use("/viewcoverage",viewcoverage);
app.use("/viewta",viewta);
app.use("/viewcourse",viewcourse);
app.use("/viewslots",viewslots);

app.use("/viewmissdays" , missingDays);
app.use("/viewmisshours" , missingHours);




//DB connection
mongoose.connect(process.env.DB_URL, connParams).then(() => {
    console.log("DB connected");
    //  testSchemas();
    // testSchemas();

}).catch((err) => {
    console.log(`DB Error ${err.message}`)
})


app.listen(process.env.PORT, () => {
    console.log(`server running on ${process.env.PORT}`)
})



async function testSchemas() {
    const courses = require('./models/Coursesmodel.js');
   /* staffMember.counterReset('seq', function (err) {
        // Now the counter is 0
    });
    staffMember.counterReset('id', function (err) {
        // Now the counter is 0
    });*/
    // const c1 = new courses({
    //     coursename: "maths1",
    //     coursecode: "maths101",
    //     ccid:5

    // });

 
    // });
    //await s7.save();
    const s8 = new CoursesModel({
        coursename:"acl",
        coursecode: "123",
        
 
    });
    //await s8.save();
//   const r10= new Requests({
//     sender_id : "6",
//     reciever_id: "1",
//     type: "change dayoff/leave",
//     status: "testing"
//   })
//   const r20= new Requests({
//     sender_id : "2",
//     reciever_id: "1",
//     type: "change dayoff/leave",
//     status: "testing"
//   })
//   const r30= new Requests({
//     sender_id : "7",
//     reciever_id: "3",
//     type: "change dayoff/leave",
//     status: "testing"
//   })
//   const r40= new Requests({
//     sender_id : "2",
//     reciever_id: "1",
//     type: "change dayoff/leave",
//     status: "testing"
//   })

//   await r40.save();
  //await r20.save();
  //await r30.save();
   //await s6.save();
    /*const s2 = new staffMember({
        name : "7amada",
        gender: "Male",
        email: "muhasamir@hotmail.com",
        office: "C701",
        daysOff: ["Tuesday , Sunday"],
        annualLeaveBalance: 5,
        hr : false
    });
    const s3 = new staffMember({
        name : "Reem",
        gender: "Male",
        email: "muhadsamir@htmail.com",
        office: "C701",
        daysOff: ["Tuesday , Sunday"],
        annualLeaveBalance: 5,
        hr : true
    });
    const s4 = new staffMember({
        name : "farah",
        gender: "Male",
        email: "muhadamir@hotmail.com",
        office: "C701",
        daysOff: ["Tuesday , Sunday"],
        annualLeaveBalance: 5,
        hr : false
    });*/

     await c1.save();
    /*s1.setNext('seq', function(err, user){
        s1.no; // the counter value
    });*/
    // await s2.save();
    /*s2.setNext('seq', function(err, user){
       s2.no; // the counter value
   });*/
    // await s3.save();
    /*s3.setNext('seq', function(err, user){
        s3.no; // the counter value
    }); */
    // await s4.save();
    /*s4.setNext('seq', function(err, user){
        s4.no; // the counter value
    });*/

   

}

