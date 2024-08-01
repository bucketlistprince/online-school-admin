import React, { useState, useEffect } from 'react';
import AddClassModal from './AddClassModal';
import EditClassModal from './EditClassModal';
import Layout from 'components/Layout';

export default function Classes() {
  const [classes, setClasses] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    const fetchClasses = async () => {
      const response = await fetch('/api/classes');
      if (response.ok) {
        const data = await response.json();
        setClasses(data);
      }
    };

    fetchClasses();
  }, []);

  const handleAddClass = (newClass) => {
    setClasses([...classes, newClass]);
  };

  const handleEditClass = (updatedClass) => {
    setClasses(classes.map(cls => cls.id === updatedClass.id ? updatedClass : cls));
  };

  const handleDeleteClass = (id) => {
    setClasses(classes.filter(cls => cls.id !== id));
  };

  const handleRowClick = (cls) => {
    setSelectedClass(cls);
    setIsEditModalOpen(true);
  };

  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen">
        <div className="bg-gray-300 flex justify-between text-black p-4 sticky top-0 z-10 mb-4">
          <h1 className="text-2xl text-gray-600 font-bold">Classes</h1>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Add Class
          </button>
        </div>

        <div className="bg-white p-4 m-4 rounded shadow border border-gray-300">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Class Name</th>
                <th className="border px-4 py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((cls) => (
                <tr
                  key={cls.id}
                  className="hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleRowClick(cls)}
                >
                  <td className="border px-4 py-2">{cls.id}</td>
                  <td className="border px-4 py-2">{cls.name}</td>
                  <td className="border px-4 py-2">{cls.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <AddClassModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddClass={handleAddClass}
        />

        {selectedClass && (
          <EditClassModal
            isOpen={isEditModalOpen}
            onClose={() => {
              setIsEditModalOpen(false);
              setSelectedClass(null);
            }}
            classData={selectedClass}
            onSave={handleEditClass}
            onDelete={handleDeleteClass}
          />
        )}
      </div>
    </Layout>
  );
}
