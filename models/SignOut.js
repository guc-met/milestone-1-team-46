const mongoose=require("mongoose");

const SignOut=mongoose.Schema({
    id:{
        type:String,
        required:true,
        minLength:[4,"Id is too short"]
        //at least we have 2 characters(ac,hr or 43 for example), a dash(-) and at least one more number
    },
    time:{
        type:Date,
        default:Date.now,
    },
    HR_id:{
        //id of the HR who added this entry if any
        type:String,
        default:null
    }
})
module.exports=mongoose.model("SignOut",SignOut);
/*
below is how to update any date type in the database 

const Assignment = mongoose.model('Assignment', { dueDate: Date });
Assignment.findOne(function (err, doc) {
  doc.dueDate.setMonth(3);
  doc.save(callback); // THIS DOES NOT SAVE YOUR CHANGE

  doc.markModified('dueDate');
  doc.save(callback); // works
})
*/

