const express = require('express');
const router = express.Router();

const { createStudent, getStudents, getStudentById, updateStudent, deleteStudent } = require('../Controller/student.controller');

router.post('/create', createStudent);
router.get('/', getStudents);
router.get('/:id', getStudentById);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);

module.exports = router;