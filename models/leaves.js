const mongoose=require("mongoose");


const Leaves=mongoose.Schema({
    id:{
        type:Number,
        required:true,
        },
    date:{
        type:Date,
        default:Date.now,
    },
    type:{
        // type of leave i.e sick,accidental 
        type:String,
        required:true,
    },
    Duration:{ 
        type:Number,
        rquired:true,
    }
})
module.exports=mongoose.model("Leaves",Leaves);
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