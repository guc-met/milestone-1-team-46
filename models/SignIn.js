const mongoose=require("mongoose");

const SignIn=mongoose.Schema({
    id:{
        type:string,
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
        type:string,
        default:null
    }
})
module.exports=mongoose.model("SignIn",SignIn);
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

