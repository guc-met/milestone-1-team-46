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
    day:
    {
        type: String,
        enum:[
            "Saturday",
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday"
        ]
    },
    time:
    {
        type: String,
        required: true
    }
})

module.exports=slots;