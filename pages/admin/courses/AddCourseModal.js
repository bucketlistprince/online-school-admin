import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

export default function AddCourseModal({ isOpen, onClose, onAddCourse }) {
  const [courseName, setCourseName] = useState('');

  if (!isOpen) return null;

  const handleAddCourse = async () => {
    const newCourse = { name: courseName };
    const response = await fetch('/api/courses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCourse),
    });

    if (response.ok) {
      const addedCourse = await response.json();
      onAddCourse(addedCourse);
      setCourseName('');
      onClose();
    } else {
      console.error('Failed to add course');
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50" onClick={onClose}></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          >
            <FaTimes size={24} />
          </button>
          <h2 className="text-2xl font-bold mb-4">Add New Course</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Course Name"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              className="border p-2 rounded w-full"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleAddCourse}
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Add Course
              </button>
              <button
                onClick={onClose}
                className="bg-gray-300 text-gray-700 p-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
