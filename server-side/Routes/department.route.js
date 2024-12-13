const express = require('express');
const router = express.Router();


const { createDepartment, getDepartments, getDepartmentById, updateDepartment, deleteDepartment } = require('../Controller/departmentcontroller');



// Create a new Department
router.post('/create', createDepartment);

// Retrieve all Departments
router.get('/', getDepartments);

// Retrieve a single Department with id
router.get('/:id', getDepartmentById);

// Update a Department with id
router.put('/:id', updateDepartment);

// Delete a Department with id
router.delete('/:id', deleteDepartment);

module.exports = router;