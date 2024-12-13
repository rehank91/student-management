// models/teacher.model.js
const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
  // students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
  subjects: {
    type: [String], // Array of strings
    required: true, // Make it mandatory
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Teacher', teacherSchema);
