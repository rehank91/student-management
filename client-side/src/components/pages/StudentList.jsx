// export default StudentList;
import React, { useEffect, useState } from "react";
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../../mongo/studentservice"; // Ensure the import path is correct

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: "",
    rollNumber: "",
    email: "",
    departmentname: "",
  });
  const [editStudent, setEditStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getStudents();
        setStudents(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  const handleCreateStudent = async (e) => {
    e.preventDefault();
    try {
      const createdStudent = await createStudent(newStudent);
      setStudents([...students, createdStudent]);
      setNewStudent({ name: "", rollNumber: "", email: "", departmentname: "" });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating student:", error);
    }
  };

  const handleUpdateStudent = async (id) => {
    try {
      const updatedData = { ...editStudent };
      const updatedStudent = await updateStudent(id, updatedData);
      setStudents(
        students.map((student) =>
          student._id === id ? updatedStudent : student
        )
      );
      setEditStudent(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  const handleDeleteStudent = async (id) => {
    try {
      await deleteStudent(id);
      setStudents(students.filter((student) => student._id !== id));
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const openCreateModal = () => {
    setNewStudent({ name: "", rollNumber: "", email: "", departmentname: "" });
    setIsModalOpen(true);
  };

  const openEditModal = (student) => {
    setEditStudent(student);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditStudent(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Student List
        </h2>
        <button
          onClick={openCreateModal}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 mb-6"
        >
          Create New Student
        </button>
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Roll Number
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Email
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Department
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td className="border border-gray-300 px-4 py-2">
                  {student.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {student.rollNumber}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {student.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {student.departmentId ? student.departmentId.name : "Not Assigned"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => openEditModal(student)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteStudent(student._id)}
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
                {editStudent
                  ? `Edit Student: ${editStudent.name}`
                  : "Create New Student"}
              </h3>
              <form
                onSubmit={
                  editStudent
                    ? () => handleUpdateStudent(editStudent._id)
                    : handleCreateStudent
                }
                className="space-y-4"
              >
                <input
                  type="text"
                  value={editStudent ? editStudent.name : newStudent.name}
                  onChange={(e) =>
                    editStudent
                      ? setEditStudent({ ...editStudent, name: e.target.value })
                      : setNewStudent({ ...newStudent, name: e.target.value })
                  }
                  placeholder="Name"
                  className="w-full p-2 border rounded-md"
                  required
                />
                <input
                  type="text"
                  value={editStudent ? editStudent.rollNumber : newStudent.rollNumber}
                  onChange={(e) =>
                    editStudent
                      ? setEditStudent({ ...editStudent, rollNumber: e.target.value })
                      : setNewStudent({ ...newStudent, rollNumber: e.target.value })
                  }
                  placeholder="Roll Number"
                  className="w-full p-2 border rounded-md"
                  required
                />
                <input
                  type="email"
                  value={editStudent ? editStudent.email : newStudent.email}
                  onChange={(e) =>
                    editStudent
                      ? setEditStudent({
                          ...editStudent,
                          email: e.target.value,
                        })
                      : setNewStudent({ ...newStudent, email: e.target.value })
                  }
                  placeholder="Email"
                  className="w-full p-2 border rounded-md"
                  required
                />
                <input
                  type="text"
                  value={editStudent ? editStudent.departmentname : newStudent.departmentname}
                  onChange={(e) =>
                    editStudent
                      ? setEditStudent({
                          ...editStudent,
                          departmentname: e.target.value,
                        })
                      : setNewStudent({ ...newStudent, departmentname: e.target.value })
                  }
                  placeholder="Department Name"
                  className="w-full p-2 border rounded-md"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-700"
                >
                  {editStudent ? "Save Changes" : "Create Student"}
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

export default StudentList;
