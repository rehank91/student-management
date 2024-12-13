// models/subject.model.js
const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  name: [{ type: String, required: true }],
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Subject", subjectSchema);
