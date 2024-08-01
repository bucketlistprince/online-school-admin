import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

export default function AddDetailTimetableModal({
  isOpen,
  onClose,
  onAddDetail,
}) {
  const [subjects, setSubjects] = useState([]);
  const [newDetail, setNewDetail] = useState({
    day: "",
    subject: "",
    startTime: "",
    endTime: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch("/api/subjects");
        if (response.ok) {
          const data = await response.json();
          setSubjects(data);
        } else {
          setError("Failed to load subjects");
        }
      } catch (error) {
        setError("Failed to load subjects");
      }
    };

    fetchSubjects();
  }, []);

  if (!isOpen) return null;

  const handleAddDetail = () => {
    if (
      !newDetail.day ||
      !newDetail.subject ||
      !newDetail.startTime ||
      !newDetail.endTime
    ) {
      setError("All fields are required");
      return;
    }

    onAddDetail(newDetail);
    setNewDetail({ day: "", subject: "", startTime: "", endTime: "" });
    setError(null);
    onClose();
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
          <h2 className="text-2xl font-bold mb-4">Add Timetable Detail</h2>
          {error && (
            <div className="text-red-600 mb-4">
              <strong>{error}</strong>
            </div>
          )}
          <div className="space-y-4">
            <div>
              <select
                id="day"
                value={newDetail.day}
                onChange={(e) =>
                  setNewDetail({ ...newDetail, day: e.target.value })
                }
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
              <select
                id="subject"
                value={newDetail.subject}
                onChange={(e) =>
                  setNewDetail({ ...newDetail, subject: e.target.value })
                }
                className="border p-2 rounded w-full"
              >
                <option value="">Select Subject</option>
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.name}>
                    {subject.name}
                  </option>
                ))}
              </select>
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
                  type="time"
                  value={newDetail.startTime}
                  onChange={(e) =>
                    setNewDetail({ ...newDetail, startTime: e.target.value })
                  }
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
                  type="time"
                  value={newDetail.endTime}
                  onChange={(e) =>
                    setNewDetail({ ...newDetail, endTime: e.target.value })
                  }
                  className="border p-2 rounded"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleAddDetail}
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Add
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
