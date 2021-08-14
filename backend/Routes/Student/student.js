const express = require('express');
const { check, validationResult } = require('express-validator');
const { body } = require("express-validator");
const { addStudent,getStudent ,getStudentWithId,updateStudent,deleteStudent} = require('../../Controllers/Student');
const router = express.Router();



router.post("/add-student",addStudent);
router.get("/get-student",getStudent);
router.get("/get-studentWithId/:s_id",getStudentWithId);
router.patch("/update-student/:s_id",updateStudent);
router.delete("/delete-student/:s_id",deleteStudent);

module.exports = router;