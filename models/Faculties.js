const mongoose=require("mongoose");

const Faculties=mongoose.Schema({
    name:{
        type:String,
        required:true,
        
    },
    departments:{
        type:String,
        required:true,
    },
    
})
module.exports=mongoose.model("Faculties",Faculties);


