// models/result.model.js
const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  marks: { type: Number, required: true },
  grade: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Result', resultSchema);
