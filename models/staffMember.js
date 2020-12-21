const mongoose = require('mongoose');
const schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);
const bcryptjs=require("bcryptjs");
// const academicSchema = require("./academicMember.js");

//salting and hashing
const salt=bcryptjs.genSaltSync();
const hashedPassword=bcryptjs.hashSync("123456",salt);

const staffSchema = new schema({
  
    id:{
        type:Number
    },
    
    no : {
        type : Number,
        unique : false
    },

    name :{
        type: String
    },

    gender : {
        type:String,
        enum:["Female","Male"]
    },

    email : {
        type:String, 
        required : true , 
        unique: true
     },

    password: {
        type:String , 
        required : true , 
        default:hashedPassword,
        minLength:[6,"Password is short , 6 chars is the minimum"]
    },

    office : {
        type : String
    },
    hr: {
        type : Boolean,
        required : true
    },
    hod: {
        type : Boolean,
        default : false
    },
    ac: {
        type : Boolean,
        default : false
    },
    cc: {
        type : Boolean,
        default : false
    },
    ci: {
        type : Boolean,
        default : false
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
        default : null
        
    },

    department : {
        type : String,
        default : null
        
    },
    courses : {
        type : Array,
       // default : null
        
    },
    salary: {
        type: Number,
        
        

    }

});
//should auto increment using mongoose-sequence module
staffSchema.plugin(AutoIncrement,  {id: 'seq', inc_field: 'no', reference_fields: 'hr' , unique:false });
staffSchema.plugin(AutoIncrement, {inc_field: 'id'});

module.exports = mongoose.model('staffMember' , staffSchema);