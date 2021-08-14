const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;

var student = new Schema({
    firstName:{
        type : String,
        required : true,
        maxlength : 20,
        trim : true
    },
    lastName:{
        type : String,
        required : true,
        maxlength : 50,
        trim : true
    },
    class:{
        type : String,
        required : true,
        maxlength : 50,
        trim : true
    }
},
{
    timestamps : true
});

student.virtual('subjects',{
    ref:'Subject',
    localField : '_id',
    foreignField:'student_id',
    justOne : false
})
student.set('toObject', { virtuals: true });
student.set('toJSON', { virtuals: true });
module.exports = mongoose.model('Student',student);