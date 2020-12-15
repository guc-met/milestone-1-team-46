const express = require("express");
const app = express();
const connParams={ useNewUrlParser: true, useUnifiedTopology: true };
const mongoose = require("mongoose");
require('dotenv').config();


//middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));


//DB connection
mongoose.connect(process.env.DB_URL, connParams).then(()=>{
    console.log("DB connected");
}).catch((err)=>{
    console.log(`DB Error ${err.message}`)
})


app.listen(process.env.PORT,()=>{
    console.log(`server running on ${process.env.PORT}`)
})

async function  testSchemas() {
    const staffMember = require('./models/staffMember.js');
    const s1 = new staffMember({
        children:[{faculty : "engineering", id:0}],
        name : "Muhad",
        gender: "Male",
        email: "muhadsamir@hotmail.com",
        office: "C701",
        daysOff: ["Tuesday , Sunday"],
        annualLeaveBalance: 5
    });
    s1.children[0].id = 2;
    
  
    await s1.save();
}