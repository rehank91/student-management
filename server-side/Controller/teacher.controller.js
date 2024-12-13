// controllers/teacherController.js
const Teacher = require('../Model/teacher.model');
const Department = require('../Model/department.model')

      // Create the student
      exports.createTeacher = async (req, res) => {
        try {
          const { name, email, departmentName,subjects} = req.body;
      
          // Find department by name
          const department = await Department.findOne({ name: departmentName });
          if (!department) {
            return res.status(404).json({ error: 'Department not found' });
          }
      
          // Create the student
          const teacher = new Teacher({
            name,
            email,
            departmentId: department._id,
            subjects,
           
          });
          await teacher.save();
      
          // Add the teacher to the department's students array
          department.teachers.push(teacher._id);
          await department.save();
      
          res.status(201).json(teacher);
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
      };

exports.getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().populate('departmentId');
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id).populate('departmentId subjects');
    if (!teacher) return res.status(404).json({ message: 'Teacher not found' });
    res.json(teacher);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(teacher);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTeacher = async (req, res) => {
  try {
    await Teacher.findByIdAndDelete(req.params.id);
    res.json({ message: 'Teacher deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
