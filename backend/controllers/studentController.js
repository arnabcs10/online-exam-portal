const asyncHandler = require('express-async-handler');
const Student = require('../models/student');
const Group = require('../models/group');

// @desc Add single student by examiner
// @route POST /api/students
// @access Private
// FIX: groupsEnrolled array is not required if we donot allow student login/profile
const addStudent = asyncHandler(
    async (req, res) => {
        try {
            const { name, email, rollNumber, classId } = req.body;
            const studentExist = await Student.findOne({email});
            const group = await Group.findById(classId);

            if(studentExist){
                if(studentExist.groupsEnrolled.find(item => item.toString() === classId.toString())){
                    res.status(400);
                    throw new Error('Student already exist in the class');
                }else{
                    
                    studentExist.groupsEnrolled.push(classId);
                    const updatedStudent = await studentExist.save();
                    
                    group.studentsEnrolled.push(updatedStudent._id);
                    group.strength = group.studentsEnrolled.length;
                    await group.save();

                    res.status(201);
                    res.json(updatedStudent);
                }
            }else{
                const student = new Student({
                    name,
                    email,
                    rollNumber,
                });
    
                student.groupsEnrolled.push(classId);
                const newStudent = await student.save();

                group.studentsEnrolled.push(newStudent._id);
                group.strength = group.studentsEnrolled.length;
                await group.save();

                res.status(201);
                res.json(newStudent);
            }

        } catch (error) {
            console.log(error.message);
            res.status(500);
            throw new Error(error.message);
        }
    }
);

// @desc all many students by examiner
// @route POST /api/students/many
// @access Private
/*
studentArray : [
    {
        name, email, rollNumber
    }
]
*/
const addManyStudents = asyncHandler(
    async (req, res) => {
        try {
            const {classId, studentArray } = req.body;
            const group = await Group.findById(classId);

            const data = await Student.insertMany(studentArray);
            // console.log(data);
            data.forEach(element => {
                group.studentsEnrolled.push(element._id);
            });

            group.strength = group.studentsEnrolled.length;
            await group.save();

            res.status(201);
            res.json(group);
        } catch (error) {
            console.log(error.message);
            res.status(500);
            throw new Error(error.message);
        }
    }
);

module.exports = {addStudent,addManyStudents};