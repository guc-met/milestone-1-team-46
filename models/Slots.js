const mongoose=require("mongoose");
const slots= mongoose.Schema({
    location:
    {
        type:String,
        required:true
    },
    type:{
        type:String,
        enum:["lab","lecture","tutorial"]
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