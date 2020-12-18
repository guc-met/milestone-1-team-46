const mongoose=require("mongoose");

const Request=mongoose.Schema({
    sender_id:{
        type: Number
    },
    receiver_id:{
        type: Number
    },
    type:{
        type: String,

    },
    status:{
        type: String,
        default: "Pending"
    },

    time:{
        type: Date,
        default: Date.now
    },
    /**
     * in case of slot linking the id of slot in unassignedSlots schema
     * in case of change-day-off the day to be changed to
     * in case of compensation leave it is the reason
     */
    info:{
        Type: String

    }

  
})
module.exports=mongoose.model("Request",Request);
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