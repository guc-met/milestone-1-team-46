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
        enum:["slot linking","replacement","compensation leave", "annual leave","maternity leave","sick leave", "accidental leave", "change-day-off"]

    },
    status:{
        type: String,
        default: "Pending",
        enum:["Pending","Accepted","Rejected"]
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
     * in case of replacement the date of the day
     */
    info:{
        type: String

    },
    //in case of leave requests , the day of leave
    day:{
        type:Date
    },
    /**
     * in case of replacement requests --> the id of the replacement academic
     */
    replacementId:{
        type:Number
    },
    /**
     * in case of replacement request--> whether the replacement academic accepted the request or not
     */
    replacementAcceptance:{
        type: Boolean,
        default: false
    },
    /**
     * in case of sick leave and maternity leave--> proper documents provided
     */
    document:{
        type: String
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