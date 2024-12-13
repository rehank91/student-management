// models/student.model.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNumber: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
  feesId: { type: mongoose.Schema.Types.ObjectId, ref: 'Fees' },
  subjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject', // Reference to Subject model
    },
  ],
  results: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Result' }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Student', studentSchema);
