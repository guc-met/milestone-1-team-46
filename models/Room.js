const mongoose=require("mongoose");

const Room=mongoose.Schema({
    location:{
        type:String,
        required:true,
    },
    roomtype:{ 
        // could be lab, office, hall or tutorial room
        type:String,
        required:true,
        enum:["lab","office","hall","tutorial room"]
    },
    maxcapacity:{
        type: Number,
        required:true

    },
    currentCapacity:{
        type: Number

    },
    
    currcapacity:{
        type:Number,
    }
   
})
module.exports=mongoose.model("Room",Room);
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