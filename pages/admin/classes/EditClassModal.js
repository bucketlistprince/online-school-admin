import React, { useState } from 'react';
import { FaTimes, FaTrashAlt } from 'react-icons/fa';

export default function EditClassModal({ isOpen, onClose, classData, onSave, onDelete }) {
  const [name, setName] = useState(classData ? classData.name : '');
  const [description, setDescription] = useState(classData ? classData.description : '');
  const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);

  if (!isOpen) return null;

  const handleSave = async () => {
    if (name.trim() && description.trim()) {
      try {
        const response = await fetch('/api/classes', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...classData, name, description }),
        });

        if (response.ok) {
          const updatedClass = await response.json();
          onSave(updatedClass);
          onClose();
        } else {
          console.error('Failed to update class:', response.statusText);
        }
      } catch (error) {
        console.error('Error updating class:', error);
      }
    }
  };

  const handleDelete = async () => {
    if (isDeleteConfirm) {
      try {
        const response = await fetch(`/api/classes?id=${classData.id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          onDelete(classData.id);
          onClose();
        } else {
          console.error('Failed to delete class:', response.statusText);
        }
      } catch (error) {
        console.error('Error deleting class:', error);
      }
    } else {
      setIsDeleteConfirm(true);
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
          <h2 className="text-2xl font-bold mb-4">Edit Class</h2>
          {isDeleteConfirm ? (
            <div>
              <p className="mb-4">Are you sure you want to delete this class?</p>
              <div className="flex justify-end">
                <button
                  onClick={handleDelete}
                  className="mr-2 bg-red-500 text-white p-2 rounded hover:bg-red-600"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => setIsDeleteConfirm(false)}
                  className="bg-gray-300 text-gray-700 p-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <input
                type="text"
                placeholder="Class Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-2 rounded w-full mb-4"
              />
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border p-2 rounded w-full mb-4"
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={handleSave}
                  className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsDeleteConfirm(true)}
                  className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={onClose}
                  className="bg-gray-300 text-gray-700 p-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
