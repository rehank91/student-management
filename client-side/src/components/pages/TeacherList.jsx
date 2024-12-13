// src/component/pages/TeacherList.js
import React, { useEffect, useState } from "react";
import {
  getTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} from "../../mongo/teacherservice"; // Ensure the import path is correct

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [newTeacher, setNewTeacher] = useState({
    name:"", email:"", departmentName:"",subjects:""
  });
  const [editTeacher, setEditTeacher] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const data = await getTeachers();
        setTeachers(data);
        console.log(data)
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchTeachers();
  }, []);

  const handleCreateTeacher = async (e) => {
    e.preventDefault();
    try {
      const createdTeacher = await createTeacher(newTeacher);
      setTeachers([...teachers, createdTeacher]);
      setNewTeacher({ name: "", subject: "", email: "" });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating teacher:", error);
    }
  };

  const handleUpdateTeacher = async (id) => {
    try {
      const updatedData = { ...editTeacher };
      const updatedTeacher = await updateTeacher(id, updatedData);
      setTeachers(
        teachers.map((teacher) =>
          teacher._id === id ? updatedTeacher : teacher
        )
      );
      setEditTeacher(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating teacher:", error);
    }
  };

  const handleDeleteTeacher = async (id) => {
    try {
      await deleteTeacher(id);
      setTeachers(teachers.filter((teacher) => teacher._id !== id));
    } catch (error) {
      console.error("Error deleting teacher:", error);
    }
  };

  const openCreateModal = () => {
    setNewTeacher({ name: "", subject: "", email: "" });
    setIsModalOpen(true);
  };

  const openEditModal = (teacher) => {
    setEditTeacher(teacher);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditTeacher(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Teacher List
        </h2>
        <button
          onClick={openCreateModal}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 mb-6"
        >
          Add New Teacher
        </button>
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Subject</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher._id}>
                <td className="border border-gray-300 px-4 py-2">{teacher.name}</td>
                <td className="border border-gray-300 px-4 py-2">{teacher.subjects[0]}</td>
                <td className="border border-gray-300 px-4 py-2">{teacher.email}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => openEditModal(teacher)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTeacher(teacher._id)}
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
                {editTeacher
                  ? `Edit Teacher: ${editTeacher.name}`
                  : "Add New Teacher"}
              </h3>
              <form
                onSubmit={
                  editTeacher
                    ? () => handleUpdateTeacher(editTeacher._id)
                    : handleCreateTeacher
                }
                className="space-y-4"
              >
                <input
                  type="text"
                  value={editTeacher ? editTeacher.name : newTeacher.name}
                  onChange={(e) =>
                    editTeacher
                      ? setEditTeacher({ ...editTeacher, name: e.target.value })
                      : setNewTeacher({ ...newTeacher, name: e.target.value })
                  }
                  placeholder="Name"
                  className="w-full p-2 border rounded-md"
                  required
                />
                <input
                  type="text"
                  value={editTeacher ? editTeacher.subject : newTeacher.subject}
                  onChange={(e) =>
                    editTeacher
                      ? setEditTeacher({ ...editTeacher, subject: e.target.value })
                      : setNewTeacher({ ...newTeacher, subject: e.target.value })
                  }
                  placeholder="Subject"
                  className="w-full p-2 border rounded-md"
                  required
                />
                <input
                  type="email"
                  value={editTeacher ? editTeacher.email : newTeacher.email}
                  onChange={(e) =>
                    editTeacher
                      ? setEditTeacher({ ...editTeacher, email: e.target.value })
                      : setNewTeacher({ ...newTeacher, email: e.target.value })
                  }
                  placeholder="Email"
                  className="w-full p-2 border rounded-md"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-700"
                >
                  {editTeacher ? "Save Changes" : "Add Teacher"}
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

export default TeacherList;
