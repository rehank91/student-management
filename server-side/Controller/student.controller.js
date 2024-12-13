// controllers/studentController.js
const Student = require('../Model/student.model');
const Department = require("../Model/department.model")
const Subject = require('../Model/subject.model')

// exports.createStudent = async (req, res) => {
//     try { 
//       const { name, rollNumber, email, departmentName,subjectNames} = req.body;
  
//       // Find department by name
//       const department = await Department.findOne({ name: departmentName });
//       if (!department) {
//         return res.status(404).json({ error: 'Department not found' });
//       }
//        // Find subjects by their names
//       const subjects = await Subject.find({ name: { $in: subjectNames } });
//       if (subjects.length !== subjectNames.length) {
//         return res.status(404).json({ error: 'One or more subjects not found' });
//       }

//       // Extract subject IDs from the found subjects
//       const subjectIds = subjects.map(subject => subject._id);
  
//       // Create the student
//       const student = new Student({
//         name,
//         rollNumber,
//         email,
//         departmentId: department._id,
//         subjectIds,
       
//       });
//       await student.save();
  
//       // Add the student to the department's students array
//       department.students.push(student._id);
//       await department.save();

//        // Add the student to each subject's students array
//       for (const subject of subjects) {
//         subject.students.push(student._id);
//         await subject.save();
//       }
  
//       res.status(201).json(student);
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   };
exports.createStudent = async (req, res) => {
  try {
    const { name, rollNumber, email, departmentname } = req.body;

    // Validate request body
    if (!name || !rollNumber || !email || !departmentname) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // if (!Array.isArray(subjectNames) || subjectNames.length === 0) {
    //   return res.status(400).json({ error: "'subjectNames' must be a non-empty array" });
    // }

    // Find department by name
    const department = await Department.findOne({ name: departmentname });
    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }

    // Find subjects by their names
    // const subjects = await Subject.find({ name: { $in: subjectNames } });
    // if (subjects.length !== subjectNames.length) {
    //   return res.status(404).json({ error: 'One or more subjects not found' });
    // }

    // Extract subject IDs
    // const subjectIds = subjects.map(subject => subject._id);

    // Create the student
    const student = new Student({
      name,
      rollNumber,
      email,
      departmentId: department._id,
      // subjects: subjectIds, // Correctly set subjects array
    });
    await student.save();

    // Add the student to the department's students array
    department.students.push(student._id);
    await department.save();

    // Add the student to each subject's students array
    // for (const subject of subjects) {
    //   subject.students.push(student._id);
    //   await subject.save();
    // }

    // Return the created student with populated data
    const createdStudent = await Student.findById(student._id)
      .populate('departmentId', 'name') // Populate department name
      // .populate('subjects', 'name'); // Populate subject names

    res.status(201).json(createdStudent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find().populate('departmentId');
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate('departmentId');
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
