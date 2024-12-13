const express = require('express');
const router = express.Router();

const { createSubject, getSubjects, getSubjectById, updateSubject, deleteSubject } = require('../Controller/subjectcontroller');

router.post('/create', createSubject);
router.get('/', getSubjects);
router.get('/:id', getSubjectById);
router.put('/:id', updateSubject);
router.delete('/:id', deleteSubject);

module.exports = router;