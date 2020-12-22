const mongoose=require("mongoose");
const slots= require("./Slots");
const TeachingSlots= mongoose.Schema({
   slot:{
       type:slots,
       required:true
   },
    ccId:{
        type:Number,
        required:true
    },
    assigneeid:{
        type:Number,
        default:null
    },
    coursename:{
        type:String,
        
    }
})
module.exports=mongoose.model("TeachingSlots",TeachingSlots);