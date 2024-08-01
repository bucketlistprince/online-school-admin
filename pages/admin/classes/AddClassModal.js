import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

export default function AddClassModal({ isOpen, onClose, onAddClass }) {
  const [className, setClassName] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleAddClass = async () => {
    const newClass = { name: className, description };
    const response = await fetch('/api/classes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newClass),
    });

    if (response.ok) {
      const addedClass = await response.json();
      onAddClass(addedClass);
      setClassName('');
      setDescription('');
      onClose();
    } else {
      console.error('Failed to add class');
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
          <h2 className="text-2xl font-bold mb-4">Add New Class</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Class Name"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              className="border p-2 rounded w-full"
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-2 rounded w-full"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleAddClass}
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Add Class
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
