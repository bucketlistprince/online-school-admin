import React, { useState, useEffect } from 'react';
import AddGradeModal from './AddGradeModal';
import EditGradeModal from './EditGradeModal';
import Layout from 'components/Layout';

export default function Grades() {
  const [grades, setGrades] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState(null);

  useEffect(() => {
    const fetchGrades = async () => {
      const response = await fetch('/api/grades');
      if (response.ok) {
        const data = await response.json();
        setGrades(data);
      }
    };

    fetchGrades();
  }, []);

  const handleAddGrade = (newGrade) => {
    setGrades([...grades, newGrade]);
  };

  const handleEditGrade = (updatedGrade) => {
    setGrades(grades.map(grade => grade.id === updatedGrade.id ? updatedGrade : grade));
  };

  const handleDeleteGrade = (id) => {
    setGrades(grades.filter(grade => grade.id !== id));
  };

  const handleRowClick = (grade) => {
    setSelectedGrade(grade);
    setIsEditModalOpen(true);
  };

  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen">
        <div className="bg-gray-300 flex justify-between text-black p-4 sticky top-0 z-10 mb-4">
          <h1 className="text-2xl text-gray-600 font-bold">Grades</h1>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Add Grade
          </button>
        </div>

        <div className="bg-white p-4 m-4 rounded shadow border border-gray-300">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Grade</th>
                <th className="border px-4 py-2">Min Marks</th>
                <th className="border px-4 py-2">Max Marks</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((grade) => (
                <tr 
                  key={grade.id} 
                  className="hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleRowClick(grade)}
                >
                  <td className="border px-4 py-2">{grade.id}</td>
                  <td className="border px-4 py-2">{grade.name}</td>
                  <td className="border px-4 py-2">{grade.minMarks}</td>
                  <td className="border px-4 py-2">{grade.maxMarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <AddGradeModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddGrade={handleAddGrade}
        />

        {selectedGrade && (
          <EditGradeModal
            isOpen={isEditModalOpen}
            onClose={() => {
              setIsEditModalOpen(false);
              setSelectedGrade(null);
            }}
            gradeData={selectedGrade}
            onSave={handleEditGrade}
            onDelete={handleDeleteGrade}
          />
        )}
      </div>
    </Layout>
  );
}
