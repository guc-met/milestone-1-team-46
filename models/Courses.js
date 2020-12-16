const mongoose=require("mongoose");

const Courses=mongoose.Schema({
    id:{
        type:Number,
        required:true,
        unique:true,
        fixed:true,
        minLength:[4,"Id is too short"]
    },
    coursename:{
        type:String,
        required:true,
        default:null,
        unique: true,
    },
    coursecode:{
        type:String,
        required:true,
        default:null,
        unique :true,
    },
    labs :  {
        type : Array
    },
    lectures :  {
        type : Array
    },
    tutorials :  {
        type : Array
    },
    totalslots :  {
        type : Array
    },
})
module.exports=mongoose.model("Courses",Courses);
/*
below is how to update any DATE type in the database 

const Assignment = mongoose.model('Assignment', { dueDate: Date });
Assignment.findOne(function (err, doc) {
  doc.dueDate.setMonth(3);
  doc.save(callback); // THIS DOES NOT SAVE YOUR CHANGE

  doc.markModified('dueDate');
  doc.save(callback); // works
})
*/

