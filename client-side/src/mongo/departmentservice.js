// src/services/DepartmentService.js
import axios from "axios";

const API_URL = "http://localhost:4000/api/department"; // Change this based on your backend URL

// Fetch all departments
export const getDepartments = async () => {
  const response = await axios.get(`${API_URL}/`);
  return response.data;
};

// Fetch a single department by ID
export const getDepartmentById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Create a new department
export const createDepartment = async (departmentData) => {
  const response = await axios.post(`${API_URL}/create`, departmentData);
  return response.data;
};

// Update a department
export const updateDepartment = async (id, departmentData) => {
  const response = await axios.put(`${API_URL}/${id}`, departmentData);
  return response.data;
};

// Delete a department
export const deleteDepartment = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

