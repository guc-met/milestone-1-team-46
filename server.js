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
const resetPassword = require('./routes/resetpw');
const viewAtt = require("./routes/viewattendance");
const academic=require("./routes/academic");


                                                                                  
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
app.use(auth);


//routes
app.use("/signin",signin);
app.use("/signout",signout);
app.use("/viewprofile",viewProfile);
app.use("/updateprofile",updateprofile);
app.use("/ci",courseInstructor);
app.use("/resetpw" , resetPassword);
app.use("/viewatt" , viewAtt);
app.use("/ac",academic);


//DB connection
mongoose.connect(process.env.DB_URL, connParams).then(() => {
    console.log("DB connected");
  //  testSchemas();

}).catch((err) => {
    console.log(`DB Error ${err.message}`)
})


app.listen(process.env.PORT, () => {
    console.log(`server running on ${process.env.PORT}`)
})



async function testSchemas() {
    const staffMember = require('./models/staffMember.js');
    const Schedule=require("./models/Schedule"); 
    const TeachingSlots=require("./models/TeachingSlots");
    const t=new TeachingSlots({
        slot:
        {
            location:"c7.109",
            course:"csen603",
            time:"10:00"
        },
        ccId:10,

    })
   await t.save();

    const s=new Schedule({
        id:5,
        Saturday:[{
            location:"3am s3d",
            course:"acl",
            time:"nowwww"
        },
        {
            location:"3am s3d",
            course:"acl",
            time:"nowwww"
        }
    ],
        Sunday:[{
            location:"3am s3d",
            course:"acl",
            time:"nowwww"
        }]
    })
   /* staffMember.counterReset('seq', function (err) {
        // Now the counter is 0
    });
    staffMember.counterReset('id', function (err) {
        // Now the counter is 0
    });*/
   /* const s1 = new staffMember({
        name: "slim",
        gender: "Male",
        email: "ci@hotmail.com",
        office: "C701",
        daysOff: ["Sunday"],
        annualLeaveBalance: 5,
        hr: false,
        ci:true,
        faculty:"engineering",
        department:"MET"
    });*/
    const s2 = new staffMember({
        name: "ashry",
        gender: "Male",
        email: "metstaff@hotmail.com",
        office: "C701",
        daysOff: ["Sunday"],
        annualLeaveBalance: 5,
        hr: false,
        ci:false,
        faculty:"engineering",
        department:"MET",
        courses:["acl","db"]
    });
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




   // await s1.save();
   //await s2.save();
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
