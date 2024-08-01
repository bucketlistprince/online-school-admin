import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

export default function EditDetailTimetableModal({ isOpen, onClose, detail, onSave, onDelete }) {
  const [editedDetail, setEditedDetail] = useState(detail);
  const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedDetail({ ...editedDetail, [name]: value });
  };

  const handleSave = () => {
    if (
      !editedDetail.day ||
      !editedDetail.subject ||
      !editedDetail.startTime ||
      !editedDetail.endTime
    ) {
      setError("All fields are required");
      return;
    }

    onSave(editedDetail);
    setError(null);
    onClose();
  };

  const handleDelete = async () => {
    if (isDeleteConfirm) {
      try {
        const response = await fetch(`/api/timetable/${detail.id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          onDelete(detail.id);
          onClose();
        } else {
          console.error('Failed to delete detail:', response.statusText);
        }
      } catch (error) {
        console.error('Error deleting detail:', error);
      }
    } else {
      setIsDeleteConfirm(true);
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50"
        onClick={onClose}
      ></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          >
            <FaTimes size={24} />
          </button>
          <h2 className="text-2xl font-bold mb-4">Edit Timetable Detail</h2>
          {error && (
            <div className="text-red-600 mb-4">
              <strong>{error}</strong>
            </div>
          )}
          {isDeleteConfirm ? (
            <div>
              <p className="mb-4">Are you sure you want to delete this detail?</p>
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
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="day"
                  className="block text-gray-700 font-semibold mb-1"
                >
                  Day
                </label>
                <select
                  id="day"
                  name="day"
                  value={editedDetail.day}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                >
                  <option value="">Select Day</option>
                  {[
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ].map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-gray-700 font-semibold mb-1"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={editedDetail.subject}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                />
              </div>

              <div className="flex space-x-4">
                <div>
                  <label
                    htmlFor="startTime"
                    className="block text-gray-700 font-semibold mb-1"
                  >
                    Start Time
                  </label>
                  <input
                    id="startTime"
                    name="startTime"
                    type="time"
                    value={editedDetail.startTime}
                    onChange={handleChange}
                    className="border p-2 rounded"
                  />
                </div>
                <div>
                  <label
                    htmlFor="endTime"
                    className="block text-gray-700 font-semibold mb-1"
                  >
                    End Time
                  </label>
                  <input
                    id="endTime"
                    name="endTime"
                    type="time"
                    value={editedDetail.endTime}
                    onChange={handleChange}
                    className="border p-2 rounded"
                  />
                </div>
              </div>

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
