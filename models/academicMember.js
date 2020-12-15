const mongoose = require('mongoose');
const schema = mongoose.Schema;
const academicSchema = new schema({
    id : {
        type: Number, 
        unique:true, 
        required: true , 
        fixed:true
    },

    faculty : {
        type: String
    },

    department : {
        type:String
    },
    
    

});

module.exports = mongoose.model('academicMember' , academicSchema);