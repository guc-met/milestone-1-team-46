const mongoose=require("mongoose");

const BadToken=mongoose.Schema({
    token:{
        type:String,
        required:true,
        
    },
    //when it became invalid
    date:{
        type:Date,
        default:Date.now
    }
    
})
module.exports=mongoose.model("BadToken",BadToken);