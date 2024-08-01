import { useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function AddGradeModal({ isOpen, onClose, onAddGrade }) {
  const [gradeName, setGradeName] = useState("");
  const [minMarks, setMinMarks] = useState("");
  const [maxMarks, setMaxMarks] = useState("");

  if (!isOpen) return null;

  const handleAddGrade = async () => {
    const newGrade = {
      name: gradeName,
      minMarks: parseInt(minMarks, 10),
      maxMarks: parseInt(maxMarks, 10),
    };
    const response = await fetch("/api/grades", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newGrade),
    });

    if (response.ok) {
      const addedGrade = await response.json();
      onAddGrade(addedGrade);
      setGradeName("");
      setMinMarks("");
      setMaxMarks("");
      onClose();
    } else {
      console.error("Failed to add grade");
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
          <h2 className="text-2xl font-bold mb-4">Add New Grade</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Grade Name"
              value={gradeName}
              onChange={(e) => setGradeName(e.target.value)}
              className="border p-2 rounded w-full"
            />
            <input
              type="number"
              placeholder="Min Marks"
              value={minMarks}
              onChange={(e) => setMinMarks(e.target.value)}
              className="border p-2 rounded w-full"
            />
            <input
              type="number"
              placeholder="Max Marks"
              value={maxMarks}
              onChange={(e) => setMaxMarks(e.target.value)}
              className="border p-2 rounded w-full"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleAddGrade}
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Add Grade
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
