const mongoose=require("mongoose");

const HourBalance=mongoose.Schema({
    id:{
        type:Number,
        required:true,
        
    },
    hours:{
        type:Number,
        default:0
    },
    month:{
        type:Number,
        required:true
    },
    
})
module.exports=mongoose.model("HourBalance",HourBalance);