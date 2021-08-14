const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;

var subject = new Schema({
    student_id:{
        type: ObjectId,
        ref : 'Student'
    },
    subject_Name:{
        type : String,
        required : true,
        maxlength : 20,
        trim : true
    },
    marks:{
        type : Number,
        required : true,
        maxlength : 20,
        trim : true 
    }
},
{
    timestamps : true
});

module.exports = mongoose.model('Subject',subject);