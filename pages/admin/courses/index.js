import React, { useState, useEffect } from 'react';
import AddCourseModal from './AddCourseModal';
import EditCourseModal from './EditCourseModal';
import Layout from 'components/Layout';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch('/api/courses');
      if (response.ok) {
        const data = await response.json();
        setCourses(data);
      }
    };

    fetchCourses();
  }, []);

  const handleAddCourse = (newCourse) => {
    setCourses([...courses, newCourse]);
  };

  const handleEditCourse = (updatedCourse) => {
    setCourses(courses.map(course => course.id === updatedCourse.id ? updatedCourse : course));
  };

  const handleDeleteCourse = (id) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  const handleRowClick = (course) => {
    setSelectedCourse(course);
    setIsEditModalOpen(true);
  };

  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen">
        <div className="bg-gray-300 flex justify-between text-black p-4 sticky top-0 z-10 mb-4">
          <h1 className="text-2xl text-gray-600 font-bold">Courses</h1>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Add Course
          </button>
        </div>

        <div className="bg-white p-4 m-4 rounded shadow border border-gray-300">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Course Name</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr 
                  key={course.id} 
                  className="hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleRowClick(course)}
                >
                  <td className="border px-4 py-2">{course.id}</td>
                  <td className="border px-4 py-2">{course.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <AddCourseModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddCourse={handleAddCourse}
        />

        {selectedCourse && (
          <EditCourseModal
            isOpen={isEditModalOpen}
            onClose={() => {
              setIsEditModalOpen(false);
              setSelectedCourse(null);
            }}
            courseData={selectedCourse}
            onSave={handleEditCourse}
            onDelete={handleDeleteCourse}
          />
        )}
      </div>
    </Layout>
  );
}
