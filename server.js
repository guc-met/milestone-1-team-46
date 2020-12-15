const express=require("express");
const app = express();
const connParams={ useNewUrlParser: true, useUnifiedTopology: true };
const mongoose=require("mongoose");
require('dotenv').config();



//middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//DB connection
mongoose.connect(process.env.DB_URL, connParams).then(()=>{
    console.log("DB connected")
}).catch((err)=>{
    console.log(`DB Error ${err.message}`)
})


app.listen(process.env.PORT,()=>{
    console.log(`server running on ${process.env.PORT}`)
})

