import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "components/Layout";
import AddTimetableModal from "./AddTimetableModal";
import { FaTrash } from "react-icons/fa"; // Import delete icon

export default function Timetables() {
  const [timetables, setTimetables] = useState([]);
  const [newTimetable, setNewTimetable] = useState("");
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchTimetables() {
      const response = await fetch("/api/timetable");
      if (response.ok) {
        const data = await response.json();
        setTimetables(data);
      } else {
        setError("Failed to fetch timetables");
      }
    }
    fetchTimetables();
  }, []);

  const handleAddTimetable = async () => {
    if (!newTimetable) {
      setError("Timetable name cannot be empty");
      return;
    }

    const newTimetableData = { name: newTimetable };

    const response = await fetch("/api/timetable", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTimetableData),
    });

    if (response.ok) {
      const addedTimetable = await response.json();
      setTimetables([...timetables, addedTimetable]);
      setNewTimetable("");
      setError(null);
      setIsModalOpen(false);
    } else {
      setError("Failed to add timetable");
    }
  };

  const handleTimetableClick = (id) => {
    router.push(`/admin/timetable/${id}`);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    const response = await fetch(`/api/timetable/${deleteId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setTimetables(timetables.filter(t => t.id !== deleteId));
      setDeleteId(null);
      setIsConfirmOpen(false);
      setError(null);
    } else {
      setError("Failed to delete timetable");
    }
  };

  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen">
        <div className="bg-gray-300 text-black p-4 sticky top-0 z-10 mb-4 flex justify-between">
          <h1 className="text-2xl text-gray-600 font-bold">Manage Timetables</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Add Timetable
          </button>
        </div>
        <div className="bg-white p-4 m-4 rounded shadow border border-gray-300">
          {error && (
            <div className="text-red-600 mb-4">
              <strong>{error}</strong>
            </div>
          )}
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Timetable Name</th>
                 {/* Add Actions column */}
              </tr>
            </thead>
            <tbody>
              {timetables.map((timetable) => (
                <tr
                  key={timetable.id}
                  onClick={() => handleTimetableClick(timetable.id)}
                  className="cursor-pointer hover:bg-gray-100"
                >
                  <td className="border px-4 py-2">{timetable.id}</td>
                  <td className="border px-4 py-2">{timetable.name}</td>
                  <td className="border text-center"> {/* Actions column */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent row click event
                        handleDeleteClick(timetable.id);
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <AddTimetableModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddTimetable={handleAddTimetable}
        />
        {isConfirmOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm relative">
              <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
              <p>Are you sure you want to delete this timetable?</p>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  onClick={handleConfirmDelete}
                  className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => setIsConfirmOpen(false)}
                  className="bg-gray-300 text-gray-700 p-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
