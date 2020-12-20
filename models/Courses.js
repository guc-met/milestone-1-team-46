const mongoose=require("mongoose");

const Courses=mongoose.Schema({
    coursename:{
        type:String,
        required:true,
    },
    coursecode:{
        type:String,
        required:true,
    },
    ccId:{
        type:Number,
        default:null
    },
    labs :  {
        type : Number,
        default:0
    },
    lectures :  {
        type : Number,
        default:0
    },
    tutorials :  {
        type : Number,
        default:0
    },
    totalslots :  {
        type : Number,
        default:0
    },
})
module.exports=Courses;
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

