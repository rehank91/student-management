// src/services/StudentService.js
import axios from "axios";

const API_URL = "http://localhost:4000/api/student"; // Change this based on your backend URL

// Fetch all students
export const getStudents = async () => {
  const response = await axios.get(`${API_URL}/`);
  return response.data;
};

// Fetch a single student by ID
export const getStudentById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Create a new student
export const createStudent = async (studentData) => {
  const response = await axios.post(`${API_URL}/create`, studentData);
  return response.data;
};

// Update a student
export const updateStudent = async (id, studentData) => {
  const response = await axios.put(`${API_URL}/${id}`, studentData);
  return response.data;
};

// Delete a student
export const deleteStudent = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
