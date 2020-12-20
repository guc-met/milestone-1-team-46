const mongoose=require("mongoose");

const Request=mongoose.Schema({
    sender_id:{
        type: Number,
        enum:["Pending","Accepted","Rejected"]
    },
    receiver_id:{
        type: Number
    },
    type:{
        type: String,
        enum:["slot linking","replacement","compensation leave", "annual leave","maternity leave","sick leave", "accidental leave", "change-day-off"]

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
     * in case of any other type of leave it is the number of days
     */
    info:{
        type: String

    },
    //in case of leave requests , the day of leave
    day:{
        type:Date
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