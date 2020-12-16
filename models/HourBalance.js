const mongoose=require("mongoose");

const HourBalance=mongoose.Schema({
    id:{
        type:Number,
        required:true,
        unique:true
    },
    hours:{
        type:Number,
        default:0
    }
})
module.exports=mongoose.model("HourBalance",HourBalance);