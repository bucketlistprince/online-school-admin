import React, { useState, useEffect } from 'react';
import AddSubjectModal from './AddSubjectModal';
import EditSubjectModal from './EditSubjectModal';
import Layout from 'components/Layout';

export default function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);

  useEffect(() => {
    const fetchSubjects = async () => {
      const response = await fetch('/api/subjects');
      if (response.ok) {
        const data = await response.json();
        setSubjects(data);
      }
    };

    fetchSubjects();
  }, []);

  const handleAddSubject = (newSubject) => {
    setSubjects([...subjects, newSubject]);
  };

  const handleEditSubject = (updatedSubject) => {
    setSubjects(subjects.map(subject => subject.id === updatedSubject.id ? updatedSubject : subject));
  };

  const handleDeleteSubject = (id) => {
    setSubjects(subjects.filter(subject => subject.id !== id));
  };

  const handleRowClick = (subject) => {
    setSelectedSubject(subject);
    setIsEditModalOpen(true);
  };

  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen">
        <div className="bg-gray-300 flex justify-between text-black p-4 sticky top-0 z-10 mb-4">
          <h1 className="text-2xl text-gray-600 font-bold">Subjects</h1>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Add Subject
          </button>
        </div>

        <div className="bg-white p-4 m-4 rounded shadow border border-gray-300">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Subject Name</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject) => (
                <tr 
                  key={subject.id} 
                  className="hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleRowClick(subject)}
                >
                  <td className="border px-4 py-2">{subject.id}</td>
                  <td className="border px-4 py-2">{subject.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <AddSubjectModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddSubject={handleAddSubject}
        />

        {selectedSubject && (
          <EditSubjectModal
            isOpen={isEditModalOpen}
            onClose={() => {
              setIsEditModalOpen(false);
              setSelectedSubject(null);
            }}
            subjectData={selectedSubject}
            onSave={handleEditSubject}
            onDelete={handleDeleteSubject}
          />
        )}
      </div>
    </Layout>
  );
}
