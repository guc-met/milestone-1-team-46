const mongoose=require("mongoose");

const Departments=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    courses:{
        type:Array,
        required:true,
    },
    HOD:{
        type:String,
        required:true,
    }
    
})

const Faculties=mongoose.Schema({
    name:{
        type:String,
        required:true,
        
    },
    departments:[Departments]
    
})
module.exports=mongoose.model("Faculties",Faculties);


