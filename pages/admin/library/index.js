import React, { useState, useEffect } from "react";
import UploadResourceModal from "./UploadResourseModal";
import Layout from "components/Layout";

const LibraryPage = () => {
  const [resources, setResources] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchResources = async () => {
      const response = await fetch('/api/library');
      const data = await response.json();
      setResources(data);
    };

    fetchResources();
  }, []);

  const handleAddResource = (newResource) => {
    // Ensure ID is a number if needed
    newResource.id = parseInt(newResource.id, 10);
    setResources((prevResources) => [...prevResources, newResource]);
  };

  return (
    <Layout>
      <div className="min-h-screen p-4 bg-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Library Resources</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Resource
          </button>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Subject</th>
                <th className="border px-4 py-2">File</th>
              </tr>
            </thead>
            <tbody>
              {resources.map((resource) => (
                <tr key={resource.id}>
                  <td className="border px-4 py-2">{resource.id}</td>
                  <td className="border px-4 py-2">{resource.subject}</td>
                  <td className="border px-4 py-2">
                    <a href={resource.fileUrl} target="_blank" rel="noopener noreferrer">
                      {resource.fileUrl.split('/').pop()}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <UploadResourceModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onUpload={handleAddResource}
        />
      </div>
    </Layout>
  );
};

export default LibraryPage;
