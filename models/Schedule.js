const mongoose=require("mongoose");

const Schedule=mongoose.Schema({
    id:{
        type:String,
        required:true,
        minLength:[4,"Id is too short"]
    },
    day:{
        // each day is an entry in the array having: location, coursename and timing
        type:Array,
    },

})
module.exports=mongoose.model("Schedule",Schedule);
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