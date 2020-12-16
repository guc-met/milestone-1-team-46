const mongoose=require("mongoose");
const Courses=require("./Courses");
const Departments=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    
    HOD:{
        type:String,
        required:true,
    },
    courses: [Courses]
    
})

const Faculties=mongoose.Schema({
    name:{
        type:String,
        required:true,
        
    },
    departments:[Departments]
    
})
module.exports=mongoose.model("Faculties",Faculties);


