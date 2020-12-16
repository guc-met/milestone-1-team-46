const mongoose = require('mongoose');
const schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);
// const academicSchema = require("./academicMember.js");

const staffSchema = new schema({
  
    name :{
        type: String
    },

    gender : {
        type:String
    },

    email : {
        type:String, 
        required : true , 
        unique: true
     },

    password: {
        type:String , 
        required : true , 
        default:123456,
        minLength:[6,"Password is short , 6 chars is the minimum"]
    },

    office : {
        type : String
    },

    privilege : {
        type :Array , 
        default : [false , false , false, false , false]
    },

    daysOff :  {
        type : Array
    },

    annualLeaveBalance : {
        type : Number
    },

    accidentLeaveBalance :  {
        type : Number
    },
    faculty : {
        type : String,
        default : null,
        
    },

    department : {
        type : String,
        default : null
        
    }

});
//should auto increment using mongoose-sequence module
staffSchema.plugin(AutoIncrement, {inc_field: 'id'});
//I still dont know how to force other constraints on id
module.exports = mongoose.model('staffMember' , staffSchema);