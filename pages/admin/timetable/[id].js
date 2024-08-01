import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "components/Layout";
import AddDetailTimetableModal from "./AddDetailTimetableModal";
import EditDetailTimetableModal from "./EditDetailTimetableModal";
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

import 'chart.js/auto';

Chart.register(ArcElement, Tooltip, Legend);

export default function TimetableDetails() {
  const [timetable, setTimetable] = useState(null);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [isGridView, setIsGridView] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchTimetable = async () => {
      if (!id) return; // Exit early if id is not yet available
      const response = await fetch(`/api/timetable/${id}`);
      if (response.ok) {
        const data = await response.json();
        setTimetable(data);
      } else {
        setError("Failed to load timetable details");
      }
    };

    fetchTimetable();
  }, [id]); // Dependency array includes id to refetch when it changes

  const handleAddDetail = async (newDetail) => {
    const newId =
      timetable.details.length > 0
        ? Math.max(timetable.details.map((d) => d.id)) + 1
        : 1;
    const updatedTimetable = {
      ...timetable,
      details: [...(timetable.details || []), { ...newDetail, id: newId }],
    };

    const response = await fetch(`/api/timetable/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTimetable),
    });

    if (response.ok) {
      setTimetable(updatedTimetable);
    } else {
      setError("Failed to add detail");
    }
  };

  const handleSaveDetail = async (updatedDetail) => {
    const updatedDetails = timetable.details.map((detail) =>
      detail.id === updatedDetail.id ? updatedDetail : detail
    );

    const updatedTimetable = {
      ...timetable,
      details: updatedDetails,
    };

    const response = await fetch(`/api/timetable/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTimetable),
    });

    if (response.ok) {
      setTimetable(updatedTimetable);
      setSelectedDetail(null);
    } else {
      setError("Failed to update detail");
    }
  };

  const handleDeleteDetail = async (detailId) => {
    const updatedDetails = timetable.details.filter(
      (detail) => detail.id !== detailId
    );

    const updatedTimetable = {
      ...timetable,
      details: updatedDetails,
    };

    const response = await fetch(`/api/timetable/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTimetable),
    });

    if (response.ok) {
      setTimetable(updatedTimetable);
      setSelectedDetail(null);
    } else {
      setError("Failed to delete detail");
    }
  };

  if (error) return <div>{error}</div>;
  if (!timetable) return <div>Loading...</div>;

  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen">
        <div className="bg-gray-300 flex justify-between text-black p-4 sticky top-0 z-10 mb-4">
          <h1 className="text-2xl text-gray-600 font-bold">{timetable.name}</h1>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Add Detail
          </button>
          
        </div>
        <div className="flex justify-end">
        <button
            onClick={() => setIsGridView(!isGridView)}
            className="bg-white mr-4 text-black p-2 hover:bg-gray-100 font-medium border-x"
          >
            {isGridView ? 'List View' : 'Grid View'}
          </button>
        </div>

        {isGridView ? (
          <div className="bg-white p-4 mx-4 mb-4 rounded shadow border border-gray-300 overflow-x-auto">
            Coming Soon!
          </div>
        ) : (
          <div className="bg-white p-4 mx-4 mb-4 rounded shadow border border-gray-300">
            
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="border px-4 py-2">ID</th>
                  <th className="border px-4 py-2">Day</th>
                  <th className="border px-4 py-2">Subject</th>
                  <th className="border px-4 py-2">Start Time</th>
                  <th className="border px-4 py-2">End Time</th>
                </tr>
              </thead>
              <tbody>
                {timetable.details?.map((detail) => (
                  <tr
                    key={detail.id}
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setSelectedDetail(detail);
                      setIsEditModalOpen(true);
                    }}
                  >
                    <td className="border px-4 py-2">{detail.id}</td>
                    <td className="border px-4 py-2">{detail.day}</td>
                    <td className="border px-4 py-2">{detail.subject}</td>
                    <td className="border px-4 py-2">{detail.startTime}</td>
                    <td className="border px-4 py-2">{detail.endTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AddDetailTimetableModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddDetail={handleAddDetail}
      />
      {selectedDetail && (
        <EditDetailTimetableModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          detail={selectedDetail}
          onSave={handleSaveDetail}
          onDelete={() => handleDeleteDetail(selectedDetail.id)}
        />
      )}
    </Layout>
  );
}
