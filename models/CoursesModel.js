const mongoose=require("mongoose");

const Coursesmodel=mongoose.Schema({
    coursename:{
        type:String,
        required:true,
        default:null,
        unique: true,
    },
    coursecode:{
        type:String,
        required:true,
        default:null,
        unique :true,
    },
    ccId:{
        type:Number,
        default:null
    },
    ciId:{
        type:Array, // farah added course instructor id to the model.
        default:null
    },
    labs :  {
        type : Number
    },
    lectures :  {
        type : Number
    },
    tutorials :  {
        type : Number
    },
    totalslots :  {
        type : Number
    },
})
module.exports=mongoose.model("Coursesmodel",Coursesmodel);