// src/services/TeacherService.js
import axios from "axios";

const API_URL = "http://localhost:4000/api/teacher"; // Change this based on your backend URL

// Fetch all teachers
export const getTeachers = async () => {
  const response = await axios.get(`${API_URL}/`);
  return response.data;
};

// Fetch a single teacher by ID
export const getTeacherById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Create a new teacher
export const createTeacher = async (teacherData) => {
  const response = await axios.post(`${API_URL}/create`, teacherData);
  return response.data;
};

// Update a teacher
export const updateTeacher = async (id, teacherData) => {
  const response = await axios.put(`${API_URL}/${id}`, teacherData);
  return response.data;
};

// Delete a teacher
export const deleteTeacher = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
