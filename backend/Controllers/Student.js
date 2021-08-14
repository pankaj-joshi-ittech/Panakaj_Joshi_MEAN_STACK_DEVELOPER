const Student = require("../Model/Student");  
const Subject = require("../Model/Subject");   

exports.addStudent = (request, response) => {
    try { 
        const student = new Student(request.body);
        student.save((error,data)=>{
            if(error){
                return response.status(400).json({
                    status : 'error',
                    message : error
                })
            }
        var subjectData = [];
        for (let i = 0; i < request.body.subjects.length; i++) {
            const element = request.body.subjects[i];
            subjectData.push({
                student_id: data._id,
                subject_Name: element,
                marks: request.body.marks[i]
            })
        }
             
        Subject.insertMany(subjectData,(error,subjectdata)=>{
            if(error){
                return response.status(400).json({
                    status : 'error',
                    message : error
                })
            }

            return response.json({
                status : 'success', 
                message : 'Address Updated!'
            })
        })
    })   
    } catch (error) {
        return response.status(400).json({
            status: 'error',
            message: error
        })
    }
}

exports.getStudent = (req, res) => {
    try {
        Subject.find().populate('student_id').exec((error,data)=>{
            if(error){
                return res.status(400).json({
                    status: 'error',
                    message: error
                })
            }

            return res.json({
                status : 'success',
                data :data
            })
        })

    } catch (error) {
        return res.status(400).json({
            status: 'error',
            message: error
        })
    }
}

exports.getStudentWithId = (req, res) => {
    try {
        Student.findById(req.params.s_id).populate('subjects').exec((error,data)=>{
            if(error){
                return res.status(400).json({
                    status: 'error',
                    message: error
                })
            }

            return res.json({
                status : 'success',
                data :data
            })
        })

    } catch (error) {
        return res.status(400).json({
            status: 'error',
            message: error
        })
    }
}

exports.updateStudent = (request, response) => {
    try {
        Student.findByIdAndUpdate({ _id: request.body.student_id },  { firstName: request.body.firstName,lastName: request.body.lastName,class: request.body.class },{new: true}
            ).exec((error,data)=>{
                if(error){
                    return response.status(400).json({
                        status : 'error',
                        message : error
                    })
                }
            Subject.findByIdAndUpdate({ _id: request.params.s_id },  { subject_Name: request.body.subject_Name,marks: request.body.marks },{new: true}).exec((err,upData) =>{
                if(err){
                    return response.status(400).json({
                        status : 'error',
                        message : err
                    })
                }
                return response.json({
                    status : 'success' 
                })
            })    
                
            })

    } catch (error) {
        return response.status(400).json({
            status: 'error',
            message: error
        })
    }
}

exports.deleteStudent = (request,response) => {
    try {
        Student.findByIdAndRemove(request.params.s_id).exec((error,data)=>{
            if(error){
                return response.status(400).json({
                    status : 'error',
                    message : error
                })
            } 
            Subject.deleteMany({student_id:request.params.s_id}).exec((error,data)=>{
                if(error){
                    return response.status(400).json({
                        status : 'error',
                        message : error
                    })
                }
                return response.json({
                    status : 'success' 
                })
            })
        })

        

    } catch (error) {
        return response.status(400).json({
            status: 'error',
            message: error
        })
    }
}