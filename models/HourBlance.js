const mongoose=require("mongoose");

const HourBalance=mongoose.Schema({
    id:{
        type:string,
        required:true,
        unique:true,
        minLength:[4,"Id is too short"]
        //at least we have 2 characters(ac,hr or 43 for example), a dash(-) and at least one more number
    },
    hours:{
        type:number,
        default:0
    }
})
module.exports=mongoose.model("HourBalance",HourBalance);