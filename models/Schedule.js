const mongoose=require("mongoose");
const slots= mongoose.Schema({
    location:
    {
        type:String,
        required:true
    },
    course:{
        type:String,
        required:true
    },
    time:
    {
        type: String,
        required: true
    }
})
const Schedule=mongoose.Schema({
    id:{
        type:Number,
        required:true,
    },
    Saturday:[slots],
    Sunday:[slots],
    Monday:[slots],
    Tuesday:[slots],
    Wednesday:[slots],
    Thursday:[slots]

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