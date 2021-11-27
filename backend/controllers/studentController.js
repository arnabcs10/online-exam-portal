const asyncHandler = require('express-async-handler');
const Student = require('../models/student');
const Group = require('../models/group');

// @desc Add single student by examiner
// @route POST /api/students
// @access Private
// NOTE: groupsEnrolled array is not required if we donot allow student login/profile
const addStudent = asyncHandler(
    async (req, res) => {
        try {
            const { name, email, rollNumber, classId } = req.body;
            const studentExist = await Student.findOne({email});
            const group = await Group.findById(classId).populate('studentsEnrolled','name email');
            // res.json(group);
            if(studentExist){
                if(group.studentsEnrolled.find(item => item._id.toString() === studentExist._id.toString())){
                    res.status(400);
                    throw new Error('Student already exist in the class');
                }else{
                    
                    // studentExist.groupsEnrolled.push(classId);
                    // const updatedStudent = await studentExist.save();
                    
                    group.studentsEnrolled.push(studentExist._id);
                    group.strength = group.studentsEnrolled.length;
                    await group.save();

                    res.status(201);
                    res.json(studentExist);
                }
            }else{
                const student = new Student({
                    name,
                    email,
                    rollNumber,
                });
    
                // student.groupsEnrolled.push(classId);
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
// FIX: Not sure what to send back to client
const addManyStudents = asyncHandler(
    async (req, res) => {
        try {
            const {classId, studentArray } = req.body;
            const group = await Group.findById(classId).populate('studentsEnrolled','name email');

            const studentsNotInGroup = studentArray.filter((stu) => 
                group.studentsEnrolled.find(item => item.email === stu.email) === undefined                    
            )

            if(studentsNotInGroup.length === 0)
            {
                res.status(400);
                throw new Error('Students already exist in the class');
            }else{
                const allStudents = await Student.find({});
                const studentsNotInSystem = [];
                const studentsInSystem = [];

                studentsNotInGroup.forEach(stu => {
                    const st = allStudents.find(item => item.email === stu.email);
                    if(st === undefined){
                        studentsNotInSystem.push(stu);
                        // stu does not contains _id
                    }else{
                        studentsInSystem.push(st);
                        //st contains _id
                    }
                });
                const newlyInserted = await Student.insertMany(studentsNotInSystem);
                newlyInserted.forEach(element => {
                    group.studentsEnrolled.push(element._id);
                });
                studentsInSystem.forEach(element => {
                    group.studentsEnrolled.push(element._id);
                });

                group.strength = group.studentsEnrolled.length;
                await group.save();
                console.log(group);
                res.status(201);
                res.json(group);
            }
           
        } catch (error) {
            console.log(error.message);
            res.status(500);
            throw new Error(error.message);
        }
    }
);

module.exports = {addStudent,addManyStudents};