const mongoose=require("mongoose");
const slots= mongoose.Schema({
    location:
    {
        type:String,
        required:true
    },
    course:{
        type:String,
        required:true
    },
    time:
    {
        type: String,
        required: true
    }
})

module.exports=slots;