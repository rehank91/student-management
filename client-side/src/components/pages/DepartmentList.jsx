// src/component/pages/DepartmentList.js
import React, { useEffect, useState } from "react";
import {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "../../mongo/departmentservice"; // Ensure the import path is correct

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [newDepartment, setNewDepartment] = useState({ name: "" });
  const [editDepartment, setEditDepartment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await getDepartments();
        setDepartments(data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  const handleCreateDepartment = async (e) => {
    e.preventDefault();
    try {
      const createdDepartment = await createDepartment(newDepartment);
      setDepartments([...departments, createdDepartment]);
      setNewDepartment({ name: "" });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating department:", error);
    }
  };

  const handleUpdateDepartment = async (id) => {
    try {
      const updatedData = { ...editDepartment };
      const updatedDepartment = await updateDepartment(id, updatedData);
      setDepartments(
        departments.map((dept) =>
          dept._id === id ? updatedDepartment : dept
        )
      );
      setEditDepartment(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating department:", error);
    }
  };

  const handleDeleteDepartment = async (id) => {
    try {
      await deleteDepartment(id);
      setDepartments(departments.filter((dept) => dept._id !== id));
    } catch (error) {
      console.error("Error deleting department:", error);
    }
  };

  const openCreateModal = () => {
    setNewDepartment({ name: "" });
    setIsModalOpen(true);
  };

  const openEditModal = (department) => {
    setEditDepartment(department);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditDepartment(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Department List
        </h2>
        <button
          onClick={openCreateModal}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 mb-6"
        >
          Create New Department
        </button>
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {departments.map((department) => (
              <tr key={department._id}>
                <td className="border border-gray-300 px-4 py-2">
                  {department.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => openEditModal(department)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteDepartment(department._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
              <h3 className="text-2xl font-semibold text-center text-gray-800 mb-4">
                {editDepartment
                  ? `Edit Department: ${editDepartment.name}`
                  : "Create New Department"}
              </h3>
              <form
                onSubmit={
                  editDepartment
                    ? () => handleUpdateDepartment(editDepartment._id)
                    : handleCreateDepartment
                }
                className="space-y-4"
              >
                <input
                  type="text"
                  value={editDepartment ? editDepartment.name : newDepartment.name}
                  onChange={(e) =>
                    editDepartment
                      ? setEditDepartment({ ...editDepartment, name: e.target.value })
                      : setNewDepartment({ ...newDepartment, name: e.target.value })
                  }
                  placeholder="Department Name"
                  className="w-full p-2 border rounded-md"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-700"
                >
                  {editDepartment ? "Save Changes" : "Create Department"}
                </button>
              </form>
              <button
                onClick={closeModal}
                className="w-full mt-4 bg-gray-500 text-white py-2 rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DepartmentList;


